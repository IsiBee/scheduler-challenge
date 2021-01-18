# Work Day Scheduler Starter Code

This challenge was to create a scheduler with time blocks from 9 am to 5 pm.
With the ability to add tasks and save them to local storage to load upon refresh.

## Description

This challenge relied heavily on jQuery and Bootstrap libraries as well as moment.js libraries. This was ulitmately to test out the capabilities of using CDNs.

## Acceptance Criteria

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar

WHEN I scroll down
THEN I am presented with time blocks for standard business hours

WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future

WHEN I click into a time block
THEN I can enter an event

WHEN I click the save button for that time block
THEN the text for that event is saved in local storage

WHEN I refresh the page
THEN the saved events persist

## Additional Information
### Notes
I really enjoyed this challenge, the use of "pre-created" functions for use is very useful. I ran into a slight snag with Moments. I realized you cannot compare Moments as if they are numbers or strings they are their own datatype and therefore you must use isAfter, isBefore, etc... rather than < > or ===. 

### Screenshot

![Scheduler](./assets/images/Scheduler.png?raw=true "Scheduler")

### Access Application

You can find the scheduler here:
*  https://isibee.github.io/scheduler-challenge/

You can find the code here:
* https://github.com/IsiBee/scheduler-challenge/