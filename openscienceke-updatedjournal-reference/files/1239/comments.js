/* global cmsModal, confirmModal, createAlertBox, window */

var AOP = AOP || {};

AOP.comments = {

  config: {
    toggleSpeed: 300
  },

  data: {
    service: AOP.baseUrl + '/services/aop-cambridge-core/comments',
    productId: null
  },

  /*
   * initialise page
   */
  init: function () {

    AOP.comments.data.productId = $('a[data-prod-id]').attr('data-prod-id');
    AOP.comments.submissionLib.init();
    AOP.comments.repliesLib.init();
    AOP.comments.loadMoreLib.init();
    AOP.comments.initExpandCommentLinks();

    //Make sure the article meta (issue/volume/pubdate/access right are the same width as the expanded main section
    $('.icon.toggle.close').on('click', function () {
      $('.article-meta').toggleClass('reading-width');
    });
  },


  /*
   * displays user friendly error message and reset loader
   */
  handleSadPath: function (message, restoreLayer) {
    message = message || 'We are unable to retrieve the requested data. Please try again.';
    createAlertBox(null, $('#ajaxMessages'), 'alert', message);
    if (restoreLayer) {
      AOP.comments.loader.fadeIn(restoreLayer);
    }
  },


  initExpandCommentLinks: function () {

    var expandCommentLinks = $('.expand-comment-links');

    expandCommentLinks.unbind('click');

    expandCommentLinks.on('click', function (e) {

      e.stopPropagation();
      e.preventDefault();

      $(this).parent().find('span').css({display: 'inline'});
      $(this).remove();
    });

  }

};


AOP.comments.loader = {
  fadeOut: function (selector) {
    $(selector).fadeTo(100, 0.2);
  },
  fadeIn: function (selector) {
    $(selector).fadeTo(100, 1);
  }
};


