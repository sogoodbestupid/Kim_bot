$(function() {
	/* Виджет кнопки звонка для мобильных устройств #84456 */
	if ( $('#call-button').length ) return;

	if ( (location.href.indexOf('/lp/dubai-short/')!==-1 || location.href.indexOf('/lp/cis/')!==-1 || location.href.indexOf('/lp/sic/')!==-1 || location.href.indexOf('/lp/mba/mba-women-leadership/')!==-1 || location.href.indexOf('/lp/mba/strategiya-liderstva-dubai/')!==-1) ) return;

	$('head').append('<style>#call-button {background: url("//synergy.ru/img/icon-phone.png") no-repeat scroll center top / 55px auto; border: medium none; bottom: 68px; color: transparent !important; cursor: pointer; display: none; height: 55px; left: 0; margin: auto; position: fixed; right: 0; padding: 0; width: 55px; opacity: 0.8; z-index: 99999;} @media (max-width: 640px) {#call-button {display: inline; } }</style>');
	// Старый телефон $('body').append('<a href="tel:+74958001001" id="call-button">+7 (495) 800 10 01</a>');
  // Новый телефон https://sd.synergy.ru/Task/View/98776
  $('body').append('<a href="tel:88001000053 " id="call-button">8 (800) 100-00-53</a>');

  //Растяжка "Поступить" https://sd.synergy.ru/Task/View/96361
  $( 'head' ).append( '<link rel="stylesheet" href="//synergy.ru/lp/_chunk/form_popup/entrance.css">' );

  var action = $(document).find('form:not(.app-callme, .nolander, .selection-programs form, #callme):first').attr('action');

  function setAttr(url, prmName, val){
		var res = '',
		d = url.split("#")[0].split("?"),
		base = d[0],
		query = d[1];
		if(query) {
			var params = query.split("&");
			for(var i = 0; i < params.length; i++) {
				var keyval = params[i].split("=");
				if(keyval[0] != prmName) {
					res += params[i] + '&';
				}
			}
		}
		res += prmName + '=' + val;
		url = base + '?' + res;
		return url;
	}

  $( 'body' ).append( '<div id="entrance-mobile"><a href="#entrance-popup" class="entrance-button">Поступить</a>	<div id="entrance-popup" class="post-popup">	<form class="entrance-form" action="" method="POST"><span class="come-back" href="">Вернуться</span><p class="entranceform-p">Подобрать программу<br> и поступить</p><input type="text" name="phone" placeholder="Телефон" class="entrance-form-input" required><input type="submit" value="отправить" class="entrance-form-submit"></form></div></div>' );



  LanderJS.form();

  $( '#entrance-popup .entrance-form' ).attr( 'action', setAttr(action,'form','modal-up--callme-mobile') );
  $('a.entrance-button').click(function(e) {
  	e.preventDefault();
    $('#entrance-popup').addClass('popup-enabled');
  })
  $('.come-back').click(function() {
    $('#entrance-popup').removeClass('popup-enabled');
  })
});
