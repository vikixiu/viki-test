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