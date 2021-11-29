
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

// INITILIZE MODIFY CSS PROPERTY
var notif_bell = document.getElementById("notif_bell");
// INITILIZE MODIFY CSS PROPERTY

// INITIAL VALUE
var resultCount = 0;
var accept_log = "New applicant accepted";
var reject_log = "New applicant rejected";
// INITIAL VALUE

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIALIZE LABELS
var result = document.getElementById("result");
var notifCount = document.getElementById("notif_count");
var user_name = document.getElementById("user_name");
var school_year = document.getElementById("school_year");
// INITIALIZE LABELS

// ONCLICK ACTIONS FOR APPLICANT
function accept() {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var name = data[0].innerHTML;
    var id = data[1].innerHTML;

    grantStudent(id)
}

function reject() {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var id = data[1].innerHTML;
    rejectStudent(id)
}

    // LOGOUT
    function logout_action() {
        firebase.auth().signOut().then(() => {
         
        })
        .catch((error) => {
            console.log("ERROR SIGN OUT: " + error.message);
        });
        console.log("logout");
    }
    // LOGOUT
// ONCLICK ACTIONS FOR APPLICANT


// DISPLAY DATA
displayApplicants();
displayNotifCount();
displayProfileImageAndUsername();
displaySchoolYearAndSemester();
// DISPLAY DATA


