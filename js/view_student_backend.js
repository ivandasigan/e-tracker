
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
// INTIALIZE FIRESTORE & STORAGE
var db = firebase.firestore();
var storage = firebase.storage();
// INTIALIZE FIRESTORE & STORAGE

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //
var student_profileImage = document.getElementById("student_profileImag");
// DIV
var notif_bell = document.getElementById("notif_bell");
// INITIALIZE LABELS
var user_name = document.getElementById("user_name");
var school_year = document.getElementById("school_year");
var notifCount = document.getElementById("notif_count");
// INITIALIZE LABELS

// INITIALIZE STUDENT INFO LABELS 
var student_name = document.getElementById("student_name");
var student_id = document.getElementById("student_id")
var student_course = document.getElementById("student_course");
var student_department = document.getElementById("student_department");
var student_year = document.getElementById("student_year");
var student_email = document.getElementById("student_email");
var student_contact = document.getElementById("student_contact");
// INITIALIZE STUDENT INFO LABELS 

// INITIALIZE STUDENT DUTY LABELS 
var student_status = document.getElementById("student_status");
var student_sem = document.getElementById("student_sem");
var student_sy = document.getElementById("student_sy");
var faculty = document.getElementById("faculty");
var student_scholarship = document.getElementById("student_scholarship");
var student_schedule = document.getElementById("student_schedule");
var student_hour = document.getElementById("student_hour");
// INITIALIZE STUDENT DUTY LABELS 

// DISPLAY DATE 
displayStudentData();
displayProfileImageAndUsername();
displayNotifCount();
displaySchoolYearAndSemester();
// DISPLAY DATE 


// METHODS HERE
// ==> DISPLAY SELECTED STUDENT DATA <=== //
function displayStudentData() {
    var studentName = localStorage.getItem("student_name");
    var studentID = localStorage.getItem("student_id");
    console.log(studentID);
    var count = 0;
    console.log(studentName);
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", studentID).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    console.log(doc.data());
                    count+=1;
                    var jsonData = doc.data();
                    var id = jsonData["student_id"];
                    var name = jsonData["fullname"];
                    var course = jsonData["course"];
                    var department = jsonData["department"];
                    var schedule = jsonData["schedule_day"] + " " + jsonData["schedule_time"];
                    var scholarship = jsonData["applied_scholarship"];
                    var facultyy = jsonData["faculty"];
                    var email = jsonData["email"];
                    var year = jsonData["year"];
                    var contact = jsonData["contact"];
                    var active_status = jsonData["active_status"];
                    var profile_img = jsonData["profile_img"];
                    var total_hours = jsonData["total_hours"];
                    student_name.innerHTML = name;
                    student_id.innerHTML = id;
                    student_course.innerHTML = course;
                    student_department.innerHTML = department;
                    student_year.innerHTML = year;
                    student_email.innerHTML = email;
                    faculty.innerHTML = facultyy;
                    student_scholarship.innerHTML = scholarship;
                    student_schedule.innerHTML = schedule;
                    student_contact.innerHTML = contact;
                    student_status.innerHTML = active_status;
                    student_hour.innerHTML = total_hours;
                    if(profile_img != "") {
                        student_profileImage.src = profile_img;
                    } else {
                        student_profileImage.src = "img/default_user_image.png";
                    }
                } else {
                    console.log("Document doesn't exist");
                }
            })
    }).catch((error) => {
        console.log(error);
    });

    // STUDENT DUTY DETAILS
    // semester.innerHTML = getSemester().charAt(0);
    // student_sy.innerHTML = getSchoolYear();

}
// ==> DISPLAY SELECTED STUDENT DATA <=== //

// ===> DISPLAY SCHOOL YEAR <==== //
function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    school_year.innerHTML = syText;
}
// ===> DISPLAY SCHOOL YEAR <==== //

// ==> DISPLAY STUDENT DATA <==== //
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
    student_sem.innerHTML = schoolSemesterLabel;
    student_sy.innerHTML = schooYearLabel;
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
    switch (month + 1) {
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
            return "September";
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
// METHODS END HERE  