var BOX_1=1;
var BOX_2=2;
var BOX_3=3;

var timestamp1Count=1;
var timestamp2Count=1;
var timestamp3Count=1;

var currentUser;

$(function(){	
	 $('.datepicker').datetimepicker({
    	 pickTime: false
     });
	$('.timepicker').datetimepicker({
    	pickDate: false
    });
	getDevicesList();
	getMedicineListForAllBoxes();
	attachEvents();
	
	  $('.pill-item2 .sc-days button').on( "click", function() {
		$('.pill-item2 .sc-days button').removeClass( "btn-current" );
	  	$( this ).addClass( "btn-current" );
	  });
	  
	  $('.pill-item3 .sc-days button').on( "click", function() {
		$('.pill-item3 .sc-days button').removeClass( "btn-current" );
	  	$( this ).addClass( "btn-current" );
	  });
	  	  
	  $('.pill-item1 .sc-days button').on( "click", function() {
		$('.pill-item1 .sc-days button').removeClass( "btn-current" );
	  	$( this ).addClass( "btn-current" );
	  });
});

function attachEvents()
{
	//Common
	$(".med-header .dropdown > select").change(onDevicesSelectChange);
	$("li.pills").click(onPillsTabClick);
	$("li.schedule").click(onScheduleTabClick);
	$("li.shopping-card").click(onShoppingCardTabClick);
	$("li.sos").click(onSosTabClick);
	
	//Schedule
	$("#addTimestamp1").click(function(){onAddTimestampClick(BOX_1)});
	$("#removeTimestamp1").click(function(){onremoveTimestampClick(BOX_1)});
	$("#saveScheduleButton1").click(function(){onSaveScheduleButtonClick(BOX_1)});
	
	$("#addTimestamp2").click(function(){onAddTimestampClick(BOX_2)});
	$("#removeTimestamp2").click(function(){onremoveTimestampClick(BOX_2)});
	$("#saveScheduleButton2").click(function(){onSaveScheduleButtonClick(BOX_2)});
	
	$("#addTimestamp3").click(function(){onAddTimestampClick(BOX_3)});
	$("#removeTimestamp3").click(function(){onremoveTimestampClick(BOX_3)});
	$("#saveScheduleButton3").click(function(){onSaveScheduleButtonClick(BOX_3)});
		
	//Pills
	$("#savePillsButton1").click(function(){onSavePillsButtonClick(BOX_1)});
	$("#savePillsButton2").click(function(){onSavePillsButtonClick(BOX_2)});
	$("#savePillsButton3").click(function(){onSavePillsButtonClick(BOX_3)});
}

function getDevicesList()
{
	$.get( "http://medicus-dev.herokuapp.com/api/v1/user", function( data ) {
  		currentUser=data;
		if(data && data.devices)
		{
			var devicesList=data.devices;
			//Fill the Devices dropdown
			for(var i=0; i<devicesList.length; i++)
			{
				var option="<option value='"+devicesList[i].token+"'>"+devicesList[i].name+"</option>";
				$("div.dropdown > select").append(option);
			}
			
			$(".med-header select").selectBoxIt();
		}
		else
		{
			alert("The response was empty.");
		}
	});
}

function getMedicineListForAllBoxes()
{
	var box1Id=parseInt($("#box1_id").val());
	var box2Id=parseInt($("#box2_id").val());
	var box3Id=parseInt($("#box3_id").val());
	
	//TODO:ajax calls to get medicines by box id
}

