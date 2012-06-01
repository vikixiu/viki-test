(function( $ ) {

/*
	NmZoom -- How to use:
	====== HTML =======
	<a href="{big img}" class="nm-zoom"><img src="{middle img}" alt width="400" /></a>
	<div id="nm-zoom-gallery">
		<a href="{big img}" rel="{middle img}"><img src="{small img}" alt width="50" /></a>
		<a href="{big img}" rel="{middle img}"><img src="{small img}" alt width="50" /></a>
		...
	</div>
	====== JS =======
	$(document).ready(function(){
		$('.nm-zoom').NmZoom();
	});
	====== CSS =======
	.nmzoom-close {width:30px;height:30px;float:right;cursor:pointer}
	.nmzoom-holder {display:none;position:absolute;left:0;top:0;z-index:9999; width:938px; height:570px; overflow:hidden; 
		border:1px solid #eee;cursor:pointer}
	.nmzoom-mask {display:none; position:absolute; left:0; top:0; width:100%; height:100%; text-align:center; line-height:100%; background:#000; 
		color:#fff; opacity:0.8; filter:alpha(opacity=80);}
	.nmzoom-wrapper{position:relative;z-index:98}
*/	

  $.fn.NmZoom = function (options) {
	var settings = $.extend( {
	  'closeClass' : 'nmzoom-close',
	  'holderClass' : 'nmzoom-holder',
	  'maskClass' : 'nmzoom-mask',
	  'wrapperClass' : 'nmzoom-wrapper',
	  'bigImg' : {'width' : 1200 , 'height' : 1600},
	  'gallery' : {'open':true, 'id' : 'nm-zoom-gallery', 'defaultActive':'0'}
    }, options);
	
        // IE6 background image flicker fix
		try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
		
        return this.each(function () {
			var $zoomTrigger = $(this);
			
			//init
			if ($zoomTrigger.parent().attr('id') != 'nm-zoom-wrapper') {
				$zoomTrigger.wrap('<div id="nm-zoom-wrapper" class="' + settings.wrapperClass + '"></div>')
			}
			
			var $zoomWrapper = $('#nm-zoom-wrapper').append('<div class="' + settings.holderClass + '"><div class="' + settings.closeClass + '">&#160;</div></div><div class="' + settings.maskClass + '">Loading...</div>');
			var $zoomHolder = $zoomTrigger.next('.' + settings.holderClass), 
				$zoomClose = $zoomHolder.children('.' + settings.closeClass),
				$zoomMask = $zoomHolder.next('.' + settings.maskClass);
			
			//begin
			if ( settings.gallery.open ){ 
				jQuery('#' + settings.gallery.id + ' a:eq(' + settings.gallery.defaultActive + ')').addClass('active');
				jQuery('#' + settings.gallery.id + ' a').bind('click',function(e){
					$zoomTrigger.attr('href',jQuery(this).attr('href'))
						.children('img').attr('src',jQuery(this).attr('rel'));
					jQuery('#' + settings.gallery.id + ' a').removeClass('active');	
					jQuery(this).addClass('active');	
					e.preventDefault();	
				});
			}
			
			$zoomTrigger.click(function(e){
				$zoomMask.show();
				$zoomHolder.css('background','url(' + $zoomTrigger.attr('href') + ') center center no-repeat').fadeIn(function(){
					$zoomMask.hide();
				});
				$zoomWrapper.css('z-index','9999');
				e.preventDefault();
			});
			$zoomHolder.bind({
				'mousemove':function(e){
					var mouseX = e.pageX - $zoomHolder.offset().left, mouseY = e.pageY - $zoomHolder.offset().top,
						zoomW = $zoomHolder.width(),zoomH = $zoomHolder.height(),
						bgX = mouseX * (zoomW - settings.bigImg.width)/zoomW, bgY = mouseY * (zoomH - settings.bigImg.height)/zoomH;
					$zoomHolder.css('background-position', bgX + 'px ' + bgY + 'px');
				},
				'mouseenter':function(){},
				'mouseleave':function(){}
				});
			$zoomClose.click(function(){
				$zoomHolder.fadeOut();
				$zoomWrapper.css('z-index','98');
			});	
			
        });       
    };

/*
	NmPopup -- How to use:
	====== JS =======
	$(document).ready(function(){
		jQuery('.nmpopup-showproductdetail').NmPopup({
			'relativeDiv'  : 'body',				  // jQuery selector string
			'position' : 'left top',                  // same syatx as CSS background-position
			'closeClass' : 'nmzoom-close',            // setting '' will popup without close button
			'popupID' : '',                           // jQuery selector string, *required
		});
	});
	====== CSS =======
	.nmzoom-close {width:30px;height:30px;cursor:pointer;position:absolute; top:0; right:0}
*/

	
	$.fn.NmPopup = function (options) {
		var settings = $.extend( {
		  'relativeDiv'  : 'body',
		  'position' : 'left top',
		  'closeClass' : 'nmzoom-close',
		  'popupID' : '', //required
		  'mask' : false
		}, options);
		
		if (settings.popupID){
		
			return this.each(function () {
				$(this).click(function(e){
					var $popupContainer = $(settings.relativeDiv).css('position','relative'),
						$popupInner = $(settings.popupID),
						$popupClose = null;
						
					if ($popupContainer.hasClass('nmpopup-init-done')){
						$popupInner.fadeIn();
					} else {
						
						if (settings.closeClass.length > 0)	{
							$popupInner.append('<div class="' + settings.closeClass + '">&#160;</div>');
							$popupClose = $popupInner.children('.' + settings.closeClass).click(function(e){
								$popupInner.fadeOut();
							});
						}
						
						var _position = settings.position.split(' '),
							_p = {left:'0',top:'0'};
						
						switch (_position[0]){
							case 'right':
								_p.left = $popupContainer.width() - $popupInner.width() + 'px'
								break
							case 'center':
								_p.left = ($popupContainer.width() - $popupInner.width())/2 + 'px'
								break
							default:
								_p.left = '0'
						}
						
						switch (_position[1]){
							case 'bottom':
								_p.top = $popupContainer.height() - $popupInner.height() + 'px'
								break
							case 'middle':
								_p.top = ($popupContainer.height() - $popupInner.height())/2 + 'px'
								break
							default:
								_p.top = '0'
						}
						
						$popupContainer.append($(settings.popupID).css({
							'position' : 'absolute',
							'z-index' : '9998', // lower than nm-zoom
							'top' : _p.top,
							'left' : _p.left
						}).fadeIn()).addClass('nmpopup-init-done');
						
					}
																
					e.preventDefault();
				}); // end click
			})
		
		}else{
			return false;
		}
		
		
	}
})( jQuery );
