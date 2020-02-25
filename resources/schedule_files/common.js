function allGallery(i) {
	$('#popup').fadeIn('slow');
	$('body').css('overflow', 'hidden');
	$('#popup .wrap_pop').show('fast', function(){
		// var pane = $('#PVthumbs.scroll-pane').data('jsp');
		// var activeWidth = $('#PVthumbs .selected img').outerWidth(true);
		// console.log(activeWidth, $('#PVthumbs img').index());
		$('#PVthumbs a.' + i).click();
	});

	$('#photoVew .total .all').text($('#PVthumbs li').length);

	$('#copyPVcontrols').remove();
	$('#PVcontrols').clone().prependTo('#popup').attr('id', 'copyPVcontrols');

	$('#copyPVcontrols a').click(function(event){
		event.preventDefault();
		var direction = $(this).attr('class');
		$('#PVcontrols a.' + $(this).attr('class')).stop().trigger('click');
	});
	share42Hover();
}


function slideNavScroll() {
	$('.photogalleryItem a').click(function(event){
		event.preventDefault();
		var link = $(this).attr('href');

		$('.wrapGallery').load(link + ' #popup #photoVew', function(){
			$('#PVthumbs').galleriffic({
				imageContainerSel: '#PVslideshow',
				controlsContainerSel: '#PVcontrols',
				loadingContainerSel: '#PVloading',
				numThumbs: 1000
			});
			$('#popup .close').prependTo('.wrapGallery');
			$('#popup').fadeIn('slow');
			$('#popup .wrap_pop').show();

			$('.wrapGallery .nav-controls a, .image-wrapper').click(function(){
				var i = $(this).parents('.wrapGallery').find('.thumbs li.selected');
				$(this).parents('.wrapGallery').find('ul.thumbs').scrollTop(i.index() * (i.outerHeight() + 20));
			});
		});
	});
}

// function hideMenuItem() {
// 	$('.hidemenu').removeAttr('href');
// }

function showMenu() {
	$('#showMenu').click(function(){
		$(this).toggleClass('active');
		$('#resourceMenu').slideToggle('slow');
	});

	$(document).on('click touchstart', function (e) {
	if ( $('.showMenu').has(e.target).length === 0 ){
		$('#resourceMenu').slideUp('slow');
		$('#showMenu').removeClass('active');
	}});
}


function footerMenu() {
	$('#footer .bottom_menu ul ul').map(function(){
		$(this).children('li:gt(7)').addClass('hidden');
	});
	$('#footer .bottom_menu ul ul:has(.hidden)').append('<li><a href="#" class="show">Раскрыть меню</a></li>');
	$('#footer .bottom_menu ul .show').click(function(event){
		event.preventDefault();
		$(this).closest('ul').find('.hidden').removeClass('hidden');
		$(this).hide();
	});
}

function leftMenuCorner() {
	$('#sideLeft .leftmenu li.active > a').append('<img src="/assets/template/img/lefMenuCorner.png" />');
}

function inputs() {
	$('input:radio, input:checkbox').map(function(){
		var type = $(this).attr('type');
		var id = $(this).attr('id') ? $(this).attr('id') : '';

		$(this).wrap('<span class="' + type + '" data-id="'+ id +'" />');

		if ( $(this).is(':checked') ) {
			$(this).closest('.' + type).addClass('checked');
			//$('input[name="text' + $(this).attr('id') + '"]').show();
		}
		$(this).change(function(){
			$('input:radio[name="' + $(this).attr('name') + '"]').parent().removeClass('checked');
			$(this).parent().toggleClass('checked');
		});
	});

	$('.allcheckboxes').click(function(){
		var name = $(this).attr('name');
		$('input:checkbox[name="' + name + '"]').prop('checked', true).parent().addClass('checked');
	});

	$('input[type="file"]').on('change', function(){
		var fileName = $(this).val().replace( "C:\\fakepath\\", '' );
		$(this).parent().find('.fileName').remove();
		$(this).parent().append('<i class="fileName" title="' + fileName + '">' + fileName + '</i>')
	});
}

