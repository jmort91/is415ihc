$(function(){

$('#predict').click(function(evt){
    evt.preventDefault();
    var DIFFICULTY = $("#DIFFICULTY").val(); //these get the values from the form and make put them in here so they can be sent to the API without reloading the page.
    var PRIORITY = $("#PRIORITY").val();
    var DURATION_(WEEKS) = $("#DURATION_(WEEKS)").val();
    var PHYSICIAN_INVOLVEMENT_FLAG_YES = $("#PHYSICIAN_INVOLVEMENT_FLAG_YES").val();
    var PHYSICIAN_LED_FLAG_YES = $("#PHYSICIAN_LED_FLAG_YES").val();
    var FACILITY = $("#FACILITY").val();
    // console.log(id)
    $("#prediction_display").load('/homepage/whatif.prediction/'+ DIFFICULTY + "/" + PRIORITY + "/" + DURATION_(WEEKS) + "/" + PHYSICIAN_INVOLVEMENT_FLAG_YES + "/" + PHYSICIAN_LED_FLAG_YES + "/" + FACILITY + "/");
    return false
});

});//ready

