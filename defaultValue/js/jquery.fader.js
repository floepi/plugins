(function($){
	$.fn.defaultInputText = function(which,options){
		options = $.extend({
			cssClass:'gray',
			object:this.get(0)
		}, options || {});
		
		
		// register events
		$(this).focus(_onFocus).blur(_onBlur);
		
		// add clear to form
		$(this).parents('form:first').submit(_clearFromForm);
		
		if($(this).get(0).value.length == 0){
			$(this).addClass(options.cssClass).val(which);
		}
				
		function _onFocus(){
			if(this.value==which){
				$(this).removeClass(options.cssClass).val('');
			}
		};
		
		function _onBlur(){
			 if(this.value==which || this.value.length == 0){
				$(this).addClass(options.cssClass).val(which);
			}
		};
		
		function _clearFromForm(){
			if(options.object.value==which){
				options.object.value='';
			}
		}
		
	};
})(jQuery);