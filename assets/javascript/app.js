
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
        frequency = $("#frequency").val().trim();
        firstTrain = $("#train-time").val().trim();

        $("#train-name").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#train-time").val("");
    } else {
        alert("One of the forms was entered incorrectly");
    }
})