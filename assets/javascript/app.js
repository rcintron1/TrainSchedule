// Firebase initialization
var config = {
  apiKey: "AIzaSyDY_2Rbfr604_nTW1IJpDwE_yCzMHU_ODE",
  authDomain: "trainapp-3d8e6.firebaseapp.com",
  databaseURL: "https://trainapp-3d8e6.firebaseio.com",
  projectId: "trainapp-3d8e6",
  storageBucket: "",
  messagingSenderId: "278964811272"
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
  tdftt = $("<td>").append(moment(keys["ft"], 'HH:mm').format('hh:mm a'));
  tdfrq = $("<td>").append(keys["fq"]);
  tdrem = $("<td>");
  btn = $("<button>").html("x").attr("key", keys["key"]).addClass("btnRemRow");
  tdrem.append(btn);
  tr = $("<tr>").attr("id", keys["key"]);
  tr.append(tdtn, tddst, tdftt, tdfrq, tdrem);
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

  $(document).on("click", ".btnRemRow", function() {
    event.preventDefault();
    var id = $(this).attr("key");
    database.ref(id).remove();
    // $("#" + id).remove();
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
database.ref().on("child_removed", function(snapshot) {
  console.log(snapshot.key);
  id = snapshot.key;
  $("#" + id).remove();
});
