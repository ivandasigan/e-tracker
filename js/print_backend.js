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

//INITIALIZE VALUES
var logout_log = "User logged out";
var signin_log = "User has been logged in";

var remove_faculty_log = "Faculty has been removed";
var edit_faculty_log = "Faculty's subject code has been updated";
var add_faculty_log = "Faculty's subject code has been added";
var import_faculty_log = "New Faculty Data imported";
var void_accept_log = "Void request accepted";
var void_reject_log = "Void request rejected";

var accept_log = "New applicant accepted";
var reject_log = "New applicant rejected";

var setsched_log = "Student has been set schedule successfully";
var import_student_log = " New Student data imported";
var edit_student_log = " Student schedule editted successfully"

var renew_log = " Renewed student";

var semester_log = "School year and semester sets successfully";

var changepic_log = "User change profile picture successfully";
var changepass_log = "User change password successfully";
var changeinfo_log = "User change profile account successfully";

var announce_log = "New announcement has been created";
var announceremove_log = "Announcement has been removed";
// INITIALIZE LABEL ELEMENT
var activity = document.getElementById("activity");
var date = document.getElementById("date");
// INITIALIZE LABEL ELEMENT
// INITIALIZE TABLE
var transaction_table = document.getElementById("transaction_table");
// INITIALIZE TABLE
var wrapper_back = document.getElementById("b");
// DISPLAY DATA HERE

var isPrintable = localStorage.getItem("isPrint");
displayTransactionByActivity();
if(isPrintable == "true") {
    wrapper_back.innerHTML = "";
}

date.innerHTML = localStorage.getItem("dateOfactivity");
activity.innerHTML = localStorage.getItem("activity");


function displayTransactionByActivity() {
    var activity = localStorage.getItem("activity");
    console.log(activity)
    console.log(localStorage.getItem("logs_docid"));
    if(activity==signin_log || activity==logout_log) {
     
        displayTransactionLoginoutSuperAd();
    } else if(activity==accept_log || activity==reject_log) {
    
        displayTransactionApplicant();
    } else if(activity==add_faculty_log || activity==edit_faculty_log || activity==import_faculty_log || activity==remove_faculty_log) {

        displayTransactionFaculty();
    } else if(activity==setsched_log || activity==import_student_log || activity==edit_student_log) {

        displayTransactionStudent();
    } else if(activity==renew_log) {

        displayTransactionRenewal();
    } else if(activity==announce_log || activity==announceremove_log) {

        displayTransactionAnnouncement();
    } else if(activity==semester_log) {
    
        displayTransactionSettings();
    } else if(activity==changepass_log || activity==changepic_log || activity==changeinfo_log) {
     
        displayTransactionProfile();
    } else if(activity==void_accept_log || activity==void_reject_log) {
       
        displayTransactionVoidRequest();
    }
}
// LOGIN / LOG OUT
function displayTransactionLoginoutSuperAd() {
    db.collection("CSDL").doc("Profile").get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var firstname = jsonData["first_name"];
            var lastname = jsonData["last_name"];
            var id = jsonData["superadmin_id"];
            var time = localStorage.getItem("timeOfactivity");
            var date = localStorage.getItem("dateOfactivity");
            var position = "Super Admin";
            var fullname = firstname + " " + lastname;
            transaction_table.innerHTML = `
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Date</th>
            <th>Time</th>
            </tr>
            `
            var row = `
            <tr>
            <td>${id}</td>
            <td>${fullname}</td>
            <td>${position}</td>
            <td>${date}</td>
            <td>${time}</td>
            </tr>
            `
            transaction_table.innerHTML+=row;
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}