function placeholders() {
	$('form.form p').click(function(){
		$(this).find('span.error').addClass('hide');
		$(this).find(':input').focus();
	}).parents('form').find('input[type="submit"]').click(function(){
		$(this).parents('form').find('span.error').removeClass('hide');
	});
	$('input[placeholder], textarea[placeholder]').placeholder();

	$('form.form p:has(label)').map(function(){
		var label = $(this).addClass('hideLabel').find('label');
		var input = $(this).find(':input');
		label.click(function(){
			$(this).parent('.hideLabel').find(input).focus();
		});
		input.val() != '' ? label.hide() : label.show();

		input.focusin(function(){
			label.hide();
		}).blur(function(){
			$(this).val() != '' ? label.hide() : label.show();
		});
	});

	$('input[type="file"]').on('change', function(){
		var fileName = $(this).val().replace( "C:\\fakepath\\", '' );
		$(this).parent().find('.fileName').remove();
		$(this).parent().append('<i class="fileName" title="' + fileName + '">' + fileName + '</i>')
	});
}

function validator() {
	if(typeof $.validator == 'undefined') return false;

	$.validator.addMethod(
        "nameval",
        function(value, element) {
            return this.optional(element) || /^[А-Яа-яЁёA-Za-z\s]{2,100}$/.test(value);
        },
        "В имени не допускаются цифры"
    );

	$('form.nolander').map(function(){
		$(this).validate({
			rules:{
                "name": {required:true, minlength:2, maxlength:40, nameval:true},
                "phone":{required:true, rangelength:[7, 18]},
                "email":{required:true, email:true}
            },
            messages: {
				email: "Введите корректный e-mail",
				phone: 'Допускаются только цифры'
			},
			errorElement: 'span'
		});
	});
}

function ScrollTop() {
	$(window).scroll(function(){
		if( $(window).scrollTop() < $(window).height() / 2 ) {
			$('#scroll_top').hide();
		}
		else {
			$('#scroll_top').show();
		}
	});

	$('#scroll_top').hide().click(function(){
		$('html, body').animate({scrollTop: 0}, 500);
	});
}

function ScrollTo(){
	$(document).on('click', '.scrollto', function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		var top = $(href).offset().top;
		$('html, body').animate({scrollTop: top}, 500);
	});
}

function showId() {
	$('.show_id').click(function(event){
		event.preventDefault();
		if( $(this).parent().hasClass('tabs') == true ) {
			$(this).parent().find('.show_id').removeClass('active').map(function(){
				var id = $(this).attr('href');
				$(id).hide();
			});
			$($(this).addClass('active').attr('href')).fadeIn('slow');
		}
		else {
			$($(this).addClass('active').attr('href')).fadeIn('slow');
		}
	});

	$('.tabs span').click(function(){
		var active = $('.tabs a.active');
		if( $(this).is('.next') ) {
			active.next('a').click();
		}
		else {
			active.prev('a').click();
		}
	});
}

function wrapSelect() {
	try{
		$('select:not(.customSel)').ikSelect({
			autoWidth: false,
			ddFullWidth: false,
			ddMaxHeight: 250,
			nothingFoundText: 'Не найдено',
			onShow: function(){
				$(this).addClass('opened');
			},
			onHide: function(){
				$(this).removeClass('opened');
			}
		});

		$(document).on('change', 'select:not(#region select)', function(){
			var url = $(this).find('option:selected').data('url');
			if( url ) {
	            var isBlank = url.slice(0, 3) == 'htt' && url.indexOf(location.host) == -1 ? 'self' : 'blank';
				window.open(url, isBlank);
			}
		});
	}
	catch(e){}
}

function fakeSelect() {
	$('.fakeSelect').click(function (){
		$(this).children('.innerlink').fadeIn();
	});

	$(document).bind('click touchstart', function(e) {
		if ($(e.target).closest('.fakeSelect').length == 0) {
			$('.innerlink').fadeOut();
		}
	});
}

