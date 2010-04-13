/*
	atMouse - helperLibrary to position an object
	
	USAGE:
	$(elementID).atMouse(clickEvent,{})
	
*/
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



/*
	CONTEXT MENU - works with the selection tool
	
	USAGE:
	
	$('#elementID').contextMenu(menuID,{
		targetWindow : "nameOFParentElement" 	// in which to click to hide the menu
	})
*/
jQuery.contextMenuClass = {
	build : function (menuID,settings){
		var options = $.extend({
			targetWindow: '#mainContainer',
			top: 0,
	        left: 0
	    }, options || {});
		

		$(this).bind('contextmenu',function(e){
			$("#" + menuID).addClass('contextMenuContainer').atMouse(e,options).show();
			jQuery.selector.drag=0;
			return false;
		});
		
		// hide menu when clickin on an element
		$("#"+ menuID + " li").addClass('contextMenuItem').unbind('mouseup',jQuery.contextMenuClass.itemClicked).mouseup(jQuery.contextMenuClass.itemClicked);
		$(options.targetWindow).unbind('mousedown',jQuery.contextMenuClass.hideMenu).mousedown(jQuery.contextMenuClass.hideMenu);
	},
	
	itemClicked: function(e){
		e.stopPropagation();
		$('.contextMenuContainer').hide();
		jQuery.selector.drag=0;
	},
	
	hideMenu : function (e){
		if(!jQuery.className.has(e.target,'contextMenuItem')){
			e.stopPropagation();
			$('.contextMenuContainer').hide();
		}
	}

};
jQuery.fn.rightMenu = jQuery.contextMenuClass.build;