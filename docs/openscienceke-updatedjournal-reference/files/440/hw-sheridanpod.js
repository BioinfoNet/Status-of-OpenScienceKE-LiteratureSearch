// Sheridan CP JS Encodes all data September 2011
// this is the HW shared file to support Sheridan Press Print-on-Demand (PoD)

gSiteOptions.SheridanPoDCBText = "<span class='print-on-demand-link'>Add to Custom Publication</span>";
gSiteOptions.SheridanPoDCBLoc = "#article-cb-main #cb-art-svcs > ol";
gSiteOptions.SheridanCitLinkText = "<span class='print-on-demand-link'>Add to Custom Publication</span>";
gSiteOptions.SheridanPoDIssueText = "<span class='print-on-demand-link'>Add This Issue to Custom Publication</span>";
gSiteOptions.SheridanPoDIssueCBLoc = "#pageid-toc div#col-2 ul.toc-links";

$(document).ready(function() {
		setTimeout("addPODLinks()", 100);
});

function addPODLinks() {
	if (typeof(podvars) != 'undefined') {
		if ($("#pageid-content").length) {
			var cbloc = $(getSiteOption('SheridanPoDCBLoc'));
			if (cbloc.length) {
				var resid = $("meta[name='citation_mjid']").attr('content');
				if (resid != '') {
					cbloc.eq(0).append('<li class="pod-link"><a href="#" rel="pod-' + resid + '" class="shpod-link">' + getSiteOption('SheridanPoDCBText') + '</a></li>');
					addPODClickHandling();
				}
			}
		}
		else {
			var linkText = getSiteOption('SheridanCitLinkText');
			for (resid in podvars) {
				if (typeof(podvars[resid]) != 'undefined') {
					if (podvars[resid].item_category == 'ARTICLE') {
						var cit = $("span.pod-match[title='" + resid + "']").parents("li.cit").eq(0);
						if (cit.length) {
							cit.find("div.cit-extra ul.cit-views").append('<li class="pod-link"><a href="#" rel="pod-' + resid + '" class="shpod-link">' + linkText + '</a></li>');
						}
					}
					else if (podvars[resid].item_category == 'ISSUE') {
						var tocloc = $(getSiteOption('SheridanPoDIssueCBLoc'));
						if (tocloc.length) {
							tocloc.eq(0).append('<li class="pod-link"><a href="#" rel="pod-' + resid + '" class="shpod-link">' + getSiteOption('SheridanPoDIssueText') + '</a></li>');
						}
					}
				}
			}
			addPODClickHandling();
		}
	}
}

function cleanupPageNum(pageString) {
	if (pageString.indexOf('-') > 0) {
		pageString = pageString.substring(0,pageString.indexOf('-'));
	}
	pageString = pageString.replace(/\D/g,'');
	return pageString;
}

function addPODClickHandling() {
	var podLinks = $("a.shpod-link");
	if (podLinks.length) {
		for (var i = 0; i < podLinks.length; i++) {
			var podLink = podLinks.eq(i);
			var podRel = podLink.attr("rel");
			var podId = podRel.substring(podRel.indexOf("pod-") + 4);
			var podObj = podvars[podId];
			if (typeof(podObj) != 'undefined') {
				podLink.bind("click", {id: podId},
					function(e) {
						e.preventDefault();
						var podObj = podvars[e.data.id];
						var isIssue = (podObj.item_category == 'ISSUE');
						var itemTitle = (typeof(podObj.item_title) == 'undefined' ? '' : podObj.item_title);
						if (isIssue && (itemTitle == '')) {
							var issueDate = '';
							var issueDateObj = $('#toc-header .issue-date');
							if (issueDateObj.length) {
								issueDate = $.trim(issueDateObj.text());
							}
							// create stand-in issue title
							itemTitle = podObj.item_journal_title + ' ' + issueDate + ' Volume ' + podObj.item_volume_num + ' Issue ' + podObj.item_issue_num;
						}
						var pdfurl = podObj.item_pdf_url;
						if ((typeof(pdfurl) != 'undefined') && (pdfurl.indexOf('+html') > 0)) {
							pdfurl = pdfurl.substring(0, pdfurl.indexOf('+html'));
						}
						var itemCode = encodeURIComponent(podObj.item_code); 
						AddToCart(itemCode, itemTitle, podObj.item_category, podObj.item_doi, podObj.item_authors, podObj.item_issue_num, podObj.item_volume_num, podObj.item_info_url, pdfurl, cleanupPageNum(podObj.item_starting_page_num), cleanupPageNum(podObj.item_ending_page_num), podObj.item_total_page_num, podObj.item_journal_title);
					}
				);
			}
		}
	}
}
function TestAddToCart(item_code, item_title, item_category, item_doi, author_names, item_issue_num, item_volume_num, item_info_url, item_pdf_url, starting_page_num, ending_page_num, total_page_num, journal_title) {
	debugOut("Got called with: '" + item_code + "', '" + item_title + "', '" + item_category + "', '" + item_doi + "', '" + author_names + "', '" + item_issue_num + "', '" + item_volume_num + "', '" + item_info_url + "', '" + item_pdf_url + "', '" + starting_page_num + "', '" + ending_page_num + "', '" + total_page_num + "', '" + journal_title + "'");
}


//Global Variable Definition
var MsgPopupBlocker = "Your popup blocker seems to be blocking the popup Windows. Please add this site to the web site allowed to open popup and try again.";
var IEC_Win=null;
var IEC_PubIDs = "";

