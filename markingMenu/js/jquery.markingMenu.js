jQuery.fn.atMouse = function(e, options) {
	var options = $.extend({
        top: 0,
        left: 0
    }, options || {});
	
	this.css({
		'position' : 'absolute',
		'top' : e.pageY + options.top,
		'left' : e.pageX + options.left
	});
    return this;
};

$.fn.markingMenu = function(options){
	var config = $.extend(true,{
		'ctrlKey':true,
		'items' : [
			// {'position':'north','text':'north','class':'','command':false},
			// {'position':'northwest','text':'northwest','class':'','command':false},
			// {'position':'northeast','text':'northeast','class':'','command':false},
			// {'position':'east','text':'east','class':'','command':false},
			// {'position':'south','text':'south','class':'','command':false},
			// {'position':'southwest','text':'southwest','class':'','command':false},
			// {'position':'southeast','text':'southeast','class':'','command':false},
			// {'position':'west','text':'west','class':'','command':false},
		]
		
    }, options || {});

	// create the marking menu if necessary
	var $markingMenuCanvas = $('#markingMenuCanvas');
	if(!$markingMenuCanvas.length){
		$markingMenuCanvas = $('<canvas id="markingMenuCanvas" width="800" height="800"></canvas>')
		$(document.body).append($markingMenuCanvas);
	}

	// create the divs for each region
	var $markingMenuDiv = $('#markingMenuDiv');
	if(!$markingMenuDiv.length){
		_generateMarkingMenuDivs(config);
	}
	$markingMenuDiv.hide()
	
	var ctx = $markingMenuCanvas.get(0).getContext('2d');
	var width = $markingMenuCanvas.width();
	var middle = $markingMenuCanvas.width()/2;
	var divMiddle = $markingMenuDiv.width()/2;
	var active = 0;
	var startX = 0; 
	var startY = 0; 

	var $north = $markingMenuDiv.find('#north');
	var $northwest = $markingMenuDiv.find('#northwest');
	var $northeast = $markingMenuDiv.find('#northeast');
	var $south = $markingMenuDiv.find('#south');
	var $southeast = $markingMenuDiv.find('#southeast');
	var $southwest = $markingMenuDiv.find('#southwest');
	var $east = $markingMenuDiv.find('#east');
	var $west = $markingMenuDiv.find('#west');
	var $allMarkingMenuHotSpots = $markingMenuDiv.find('div');

	$(this)
		.mousedown(function(e){
			if(e.ctrlKey == config.ctrlKey){
				$markingMenuCanvas.atMouse(e,{top:-middle,left:-middle});
				$markingMenuDiv
					.show()
					.atMouse(e,{top:-divMiddle-10,left:-divMiddle});
				startX = e.pageX;
				startY = e.pageY;
				active = 1;
				e.preventDefault();
			}
		});
		
	$markingMenuCanvas
		.mousemove(function(e){
			if(active){
				var deltaX = (e.pageX-startX);
				var deltaY= (e.pageY-startY);

				$allMarkingMenuHotSpots.removeClass('hot');

				ctx.clearRect(0,0,width,width);
				ctx.beginPath();
				ctx.moveTo(middle,middle);
				ctx.lineTo(middle + deltaX,middle + deltaY);
				ctx.stroke();

				// calculate the length and if very short, don't do anything
				if((Math.abs(deltaX) + Math.abs(deltaY)) < 32)
					return true;
				
				//calculate the angle
				var angle = Math.round(Math.atan2(deltaX,deltaY)*180/Math.PI*100)/100;
				if(angle>=-22.5&&angle<22.5){
					$south.addClass('hot');
				}else if(angle<=-22.5&&angle>-67.5){
					$southwest.addClass('hot');
				}else if(angle<=-67.5&&angle>-112.5){
					$west.addClass('hot');
				}else if(angle<=-112.5&&angle>-147.5){
					$northwest.addClass('hot');
				}else if(angle<=167.5&&angle>112.5){
					$northeast.addClass('hot');
				}else if(angle>=67.5&&angle<112.5){
					$east.addClass('hot');
				}else if(angle<=67.5&&angle>22.5){
					$southeast.addClass('hot');
				}else{
					$north.addClass('hot');
				};
			}
			
		})
		.mouseup(function(e){
			_fire();
		});
	
	function _fire(){
		console.log(active,$markingMenuCanvas,'aa');
		active = 0;
		$markingMenuCanvas.css({'top':-2000}); // hide markingMenuCanvas and Div
		$markingMenuDiv.css({'top':-2000});
		ctx.clearRect(0,0,width,width);
		$markingMenuDiv.find('.hot').removeClass('hot').click();
	}

	function _generateMarkingMenuDivs(config){
		$markingMenuDiv = $('<div id="markingMenuDiv"></div>');
		$.each(config.items,function(){
			var data = $.extend({'position':'north','text':'north','class':'','command':false},this,{});
			var $div = $('<div id="'+data.position+'" class="'+data.class+'">'+data.text+'</div>')
			if(this.command){
				$div.click(this.command);
			}
			$markingMenuDiv.append($div);
		})
		$(document.body).append($markingMenuDiv);
	}
}