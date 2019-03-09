
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

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$(".btn").on("click", function () {

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

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    } else {
        alert("One of the forms was entered incorrectly");
    }
})

database.ref().on("child_added", function (snapshot) {

    var row = $("<tr>");

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

    var nextArrival = moment().add(timeTill, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm a");

    var arrivalData = $("<td>");
    arrivalData.text(nextArrival);

    var awayData = $("<td>");
    awayData.text(timeTill);

    row.append(nameData, destinationData, frequencyData, arrivalData, awayData);

    $("#table-body").append(row);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
})