// =====> STUDENT <====== //
function displayTransactionStudent() {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var users = jsonData["users"];
            transaction_table.innerHTML = `
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Scholarship</th>
            <th>Schedule Day</th>
            <th>Schedule Time</th>
            <th>Faculty</th>
            </tr>
            `
            users.forEach((item) => {
                innerStudentTable(item);
            })
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
function innerStudentTable(id) {
    db.collection("CSDL").doc("Student").collection("students").doc(id).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var id = jsonData["student_id"];
            var firstname = jsonData["first_name"];
            var middlename = jsonData["middle_name"];
            var lastname = jsonData["last_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var scholarship = jsonData["applied_scholarship"];
            var scheduleday = jsonData["schedule_day"];
            var scheduletime = jsonData["schedule_time"];
            var faculty = jsonData["faculty"];
            var fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
            var row = `
            <tr>
            <td>${id}</td>
            <td>${fullname}</td>
            <td>${course}</td>
            <td>${year}</td>
            <td>${scholarship}</td>
            <td>${scheduleday}</td>
            <td>${scheduletime}</td>
            <td>${faculty}</td>
            </tr>
        `
        transaction_table.innerHTML+=row;
        }
    })
}
// =====> STUDENT <====== //

// ====> RENEW <====== //
function displayTransactionRenewal() {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var users = jsonData["users"];
            transaction_table.innerHTML = `
            <th> ID </th>
            <th> Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Department</th>
            <th>Scholarship</th>
            <th>Schedule Day</th>
            <th>Schedule Time</th>
            <th>Total hours</th>
            `
            users.forEach((item) => {
                innerStudentTableRenew(item);
            })
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
function innerStudentTableRenew(id) {
    db.collection("CSDL").doc("Student").collection("students").doc(id).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var id = jsonData["student_id"];
            var firstname = jsonData["first_name"];
            var middlename = jsonData["middle_name"];
            var lastname = jsonData["last_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var department = jsonData["department"];
            var scholarship = jsonData["scholarship"];
            var scheduleday = jsonData["schedule_day"];
            var scheduletime = jsonData["schedule_time"];
            var totalhours = jsonData["total_hours"];
            var fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
            var row = `
            <tr>
            <td>${id}</td>
            <td>${fullname}</td>
            <td>${course}</td>
            <td>${year}</td>
            <td>${department}</td>
            <td>${scholarship}</td>
            <td>${scheduleday}</td>
            <td>${scheduletime}</td>
            <td>${totalhours}</td>
            </tr>
        `
        transaction_table.innerHTML+=row;
        }
    })
}
// ====> RENEW <====== //

// ====> ANNOUNCEMENT <==== //
function displayTransactionAnnouncement() {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var data = jsonData["data"];
            var date = jsonData["date"];
            var to = data["to"];
            var subject = data["subject"];
            var message = data["message"];
            var from = "CSDL Department";
            transaction_table.innerHTML = `
            <tr>
            <th>To</th>
            <th>From</th>
            <th>Subject</th>
            <th>Message</th>
            <th style="width: 100px;">Date</th>
            </tr>
            `
            var row = `
            <tr>
            <td>${to}</td>
            <td>${from}</td>
            <td>${subject}</td>
            <td>${message}</td>
            <td>${date}</td>
            </tr>
            `
            transaction_table.innerHTML+=row;
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
// ====> ANNOUNCEMENT <==== //
// ====> SETTINGS <====== //
function displayTransactionSettings() {
    db.collection("CSDL").doc("Profile").get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var firstname = jsonData["first_name"];
            var lastname = jsonData["last_name"];
            var id = jsonData["superadmin_id"];
            var fullname = firstname + " " + lastname;
            transaction_table.innerHTML = `
            <tr>
            <th>Name</th>
            <th>ID</th>
            </tr>
            `
            var row = `
            <tr>
            <td>${fullname}</td>
            <td>${id}</td>
            </tr>
            `
            transaction_table.innerHTML+=row;
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
// ====> SETTINGS <====== //
// ====> FACULTY <====== //
function displayTransactionFaculty() {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var users = jsonData["users"];
            transaction_table.innerHTML = `
            <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Department</th>
            <th>Subject Code</th>
            </tr>
            `
            users.forEach((item) => {
                innerFacultyTable(item);
            })
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
function innerFacultyTable(id) {
    db.collection("CSDL").doc("Faculty").collection("faculties").doc(id).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var name = jsonData["fullname"];
            var id = jsonData["faculty_id"];
            var department = jsonData["department"];
            var subjectcode = jsonData["subject_code"];
            var row = `
                <tr>
                <td>${name}</td>
                <td>${id}</td>
                <td>${department}</td>
                <td>${subjectcode}</td>
                </tr>
            `
            transaction_table.innerHTML+=row;
        }
    })
}
// ====> FACULTY <====== //
// =====> APPLICANTS <====== //
function displayTransactionApplicant() {
    var i=0;
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var users = jsonData["users"];
            transaction_table.innerHTML = `
            <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Course</th>
            <th>Year</th>
            <th>Scholarship</th>
            <th>Phone Number</th>
            <th>Email</th>
            </tr>
            `
            users.forEach((item) => {
                setTimeout( async() => {
                    innerApplicantTable(item)
                }, 1500 * i)
                i+=1;
            })
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}

