$(function() {
	var selectBox = $("select").selectBoxIt();
	
	$('.datepicker').datetimepicker({
    	 pickTime: false
    });
	$('.timepicker').datetimepicker({
    	pickDate: false
    });
});