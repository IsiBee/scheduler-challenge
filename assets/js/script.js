// Variables


// get current day for scheduler title
var dayOfWeek = moment().format("dddd");
var date = moment().format("MMMM Do");
$("#currentDay").html(dayOfWeek + ", " + date);