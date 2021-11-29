

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(user != null) {
        db.collection("CSDL").doc("Userlogs").collection("logs").doc().set({
          activity : login_logs,
          date : getDate(),
          time : getTime()
        }).then(() => {
          window.location.href = "dashboard.html";
        }).catch((Error) => {

        })
       
      } else {
          // user is null
      }
     
    } else {
      // No user is signed in.
      console.log("user is not signed in");
      // window.location.href = "log-in.html";
    }
  });
// INTIALIZE FIRESTORE
var db = firebase.firestore();
// INTIALIZE FIRESTORE 
//INITIALIZE VALUE
var login_logs = "User has been logged in";
//INITIALIZE VALUE
// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //


// METHODS HERE
function LogInAction() {
    var login_email = document.getElementById("emailfield").value;
    var login_password = document.getElementById("passwordfield").value;


    if (login_email != null && login_email != "") {
        if (login_password != null && login_password != "") {
            firebase.auth().signInWithEmailAndPassword(login_email, login_password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                incorrectEmailPassword(errorx,submitBtn)
            });
        }
      }
}
function getMonthName(month) {
  switch(month) {
      case 1:
          return "January";
      case 2: 
          return "February";
      case 3:
          return "March";
      case 4:
          return "April";
      case 5:
          return "May";
      case 6:
          return "June";
      case 7:
          return "July";
      case 8:
          return "August";
      case 9:
          return "September"
      case 10:
          return "October";
      case 11:
          return "November";
      case 12:
          return "December";
  }
}
function getTime() {
  var currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
  return currentTime;
}
function getDate() {
  var m_month = getMonthName(month + 1);
  var m_day = _date;
  var m_year = year;
  var datetime =  m_month + " " + m_day + ", " + m_year;
  return datetime;
}