function toggleId() {
	$('.toggle_id, .toggled').click(function(event){
		event.preventDefault();
		var link = $(this).attr('href') ? $(this).attr('href') : $(this).data('href');
		// var oldparent = $(this).parent('.toggleParent').parent().find('.toggleParent.active').removeClass('active');
		// var oldlink = oldparent.find('.toggle_id, .toggled').attr('href');
		// console.log(oldlink);
		$(this).toggleClass('open');
		$(link).slideToggle(500);
		//$(oldlink).slideUp(500);
		$(this).parent('.toggleParent').toggleClass('active');
	});
}

function toggleDescription() {
	$('.showDesc').hover(function(){
		$(this).toggleClass('opened').find('.description').stop(false, true).slideToggle('fast');
	});
}

function slideDown() {
	$('.slide_id').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('open');
		$(this).parent('.slideParent').toggleClass('active');
	});
}

function toggleAll() {
	$('.toggleAll').click(function(event){
		event.preventDefault();
		$(this).toggleClass('open');
		var blockClass = $($(this).attr('href')).find('a.toggle_id, a.toggled');

		if ( $(this).is('.open') ) {
			$(this).text('Скрыть все');
			blockClass.map(function(){
				$($(this).addClass('open').attr('href')).slideDown();
				$(this).parent('.toggleParent').addClass('active');
			});
		}
		else {
			$(this).text('Раскрыть все');
			blockClass.map(function(){
				$($(this).removeClass('open').attr('href')).slideUp('slow');
				$(this).parent('.toggleParent').removeClass('active');
			});
		}
	});
}

function fancy() {
	if(typeof $.fancybox == 'undefined') return false;
	$(".fancy").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		maxWidth: '70%',
		//maxHeight: '70%',
		helpers:  {
			media : {},
			overlay : {
				locked : false
			}
		},
		iframe : {
	        preload: false
	    },
		tpl : {
			next     : '<a class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
			closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>'
		}
	});
}

function fancybox_main() {
	if(typeof $.fancybox == 'undefined') return false;
	$('.fancybox_main').fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers:  {
			overlay : {
				locked : false
			}
		},
		tpl : {
			next     : '<a title="Следущая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
			closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>'
		}
	});
}


function oddClass() {
	$('.education .item:odd, .latest_post li:odd, .photogalleryItem.Grid:nth-child(3n), .honorItem:nth-child(3n)').addClass('odd').after('<span class="clear"></span>');
	$('#header .mainmenu li.level3 ul').map(function(){
		$(this).children('li:odd').addClass('odd').after('<span class="clear"></span>');
	});
}

function twoColumnPage() {
	$('body.twoColumn .column:odd, body.oneColumn .column:odd').appendTo('body.twoColumn #content > .right, body.oneColumn #content > .right');
	$('body.twoColumn .paging').appendTo('body.twoColumn #content');
}

function togglePopup() {
	$('.showPop').click(function(event){
		event.preventDefault();
		var block_id = $(this).attr('href');
		$(block_id).show();
		$('#popup').fadeIn('slow');
		$('body').css('overflow', 'hidden');
	});

	$('#popup .close').click(function(event){
		event.preventDefault();
		$('#popup').fadeOut('slow', function(){
			$('#popup .wrap_pop').hide();
		});
		$('body').css('overflow', 'auto');
	});

	$('#popup').click(function (e) {
		if ( $('#popup').has(e.target).length === 0 ){
			$('#popup').fadeOut('slow').find('.wrap_pop').hide();
			$('body').css('overflow', 'auto');
		}});
}

function fixForm() {
	var summHeight = $('#fixForm').outerHeight(true) + $('#fixForm').position().top;
	if ( $(window).height() < summHeight ) {
		$('#fixForm').css({
			'top': 'auto',
			'bottom': 0
		});
	}

	$(document).on('click', '.fixBtn', function(){
		$('#fixForm').fadeIn('slow');
	});
	$('#fixForm .close').click(function(){
		$('#fixForm').fadeOut('slow');
	});
}

function eventCalendar() {
	$('#Calendar .noevent a').click(function(event){
		event.preventDefault();
	});
}

