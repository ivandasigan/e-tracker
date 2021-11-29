
// ====> FIREBASE AUTH <========= //
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    muser = firebase.auth().currentUser;
    if(user != null) {
        console.log("NOT NULL");
    
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


// INITILIZE MODIFY CSS PROPERTY
var notif_bell = document.getElementById("notif_bell");
// INITILIZE MODIFY CSS PROPERTY

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIAL VALUES
var notif = {};
var announce_log = "New announcement has been created";
var announceremove_log = "Announcement has been removed";
const hk = "Handog Kaibigan Program"
const sa = "Student Assistant Program"
const all = "ALL";
var muser;
var row_id = 1;
var resultCount = 0;
var set_recipient = "";
var count = 0;
// INITIAL VALUES

// INITIALIZE LABELS
var result = document.getElementById("result");
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var notifCount = document.getElementById("notif_count");
var void_count = document.getElementById("void_count");
var ol = document.getElementById("ol");
// INITIALIZE LABELS
var faculty_indicator = document.getElementById("faculty_indicator");
// INITIALIZE ANNOUNCEMENT FIELDS
var subject = document.getElementById("subject_field");
var message = document.getElementById("message_announce");
// INITIALIZE ANNOUNCEMENT FIELDS

// INITIALIZE MODAL DIV
var rcpt_modal = document.getElementById("rcpt_modal");
// INITIALIZE MODAL DIV

// INITIALIZE RECIPIENT OPTION
var recipient = document.getElementById("recipient_option");
// INITIALIZE RECIPIENT OPTION

// ONCHANGE & ONINPUT FOR ANNOUNCEMENT

// ONCHANGE & ONINPUT FOR ANNOUNCEMENT

// ONCLICK FOR ANNOUNCEMENT
function createAnnouncementAction() {
    rcpt_modal.classList.add("active");
}

function sendAnnouncement() {
    if(recipient.value != "") {
        if(subject.value != "") {
            if(message.value != "") {
                console.log(recipient.value);
                if(recipient.value==="ALL") {
                        console.log("ALLLLL");
                        var allNotif = {};
                        allNotif.subject = subject.value;
                        allNotif.message = message.value;
                        allNotif.topic = "/topics/HK";
                        selectedAllNotif(allNotif);
                }
                var topic = recipient.value == "Handog Kaibigan Program" ? "HK" : "SA"; 
                notif.subject = subject.value;
                notif.message = message.value;
                notif.topic = "/topics/"+topic;
                $.ajax({
                    url:"Notification.php",
                    method:"POST",
                    data: notif,
                    success: function(res) {
                        console.log("RESU " + res);
                    }
                })
                sendToRecipient(muser.email, recipient.value, subject.value, message.value, dateOfAnnounce());
            }else {
                alert("Empty Message")
            }
        } else {
            alert("Empty Subject")
        }
    }
}
function deleteThis(e) {
    var rowId = event.target.parentNode.parentNode.id;
    var data_sub = document.getElementById(rowId).querySelector(".row-data-sub");
    var data_id = document.getElementById(rowId).querySelector(".row-data-id");
    var data_date = document.getElementById(rowId).querySelector(".row-data-date");
    var data_mess = document.getElementById(rowId).querySelector(".whole-message");
    deleteAnnouncement(data_sub.innerHTML, data_mess);
    e.closest(".msg").remove();
}
function view() {

    var rowId = event.target.parentNode.parentNode.id;
    var data_recipient = document.getElementById(rowId).querySelector(".row-data-recipient");
    var data_sub = document.getElementById(rowId).querySelector(".row-data-sub");
    var data_date = document.getElementById(rowId).querySelector(".row-data-date");
    var data_mess = document.getElementById(rowId).querySelector(".whole-message");

    localStorage.setItem("date", data_date.innerHTML);
    localStorage.setItem("message", data_mess.innerHTML);
    localStorage.setItem("recipient", data_recipient.innerHTML);
    window.location.href = "announcement-viewing.html";
}

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
// ONCLICK FOR ANNOUNCEMENT

// DISPLAY DATA
displayAnnouncementData();
//displayAcademicYear();
displaySchoolYearAndSemester();
displayNotifCount();
displayProfileImageAndUsername();
voidCount();
// DISPLAY DATA

// METHODS HERE
function displayAnnouncementData() {
    
    db.collection("CSDL").doc("Announcement").collection("announcements").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            var jsonData = doc.data();
            var subject = jsonData["subject"];
            var message = jsonData["message"];
            var date = jsonData["date"];
            var recipient = jsonData["recipient"];

            var to = recipient.length >= 2 ? recipient[0] + " & " + recipient[1] : recipient[0];
            let createLi = ""
            createLi += `<li class="msg" id="${row_id}">
            <div class="overflow-text">
            <div class="overflow-sub">
            <span class="message-subject"><strong class="row-data-sub">${subject}</strong> <b style="color: rgba(240, 248, 255, 0)" class="row-data-date">${date}</b><b style="color: rgba(240, 248, 255, 0)" class="row-data-recipient">${to} </b><b style="color: rgba(240, 248, 255, 0)" class="row-data-id">${doc.id} </b></span>&nbsp
            </div>
            <div class="overflow-message">
            <p class="whole-message" style="color: rgba(0, 0,0,.3);"> ${message}.</p>
            </div>
            </div>
            <button class="btn-delete" onclick="deleteThis(this)">&times;</button>
            <button class="btn-view"><a href="#" onclick="view()">view</a></button>
            </li>`

            ol.innerHTML += createLi
            resultCount+=1;
            row_id+=1;
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error) => {
        console.log("ERROR FETCHING ANNOUNCEMENT DATA " + Error.message);
    })
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
function sendToRecipient(email, recip,subject, message) {
    addUserLogs(announce_log, recip, subject, message);
      var announce_data = {
        email : email,
        date : datetime,
        subject : subject,
        message : message,
        isRead : false
    };
    let createLi = ""
    createLi += `<li class="msg" id="${row_id + 1}">
    <div class="overflow-text">
    <div class="overflow-sub">
    <span class="message-subject"><strong class="row-data-sub">${subject}</strong> <b style="color: rgba(240, 248, 255, 0)" class="row-data-date">${date}</b><b style="color: rgba(240, 248, 255, 0)" class="row-data-recipient">${recipient}</b></span>&nbsp
    </div>
    <div class="overflow-message">
    <p class="whole-message" style="color: rgba(0, 0,0,.3);"> ${message}.</p>
    </div>
    </div>
    <button class="btn-delete" onclick="deleteThis(this)">&times;</button>
    <button class="btn-view"><a href="#" onclick="view()">view</a></button>
    </li>`
    ol.innerHTML += createLi
    resultCount+=1;
    displayResultCount();
    rcpt_modal.classList.remove("active");
    if(recip === "ALL") {
        toAllRecipient(email,hk, subject, message, datetime);
        return;
    }
   db.collection("CSDL").doc("Student").collection("students").where("applied_scholarship","==", recip).get().then((queryDocs) => {
       queryDocs.forEach((doc) => {
           if(doc.exists) {
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).collection("announcements").doc().set(announce_data).then(function() {
                    //console.log("Success sending announcement");
                })
           }
       })
   }).catch((Error) => {
       console.log(Error.message);
   })
   db.collection("CSDL").doc("Announcement").collection("announcements").doc().set({
              
    email : email,
    date : datetime,
    subject : subject,
    message : message,
    recipient : [recip]
   }).then(function() {
    console.log("SEND ALL ANNOUNCEMENT");
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function selectedAllNotif(allNotif) {
    $.ajax({
        url:"Notification.php",
        method:"POST",
        data: allNotif,
        success: function(res) {
            //console.log("RESU " + res);
        }
    })
}
function toAllRecipient(email, recip,subject, message, datetime) {

    var announce_all = {
        email : email,
        date : datetime,
        subject : subject,
        message : message,
        recipient : [hk, sa]
    };
    db.collection("CSDL").doc("Announcement").collection("announcements").doc().set(announce_all).then(function() {
 
    }).catch((Error) => {
        console.log(Error.message);
    })
    
}

function deleteAnnouncement(subject, message) {
 db.collection("CSDL").doc("Announcement").collection("announcements").where("subject", "==", subject).get().then((queryDocs) => {
    queryDocs.forEach((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var to = jsonData["recipient"];
            var recip = to[0];
            addUserLogs(announceremove_log, recip, subject, message);
            db.collection("CSDL").doc("Announcement").collection("announcements").doc(doc.id).delete().then(() => {
                resultCount-=1;
                displayResultCount();
            }).catch((Error) => {
                console.log(Error.message);
            })
            return
        }
    })
})
}
function displayResultCount() {
    result.innerHTML = "Result : " + resultCount;
}
function displayNotifCount() {
    notifCount.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
    notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
}
function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    console.log(syText);
    school_year.innerHTML = syText;
}
function displaySchoolYearAndSemester() {
    var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
    var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
    var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
    school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
  
}
function getSemester() {
    if(month >= 6 && month <= 10) {
        return "1st Semester"
    } else {
        return "2nd Semester"
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
function getSchoolYear() {
    var sy = "";
    if(month >= 6 && month <= 10) {
        sy =  year + " " + parseInt(year + 1);
    } else {
        sy =  parseInt(year - 1) + "-" + year ;
    }
    return sy;
}

function dateOfAnnounce() {
    var m_month = getMonthName(month + 1);
    var m_day = _date;
    var m_year = year;
    var datetime =  m_month + " " + m_day + ", " + m_year;
    return datetime;
}
function addUserLogs(log, to , subject, message) {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc().set({
        activity : log,
        date : getDate(),
        time : getTime(),
        data : {
            to : to,
            from : "CSDL Department",
            subject : subject,
            message : message,
        }
      }).then(() => {
       
      }).catch((Error) => {

      })
}
function voidCount() {
    db.collection("CSDL").doc("Faculty").collection("faculties").where("report" , "==", "yes").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                console.log(doc.data());
                count+=1;
            } else {
                console.log("Dodsadas")
            }
        })
    }).then(() => {
        displayVoidNotif();
    }).catch((Error) => {

    })
}
function displayVoidNotif() {
    if(count == 0) {
        faculty_indicator.innerHTML = "";
        faculty_indicator.style.background = "#00000000";
        return;
    }
    void_count.innerHTML = count;
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

// db.collection("CSDL").doc("Announcement").collection("announcements").where("subject", "==", subject).get().then((queryDocs) => {
//     queryDocs.forEach((doc) => {
//         if(doc.exists) {
//             db.collection("CSDL").doc("Announcement").collection("announcements").doc(doc.id).delete().then(() => {
//                 console.log("Document successfully deleted!")
//                 resultCount-=1;
//                 displayResultCount();
//             }).catch((Error) => {
//                 console.log(Error.message);
//             })
//             return
//         }
//     })
// })