AOP.comments.submissionLib = {

  dom: {
    responseInterestsInfo: $('#conflictInfo'),
    replyCommentTitle: $('#reply-comment-title'),
    responseFormInterests: $('input[name="conflictInterest"]'),
    commentMoreInfo: $('.comment-more-info'),
    commentsOnlySections: $('.comments-only'),
    replyOnlySections: $('.reply-only'),
    submissionModal: $('#post-comments-modal'),
    openFormModalButtons: null,
    loginModal: $('#login-modal'),
    contributorSection: $('#contributor-section'),
    contributorTemplate: $('script[data-template="contributorsTemplate"]').text(),
    addContributorButtons: $('.add-contributor'),
    removeContributorSelector: '.remove-contributor',
    qtip: $('.qtip')
  },


  data: {
    service: AOP.comments.data.service + '/save-for-login',
    commentId: null,
    contributorRowCount: 0,
    contributorRowMarker: 1,
    contributorLimit: 5
  },


  init: function () {

    // Initialise conflict of interest switch
    this.dom.responseFormInterests.on('change', function () {
      AOP.comments.submissionLib.switchInterestsValidation($(this).val());
    });

    //Causes automatic loading of comment form when redirected from login
    //Functionality pulled but left here in case required in the future.
    //this.checkPostLoginReturnStatus();

    this.initOpenFormModalButtons();
    this.initMultipleContributors();
    this.setContributorCounters();
  },


  setContributorCounters: function (incMarker) {
    this.data.contributorRowCount = $('.contributor-row').size();
    if (incMarker) {
      this.data.contributorRowMarker++;
    }
  },


  initOpenFormModalButtons: function () {

    this.dom.openFormModalButtons = $('.reply-button');
    this.dom.openFormModalButtons.unbind('click');

    this.dom.openFormModalButtons.on('click', function (e) {
      AOP.comments.submissionLib.openFormModalClick(e, $(this));
    });

  },


  checkPostLoginReturnStatus: function () {

    if ($('#comments').hasClass('launch')) {
      //returning from login - launch form - need to factor in type correctly
      this.data.commentId = $('#comments').attr('data-cid');
      this.loadSubmissionFormModal();
    }
  },


  initMultipleContributors: function () {

    this.dom.addContributorButtons.on('click', function (e) {
      AOP.comments.submissionLib.addContributor(e);
    });

  },


  addContributor: function (e) {

    var html = this.dom.contributorTemplate.replace(/--x--/g, this.data.contributorRowMarker);
    var submissionLib = this;

    this.dom.contributorSection.append(html);
    $('#contributor-row_' + this.data.contributorRowMarker).slideToggle(AOP.comments.config.toggleSpeed, function () {
      $('#remove-contributor_' + submissionLib.data.contributorRowMarker).on('click', function (e) {
        AOP.comments.submissionLib.removeContributor(e, $(this));
      });

      submissionLib.setContributorCounters(true);

      if (submissionLib.data.contributorRowCount === submissionLib.data.contributorLimit) {
        submissionLib.dom.addContributorButtons.hide();
      }

    });
  },


  removeContributor: function (e, el) {

    var submissionLib = this;

    var rowSelector = '#' + el.attr('id').replace('remove-contributor_', 'contributor-row_');
    $(rowSelector).slideToggle(AOP.comments.config.toggleSpeed, function () {

      $(this).remove();
      submissionLib.setContributorCounters();

      if (submissionLib.data.contributorRowCount < submissionLib.data.contributorLimit) {
        submissionLib.dom.addContributorButtons.show();
      }
    });
  },


  openFormModalClick: function (e, el) {

    // Open the comment form modal
    e.stopPropagation();
    e.preventDefault();

    this.data.commentId = el.attr('data-comment-id');
    //lib.data.prodId = el.attr('data-prod-id');
    this.loadSubmissionFormModal();
  },

  /*
   * Load submission form modal or prompt for login
   */
  loadSubmissionFormModal: function () {

    if (this.isLoggedIn()) {

      this.setupResponseForm();
      this.dom.submissionModal.foundation('reveal', 'open');

    } else {

      var submissionLib = this;
      this.loginMessage = 'You need to be logged in to your Cambridge Core account in order to add comments. ';
      this.loginMessage += 'Don\'t have an account? <a href="' + AOP.baseUrl + '/register">Register for a free account now.</a>';

      //set session here to then jump to comment tab on redirection post register/login
      $.post(this.data.service, {
        _csrf: $('input[name="_csrf"]').val(),
        cid: this.data.commentId
      }, function () {
        //Proceed even if session not stored - this is very low risk and will require click on comments tab on return without this
        //Set correct text on reusable login modal and reveal it
        submissionLib.dom.qtip.hide();
        submissionLib.dom.loginModal.find('.message').html(submissionLib.loginMessage);
        submissionLib.dom.loginModal.foundation('reveal', 'open');
      });
    }
  },


  /*
   * Reset form fields for current response
   */
  setupResponseForm: function () {

    //Set form type
    var commentType = (this.data.commentId) ? 'reply' : 'comment';
    this.switchFormType(commentType);

    //Reset fields for fresh response
    $('#pid').val(AOP.comments.data.productId);//(this.data.prodId);
    $('#cid').val(this.data.commentId);
    $('#comment').val('');
    $('#title').val('');

    //Reset additional contributors
    $('.contributor-row-hide').remove();
    this.setContributorCounters();
    this.data.contributorRowMarker = 1;

    // Remove any abide validation formatting
    this.dom.submissionModal.find('div').removeClass('error');
    this.dom.submissionModal.find('label').removeClass('error');

  },


  /*
   * Setup form for comment type
   * Setup form for comment type
   */
  switchFormType: function (commentType) {
    //switch titles
    if (commentType === 'reply') {
      var commentTitle = $('#comment-title-' + this.data.commentId).text();
      this.dom.replyCommentTitle.text(commentTitle);
      this.dom.replyOnlySections.show();
      this.dom.commentsOnlySections.hide();
    } else {
      this.dom.replyOnlySections.hide();
      this.dom.commentsOnlySections.show();
      this.dom.replyCommentTitle.text('');
    }
  },


  /*
   * Setup validation for conflict of interest
   */
  switchInterestsValidation: function (hasConflict) {
    var infoDisabled = hasConflict !== 'true';
    this.dom.responseInterestsInfo.attr('disabled', infoDisabled);
    this.dom.commentMoreInfo.removeClass('error');
  },


  isLoggedIn: function () {
    return $('meta[data-logged-in]').length >= 1;
  }

};