function bug_report_init() {
	$(document).keypress(function(e) {
		if((e.keyCode == 13 || e.keyCode == 10) && e.ctrlKey == true) {
			if ( $('#bugReport').is(':hidden') || $('#bugReport #bug').val() == '' ) {
				$('#bugReport #bug').parent('p.hideLabel').find('label, span.error').hide();
				$('#bugReport #bug').val($.selection().get().text);
				$('#bugReport').fadeIn('slow');
			}
			else {
				$('#bugReport form').submit();
			}
			$('#bugReport').css('top', $(window).scrollTop() + 'px');
		}
	});
	$('#bugReport input[type="reset"]').click(function(e){
		e.preventDefault();
		$('#bugReport .hideLabel :input').val('');
		$('#bugReport .hideLabel :input').parent('p.hideLabel').find('label').show();
	});
	$(window).load(function(){
		$('#bugReport').css('top', $(window).scrollTop() + 'px');
	});
}

function callMe(){
	$('.showForm').on('click', function(event){
		event.preventDefault();
		var block_id = $(this).attr('href');
		$(block_id).fadeIn();

		$(block_id + ' .close').on('click', function(){
			$(block_id).fadeOut();
		});

		$(block_id).click(function (e) {
			if ( $(this).has(e.target).length === 0 ){
				$(this).fadeOut();
			}
		});
	});
}

function share42Hover() {
	$('#share42 a').hover(
		function(){
			var pX = $(this).css('background-position').split(' ')[0];
			$(this).css('background-position', pX + ' 100%');
		},
		function(){
			var pX = $(this).css('background-position').split(' ')[0];
			$(this).css('background-position', pX + ' 0');
		}
		);
}

function datePick() {
	if(typeof $.datepicker == 'undefined') return false;
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	$('.datePick').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'd MM yy'
	});
}


function LPLeftMenu() {
	$('.landpage #sideLeft .leftmenu a').click(function(event){
		event.preventDefault();
		$('.landpage #sideLeft .leftmenu a').removeClass('active').find('img').remove();
		$(this).append('<img src="/assets/template/img/lefMenuCorner.png" />').addClass('active');
		var link = $(this).attr('href');
		var top = $(link).offset().top;
		$('html, body').animate({
			scrollTop: top
		}, 'slow');
	});



	if ( $('body').is('.landpage') ) {
		var sidePos = $('#sideLeft').offset().top;
		$( window ).scroll(function(){
			if ( $( window ).scrollTop() >= sidePos ) {
				$('.landpage #sideLeft').addClass('fixed');
			}
			else {
				$('.landpage #sideLeft').removeClass('fixed');
			}

			$('.landpage .point').map(function(){
				if ( $(this).offset().top == $( window ).scrollTop() ) {
					var point = $(this).attr('id');
					$('#sideLeft a[href="' + point + '"]').trigger('click');
				}
			});
		});
	}
}

function targetLink() {
	$("a[href^='http']").map(function() {
		if($(this).attr('href').indexOf(location.host) == -1) {
			$(this).attr('target', '_blank');
		}
	});
}

function hiddenForm() {
	$('.showForm').on('click', function(event){
		event.preventDefault();
		var block_id = $(this).attr('href');
		$(block_id).fadeIn();
		$('body').addClass('ovrflhdn');

		$(block_id + ' .close').on('click', function(){
			$(block_id).fadeOut();
			$('body').removeClass('ovrflhdn');
		});

		$(block_id).click(function (e) {
			if ( $(this).has(e.target).length === 0 ){
				$(this).fadeOut();
				$('body').removeClass('ovrflhdn');
			}
		});
	});

	$('div.hiddenForm').find('.close').on('click', function(){
		$('div.hiddenForm').fadeOut();
		$('body').removeClass('ovrflhdn');
	});
	$(document).on('click', 'div.hiddenForm', function (e) {
		if ( $(this).has(e.target).length === 0 ){
			$(this).fadeOut();
			$('body').removeClass('ovrflhdn');
			$('#orphusFormWrap input[type="button"]').click();
		}
	});
}

