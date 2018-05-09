/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCihLI36G6bXUPU4ra9QLh2iNBP9vbiOfI",
    authDomain: "bootcamp-test-2ebd4.firebaseapp.com",
    databaseURL: "https://bootcamp-test-2ebd4.firebaseio.com",
    projectId: "bootcamp-test-2ebd4",
    storageBucket: "",
    messagingSenderId: "431990284258"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding new trains
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainname").val().trim();
  var trainDest = $("#destination").val().trim();
  var startDate = moment($("#startdate").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    tname: trainName,
    tdest: trainDest,
    start: startDate,
    frequency: trainFreq
  };

  // Uploads new train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.tname);
  console.log(newTrain.tdest);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainname").val("");
  $("#destination").val("");
  $("#startdate").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrain = childSnapshot.val().tname;
  var trainDest = childSnapshot.val().tdest;
  var startDate = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;

  // Train times info
  console.log(newTrain);
  console.log(trainDest);
  console.log(startDate);
  console.log(trainFreq);

  // Prettify the employee start
  var startDatePretty = moment.unix(startDate).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMinsAway = moment().diff(moment(startDate, "X"), "months");
  console.log(trainMinsAway);

  // Calculate the total time till next train
  var nextTrain = trainMinsAway - trainFreq;
  console.log(nextTrain);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrain + "</td><td>" + trainMinsAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
