
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