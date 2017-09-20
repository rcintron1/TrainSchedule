// Firebase initialization
var config = {
  apiKey: "AIzaSyCV7RDR6olm03cPobBAuIChGRYjyKCaBOs",
  authDomain: "trainapp-fd7bb.firebaseapp.com",
  databaseURL: "https://trainapp-fd7bb.firebaseio.com",
  projectId: "trainapp-fd7bb",
  storageBucket: "",
  messagingSenderId: "867176550088"
};
firebase.initializeApp(config);

var database = firebase.database();

//add data to DB
function writeUserData(trainName, destination, firstTrainTime, frequency) {
  console.log([trainName,destination,firstTrainTime,frequency]);
  firebase.database().ref().set({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
}
$(document).ready(function() {
  //add eventhandlers for fillOutForm buttons
  var tname = $("#trainName").val();
  var dest = $("#dest").val();
  var fTTime = $("#fTrainTime").val();
  var freq = $("#frequency").val();
  $("#btnSubmit").on("click", function() {

    writeUserData(tname,dest,fTTime,freq);
  });
});

database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
      $("#trainName").val(snapshot.val().trainName);
      $("#dest").val(snapshot.val().destination);
      $("#fTrainTime").val(snapshot.val().firstTrainTime);
      $("#frequency").val(snapshot.val().frequency);
});
