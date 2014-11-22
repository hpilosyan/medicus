var BOX_1=1;
var BOX_2=2;
var BOX_3=3;

$(function(){
	var selectBox = $("select").selectBoxIt();
	
	$('.datepicker').datetimepicker({
    	 pickTime: false
    });
	$('.timepicker').datetimepicker({
    	pickDate: false
    });
	
	getDevicesList();
	getMedicineListForAllBoxes();
	attachEvents();
});

function attachEvents()
{
	//Common
	$("#deviceSelect").change(onDevicesSelectChange);
	
	//Schedule
	$("#addTimestamp1").click(function(){onAddTimestampClick(BOX_1)});
	$("#saveScheduleButton1").click(function(){onSaveScheduleButtonClick(BOX_1)});
	
	$("#addTimestamp2").click(function(){onAddTimestampClick(BOX_2)});
	$("#saveScheduleButton2").click(function(){onSaveScheduleButtonClick(BOX_2)});
	
	$("#addTimestamp3").click(function(){onAddTimestampClick(BOX_3)});
	$("#saveScheduleButton3").click(function(){onSaveScheduleButtonClick(BOX_3)});
		
	//Pills
	$("#savePillsButton1").click();
}

function getDevicesList()
{
	$.get( "http://medicus-dev.herokuapp.com/api/v1/user", function( data ) {
  		if(data && data.devices)
		{
			var devicesList=data.devices;
			//Fill the Devices dropdown
			//TODO
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
	//TODO
}

function onAddTimestampClick(selectedBox)
{
	//TODO
	switch(selectedBox)
	{
		case BOX_1:
		{
			break;
		}
		case BOX_2:
		{
			break;
		}
		case BOX_3:
		{
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
			var box1Id=parseInt($("#box1_id").val());
			//Get medicine id
			var medicine1Id=parseInt($("#medicineSelect1").val());
			//Get interval
			var interval1=$("#interval1").val();
			
			//Get timestamps
			break;
		}
		case BOX_2:
		{
			var box2Id=parseInt($("#box2_id").val());
			//Get medicine id
			var medicine2Id=parseInt($("#medicineSelect2").val());
			//Get interval
			var interval2=$("#interval2").val();
			
			//Get timestamps
			break;
		}
		case BOX_3:
		{
			var box3Id=parseInt($("#box3_id").val());
			//Get medicine id
			var medicine3Id=parseInt($("#medicineSelect3").val());
			//Get interval
			var interval3=$("#interval3").val();
			
			//Get timestamps
			break;
		}
	}
}
