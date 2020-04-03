$(document).ready(function(){
	/* dialog voor het fout bij het selecteren van een report jaar*/
	$("#dialog_createreporterror").dialog({
		autoOpen: false,
		width: 830,
		modal: true,
		resizable: false
	});

	$("#create_report").click(function () {
		if ($('#first option:selected').val() <= $('#last option:selected').val() ){
			/* meeste overzichten vragen query op A200 */
			/* We willen dat // geinterpreteerd wordt als t/m i.p.v. als tot; daarom 1 optellen bij last option:selected */
			var endYear =  Number($('#last option:selected').val()) + 1;
			$('#A200').val($('#first option:selected').val()+'//'+endYear);
			/* SEP en VSNU rapporten verwachten apart start en eind jaar in wq_inf parameters */
			$('#start').val($('#first option:selected').val());
			$('#end').val($('#last option:selected').val());
			$('#query').submit();
		} else {
			$("#dialog_createreporterror").dialog('open', 'modal', true, 'width', 600, 'resizable', false);
		}
	
	});
	
	$("#download_pdf").click(function () {
	    window.open('/careerpolicy/careerpolicy2pdf?A114='+ $('#A114').val() + '&startjaar=' + $('#start').val() + '&eindjaar=' + $('#end').val() + '&rapportage=' + $('#rapportage').val());
	});
	
	$("#advancedsearch").click(function () {
		$('#ssearchbox').attr('style', 'display:block');
		$('#asearchbox').attr('style', 'display:none');
	});

	$("#simplesearch").click(function () {
		$('#ssearchbox').attr('style', 'display:none');
		$('#asearchbox').attr('style', 'display:block');
	});
	
	$("#create_export").click(function () {
		var option_selected = $('#format option:selected').val();
		
		/*	N.a.v. case 11701
			In het geval van woslist wordt niet default waarde 'listprint' (gekoppeld aan Printer friendly) genomen,
			maar 'woslistprint' gebruikt, omdat anders de WoS gegevens niet meekomen
		*/
		if (wq_sfx == 'woslist' && option_selected == 'listprint') {
			window.open(wqpath + '/' + wqservice + '/' + 'woslistprint' + $('#qry').val());
		} else if (wq_sfx == 'woslist' && option_selected == 'list.csv') {
			window.open(wqpath + '/' + wqservice + '/' + 'woslist.csv' + $('#qry').val());
		} else {
			window.open(wqpath + '/' + wqservice + '/' + option_selected + $('#qry').val());
		}
	});

	/**
	 * TBV button clear in het advanced form. Dit is een input ipv een A-tag omdat de opmaak dan consistent is met de andere buttons
	 */
	$(document).ready(function() {
		$("[data-role='clearbutton']").on("click", function() {
			document.location.href=$(this).attr("data-href");
		});
	});
});

