// ====> FIREBASE AUTH <========= //
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    if(user != null) {
   
    } else {
        // user is null
    }
    } else {
    // No user is signed in.
    console.log("user is not signed in");
    db.collection("CSDL").doc("Userlogs").collection("logs").doc().set({
        activity : "User logged out",
        date : getDate(),
        time : getTime()
      }).then(() => {
        window.location.href = "log-in.html"
      })
    }
});
// INITIALIZE FIRESTORE & STORAGE
var db = firebase.firestore();
var storage = firebase.storage();
// INITIALIZE FIRESTORE & STORAGE

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIALIZE LABELS
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var notifCount = document.getElementById("notif_count");
var recipient = document.getElementById("recipient");
var date_of_announce = document.getElementById("date_announce");
var message = document.getElementById("message");
// INITIALIZE LABELS
var notif_bell = document.getElementById("notif_bell");

// ONCLICK ACTIONS FOR ANNOUNCEVIEW
    // ===> LOGOUT <===== //
    function logout_action() {
        firebase.auth().signOut().then(() => {
            window.location.href = "log-in.html";
        })
        .catch((error) => {
            console.log("ERROR SIGN OUT: " + error.message);
        });
           console.log("logout");
        }
    // ===> LOGOUT <===== //
// ONCLICK ACTIONS FOR ANNOUNCEVIEW    


// DISPLAY DATA
displaySchoolYearAndSemester();
displayNotifCount();
displayProfileImageAndUsername();
// DISPLAY DATA

// METHODS HERE
function displayProfileImageAndUsername() {
    // PROFILE IMAGE DISPLAY
    var image = document.getElementById("profileImage");

    var image_name = localStorage.getItem("image_name");
    storage.ref("CSDL/profilePicture/" + image_name).getDownloadURL().then((url) => {
        console.log(url);
        image.src = url;
   
    }).catch((error) => {
        console.log("ERROR RETRIEIVNG IMAGE " + error.message);
        image.src = "img/default_user_image.png"
    })
    db.collection("CSDL").doc("Profile").onSnapshot((doc) => {
     if(doc.exists) {
         var jsonData = doc.data();
         var firstName = jsonData["first_name"];
         user_name.innerHTML = firstName;
         }
     })
 }

function displayNotifCount() {
    var count = 0;
    db.collection("STUDENT_MOBILE").where("grant", "==", false).onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
        if(change.type === "added") {
             var jsonData = change.doc.data();
             count+=1;
        } 
    })
    notifCount.innerHTML = count;
    localStorage.setItem("notif_count", count);
     
    notifCount.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
    notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
    })
}

function displaySchoolYearAndSemester() {
    var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
    var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
    var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
    school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
}
function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    school_year.innerHTML = syText;
}
function getSemester() {
    if(month >= 6 && month <= 10) {
        return "1st Semester"
    } else {
        return "2nd Semester"
    }
}

function getSchoolYear() {
    var sy = "";
    if(month >= 6 && month <= 10) {
        sy =  year + " " + parseInt(year + 1);
    } else {
        sy =  parseInt(year - 1) + "-" + year ;
    }
    return sy;
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
// METHODS HERE