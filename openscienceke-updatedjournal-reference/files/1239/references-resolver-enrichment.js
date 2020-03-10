/* globals openResolverInformation, openResolverFullReferences */

function getReferencePubMedId(reference) {
  var pubMedId = false;
  if (typeof reference['m:cite-to-ids'] !== 'undefined' && $.isArray(reference['m:cite-to-ids'])) {
    $.each(reference['m:cite-to-ids'], function (citeToIdx) {
      var citeToId = reference['m:cite-to-ids'][citeToIdx];
      if (citeToId['id-source'] && citeToId['id-source'] === 'pubmed') {
        pubMedId = citeToId.content;
      }
    });
  }
  return pubMedId;
}

function getReferenceDoi(reference) {
  var doi = false;
  if (reference['m:dois'] && $.isArray(reference['m:dois'])) {
    $.each(reference['m:dois'], function (doiCandidateIdx) {
      var doiCandidate = reference['m:dois'][doiCandidateIdx];
      if (doiCandidate.isPrimary && doiCandidate.content) {
        doi = doiCandidate.content;
      }
    });
  }
  return doi;
}

function getReferenceTitle(reference) {
  return reference['m:title'];
}

function getReferenceText(reference) {
  return reference['m:referenceText'];
}

function getReferencePublicationType(reference) {
  return reference['m:publicationType'] || '';
}

function getReferenceYear(reference) {
  return reference['m:pub-year'] || false;
}

function getReferenceAuthorString(reference) {
  var authors = reference['m:authors'];
  if (!authors || !$.isArray(authors) || !authors.length) {
    return false;
  }
  var authorString = '';

  authors.forEach(function (author, index) {
    authorString += 'author=' + author.content;
    if (index < authors.length - 1) {
      authorString += '&';
    }
  });
  return authorString;
}

function getReferenceJournalTitle(reference) {
  return reference['m:journal-title'];
}

function getReferenceJournalVolume(reference) {
  return reference['m:journal-volume'];
}

function getReferenceJournalIssue(reference) {
  return reference['m:journal-issue'];
}
function getReferenceBookIsbn(reference) {
  return reference['m:isbn'];
}

function getReferencePages(reference) {
  var firstPage = reference['m:first-page'];
  var lastPage = reference['m:last-page'];
  return  firstPage && lastPage ? firstPage + '-' + lastPage : false;
}

function getQueryStringFromKeyMapping(queryKeyMappings) {
  var queryString = '';
  queryKeyMappings.forEach(function (keyMapping) {
    if (keyMapping.value) {
      queryString += '&' + keyMapping.key + '=' + keyMapping.value;
    }
  });
  return queryString;
}

function getBookFieldQueryString(reference) {
  var queryKeyMappings = [
    {key: 'isbn', value: getReferenceBookIsbn(reference)},
    {key: 'pages', value: getReferencePages(reference)}
  ];
  return getQueryStringFromKeyMapping(queryKeyMappings);
}

function getJournalArticleFieldQueryString(reference) {
  var queryKeyMappings = [
    {key: 'journal', value: getReferenceJournalTitle(reference)},
    {key: 'volume', value: getReferenceJournalVolume(reference)},
    {key: 'doi', value: getReferenceDoi(reference)},
    {key: 'pages', value: getReferencePages(reference)},
    {key: 'issue', value: getReferenceJournalIssue(reference)}
  ];
  return getQueryStringFromKeyMapping(queryKeyMappings);
}

function getDefaultQueryString(title, year, authorString) {
  var gsQuery = '?title=' + title;
  if (year) {
    gsQuery += '&publication_year=' + year;
  }

  gsQuery += '&' + authorString;
  return gsQuery;
}

function replaceStringSpaces(string) {
  var spaceReplacement = '+';
  var defaultString = '';
  return string ? string.replace(/[,\s]|_/g, spaceReplacement).replace(/\++/g, spaceReplacement) : defaultString;
}

function getFieldQueryString(reference, title, year, authorString) {
  var queryString = getDefaultQueryString(title, year, authorString);
  var publicationType = getReferencePublicationType(reference).toLowerCase();

  switch (publicationType) {
    case 'journal':
      queryString += getJournalArticleFieldQueryString(reference);
      break;
    case 'book':
      queryString += getBookFieldQueryString(reference);
      break;
  }
  return replaceStringSpaces(queryString);
}

