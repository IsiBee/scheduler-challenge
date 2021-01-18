// Variables


// get current day for scheduler title
var dayOfWeek = moment().format("dddd");
var currentDate = moment().format("MMMM Do");


// display date on screen
$("#currentDay").html(dayOfWeek + ", " + currentDate);

//identify which time block to color based on currentHour
var auditTimeBlock = function (timeBlockEl) {
    var timeBlock = $(timeBlockEl)
        .prop("id");

    // sets timeCompare to the id of the time block so we can compare with current
    var timeCompare = moment().set("hour", timeBlock);
    // set the current hour for text area color 

    // if current moment is after timeBlock ID set to past
    if (moment().isAfter(timeCompare)) {
        // Add the class of past to the task box.
        $(timeBlockEl).children(".task-box").addClass("past");
        // If there are any lingering classes from other times, remove them.
        $(timeBlockEl).children(".task-box").removeClass("present future");
    }
    // if current moment is equal to timeBlock ID set to present
    else if (moment().isSame(timeCompare)) {
        $(timeBlockEl).children(".task-box").addClass("present");
        $(timeBlockEl).children(".task-box").removeClass("past future");
    }

    // if current moment is before the timeBlock ID set to future
    else if (moment().isBefore(timeCompare)) {
        $(timeBlockEl).children(".task-box").addClass("future");
        $(timeBlockEl).children(".task-box").removeClass("past present");
    }
};

// Check the time every five minutes to ensure task box coloring is accurate.
setInterval(function(){
    $(".time-block").each(function(index, el){
        auditTimeBlock(el);
    });
    },(1000 * 60) * 5);


