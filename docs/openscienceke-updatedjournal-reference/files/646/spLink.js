function spLink(sys,lang,gen,esp,sub)
{ var url = "http://names.cria.org.br/index?lang="+lang+'&genus='+gen;
  if (esp != '') { url += '&species='+esp }
  if (sub != '') { url += '&subspecies='+sub }
  url += '&search_cria=true';
  url += '&search_others=true';

  spwin = window.open(url, "spwin", "toolbar=no," +
          "location=no," + "directories=no," + "status=no," +
          "menubar=no," + "scrollbars=yes," + "resizeable=yes," + 
          "dependent=yes");
  if (spwin != null)
  { if(spwin.opener == null) { spwin.opener=self } }
}

// for use by Marino

function spLink2(sys,lang,gen,esp,sub,par)
{ var url = "http://names.cria.org.br/index?lang="+lang+'&genus='+gen;
  if (esp != '') { url += '&species='+esp }
  if (sub != '') { url += '&subspecies='+sub }
  if (par != '') { url += par }

  spwin = window.open(url, "spwin", "toolbar=no," +
          "location=no," + "directories=no," + "status=no," +
          "menubar=no," + "scrollbars=yes," + "resizeable=yes," + 
          "dependent=yes");
  if (spwin != null)
  { if(spwin.opener == null) { spwin.opener=self } }
}