window.onunload = function(){ if(IEC_Win != null && !IEC_Win.closed) IEC_Win.close(); }; //closes the popup window if the parent window is closed
function AddToCart(item_code,item_title,item_category,item_doi,author_names,item_issue_num,item_volume_num,item_info_url,item_pdf_url,starting_page_num,ending_page_num,total_page_num,journal_title)
{
  //Encode the Author Names 
    var encodedInputString=author_names.replace("+", "%2B");
        encodedInputString=encodedInputString.replace("/", "%2F");
        author_names=escape(encodedInputString)+'|||'+UrlEncode(author_names);
        //Encode the Item Title
        encodedInputString=item_title.replace("+", "%2B");
        encodedInputString=encodedInputString.replace("/", "%2F");
        item_title=escape(encodedInputString)+'|||'+UrlEncode(item_title);
    
//    //Encode the Journal Title
        encodedInputString=journal_title.replace("+", "%2B");
        encodedInputString=encodedInputString.replace("/", "%2F");
        journal_title=escape(encodedInputString)+'|||'+UrlEncode(journal_title);

    //Open the popup window
    var IEC_WinW = 550;
    var IEC_WinH = 280;
    var IEC_WinX = (screen.availWidth - IEC_WinW) / 2;
    var IEC_WinY = (screen.availHeight - IEC_WinH) / 2;
    var features = 'left='+IEC_WinX+',top='+IEC_WinY+',width='+IEC_WinW+'px,height='+IEC_WinH+'px,resizable=no,scrollbars=no,status=no,menubar=no';
    var ReferenceURL = location.href.replace(/\#/, '%23');
    
    var query = POD_server + "/AddToCart.aspx?publisher_code=" + POD_publisher_code + "&provider_code=" + POD_provider_code + "&item_code=" +
                    item_code + "&item_title=" + item_title + "&item_category=" + item_category + "&item_doi=" + item_doi + "&author_names=" + author_names +
                    "&item_issue_num=" + item_issue_num + "&item_volume_num=" + item_volume_num + "&item_info_url=" + item_info_url +
                    "&item_pdf_url=" + item_pdf_url + "&starting_page_num=" + starting_page_num + "&ending_page_num=" + ending_page_num +
                    "&total_page_num=" + total_page_num + "&ReferenceURL=" + ReferenceURL+ "&journal_title=" + journal_title;
                    
    if(IEC_Win==null || IEC_Win.closed)
    {
        IEC_Win = window.open(query,'',features);
        
        if(IEC_Win == null)
        {
            alert(MsgPopupBlocker);
            return false;
        }
    }
    else
    {
        IEC_Win.location.href = query;
    }
    IEC_Win.focus();
    return false;
}

 function UrlEncode(text) 


                {		
                	var Character = new Array('%', ' ', '~', '!', '@', '#', '$', '^', '&', '*', '(', ')', '{', '}', '[', ']', '=', ':', '/', ',', ';', '?', '+', '\'', '"', '\\'); 
                	var URLEncoded = new Array('%25', '%20', '%7E', '%21', '%40', '%23', '%24', '%5E', '%26', '%2A', '%28', '%29', '%7B', '%7D', '%5B', '%5D', '%3D', '%3A', '%2F', '%2C', '%3B', '%3F', '%2B', '%27', '%22', '%5C');
                	//text=ReplaceAll(text, "/\", "%2F"); 
                	text=ReplaceAll(text, Character[0], URLEncoded[0]);
                	text=ReplaceAll(text, Character[1], URLEncoded[1]);
                	text=ReplaceAll(text, Character[2], URLEncoded[2]);
                	text=ReplaceAll(text, Character[3], URLEncoded[4]);
                	text=ReplaceAll(text, Character[4], URLEncoded[5]);
                	text=ReplaceAll(text, Character[5], URLEncoded[6]);
                	text=ReplaceAll(text, Character[6], URLEncoded[7]);
                	text=ReplaceAll(text, Character[7], URLEncoded[8]);
                	text=ReplaceAll(text, Character[8], URLEncoded[9]);
                	text=ReplaceAll(text, Character[9], URLEncoded[10]);
                	text=ReplaceAll(text, Character[10], URLEncoded[11]);
                	text=ReplaceAll(text, Character[12], URLEncoded[12]);
                	text=ReplaceAll(text, Character[13], URLEncoded[13]);
                	text=ReplaceAll(text, Character[14], URLEncoded[14]);
                	text=ReplaceAll(text, Character[15], URLEncoded[15]);
                	text=ReplaceAll(text, Character[16], URLEncoded[16]);
                	text=ReplaceAll(text, Character[17], URLEncoded[17]);
                	text=ReplaceAll(text, Character[18], URLEncoded[18]);
                	text=ReplaceAll(text, Character[19], URLEncoded[19]);
                	text=ReplaceAll(text, Character[20], URLEncoded[20]);
                	text=ReplaceAll(text, Character[21], URLEncoded[21]);
                	text=ReplaceAll(text, Character[22], URLEncoded[22]);
                	text=ReplaceAll(text, Character[23], URLEncoded[23]);
                	text=ReplaceAll(text, Character[24], URLEncoded[24]);
                	text=ReplaceAll(text, Character[25], URLEncoded[25]);
                	
                	return text;
            }
 //Replace all given string from a string
            //     
            function ReplaceAll(varb, replaceThis, replaceBy)


                {	
                	newvarbarray=varb.split(replaceThis);
                	newvarb=newvarbarray.join(replaceBy);	
                	return newvarb;
            }
function Checkout()
{
    if(IEC_Win != null && !IEC_Win.closed) 
        IEC_Win.close();
    
    window.location.href = POD_server + '/Default.aspx?publisher_code=' + POD_publisher_code + '&provider_code=' + POD_provider_code;
}