// METHODS HERE
function displayApplicants() {
    var row_id = 1;
    var count = 0;
    var applicantsTable = document.getElementById("applicantsTable");
    db.collection("STUDENT_MOBILE").where("grant", "==", false).onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if(change.type === "added") {
                var jsonData = change.doc.data();
                count+=1;
                const firstname = jsonData["Firstname"]
                const lastname = jsonData["Lastname"]
                const middlename = jsonData["Middlename"]
                //const course = jsonData["course"]
                const contact = jsonData["Contact"]
                const student_id = jsonData["StudentID"]
                const yearandcourse = jsonData["YearAndCourse"]
                const email = jsonData["Email"]
                const applied_scholarship = jsonData["AppliedScholarship"]
                
                const middileInitial = middlename.charAt(0);
                const fullname = firstname + " " + middileInitial + " " + lastname;
                const splitYearAndCourse = yearandcourse.split(" - ");
                const year = splitYearAndCourse[0];
                const course = splitYearAndCourse[1];
                var row = `<tr id = ${row_id}>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${student_id}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${applied_scholarship}</td>
                <td class="row-data">${contact}</td>
                <td class="row-data">${email}</td> 
                <td>
                <button class="accept" onclick="accept()">accept</button>
                <button class="reject" onclick="reject()">reject</button  
                </td>`
                applicantsTable.innerHTML += row;
                row_id+=1;
                resultCount+=1;
            } 
        })
        displayResultCount();
        localStorage.setItem("notif_count", count);
        displayNotifCount();
    })
}
    // ==> USER PROFILE IMAGE <== //
      // ==> USER PROFILE IMAGE <== //
  function displayProfileImageAndUsername() {
    // PROFILE IMAGE DISPLAY
    var image = document.getElementById("profileImage");

    var image_name = localStorage.getItem("image_name");
    storage.ref("CSDL/profilePicture/" + image_name).getDownloadURL().then((url) => {
  
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
    // ==> USER PROFILE IMAGE <== //
    // ===> DISPLAY SCHOOL YEAR <==== //
    function displaySchoolYearAndSemester() {
        var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
        var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
        var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
        school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
    }
    

// ===> DISPLAY SCHOOL YEAR <==== //
function grantStudent(id) {
    addUserLogs(accept_log, id);
    var docID = "";
    db.collection("STUDENT_MOBILE").where("StudentID", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                docID = doc.id;
                var jsonData = doc.data()
                var firstname = jsonData["Firstname"]
                var lastname = jsonData["Lastname"]
                var middlename = jsonData["Middlename"]
          
                var contact = jsonData["Contact"]
                var student_id = jsonData["StudentID"]
                var yearandcourse = jsonData["YearAndCourse"]
                var email = jsonData["Email"]
                var password = jsonData["Password"]
                var applied_scholarship = jsonData["AppliedScholarship"]
                var profile_img = jsonData["profile_img"];

                var splitYearAndCourse = yearandcourse.split(" - ");
                var year = splitYearAndCourse[0];
                var course = splitYearAndCourse[1];

                const fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
                var student_data = {
                    fullname : fullname,
                    first_name : firstname,
                    last_name : lastname,
                    middle_name : middlename,
                    course : course,
                    contact : contact,
                    student_id : student_id,
                    year : year,
                    email : email,
                    applied_scholarship : applied_scholarship,
                    password : password,
                    department : "",
                    faculty : "",
                    schedule_time : "",
                    schedule_day : "",
                    status : "Incomplete",
                    active_status : "Inactive",
                    total_hours : 0,
                    profile_img : profile_img
                };
                storeStudentToCSDL(docID, student_data);
              
            } else {
                console.log("No documents");
            }
        })
    }).then(() => {
        db.collection("STUDENT_MOBILE").doc(docID).update({
            grant : true
        }).then(() => {
            console.log("Success grant updating ..")
            deleteTableRows();
            displayApplicants();
        })
        .catch((error) => {
            console.log(error)
        })
        console.log("DONE ====== ")
    }).catch((error) => {
        console.log(error)
    })
}
function rejectStudent(id) {
    addUserLogs(reject_log, id);
    deleteTableRows()
    db.collection("STUDENT_MOBILE").where("StudentID", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                db.collection("STUDENT_MOBILE").doc(doc.id).update({
                    AppliedScholarship : "",
                    grant : null
                }).then(() => {
                    console.log("Succesfully change scholarship")
                    displayApplicants();
                }).catch((Error) => {
                    console.log(Error.message);
                })
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function displayResultCount() {
    result.innerHTML = "Results : " + resultCount;
}
function displayNotifCount() {
    console.log(localStorage.getItem("notif_count"));
    notifCount.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
    notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
}

function storeStudentToCSDL(doc_id, student_data) {
    db.collection("CSDL").doc("Student").collection("students").doc(doc_id).set(student_data).then(() => {
        console.log("grant new applicant")
     
        alert("Grant new applicant")
    }).catch((error) => {
        console.log(error)
    })
}
function deleteTableRows() {
    resultCount = 0;
    var len = applicantsTable.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        applicantsTable.deleteRow(headerRowIndex);
    }
}
function addUserLogs(log, id) {
    console.log(getDate());
    console.log(getTime());
    db.collection("CSDL").doc("Userlogs").collection("logs").where("date", "==", getDate()).where("time", "==", getTime()).where("activity", "==", log).get().then((queryDocs) => {
        if(queryDocs.empty) {
            db.collection("STUDENT_MOBILE").where("StudentID", "==", id).get().then((queryDocs) => {
                queryDocs.forEach((doc2) => {
                    if(doc2.exists) {
                        db.collection("CSDL").doc("Userlogs").collection("logs").doc().set({
                            activity : log,
                            date : getDate(),
                            time : getTime(),
                            users : [doc2.id]
                          }).then(() => {
                            console.log("created user logs")
                          }).catch((Error) => {
                    
                          })
                    }
                })
            }) 
        } else {
            queryDocs.forEach((doc1) => {
                db.collection("STUDENT_MOBILE").where("StudentID", "==", id).get().then((queryDocs) => {
                    queryDocs.forEach((doc2) => {
                        if(doc2.exists) {
                            addUserlogToArr(doc1.id, doc2.id);
                        }
                    })
                }) 
            })
        }
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function addUserlogToArr(docid, stud_userid) {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(docid).update({
        users: firebase.firestore.FieldValue.arrayUnion(stud_userid)
    }).then(() => {
        console.log("successfully udpate imports")
    })
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
// METHODS END HERE  


// function displayAcademicYear() {
//     var syText = getSemester() + " | " + getSchoolYear();
//     school_year.innerHTML = syText;
// }