AOP.comments.repliesLib = {

  dom: {
    toggleRepliesLinks: null,
    replyTemplate: $('script[data-template="replyTemplate"]').text().split(/\${(.+?)}/g),
  },


  init: function () {
    this.initRepliesLinks();
  },


  initRepliesLinks: function () {
    this.dom.toggleRepliesLinks = $('[data-comment-replies-for]');
    this.dom.toggleRepliesLinks.unbind('click');
    this.dom.toggleRepliesLinks.on('click', function (e) {
      AOP.comments.repliesLib.toggleRepliesClick(e, $(this));
    });
  },


  toggleRepliesClick: function (e, el) {

    e.stopPropagation();
    e.preventDefault();

    var commentId = el.attr('data-comment-replies-for');
    var repliesBlockId = '#replies-block-' + commentId;
    var commentBlockId = '#comment-block-' + commentId;

    if (el.hasClass('open')) {

      this.toggle(el, repliesBlockId);

    } else {

      if (el.hasClass('loaded')) {
        this.toggle(el, repliesBlockId, commentBlockId);
      } else {
        this.loadCommentReplies(el, commentId, repliesBlockId, commentBlockId);
      }
    }
  },


  /*
   * Define internal functionality
   */
  loadCommentReplies: function (el, commentId, repliesBlockId, commentBlockId) {

    var service = AOP.comments.data.service + '/load-replies/' + commentId;
    var repliesLib = this;

    AOP.comments.loader.fadeOut(commentBlockId);

    $.get(service).done(function (resp) {

      // Preserved for future testing : resp = false;

      if (!resp.success) {

        AOP.comments.handleSadPath(resp.error && resp.error.message, commentBlockId);

      } else {

        var html = '', i = resp.data.length;
        var repliesCounterId = '#replies-count-' + commentId;
        var repliesCounterText = '#replies-count-text-' + commentId;

        $(el).addClass('loaded');

        resp.data.forEach(function (reply) {
          //html += '<div class="reply-row"  id="' + reply.id + '"><p>' + reply.title + ' </p><p>' +  reply.body  + '</p></div>';
          html +=  repliesLib.dom.replyTemplate.map(repliesLib.renderTemplateChunks(reply)).join('');
        });

        $(repliesCounterId).text(i);
        $(repliesCounterText).text((i !== 1) ? AOP.translate('replies') : AOP.translate('reply'));

        if (html) {
          repliesLib.toggle(el, repliesBlockId, commentBlockId, html);
        } else {
          AOP.comments.handleSadPath('There are no replies to load.', commentBlockId);
        }

      }
    });
  },


  /*
   * Toggle reply layer visibility
   */
  toggle: function (el, repliesBlockId, commentBlockId, repliesHTML) {

    var callback  = null;

    if (repliesHTML) {
      $(repliesBlockId).append(repliesHTML);
      callback = function () {
        AOP.comments.loader.fadeIn(commentBlockId);
      };
    }

    $(repliesBlockId).slideToggle(AOP.comments.config.toggleSpeed, callback);
    this.textSwitch(el);
    el.toggleClass('open');

  },


  /*
   * mapping function for template rendering
   */
  renderTemplateChunks: function (props) {
    return function (chunk, i) {
      return AOP.comments.repliesLib.unescapeHtmlEntities((i % 2) ? props[chunk] : chunk);
    };
  },


  /*
   * helper function for template rendering
   */
  unescapeHtmlEntities: function (s) {
    s = s || '';
    return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  },


  textSwitch: function (el) {

    var toggleTextClass = '.toggle-label-text';
    var text = $(el).find(toggleTextClass).text().split(' ')[0];
    var translationForShow = AOP.translate('Show');
    var translationForReplies = AOP.translate('replies');
    $(el).find(toggleTextClass).text(AOP.translate((text === 'Show' || text ===  translationForShow) ? 'Hide' : 'Show') + ' ' + translationForReplies);
    $(el).find('div').toggleClass('close');
  }

};


AOP.comments.loadMoreLib = {

  dom: {
    loadMoreLinks: $('[data-loader-key]'),
    pageBlockSelector: '#journal-comments-page-inner'
  },

  data: {
    service: AOP.comments.data.service + '/load-comments/',
    loaderKey : false,
    displayType: null
  },


  init: function () {

    var loaderLinks = this.dom.loadMoreLinks;
    this.data.loaderKey = loaderLinks.attr('data-loader-key');
    this.data.displayType = loaderLinks.attr('data-display-type');

    loaderLinks.on('click', function (e) {
      AOP.comments.loadMoreLib.loadMoreLinksClick(e);
    });
  },


  loadMoreLinksClick: function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.data.loaderKey && this.data.displayType) {
      this.loadMoreComments();
    }
  },


  loadMoreComments: function () {

    AOP.comments.loader.fadeOut(this.dom.pageBlockSelector);

    var loadMoreLib = this;
    var service = this.data.service + AOP.comments.data.productId + '/' + this.data.loaderKey + '/' + this.data.displayType;

    $.get(service).done(function (resp) {

      // Preserved for future testing :resp = false;
      if (!resp.success) {

        AOP.comments.handleSadPath(resp.error && resp.error.message, loadMoreLib.dom.pageBlockSelector);

      } else {

        loadMoreLib.data.loaderKey = resp.data && resp.data.key;

        if (resp.data.html) {
          loadMoreLib.initFreshCommentsDom(resp.data.html);
        }
      }
    });
  },


  initFreshCommentsDom: function (html) {

    $(this.dom.pageBlockSelector).append(html);

    $('.commentsBlock:last').slideToggle(AOP.comments.config.toggleSpeed, function () {
      AOP.comments.repliesLib.initRepliesLinks();
      AOP.comments.submissionLib.initOpenFormModalButtons();
      AOP.comments.loader.fadeIn(AOP.comments.loadMoreLib.dom.pageBlockSelector);
      AOP.comments.initExpandCommentLinks();

      if (AOP.comments.loadMoreLib.data.loaderKey === null) {
        AOP.comments.loadMoreLib.dom.loadMoreLinks.remove();
      }

    });

  }
};

//AOP.comments.forceQtip();
$(document).ready(AOP.comments.init);
