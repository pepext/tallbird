

$(function() {
  console.log('document ready');
  $('#cto-qry').on('submit',function(event)
          {
    event.preventDefault();//impide al formulario comportamiento por defecto
    var cto = $('input').val();
    $.post('/dreams?' + $.param({dream: cto}), function(data)
           {
      //$('<li>').text(dream).appendTo('ul#cto-list');
      console.log(data);
      $('input').val('');
      $('input').focus();
    });
  });
});
