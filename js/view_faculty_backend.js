
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

//INITALIZE LOCAL STORAGE
var facultyName = localStorage.getItem("faculty_name");
var facultyID = localStorage.getItem("faculty_id");
//INITALIZE LOCAL STORAGE

//IMAGE SOURCE
var profileImage1 = document.getElementById("profileImage1");
// INITIALIZE LIST
var handleStudentList = document.getElementById("handle_student_list");
// INITIALIZE LIST
// DIV
var notif_bell = document.getElementById("notif_bell");
// INITIALIZE LABELS
var subject_code = document.getElementById("s-code_sy");
var school_year = document.getElementById("school_year");
var faculty_name = document.getElementById("faculty_name");
var faculty_id = document.getElementById("faculty_id");
var faculty_email = document.getElementById("faculty_email");
var faculty_number = document.getElementById("faculty_number");
var faculty_department = document.getElementById("faculty_department");
var faculty_active = document.getElementById("faculty_active");
var faculty_sem = document.getElementById("faculty_sem");
var faculty_sy = document.getElementById("faculty_sy");
var faculty_handle_scholar = document.getElementById("handle");
var countNotif = document.getElementById("notif_count");
// INITIALIZE LABELS

// DISPLAY DATA 
displayFacultyData();
displayHandleStudents(facultyName)
displayNotifCount();
displayProfileImageAndUsername();
displaySchoolYearAndSemester();
// DISPLAY DATA 


// METHODS HERE
// ===> DISPLAY FACULTY DATA <=== //
function displayFacultyData() {
    db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==",facultyID).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if (doc.exists) {
                var jsonData = doc.data()
                var contact = jsonData["contact"];
                var department = jsonData["department"];
                var email = jsonData["email"];
                var id = jsonData["faculty_id"];
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var subjectCode = jsonData["subject_code"];
                var image_url = jsonData["profile_img"];
              
                var fullname = firstName + " " + lastName;
                faculty_name.innerHTML = fullname;
                faculty_id.innerHTML = id;
                faculty_email.innerHTML = email;
                faculty_number.innerHTML = contact;
                faculty_department.innerHTML = department;
               
                profileImage1.src = image_url != "" ? image_url : "img/default_user_image.png";
                subject_code.innerHTML = subjectCode != null ? subjectCode : "";
    
            } else {
                console.log("Document doesn't exist");
            }
        })
    }).catch((error) => {
        console.log(error)
    })
    // ==> HANDLE SCHOLARS DATA <== //
    // faculty_sem.innerHTML = getSemester().charAt(0);
    // faculty_sy.innerHTML = getSchoolYear();
}
// ===> DISPLAY FACULTY DATA <=== //
// ===> Dispaly Handle Students <==== //
function displayHandleStudents(faculty) {
    db.collection("CSDL").doc("Student").collection("students").where("faculty", "==", faculty).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data()
                var name = jsonData["fullname"];
                var schedule_day = jsonData["schedule_day"];
                var schedule_time = jsonData["schedule_time"];
                var schedule = schedule_day + " " + schedule_time;
                var student = `
                <div class="handled-students">
                <br>
                
                <span class="students-name subject">${name}</span>
                
                <span class="students-schedule">${schedule}</span>
                </div>
                `
                handleStudentList.innerHTML += student
            } else {
                console.log("Document doesn't exist")
            }
        })
    }).catch((error) => {
        console.log(error)
    })
}
// ===> Dispaly Handle Students <==== //
    // ===> Display AcadYear <=== //
    function displayAcademicYear() {
        var syText = getSemester() + " | " + getSchoolYear();
        school_year.innerHTML = syText;
    }
    // ===> Display AcadYear <=== //
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
     
    countNotif.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
    notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
    })
}


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
function displaySchoolYearAndSemester() {
    var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
    var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
    var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
    school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
    faculty_sem.innerHTML = schoolSemesterLabel
    faculty_sy.innerHTML = schooYearLabel;
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