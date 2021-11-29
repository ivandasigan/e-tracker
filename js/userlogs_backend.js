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
        activity : logout_logs,
        date : getDate(),
        time : getTime()
      }).then(() => {
        window.location.href = "log-in.html";
      }).catch((Error) => {

      })
    }
});
// INTIALIZE FIRESTORE & STORAGE
var db = firebase.firestore();
var storage = firebase.storage();
// INTIALIZE FIRESTORE & STORAGE

// INITILIZE MODIFY CSS PROPERTY
var notif_bell = document.getElementById("notif_bell");
// INITILIZE MODIFY CSS PROPERTY

//Activity OPTION
var month_option = document.getElementById("month_option");
var day_option = document.getElementById("day_option");
var year_option = document.getElementById("year_option");
//Activity OPTION
// DIV
var header_acts = document.getElementById("header_acts");
// DIV

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIAL VALUES
var docsArr = [];
var row_id = 0;
var resultCount = 1;
var logout_logs = "User logged out";
// INITIAL VALUES

//INITIALIZE LABELS
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var result = document.getElementById("result")
var notifCount = document.getElementById("notif_count");
//INITIALIZE LABELS
// INITIALIZE SEARCH STUDENT FIELD
var search_activity = document.getElementById("search_activity_field");
// INITIALIZE SEARCH STUDENT FIELD

// ONCHANGE & ONINPUT FOR USER LOGS
function searchActivityOnInput() {
    if(search_activity.value == "") {
        reloadUserlogs();
        displayUserLogsActivities();
    }

}
// ONCHANGE & ONINPUT FOR USER LOGS
// ONCLICK ACTION FOR USER LOGS
function searchAction() {
    console.log(search_activity.value);
    findUserlogByActivity(search_activity.value);
}
function browseAction() {
    browseActivityByMonthDayYear(month_option.value, day_option.value, year_option.value);
}
function viewPrintAction() {
    var rowId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var activity = data[1].innerHTML;
    var date = data[2].innerHTML;
    var time = data[3].innerHTML; 

    localStorage.setItem("logs_docid", docsArr[rowId]);
    localStorage.setItem("dateOfactivity", date);
    localStorage.setItem("activity", activity);
    localStorage.setItem("timeOfactivity", time);
    window.location.href = "print.html";
}
function printAction() {
    var rowId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var activity = data[1].innerHTML;
    var date = data[2].innerHTML;
    var time = data[3].innerHTML; 
    localStorage.setItem("logs_docid", docsArr[rowId]);
    localStorage.setItem("dateOfactivity", date);
    localStorage.setItem("activity", activity);
    localStorage.setItem("timeOfactivity", time);
    localStorage.setItem("isPrint", true);
    window.location.href = "print.html"
}
function printAllAction() {
    var fullcontent = document.body.innerHTML;
    document.body.innerHTML = header_acts.innerHTML;
    window.print();
    document.body.innerHTML = fullcontent
}
function logout_action() {
    firebase.auth().signOut().then(() => {
        console.log("user logged out");
       // window.location.href = "log-in.html";
    })
    .catch((error) => {
        console.log("ERROR SIGN OUT: " + error.message);
    });
    console.log("logout");
}
// ONCLICK ACTION FOR USER LOGS

// DISPLAY HERE
displayUserLogsActivities();
displayProfileImageAndUsername();
displayNotifCount();
displaySchoolYearAndSemester();
// DISPLAY HERE

// METHODS HERE
function displayUserLogsActivities() {
    db.collection("CSDL").doc("Userlogs").collection("logs").orderBy("time","asc").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                docsArr.push(doc.id);
                var jsonData = doc.data();
                var activity = jsonData["activity"];
                var date = jsonData["date"];
                var time = jsonData["time"];
                var container = `
                    <div class="content acts" id = ${row_id}>
                    <div> <p class="row-data">${resultCount}</p></div>
                    <div> <p class="row-data">${activity}</p> </div> 
                    <div> <p class="row-data">${date==getDate() ? "Today" : date}</p> </div>  
                    <div> <p class="row-data">${time}</p> </div>  
                    <div> 
                    <a href="#"><button onclick=viewPrintAction()><i class="fa fa-eye"></i></button></a>
                    <a href="#"><button onclick=printAction()><i class="fa fa-print"></i></button></a>
                    </div>
                    </div>
                `
                header_acts.innerHTML+=container;
                resultCount+=1;
                row_id+=1;
            }
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error) => {
        console.log(Error.message);
    })
}

function browseActivityByMonthDayYear(month, day, year) {
 
    reloadUserlogs();
    var date = month+" "+day+", "+year;
    db.collection("CSDL").doc("Userlogs").collection("logs").where("date","==",date).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                docsArr.push(doc.id);
                var jsonData = doc.data();
                var activity = jsonData["activity"];
                var date = jsonData["date"];
                var time = jsonData["time"];
                var container = `
                    <div class="content acts" id = ${row_id}>
                    <div> <p class="row-data">${resultCount}</p></div>
                    <div> <p class="row-data"> ${activity}</p> </div> 
                    <div> <p class="row-data">${date==getDate() ? "Today" : date}</p> </div>  
                    <div> <p class="row-data">${time}</p> </div>  
                    <div> 
                    <a href="#"><button onclick=viewPrintAction()><i class="fa fa-eye"></i></button></a>
                    <a href="#"><button><i class="fa fa-print"></i></button></a>
                    
                    </div>
                    </div>
                `
                header_acts.innerHTML+=container;
                resultCount+=1;
                row_id+=1;
            }
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function findUserlogByActivity(activity) {
    reloadUserlogs();
    db.collection("CSDL").doc("Userlogs").collection("logs").where("activity", "==", activity).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                docsArr.push(doc.id);
                var jsonData = doc.data();
                var activity = jsonData["activity"];
                var date = jsonData["date"];
                var time = jsonData["time"];
                var container = `
                    <div class="content acts" id = ${row_id}>
                    <div> <p class="row-data">${resultCount}</p></div>
                    <div> <p class="row-data"> ${activity}</p> </div> 
                    <div> <p class="row-data">${date==getDate() ? "Today" : date}</p> </div>  
                    <div> <p class="row-data">${time}</p> </div>  
                    <div> 
                    
                    <a href="#"><button onclick=viewPrintAction()><i class="fa fa-eye"></i></button></a>
                    <a href="#"><button><i class="fa fa-print"></i></button></a>
                    
                    </div>
                    </div>
                `
                header_acts.innerHTML+=container;
                resultCount+=1;
                row_id+=1;
            } 
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function displaySchoolYearAndSemester() {
    var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
    var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
    var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
    school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
  
}
function displayNotifCount() {
    notifCount.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
    notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
}
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
 function displayResultCount() {
    result.innerHTML = resultCount!=0 ? resultCount-1 : 0;
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
  function reloadUserlogs() {
    row_id=0;
    docsArr = [];
    header_acts.innerHTML = `
        <div class="headers acts">
        <div> <p>No.</p> </div>
        <div> <p>Activity</p>  </div> 
        <div> <p>Date</p> </div> 
        <div> <p>Time</p> </div>  
        <div> <p>Actions</p> </div>  
        </div>
    `;
    resultCount=1;
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