//-------------Event handlers-----------------
function onDevicesSelectChange(event)
{
	 //Fill schedule fields
	 var pills1 = currentUser.devices[0].pills
	 var pill1Select = ""; 
		$.each( pills1, function( key, value ) {
			if (typeof value != 'undefined') {
				pill1Select += '<option vlaue="'+value+'">'+value+'</option>';
			}
		});
		
	 $(".pill-item1 .dropdown select").html(pill1Select);
	 $(".pill-item1 .dropdown select").selectBoxIt();
	 
	 $(".pill-item2 .dropdown select").html(pill1Select);
	 $(".pill-item2 .dropdown select").selectBoxIt();
	 
	 $(".pill-item3 .dropdown select").html(pill1Select);
	 $(".pill-item3 .dropdown select").selectBoxIt();
	 
	 $(".pill-item1 .sc-quantity").val(currentUser.devices[0].schedule[0].amount);
	 $(".pill-item2 .sc-quantity").val(currentUser.devices[0].schedule[1].amount);
	 $(".pill-item3 .sc-quantity").val(currentUser.devices[0].schedule[2].amount);
	 
	 $(".pill-item1 .sc-date").val(moment(currentUser.devices[0].schedule[0].time.timestamps[0]).format('YYYY/MM/DD'));
	 $(".pill-item2 .sc-date").val(moment(currentUser.devices[0].schedule[1].time.timestamps[0]).format('YYYY/MM/DD'));
	 $(".pill-item3 .sc-date").val(moment(currentUser.devices[0].schedule[2].time.timestamps[0]).format('YYYY/MM/DD'));
	 
	 $(".pill-item1 .sc-time").val(moment(currentUser.devices[0].schedule[0].time.timestamps[0]).format('HH:mm'));
	 $(".pill-item2 .sc-time").val(moment(currentUser.devices[0].schedule[1].time.timestamps[0]).format('HH:mm'));
	 $(".pill-item3 .sc-time").val(moment(currentUser.devices[0].schedule[2].time.timestamps[0]).format('HH:mm'));	 
	 
	 $('.pill-item1 .datepicker').datetimepicker({
    	 pickTime: false
     });
	 $('.pill-item2 .datepicker').datetimepicker({
    	 pickTime: false
     });
	 $('.pill-item3 .datepicker').datetimepicker({
    	 pickTime: false
     });
	 
	  $('.pill-item1 .sc-days button').removeClass( "btn-current" );
	  $('.pill-item1 .sc-days .scd-'+currentUser.devices[0].schedule[0].time.days_interval).addClass( "btn-current" );	  
	  
	  $('.pill-item2 .sc-days button').removeClass( "btn-current" );
	  $('.pill-item2 .sc-days .scd-'+currentUser.devices[0].schedule[1].time.days_interval).addClass( "btn-current" );
	  	  
	  $('.pill-item3 .sc-days button').removeClass( "btn-current" );
	  $('.pill-item3 .sc-days .scd-'+currentUser.devices[0].schedule[2].time.days_interval).addClass( "btn-current" );

}

function onAddTimestampClick(selectedBox)
{
	//TODO
	switch(selectedBox)
	{
		case BOX_1:
		{
			var timestampHtml='<div class="time-group"><div class="input-group date timepicker"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div></div>';
			$("#timeBox1").append(timestampHtml);
			timestamp1Count++;
			$('#timeBox1 .timepicker:last-child').datetimepicker({
				pickDate: false
			});
			break;
		}
		case BOX_2:
		{
			var timestampHtml='<div class="time-group"><div class="input-group date timepicker"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div></div>';
			$("#timeBox2").append(timestampHtml);
			timestamp2Count++;
			$('#timeBox2 .timepicker:last-child').datetimepicker({
				pickDate: false
			});
			break;
		}
		case BOX_3:
		{
			var timestampHtml='<div class="time-group"><div class="input-group date timepicker"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div></div>';
			$("#timeBox3").append(timestampHtml);
			timestamp3Count++;
			$('#timeBox3 .timepicker:last-child').datetimepicker({
				pickDate: false
			});
			break;
		}
	}
}

function onremoveTimestampClick(selectedBox)
{
	switch(selectedBox)
	{
		case BOX_1:
		{
			if(timestamp1Count!=1)
			{
				$("#timeBox1 .time-group:last-child").remove();
				timestamp1Count--;
			}
			break;
		}
		case BOX_2:
		{
			if(timestamp2Count!=1)
			{
				$("#timeBox2 .time-group:last-child").remove();
				timestamp2Count--;
			}
			break;
		}
		case BOX_3:
		{
			if(timestamp3Count!=1)
			{
				$("#timeBox3 .time-group:last-child").remove();
				timestamp3Count--;
			}
			break;
		}
	}
}

