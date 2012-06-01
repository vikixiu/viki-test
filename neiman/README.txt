1. NmZoom
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

2. Nmpopup -- inline popup

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