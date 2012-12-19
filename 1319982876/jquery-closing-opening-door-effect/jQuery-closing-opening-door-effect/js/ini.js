$(function(){
for(i = 1; i < 5;i++)
{
var img = new Image();
img.src = "images/images/d_left_"+i+".png";
$(img).load();
}
var i = -1;
var no = 0;
$("div.image").click(function(){
var Obj = $(this);
no++;
if(no > 4)
no = 1;

// viewport structure
Obj.wrap("<div id='viewport'></div>");
Obj.css({left: 0+"px"});
$("#viewport").css("overflow","hidden");
$("#viewport").width(Obj.width());
$("#viewport").height(Obj.height());	
$("#viewport").css("left","27%");
$("#viewport").css("position","absolute");
// left door structure
$("#viewport").append("<div class='GrpEffectDiv' id='doorLeft'/>");
			$("#doorLeft").css("position", "absolute");
			$("#doorLeft").css("background", "#000 url('images/images/d_left_"+no+".png')");
			$("#doorLeft").width(Obj.width()/2);
			$("#doorLeft").height(Obj.height());	
			$("#doorLeft").css("left", "-"+300+"px");
			
//right door structure
$("#viewport").append("<div class='GrpEffectDiv' id='doorRight'/>");
			$("#doorRight").css("position", "absolute");
			$("#doorRight").css("background", "#000 url('images/images/d_right_"+no+".png')");
			$("#doorRight").width(Obj.width()/2);
			$("#doorRight").height(Obj.height());	
			$("#doorRight").css("left", 600+"px");
			
	// left door animation			
	$("#doorLeft")
	.animate({left: 0+"px"},1000, 
	function(){
	Obj.css("z-index", i);
	$(this).remove();
	});
	
	//right door animation
	$("#doorRight")
	.animate({left: 300+"px"},1000, 
	function(){
	$(this).remove();
	Obj.css({left: "27%"});
	$("#viewport").replaceWith(Obj);
	});
	i--;
	});
})