function getFieldlessQueryString(referenceText) {
  return replaceStringSpaces(referenceText);
}

function getGoogleScholarUri(reference) {
  var title = getReferenceTitle(reference);
  var year = getReferenceYear(reference);
  var authorString = getReferenceAuthorString(reference);

  if (title && year && authorString) {
    return 'https://scholar.google.com/scholar_lookup' + getFieldQueryString(reference, title, year, authorString);
  }

  var referenceText = getReferenceText(reference);
  if (referenceText) {
    return 'https://scholar.google.com/scholar?q=' + getFieldlessQueryString(referenceText);
  }

  return false;
}

function enrichOpenUrls(openResolverInformation, openResolverFullReferences) {
  var hasWarn = console && typeof console.warn === 'function';

  // To be defined in-page, not a service as it'll always need to be loaded as part of the page regardless.
  if (typeof openResolverInformation === 'undefined' || typeof openResolverFullReferences === 'undefined') {
    if (hasWarn) {
      console.warn('Open resolver references were not complete, not enriching page.');
    }
    return false;
  }

  $.each(openResolverFullReferences, function (referenceIdx) {
    var reference = openResolverFullReferences[referenceIdx]['atom:content'];

    if (!reference) {
      if (hasWarn) {
        console.warn('Reference not well formed', reference);
      }
    }

    var referenceId = reference['m:reference-id'];
    var doi = getReferenceDoi(reference);
    var pubMedId = getReferencePubMedId(reference);
    var openUrl = openResolverFullReferences[referenceIdx].openUrl;
    var refElement = $('#' + referenceId);

    if ($(refElement).find('span.citation').size()) {
      refElement = $(refElement).find(':last-child').last();
    }

    var resolverDomEl = $(' <span class="resolver-links"/>');

    var hasResolversSeparator = '';
    var hasResolverHtmlSeparator = '<span> | </span>';

    if (refElement.length) {
      if (doi) {
        resolverDomEl.append(hasResolversSeparator);
        resolverDomEl.append('<a target="_blank" class="resolver-link"  href="http://dx.doi.org/' + doi + '"> CrossRef</a>');
        hasResolversSeparator = hasResolverHtmlSeparator;
      }

      if (openResolverInformation && $.isArray(openResolverInformation)) {
        $.each(openResolverInformation, function (customResolverIdx) {

          var customResolver = openResolverInformation[customResolverIdx];
          var link = customResolver.resolverLink;
          var orgName = customResolver.orgName;
          var resolverText = customResolver.resolverCustomText;
          var imageHtml = '';
          var image = customResolver.resolverImage;
          if (image) {
            imageHtml = '<img class="openurl-image" src="' + image.imageUrl + '" alt="Find at ' + orgName + '"/>';

            if (resolverText) {
              //fix for the vertical alignment of text in the resolver
              resolverText = '<span>' + resolverText + '</span>';
            }
          } else if (!resolverText) {
            resolverText = 'OpenURL query';
          }

          resolverDomEl.append(hasResolversSeparator);
          resolverDomEl.append('<a class="resolver-link" target="_blank" href="' + link + openUrl + '" alt="' + orgName + '" title="Find at ' + orgName + '">' + imageHtml + ' ' + resolverText + '</a>');
          hasResolversSeparator = hasResolverHtmlSeparator;
        });
      }

      var googleScholarUri = getGoogleScholarUri(reference);
      if (googleScholarUri) {
        resolverDomEl.append(hasResolversSeparator);
        $(resolverDomEl).append('<a class="resolver-link" target="_blank"  href="' + encodeURI(googleScholarUri) + '"><span> Google Scholar</span></a>');
      }

      hasResolversSeparator = hasResolverHtmlSeparator;

      if (pubMedId) {
        resolverDomEl.append(hasResolversSeparator);
        resolverDomEl.append('<a class="resolver-link" target="_blank"  href="https://www.ncbi.nlm.nih.gov/pubmed/' + pubMedId + '"><span> PubMed</span></a>');
        hasResolversSeparator = hasResolverHtmlSeparator;
      }

      refElement.append(resolverDomEl);
    }
  });
}

$(document).ready(function () {
  if (typeof openResolverInformation !== 'undefined' && typeof openResolverFullReferences !== 'undefined') {
    enrichOpenUrls(openResolverInformation, openResolverFullReferences);
  }
});
