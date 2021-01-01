$(document).ready( function() {
     
    //Search button pressed
    $("#search_button").click(function(){
       initiate_search($("#search_input_header").val());
    });
    
     //Enter pressed
     $("#search_input_header").keypress(function(e){
        if(e.which === 13){ 
            initiate_search($("#search_input_header").val());
        }
    });
    
    //Search button pressed
    $("#search_within_journal_button").click(function(){
       initiate_search_within_journal($("#search_within_journal_input").val(),$("#search_within_journal_id").val() );
    });
    
     //Enter pressed
     $("#search_within_journal_input").keypress(function(e){
        if(e.which === 13){ 
            initiate_search_within_journal($("#search_within_journal_input").val(),$("#search_within_journal_id").val());
        }
     });
     
    $("#search_within_book_button").click(function(){
       initiate_search_within_book($("#search_within_book_input").val(),$("#search_within_book_id").val() );
    });
    
     //Enter pressed
     $("#search_within_book_input").keypress(function(e){
        if(e.which === 13){ 
            initiate_search_within_book($("#search_within_book_input").val(),$("#search_within_book_id").val());
        }
     });     
    
    
    
    //Browse button pressed
    $("#browse_button").click(function(){
       initiate_browse();
    });    

    //Save content
    $(document).on("click", ".save_content" , function() {
        save_content($(this));
    });
    $(document).on("keydown",".save_content",function(e) {
    	if(e.which === 13) { save_content($(this)); }
    });
    
    //Unsave content
    $(document).on("click", ".un_save_content" , function() {
        un_save_content($(this));
    });
    $(document).on("keydown",".un_save_content",function(e) {
    	if(e.which === 13) { save_content($(this)); }
    });    
    
    //Cite content
    $(document).on("click", ".cite_content" , function() {
        cite_content($(this));
    });
    $(document).on("keydown",".cite_content",function(e) {
    	if(e.which === 13) { save_content($(this)); }
    });    
    
    //Uncite content
    $(document).on("click", ".un_cite_content" , function() {
        un_cite_content($(this));
    });
    $(document).on("keydown",".un_cite_content",function(e) {
    	if(e.which === 13) { save_content($(this)); }
    });
    
    //Cookie Acknowledgement
    $(document).on("click", "#accept_cookie_msg" , function() {
        accept_cookie_acknowledgement($(this));
    });
    
    //Buy Content
    /*
    $(document).on("click", ".btn_buy_content" , function() {
       add_to_cart($(this));
    });
    */
});

/*
function add_to_cart(button){   
    parts = $(button).attr('id').split("_");
    content_type = parts[1];
    content_id = parts[2];
    if (content_type && $.isNumeric( content_id)) {
	$.ajax({
            type: "POST",
            url: "/account/cart/add/" + content_type + "/" + content_id,
            success: function(data){
		if (data == 1) {
		    alert("Item added to your shopping cart");
		} else {
		    alert("Unable to add item to shopping cart")
		}
            },
	});	
	
	
	
    } else {
	alert("Unable to add item to shopping cart");
    }
}
*/

function initiate_search(search_text){
    if (search_text) {
	search_text = search_text.replace(/:/g, "|");
    }
    var url = "/search?action=search&query=content:" + search_text + ":and&min=1&max=10&t=header";
    this.location = url;
}

function initiate_search_within_journal(search_text,journal_id){
     if (search_text) {
	search_text = search_text.replace(/:/g, "|");
    }
    var url = "/search?action=search&query=content:" + search_text + ":and&limit=journal_id:" + journal_id + "&min=1&max=10&t=search_journal_header";
    this.location = url;
}

function initiate_search_within_book(search_text,book_id){
     if (search_text) {
	search_text = search_text.replace(/:/g, "|");
    }
    var url = "/search?action=search&query=content:" + search_text + ":and&limit=book_id:" + book_id + "&min=1&max=10&t=search_book_header";
    this.location = url;
}

function initiate_browse(){   
    var url = "/search?action=browse";
    this.location = url;
}

function save_content(the_content) {
    $.ajax({
            type: "GET",
            url: "/account/save/" + $(the_content).attr("id"),
            success: function(data){
                $(the_content).html("Saved to <a class='under' href='/account/saved_items'>MyMUSE library</a>");
                $(the_content).removeClass("save_content");
       
            },
    });
}

function un_save_content(the_content) {
     $.ajax({
            type: "GET",
            url: "/account/un_save/" + $(the_content).attr("id"),
            success: function(data){
            $(the_content).text("Save");
            $(the_content).removeClass("un_save_content");
            $(the_content).addClass("save_content");
        },
    });
}

function cite_content(the_content) {
    $.ajax({
            type: "GET",
            url: "/account/cite/" + $(the_content).attr("id"),
            success: function(data){
                $(the_content).html("<b>Cited</b>");
                $(the_content).removeClass("cite_content");
                $(the_content).addClass("un_cite_content");
            },
    });
}

function un_cite_content(the_content) {
     $.ajax({
            type: "GET",
            url: "/account/un_cite/" + $(the_content).attr("id"),
            success: function(data){
            $(the_content).text("Cite");
            $(the_content).removeClass("un_cite_content");
            $(the_content).addClass("cite_content");
        },
    });

}
function accept_cookie_acknowledgement(the_button){
     
     var cookie_acknowledgement_type = $("#cookie_acknowledgement_type").val() || "cookie_acknowledgement";
     
     if (cookie_acknowledgement_type == 'cookie_acknowledgement_logged_in') {
        alert("By accepting this acknowledgment, you will no longer be prompted while logged in.");
     }
     
     
     $.ajax({
            url: '/account/set_attribute_ajax/' + cookie_acknowledgement_type +  '/1',
            type: 'GET',
           
            success: function (result) {
                $("#cookies_msg").hide(200);
            }
        }); 
    
    

}



