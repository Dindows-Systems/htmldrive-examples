var setTabIndex = function(){
		$(".ColorSelected").removeClass("ColorSelected");
		$(".TWICS").eq(parseInt($(".TWITab").tabSwitch('index'))).addClass("ColorSelected");
}
var startAutoSwitch = function(){
	//Let the tab auto toggle
	$(".TWITab").tabSwitch('toggleAuto',{interval: 2000},function(){
		//Change the index number everytime it step
		setTabIndex();
	});
}
$(function(){
	$(".TWITab").tabSwitch('create',{type:"scroll", height: 133, width: 322});
	//Start Create Tab when user click on the option
	$(".typeButton").click(function(){
		//For reference when get inside the animation
		var Obj=$(this);
		//Grey out the example form
		$("#HeadTitle").animate({"opacity":"0.3"},500, function(){
			//Destroy the tab first
			$(".TWITab").tabSwitch('destroy');
			//Turn the auto image off
			$("#tabSwitchAutoToggle").attr("src","assets/images/autobaron.jpg");
			//See what type of option user choose
			switch(Obj.attr("rel")){
				case "toggle":
					$("#tabSwitchToggleTypes").slideDown(200);
				default:
					$(".TWITab").tabSwitch('create', {type: Obj.attr("rel"), height: 133, width: 322});
					if($("#tabSwitchToggleTypes").css("display")!="none" && Obj.attr("rel")!="toggle"){
						$("#tabSwitchToggleTypes").slideUp(200);	
					}						
			}
			//Write the new tab number
			startAutoSwitch();
			//Light up the example form
			$("#HeadTitle").animate({"opacity":"1"},500);
		});
	});
	$(".TWICS").click(function(){
		var Obj=$(this);
		$(".TWITab").tabSwitch('moveTo',{index: $(".TWICS").index(this)},setTabIndex);
	});
	//When user click on the toggle type
	$(".toggleType").click(function(){
		var Obj=$(this);
		//Like before, grey out the example
		$("#HeadTitle").animate({"opacity":"0.3"},500, function(){
			//reset it
			$(".TWITab").tabSwitch('destroy');
			$("#tabSwitchAutoToggle").attr("src","assets/images/autobaron.jpg");
			//Start with the toggle effect
			$(".TWITab").tabSwitch('create', {type: "toggle", toggle:  Obj.attr("rel"), height: 300, width: 440});
			startAutoSwitch();
			//reset the number and return the opacity
			setTabIndex();
			$("#HeadTitle").animate({"opacity":"1"},500);
		});
	});
	//When user click on the auto
	$("#tabSwitchAutoToggle").click(function(){
		//Check to change the correct image
		if($(".TWITab").tabSwitch('isAuto')==true){
			$(this).attr("src","assets/images/autobar.jpg");
		}else{
			$(this).attr("src","assets/images/autobaron.jpg");
		}
		//Let the tab auto toggle
		startAutoSwitch();
	});	
});
