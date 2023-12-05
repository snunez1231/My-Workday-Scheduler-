$(function () {
  
    var currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);
  
  
    function generateTimeBlocks() {
      var container = $(".container-fluid");
  
     
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $("<div>")
          .attr("id", "hour-" + hour)
          .addClass("row time-block")
          .appendTo(container);
  
        $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(formatHour(hour))
          .appendTo(timeBlock);
  
        $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", "3")
          .appendTo(timeBlock);
  
       
        $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .append("<i class='fas fa-save' aria-hidden='true'></i>")
          .appendTo(timeBlock);
      }
    }
  
    
    function formatHour(hour) {
      if (hour >= 12) {
        return hour === 12 ? "12PM" : (hour - 12) + "PM";
      } else {
        return hour + "AM";
      }
    }
  
    
    $(".container-fluid").on("click", ".saveBtn", function () {
      var timeBlockId = $(this).closest(".time-block").attr("id");
      var userInput = $(this).siblings(".description").val();
      localStorage.setItem(timeBlockId, userInput);
    });
  
   
    function updateHourlyClasses() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    function loadSavedEvents() {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedEvent = localStorage.getItem(timeBlockId);
  
        if (savedEvent !== null) {
          $(this).find(".description").val(savedEvent);
        }
      });
    }
  
    generateTimeBlocks();
    updateHourlyClasses();
    loadSavedEvents();
  
    setInterval(updateHourlyClasses, 60000);
  });
  
  
  
  
  
  
  
  
  
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  //$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  //});
  