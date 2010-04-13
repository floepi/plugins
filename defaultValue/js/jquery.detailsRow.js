/************************************************
 *           JQuery Detailsrow
 *           Author: Philip Floetotto
 *           Version: 1
 *           www: www.webworkflow.co.uk
 *           
 *           Please feel free to use, alter and distribute
 *           
 *           Usage:
 *           
 *           $('#TABLEID').detailsRow("url", {options})
 *           
 *           
 *           Options
 *           headerIndicator - 
 *           indicatorClosed - html for the closed icon ( You can use any html in here)
 *           indicatorOpen - html for the open icon ( You can use any html in here)
 *           indicatorClass - which class the td with the indicator gets
 *           data - the data which gets passed in the post. (e.g {"id":"id"}) - means it passes the id of the TR element in post variables named "id"
 *           tdAttributes - using the jQuery syntax you can pass any attributes to the td e.g {colspan:"20",'class':'container'}
 *           trAttributes - using the jQuery syntax you can pass any attributes to the td e.g {'class':"detailsRow"}
 *           onLoad - event gets fired when ajax load is finished, passes the td element with the content
 *           onHide - event when row is being hidden, passes the td element with the content
 *           
 ************************************************/
	
$.fn.detailsRow = function(url,options){
	
	var defaultSettings = {
		headerIndicator:"+/-",
		indicatorClosed:"+",
		indicatorOpen:"-",
		indicatorClass:"plus",
		loadingclass: "loading",
		data: {},
		tdAttributes: {"colspan":20,"class":"container"},
		trAttributes: {
			'class':'detailsRow'
		},
		onLoad: false,
		onHide: false
	};
	settings = $.extend({},defaultSettings,options);
	var selectedElement = this;
	
	// alter the DOM
	var $headerIndicator = $("<th class='"+settings.indicatorClass+"' title='show/hide all'>"+settings.headerIndicator+"</th>").click(_toggleAll);
	$('thead tr',this).prepend($headerIndicator);
	$('tbody tr',this).prepend($("<td class='"+settings.indicatorClass+"'>"+settings.indicatorClosed+"</td>"));

	// create the details row on click
	$('td.'+settings.indicatorClass,this).unbind('dblclick').click(function(e){
		
		// check if the detailsRow already exists
		$parentRow = $(this).parent(); 
		var state = $(this).attr("state");
		var data = {};
		
		if(state=='closed'){
			$parentRow.next().show();
			$(this)
				.attr('state','open')
				.html(settings.indicatorOpen);
			if(settings.onHide){settings.onHide(this);}
		
		}else if(state=='open'){
			$parentRow.next().hide();
			$(this)
				.attr('state','closed')
				.html(settings.indicatorClosed);
			
		}else{
			$(this)
				.attr('state','open')
				.html(settings.indicatorOpen);

			// retrieve dynamic data to be passed to the post variables
			if(settings.data!=null){
				for(prop in settings.data)
				{
					data[prop] = $parentRow.attr(settings.data[prop]);
				}
			}
			
			// check if the TR element has an url attribute and use that instead
			var tempUrl = '';
			if($parentRow.attr('url')){
				tempUrl = $parentRow.attr('url');
			}else{
				tempUrl = url;
			}
			
			// load the data
			$tr = $("<tr>").attr(settings.trAttributes);
			$td = $("<td>").attr(settings.tdAttributes).load(tempUrl,data,settings.onLoad);
			$parentRow.after($tr.append($td));
		}
	});
	
	function _toggleAll(){
		$('td.'+settings.indicatorClass,selectedElement).click();
	};
	
}