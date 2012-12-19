$.fn.customSelect = function() {
  // define defaults and override with options, if available
  // by extending the default settings, we don't modify the argument
  
 
 return this.each(function() {  
 obj = $(this); 
thisTitle = this.title;
  thisIconhtml = "";
  thisValue = "";
  thisIconHtml ="";
  thisSelectedId="";
$('option:selected').each(function(i){
						  
			thisselection = $(this).html();
			thisValue = this.value;
			thisName = this.name;
			thisTitle = $(this).html();
			thisIcon = this.title;
			thisIconHtml = "<img src=\"" + thisIcon + "\">";
			thisSelectedId = this.id;
});
obj.after("<div id=\"selectoptions\"> </div>");
obj.find('option').each(function(i){ 
					 
								
  $("#selectoptions").append("<div id=\"" + $(this).attr("value") + "\" class=\"selectitems\"><img src=\"" + this.title + "\" /><span>" + $(this).html() + "</span></div>");

	
});
alert(thisTitle);


alert(thisTitle);
obj.before("<input type=\"hidden\" value =\"" + thisValue + "\" name=\"" + this.name + "\" class=\"customselect\"/><div id=\"iconselect\">" + thisIconHtml + thisTitle +"</div><div id=\"iconselectholder\"> </div>")
.remove();	
$('#'+thisSelectedId).addClass("selectedclass");
$("#iconselect").click(function(){
$("#iconselectholder").toggle("slow");});
	$("#iconselectholder").append( $("#selectoptions")[0] );
$(".selectitems").mouseover(function(){
	$(this).addClass("hoverclass");
});
	$(".selectitems").mouseout(function(){
	$(this).removeClass("hoverclass");
	});
	$(".selectitems").click(function(){
	$(".selectedclass").removeClass("selectedclass");
	$(this).addClass("selectedclass");
	var thisselection = $(this).html();
$(".customselect").val(this.id);
	$("#iconselect").html(thisselection);
	$("#iconselectholder").toggle("slow")
	});
    });  
  // do the rest of the plugin, using url and settings
}