function tabs(){
	$('.tabs').each(function(){
		var $tabs = $(this);
		$tabs.find('.tab').on('click', function(e){
			e.preventDefault();
			if( $(this).not('.active') ) {
				var block = $(this).attr('href');
				$tabs.find('.tab.active').toggleClass('active');
				$(this).toggleClass('active');

				$tabs.find('div.tab-content div.item.active').toggleClass('active hide_');
				$(block).toggleClass('active hide_');
			}
		});
	});
}

function runSlider(){
	$('.runslider').each(function(){
		var $this = $(this);
		var param = {
			minSlides: $this.data('minslides') ? $this.data('minslides') : 1,
			maxSlides: $this.data('maxslides') ? $this.data('maxslides') : 1,
			moveSlides: $this.data('moveslides') ? $this.data('moveslides') : 0,
			slideWidth: $this.data('slidewidth') ? $this.data('slidewidth') : 'auto',
			slideMargin: $this.data('slidemargin') ? $this.data('slidemargin') : 0,
			hideControlOnEnd: $this.data('hidecontrolonend') ? $this.data('hidecontrolonend') : false,
			infiniteLoop: $this.data('infiniteloop') ? $this.data('infiniteloop') : false,
			pager: $this.data('pager') ? $this.data('pager') : false,
			controls: $this.data('controls') ? $this.data('controls') : true
		}
		//console.log(param);

		$this.bxSlider(param);
	});
}


$(document).on('click', '.social_share', function(){
  Share.go(this);
});

function setNofollowLinks(){

	$('span[data-nofollow-href]').each(function(){

		var dataHref = $(this).data('nofollow-href');

		if(dataHref){

			$(this).attr('href', dataHref);

			var attrs = this.attributes;

			var html = $(this).html();

			var str = '<a ';

			for (var i = 0; i < attrs.length; i++) {

	            str += attrs[i].name + ' = "' + attrs[i].value + '" ';

	        }

	        str += '>'+html+'</a>';

	        $(this).replaceWith(str);

		}

	});

}


function fixedMainMenuOnScroll(){
	var w = window,
			h = $('#header').outerHeight(),
			menu = $('div.menuHeader');
	if( w.innerWidth > 992 ) {
		window.onscroll = function() {
		  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		  if(scrolled >= h) {
		  	menu.addClass('fixed');
		  } else {
		  	menu.removeClass('fixed');
		  }
		}
	}
}


function changeBottomBtnsText() {
	$(document).ready(function(){
		if( !$('.lander-widget-bottom-buttons__entrance').length || $('html').attr('lang') === 'en' ) return;
		$('.lander-widget-bottom-buttons__entrance span').html('Поступить');
	});
}


$(document).ready(function(){
	inputs();
	showMenu();
	fixedMainMenuOnScroll();
	ScrollTop();
	ScrollTo();
	showId(); // tabs
	toggleId(); // toggle id after click on .toggle_id
	slideDown();
	oddClass(); // odd elements add class .odd
	toggleDescription(); // toggle .description after hover on .showDesc
	toggleAll();
	wrapSelect();
	fakeSelect(); // blocks as select
	fancy();
	fancybox_main();
	twoColumnPage();
	leftMenuCorner();
	//hideMenuItem();
	//callMe();
	share42Hover();
	datePick();
	tabs();
	runSlider();
	togglePopup();
	eventCalendar();
	bug_report_init();
	hiddenForm();
	targetLink();
	validator();
	setNofollowLinks();

	changeBottomBtnsText();

	$('#fixForm, #bugReport, #callMe, .hiddenForm').has('.success, .error').show();

	/* Current Year */
	$('#footer .copyright #curY').text((new Date).getFullYear());

	$(document).on('click', function (e) {
		if ( $('.closeThis').is(':visible') && $('.closeOnOuterClick').has(e.target).length === 0 ){
			$('.closeThis').stop().fadeOut('slow');
			$('body').removeClass('ovrflhdn');
		}
	});
});

$(window).load(function(){
	wrapSelect();
})