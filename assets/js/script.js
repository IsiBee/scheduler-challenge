// variable that will hold saved tasks entered in the scheduler
var taskSchedule = [];

// get current day for scheduler title
var dayOfWeek = moment().format("dddd");
var currentDate = moment().format("MMMM Do");

// display date on screen
$("#currentDay").html(dayOfWeek + ", " + currentDate);

//identify which time block to color based on the current moment
var auditTimeBlock = function (timeBlockEl) {
    var timeBlock = $(timeBlockEl)
        .attr("id");

    // sets timeCompare to the id of the time block so we can compare with current
    var timeCompare = moment().set("hour", timeBlock);
    // set the current hour for text area color 

    // if current moment is after timeBlock ID set to past
    if (moment().isAfter(timeCompare)) {
        // Add the class of past to the task box.
        $(timeBlockEl).children("textarea").addClass("past");
        // If there are any lingering classes from other times, remove them.
        $(timeBlockEl).children("textarea").removeClass("present future");
    }
    // if current moment is equal to timeBlock ID set to present
    else if (moment().isSame(timeCompare)) {
        $(timeBlockEl).children("textarea").addClass("present");
        $(timeBlockEl).children("textarea").removeClass("past future");
    }

    // if current moment is before the timeBlock ID set to future
    else if (moment().isBefore(timeCompare)) {
        $(timeBlockEl).children("textarea").addClass("future");
        $(timeBlockEl).children("textarea").removeClass("past present");
    }
};

// function that calls auditTimeBlock for each div with a class of time-block.
var scheduleSet = function () {
    $(".time-block").each(function (index, el) {
        auditTimeBlock(el)
    });
};

// runs the scheduleSet function every five minutes to ensure the time block coloring stays up to date.
// This is in case the user keeps the app open all day. 
setInterval(scheduleSet(), (1000 * 60) * 5);

// This function saves the task the user has entered into the scheduler to localStorage
// The key is schedule the object stored is an array of timeTask objects.
var saveTimeTask = function () {
    localStorage.setItem("schedule", JSON.stringify(taskSchedule));
};

$("textarea").on("change", function () {
    // capture the value of the task box as the text
    var text = $(this)
        .val()
        .trim();
    // capture the attribute id of the task box store that as id
    var id = $(this)
        .closest(".time-block")
        .attr("id");


    // add event listener for the save button
    $(".fa-save").on("click", function () {
        // If the save button has the same id as the id attribute above
        if ($(this).closest(".time-block").attr("id") === id) {
            // create the timeTask object
            var timeTask = {
                task: text,
                time: id
            };
            // push the object to the taskSchedule array
            taskSchedule.push(timeTask);
            // add the object to local storage using the saveTimeTask function
            // note if the user does not click the save icon the task will not save to local storage.
            // it will save to the browser for the current session.
            saveTimeTask();
        }
    });

});

// This function loads the tasks saved in local Storage
var loadSchedule = function () {
    // gets the array out of local storage and parses it.
    taskSchedule = JSON.parse(localStorage.getItem("schedule"));

    // if nothing in localStorage, create a new array to track all tasks and times
    if (!taskSchedule) {
        taskSchedule = [];
    }

    // loop over object properties
    $.each(taskSchedule, function (timeBlock, text) {
        // get id which is the time block the task will go into
        var id = text.time;
        id = "#" + id.toString();
        // get the task
        var item = text.task
        item = item.toString();
        //using the ID to locate the correct task box set the task as the value of the textarea
        $(id).children("textarea").val(item);

    });
};
// loads the timeblock coloring when the page first loads
scheduleSet();
// loads any tasks in local storage
loadSchedule();

