
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
        frequency = moment($("#frequency").val().trim(), "HH:mm").format("HH:mm");
        firstTrain = $("#train-time").val().trim();

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

    row.append(nameData, destinationData, frequencyData);

    $("#table-body").append(row);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
})