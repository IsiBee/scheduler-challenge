var taskSchedule = [];
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

// Check the time every five minutes to ensure task box coloring is accurate.
var scheduleSet = function () {
    $(".time-block").each(function (index, el) {
        auditTimeBlock(el)
    });
};

setInterval(scheduleSet(), (1000 * 60) * 5);


var saveTimeTask = function () {
    localStorage.setItem("schedule", JSON.stringify(taskSchedule));
};

$("textarea").on("change", function () {
    var text = $(this)
        .val()
        .trim();

    var id = $(this)
        .closest(".time-block")
        .attr("id");

    $(".time-block").on("blur", function () {
        alert("please click the save button");
    });

    $(".fa-save").on("click", function () {
        if ($(this).closest(".time-block").attr("id") === id) {
            var timeTask = {
                task: text,
                time: id
            };

            taskSchedule.push(timeTask);

            saveTimeTask();
        }
    });

});

var loadSchedule = function () {
    taskSchedule = JSON.parse(localStorage.getItem("schedule"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!taskSchedule) {
        taskSchedule = [];
    }
  
    // loop over object properties
    $.each(taskSchedule, function (timeBlock , text) {
      console.log(timeBlock, text);

      var id = text.time;
      id = "#" + id.toString();

      var item = text.task
      item = item.toString();

      $(id).children("textarea").val(item);
        
      //});
    });
  };


scheduleSet();
loadSchedule();