function onSaveScheduleButtonClick(selectedBox)
{
	//TODO
	switch(selectedBox)
	{
		case BOX_1:
		{
			var box1Id=1;
			//Get medicine id
			var medicine1Id=parseInt($(".pill-item1 select").val());
			//Get interval
			var interval1=parseInt($(".pill-item1 .btn-current").attr("class").split(" ")[2].split("-")[1]);
			
			//TODO: Get timestamps
			
			//TODO: ajax request to save
			break;
		}
		case BOX_2:
		{
			var box2Id=2;
			//Get medicine id
			var medicine2Id=parseInt($("#medicineSelect2").val());
			//Get interval
			var interval2=$("#interval2").val();
			
			//TODO: Get timestamps
			
			//TODO: ajax request to save
			break;
		}
		case BOX_3:
		{
			var box3Id=3;
			//Get medicine id
			var medicine3Id=parseInt($("#medicineSelect3").val());
			//Get interval
			var interval3=$("#interval3").val();
			
			//TODO: Get timestamps
			
			//TODO: ajax request to save
			break;
		}
	}
}

function onSavePillsButtonClick(selectedBox)
{
	switch(selectedBox)
	{
		case BOX_1:
		{
			var box1Id=parseInt($("#box1_id").val());
			//Get medicine name
			var medicineName=$("#medicineNameInput1").val();
			//Get pills quantity
			var pillsQuantity=$("#pillsQuantityInput1").val();
			
			//TODO: ajax request to save
			break;
		}
		case BOX_2:
		{
			var box2Id=parseInt($("#box2_id").val());
			//Get medicine name
			var medicineName=$("#medicineNameInput2").val();
			//Get pills quantity
			var pillsQuantity=$("#pillsQuantityInput2").val();
			
			//TODO: ajax request to save
			break;
		}
		case BOX_3:
		{
			var box3Id=parseInt($("#box3_id").val());
			//Get medicine name
			var medicineName=$("#medicineNameInput3").val();
			//Get pills quantity
			var pillsQuantity=$("#pillsQuantityInput3").val();
			
			//TODO: ajax request to save
			break;
		}
	}
}

function onPillsTabClick()
{
	//Set the header
	$("h1.cur-title").html("Pills");
	//Highlight
	$("div.med-menu span").removeClass("cur");
	$("li.pills > span").addClass("cur");
	
	$("#schedule-boxes, #shopping-card-boxes, #sos-boxes, #pil-boxes").css("display", "none");
	$("#pil-boxes").css("display", "block");
}

function onScheduleTabClick()
{
	//Set the header
	$("h1.cur-title").html("Schedule");
	
	//Highlight
	$("div.med-menu span").removeClass("cur");
	$("li.schedule > span").addClass("cur");
	
	$("#schedule-boxes, #shopping-card-boxes, #sos-boxes, #pil-boxes").css("display", "none");
	$("#schedule-boxes").css("display", "block");
}

function onShoppingCardTabClick()
{
	//Set the header
	$("h1.cur-title").html("Shopping Card");
	
	//Highlight
	$("div.med-menu span").removeClass("cur");
	$("li.shopping-card > span").addClass("cur");
	
	$("#schedule-boxes, #shopping-card-boxes, #sos-boxes, #pil-boxes").css("display", "none");
	$("#shopping-card-boxes").css("display", "block");
}
function onSosTabClick()
{
	//Set the header
	$("h1.cur-title").html("SOS");
	
	//Highlight
	$("div.med-menu span").removeClass("cur");
	$("li.sos > span").addClass("cur");
	
	$("#schedule-boxes, #shopping-card-boxes, #sos-boxes, #pil-boxes").css("display", "none");
	$("#sos-boxes").css("display", "block");
}
