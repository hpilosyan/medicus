var BOX_1=1;
var BOX_2=2;
var BOX_3=3;

var timestamp1Count=1;
var timestamp2Count=1;
var timestamp3Count=1;

var currentUser;
var base_url = "http://medicus-dev.herokuapp.com/api/v1";
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
	  $('#login').on('click', function(){
	  	authenticate();
	  })
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
	$(" .pill-item1 .btn-large").click(function(){onSaveScheduleButtonClick(BOX_1)});

	$("#addTimestamp2").click(function(){onAddTimestampClick(BOX_2)});
	$("#removeTimestamp2").click(function(){onremoveTimestampClick(BOX_2)});
	$(".pill-item2 .btn-large").click(function(){onSaveScheduleButtonClick(BOX_2)});

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
	$.get( "http://172.24.20.30:3000/api/v1/old/user", function( data ) {
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
	var deviceToken=$(".med-header select").val();
	//TODO
	switch(selectedBox)
	{
		case BOX_1:
		{

			var box1Id=1;
			//Get medicine id
			var medicine1Id=$(".pill-item1 select").val();
			//Get interval
			var interval1=parseInt($(".pill-item1 .btn-current").attr("class").split(" ")[2].split("-")[1]);
			var quantity1=parseInt($(".pill-item1 .sc-quantity").val());
			var date1=(new Date($(".pill-item1 .sc-date").val())).getTime();
			//console.log($(".pill-item1 .sc-date").val());
			var timeStamps1=[];
			$(".pill-item1 .sc-time").each(function(){
				var time=(new Date($(".pill-item1 .sc-date").val()+' '+$(this).val())).getTime();
				timeStamps1.push(time);
			});

			//Construct request object
			var saveRequest={};
			saveRequest.box=box1Id;
			saveRequest.pill_name=medicine1Id;
			saveRequest.amount=quantity1;
			saveRequest.time={};
			saveRequest.time.days_interval=interval1;
			saveRequest.time.timestamps=timeStamps1;

			var requestString=JSON.stringify(saveRequest);
			$.ajax({
				url: base_url + "/schedule/"+deviceToken,
				data:requestString,
				type:"POST",
				contentType:"application/json",
				success:function(result){
					alert(result);
				}
			});

			//{"box":1,"time":{"days_interval":2,"timestamps":[84589645,845896455]},"pill_name":"Vazolong N","amount":45}


			//TODO: ajax request to save
			break;
		}
		case BOX_2:
		{
			var box2Id=2;
			//Get medicine id
			var medicine2Id=$(".pill-item2 select").val();
			//Get interval
			var interval2=parseInt($(".pill-item2 .btn-current").attr("class").split(" ")[2].split("-")[1]);
			var quantity2=parseInt($(".pill-item2 .sc-quantity").val());
			var date2=(new Date($(".pill-item2 .sc-date").val())).getTime();
			var timeStamps2=[];
			$(".pill-item2 .sc-time").each(function(){
				var time=(new Date($(".pill-item2 .sc-date").val()+' '+$(this).val())).getTime();
				timeStamps2.push(time);
			});

			//Construct request object
			var saveRequest={};
			saveRequest.box=box2Id;
			saveRequest.pill_name=medicine2Id;
			saveRequest.amount=quantity2;
			saveRequest.time={};
			saveRequest.time.days_interval=interval2;
			saveRequest.time.timestamps=timeStamps2;

			var requestString=JSON.stringify(saveRequest);
			$.ajax({
				url:base_url+"/schedule/"+deviceToken,
				data:requestString,
				type:"POST",
				contentType:"application/json",
				success:function(result){
					alert(result);
				}
			});

			//TODO: ajax request to save
			break;
		}
		case BOX_3:
		{
			var box3Id=3;
			//Get medicine id
			var medicine3Id=$(".pill-item3 select").val();
			//Get interval
			var interval3=parseInt($(".pill-item3 .btn-current").attr("class").split(" ")[2].split("-")[1]);
			var quantity3=parseInt($(".pill-item13 .sc-quantity").val());
			var date3=(new Date($(".pill-item3 .sc-date").val())).getTime();
			var timeStamps3=[];
			$(".pill-item3 .sc-time").each(function(){
				var time=(new Date($(this).val())).getTime();
				timeStamps3.push(time);
			});


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

function authenticate () {
	var client_id = "hayk";
    var client_secret = "my_secret";

    var base64_encoded = btoa(client_id + ":" + client_secret);
    $.ajax(base_url + '/oauth/token', {
        type: 'POST',
        headers: {
            Authorization: 'Basic ' + base64_encoded
        },
        data: {
            grant_type: 'password',
            username: $('#username').val(),
            password: $('#password').val()
        }
    }).done(function(resp) {
        // Log the response, which contains access_token
        $('.med-main').show();
        $('.med-login-page').hide();

        // We'll need to send access token with each subsequent request
        $.ajaxSetup({
            headers: {
                Authorization: 'Bearer ' + resp.access_token
            }
        });

    });
}