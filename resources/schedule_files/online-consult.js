window.onload = function() {
  initToggleOnlineConsult();
}


function initToggleOnlineConsult(){
  if( 
    !$('div.online-consult__open').length ||
    !$('div.online-consult__outer').length ||
    !$('#online-consult').length
  ) return;
  
  initKviz();
  
  if(window.matchMedia('(min-width: 992px)').matches){
    $('#online-consult').show();
  }
  setTimeout(initOnlineConsult, 16000);
  
  $('.js-online-consult__toggle').on('click', function(){
    $('div.online-consult__open, div.online-consult__outer').toggle();
  });
  
  $(document).on('click', function (e) {
    if ($('#online-consult, .fancybox-privacy, .fancybox-close').has(e.target).length === 0){
        $('div.online-consult__open').show();
        $('div.online-consult__outer').hide();
    }
  });
}


function initOnlineConsult(){
  $('div.online-consult__open').removeClass('online-consult__open_txt-visible');
}
