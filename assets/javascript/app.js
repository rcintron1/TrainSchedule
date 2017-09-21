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
  console.log([trainName, destination, firstTrainTime, frequency]);
  firebase.database().ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
}

function appendTable(keys) {
  tdtn = $("<td>").append(keys["tn"]);
  tddst = $("<td>").append(keys["ds"]);
  tdftt = $("<td>").append(keys["ft"]);
  tdfrq = $("<td>").append(keys["fq"]);
  tr = $("<tr>").attr("key", keys["key"]);
  tr.append(tdtn, tddst, tdftt, tdfrq);
  $("#tbody").append(tr);
}
$(document).ready(function() {
  //add eventhandlers for fillOutForm buttons
  $("#btnSubmit").on("click", function() {
    var tname = $("#trainName").val();
    var dest = $("#dest").val();
    var fTTime = $("#fTrainTime").val();
    var freq = $("#frequency").val();
    writeUserData(tname, dest, fTTime, freq);
  });
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot);
  var key = {};
  key["tn"] = snapshot.val().trainName;
  key["ds"] = snapshot.val().destination;
  key["ft"] = snapshot.val().firstTrainTime;
  key["fq"] = snapshot.val().frequency;
  key["key"] = snapshot.key;
  appendTable(key);
});
