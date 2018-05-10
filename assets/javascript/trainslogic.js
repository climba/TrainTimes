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
  var trainNameInput = $("#trainname").val().trim();
  var trainDestInput = $("#destination").val().trim();
  var trainFirstInput = $("#first-train-input").val().trim();
  var trainFreqInput = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    tname: trainNameInput,
    tdest: trainDestInput,
    tFreqTime: trainFirstInput,
    frequency: trainFreqInput
  };

  // Uploads new train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.tname);
  console.log(newTrain.tdest);
  console.log(newTrain.tFreqTime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes, avoiding being a bad developer! ;-)
  $("#trainname").val("");
  $("#destination").val("");
  $("#first-train-input").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameInput = childSnapshot.val().tname;
  var trainDestInput = childSnapshot.val().tdest;
  var trainFirstInput = childSnapshot.val().tFreqTime;
  var trainFreqInput = childSnapshot.val().frequency;

  // Train times info
  console.log(trainNameInput);
  console.log(trainDestInput);
  console.log(trainFirstInput);
  console.log(trainFreqInput);

  // first Train time pushed back a year
  var timeDiffConvert = moment(trainFirstInput, "HH:mm").subtract(1, "years"); 

  // Difference between current & first time
  var timeDiff = moment().diff(moment(timeDiffConvert, "X"), "minutes");
  console.log(minutesTillNext);

  // time apart (remainder)
  var tRemainder = timeDiff % trainFreqInput;
  console.log(nextTrain);

  // Minutes until next train
  var minutesTillNext = trainFreqInput - tRemainder;

  // Use moment to convert the minutesTillNext var into minutes 
  var nextTrain = moment().add(minutesTillNext, "minutes");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainNameInput + "</td><td>"
   + trainDestInput + "</td><td>" + trainFreqInput + "</td><td>" + moment(nextTrain).format("hh:mm")
   + "</td><td>" + minutesTillNext + "</td></tr>");
});

