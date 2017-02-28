

$(function() {
  console.log('document ready');
  $('#cto-qry').on('submit',function(event)
          {
    event.preventDefault();//impide al formulario comportamiento por defecto
    
    var cto = $('input').val();
    $.post('/dreams?' + $.param({dream: cto}), function(data)
           {
      $('#cto-list').text("");
      data.forEach(function(element) {
      $('<li>').text(element).appendTo('ul#cto-list');
      $('input').val('');
      $('input').focus();
                                            });
          });
      });
  
});