function innerApplicantTable(id) {
    db.collection("STUDENT_MOBILE").doc(id).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var firstname = jsonData["Firstname"];
            var middlename = jsonData["Middlename"];
            var lastname = jsonData["Lastname"];
            var id = jsonData["StudentID"];
            var yearcours = jsonData["YearAndCourse"];
            var scholarship = jsonData["AppliedScholarship"];
            var contact = jsonData["Contact"];
            var email = jsonData["Email"];
            var fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
            var splitYearCourse = yearcours.split(" - ");
            var year = splitYearCourse[0];
            var course = splitYearCourse[1];
        
            var row = `
            <tr>
            <td>${fullname}</td>
            <td>${id}</td>
            <td>${course}</td>
            <td>${year}</td>
            <td>${scholarship}</td>
            <td>${contact}</td>
            <td>${email}</td>
            </tr>
            `
            transaction_table.innerHTML+=row;
        }
    }).catch((Error) => {   
        console.log(Error.message);
    })
}
// =====> APPLICANTS <====== //
// =====> VOID <====== //
function displayTransactionVoidRequest() {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(localStorage.getItem("logs_docid")).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var users = jsonData["users"];
            transaction_table.innerHTML = `
            <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Course</th>
            <th>Year</th>
            <th>Scholarship</th>
            <th>Phone Number</th>
            <th>Email</th>
            </tr>`
            users.forEach((item) => {
                innerVoidStudentTable(item);
            })
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
function innerVoidStudentTable(id) {
    db.collection("CSDL").doc("Student").collection("students").doc(id).get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var id = jsonData["student_id"];
            var firstname = jsonData["first_name"];
            var middlename = jsonData["middle_name"];
            var lastname = jsonData["last_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var scholarship = jsonData["scholarship"];
            var fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
            var row = `
            <tr>
            <td>${fullname}</td>
            <td>${id}</td>
            <td>${course}</td>
            <td>${year}</td>
            <td>${scholarship}</td>
            <td>${contact}</td>
            <td>${email}</td>
            </tr>
        `
        transaction_table.innerHTML+=row;
        }
    })
}
// =====> VOID <====== //
// =====> PROFILE <===== //
function displayTransactionProfile() {
    db.collection("CSDL").doc("Profile").get().then((doc) => {
        if(doc.exists) {
            var jsonData = doc.data();
            var firstname = jsonData["first_name"];
            var lastname = jsonData["last_name"];
            var id = jsonData["superadmin_id"];
            var contact = jsonData["contact"];
            var email = jsonData["email"];
            var fullname = firstname + " " + lastname;
            transaction_table.innerHTML = `
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            </tr> 
            `
            var row = `
            <tr>
            <td>${id}</td>
            <td>${fullname}</td>
            <td>${contact}</td>
            <td>${email}</td>
            </tr>
            `
            transaction_table.innerHTML+=row;
        }
    }).then(() => {
        if(isPrintable == "true") {
            setTimeout( async() => {
                window.print();
                localStorage.setItem("isPrint", false);
                window.location.href = "userlogs.html";
            }, 1500 * 1)
        }
    })
}
// =====> PROFILE <===== //
