// connecting to firebase and initialising an instance of it
var config = {
    apiKey: "AIzaSyCiPeY5RT-XB40Dl8S2rjytmhdCCzdhcbI",
    authDomain: "train-scheduler-df65b.firebaseapp.com",
    databaseURL: "https://train-scheduler-df65b.firebaseio.com",
    projectId: "train-scheduler-df65b",
    storageBucket: "train-scheduler-df65b.appspot.com",
    messagingSenderId: "659352709648"
};

firebase.initializeApp(config);

var database = firebase.database();

// declaring starting variables of user input
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;


// listens for a click on the submit button
$(".btn").on("click", function () {

    // if there are entries in the fields and the first train time is entered in the correct format
    // set starting variables to user input and clear input fields
    if (($("#train-name").val().trim() !== "") &&
        ($("#destination").val().trim() !== "") &&
        ($("#frequency").val().trim() !== "") &&
        (moment($("#train-time").val().trim(), "HH:mm").isValid() === true)
    ) {
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
        frequency = $("#frequency").val().trim();

        $("#train-name").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#train-time").val("");

        // push user input to database
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    } else {
        // tells user something is wrong with input
        alert("One of the forms was entered incorrectly");
    }
})

// runs when a new object is added to the database or on page load
database.ref().on("child_added", function (snapshot) {

    // creating new for train data
    var row = $("<tr>");

    // setting table data to each respective field
    var nameData = $("<td>");
    var tableName = snapshot.val().trainName;
    nameData.text(tableName);

    var destinationData = $("<td>");
    var tableDestination = snapshot.val().destination;
    destinationData.text(tableDestination);

    var frequencyData = $("<td>");
    var tableFrequency = snapshot.val().frequency;
    frequencyData.text(tableFrequency);

    // converts starting time from military to regular
    var timeRegular = moment(snapshot.val().firstTrain, "hh:mm");
    // gets the difference between the users current time and the starting time
    var timeDiff = moment().diff(moment(timeRegular), "minutes");
    // finds the leftover time in one frequency cycle
    var timeRemain = timeDiff % tableFrequency;
    // get time remaining by subtracting leftover time from the frequency
    var timeTill = tableFrequency - timeRemain;

    // add time till arrival to current time to get arrival time
    var nextArrival = moment().add(timeTill, "minutes");
    // format in regular time with am or pm indicator
    nextArrival = moment(nextArrival).format("hh:mm a");

    var arrivalData = $("<td>");
    arrivalData.text(nextArrival);

    var awayData = $("<td>");
    awayData.text(timeTill);

    // append all the fields to the row, in the correct order to match with headings
    row.append(nameData, destinationData, frequencyData, arrivalData, awayData);

    // append row containing train data to the table body
    $("#table-body").append(row);

    //error handling
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
})