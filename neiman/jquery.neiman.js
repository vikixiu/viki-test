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

*/	

  $.fn.NmZoom = function (options) {
	var settings = $.extend( {
      'closeStyle'  : 'width:30px;height:30px;float:right;background:#000;cursor:pointer',
      'holderStyle' : 'display:none;position:absolute;left:0;top:0;z-index:9999;width:938px;height:570px; overflow:hidden;border:1px solid #eee;cursor:pointer',
	  'wrapperStyle': 'position:relative;z-index:98',
	  'bigImg' : {'width' : 1200 , 'height' : 1600},
	  'gallery' : {'open':true, 'id' : 'nm-zoom-gallery'}
    }, options);
	
        // IE6 background image flicker fix
		try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
		
        return this.each(function () {
			var $zoomTrigger = $(this);
			
			//init
			if ($zoomTrigger.parent().attr('id') != 'nm-zoom-wrapper') {
				$zoomTrigger.wrap('<div id="nm-zoom-wrapper" style="' + settings.wrapperStyle + '"></div>')
			}
			
			var $zoomWrapper = $('#nm-zoom-wrapper').append('<div class="nm-zoom-holder" style="' + settings.holderStyle + '"><div class="nm-zoom-close" style="' + settings.closeStyle + '">&#160;</div></div>');
			var $zoomHolder = $zoomTrigger.next('.nm-zoom-holder'), 
				$zoomClose = $zoomHolder.children('.nm-zoom-close');
			
			//begin
			if ( settings.gallery.open ){ 
				jQuery('#' + settings.gallery.id + ' a').bind('click',function(e){
					$zoomTrigger.attr('href',jQuery(this).attr('href'))
						.children('img').attr('src',jQuery(this).attr('rel'));
					e.preventDefault();	
				});
			}
			
			$zoomTrigger.click(function(e){
				$zoomHolder.show().css('background','url(' + $zoomTrigger.attr('href') + ') center center no-repeat');
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
	
	
})( jQuery );
