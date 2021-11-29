
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

// INITILIZE MODIFY CSS PROPERTY
var notif_bell = document.getElementById("notif_bell");
// INITILIZE MODIFY CSS PROPERTY
var faculty_indicator = document.getElementById("faculty_indicator");
// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var myear = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIAL VALUES
var resultCount = 0
var count = 0;
var renew_log = "Renewed student";
// INITIAL VALUES

// INITIALIZE TABLE
var renewTable = document.getElementById("renewTable");

//INITIALIZE LABELS
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var result = document.getElementById("result")
var notifCount = document.getElementById("notif_count");
var void_count = document.getElementById("void_count");
//INITIALIZE LABELS

// INITIALIZE FIELDS
var search_student = document.getElementById("search_student_field");

// ONINPUT & ONCHANGE FOR RENEWAL 
function searchStudentOnInput() {
    if(search_student.value == "") {
        deleteTableRows()
        dipslayRenewal();
    }
}
// ONINPUT & ONCHANGE FOR RENEWAL 

// ONCLICK ACTION FOR RENEWAL
    // ==> SEARCH FIELD <=== //
    function searchAction() {

        findStudentByName(search_student.value);
    }
    // ==> SEARCH FIELD <=== //
    // ===> LOGOUT <===== //
    function logout_action() {
        firebase.auth().signOut().then(() => {
           
        })
        .catch((error) => {
            console.log("ERROR SIGN OUT: " + error.message);
        });
           console.log("logout");
        }
    // ===> LOGOUT <===== //
// ONCLICK ACTION FOR RENEWAL

// DISPLAY DATA
dipslayRenewal();
displayNotifCount();
displaySchoolYearAndSemester();
displayProfileImageAndUsername();
storePrevDTR();
voidCount();
// DISPLAY DATA



// LABEL AVAILABLE SLOTS & TOTAL NUMBER OF HOURS
var availabelSlots = document.getElementById("available_slots");

var numberOfHours = document.getElementById("number_hours");


function renew() {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var id = data[0].innerHTML;
    renewStudentByID(id);
}

// METHODS HERE
function dipslayRenewal() {
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
            var jsonData = doc.data();
            var firstName = jsonData["first_name"];
            var lastName = jsonData["last_name"];
            var middleName = jsonData["middle_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var id = jsonData["student_id"];
            var scholarship = jsonData["applied_scholarship"];
            // Duty Details
            var department = jsonData["department"];
            var faculty = jsonData["faculty"];
            var schedule_time = jsonData["schedule_time"] ;
            var schedule_day = jsonData["schedule_day"];
            var status  = jsonData["status"];
            var total_hours = jsonData["total_hours"];
            if(total_hours < 90) {
                return;
            }        
            const middileInitial = middleName.charAt(0);
            const fullname = firstName + " " + middileInitial + " " + lastName
            var row = `
            <tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${department}</td>
                <td class="row-data">${scholarship}</td>
                <td class="row-data">${schedule_day}</td>
                <td class="row-data">${schedule_time}</td>
                <td class="row-data">${total_hours}</td>
                <td>
                <button class="renew" onclick="renew()"> RENEW</button></td></tr>
            `
            renewTable.innerHTML += row;
            resultCount+=1;
            row_id+=1;
            } else {
                console.log("Document doesn't exist");
            }
        })
    }).then(() => {
        displayResultCount();
    }).catch((error) => {
        console.log("ERROR RETRIEVING STUDENT" + error.messaeg);
    })
}
function renewStudentByID(id) {
    addUserLogs(renew_log, id);
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).update({
                    schedule_day : "",
                    schedule_time : "",
                    faculty : "",
                    total_hours : 0,
                    department : ""
                }).then(function() {
                    deleteTableRows();
                    dipslayRenewal();
                }).catch((Error) => {
                    console.log(Error.message);
                })
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
}

function findStudentByName(name) {
    deleteTableRows()
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").where("fullname", "==", name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
            var jsonData = doc.data();
            var firstName = jsonData["first_name"];
            var lastName = jsonData["last_name"];
            var middleName = jsonData["middle_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var id = jsonData["student_id"];
            var scholarship = jsonData["applied_scholarship"];
            // Duty Details
            var department = jsonData["department"];
            var faculty = jsonData["faculty"];
            var schedule_time = jsonData["schedule_time"] ;
            var schedule_day = jsonData["schedule_day"];
            var status  = jsonData["status"];
            var total_hours = jsonData["total_hours"];
            if(total_hours < 90) {
                return;
            }
            const middileInitial = middleName.charAt(0);
            const fullname = firstName + " " + middileInitial + " " + lastName
        
            var row = `
            <tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${department}</td>
                <td class="row-data">${scholarship}</td>
                <td class="row-data">${schedule_day}</td>
                <td class="row-data">${schedule_time}</td>
                <td class="row-data">${total_hours}</td>
                <td>
                <button class="renew" onclick="renew()"> RENEW</button></td></tr>
            `
            renewTable.innerHTML += row;
            resultCount+=1;
            row_id+=1;
          
            } else {
                console.log("Document doesn't exist");
            }
        })
    }).then(() => {
        displayResultCount();
    })
}
function displayResultCount() {
    result.innerHTML = "Result : &nbsp;&nbsp;" + resultCount;
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
function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    school_year.innerHTML = syText;
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
function storePrevDTR() {
    var i = 0;
    var num_month = month + 1;
    var endSem = localStorage.getItem("end_sem");
    if(num_month == 3 || num_month == 10 || num_month == 5) {
        if(endSem != null) {
            console.log("END SEMESTER IS NOT NULL");
            return;
        }
    localStorage.setItem("end_sem", num_month);
    db.collection("CSDL").doc("Student").collection("students").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var course = jsonData["course"];
                var year = jsonData["year"];
                var id = jsonData["student_id"];
                var scholarship = jsonData["applied_scholarship"];
                // Duty Details
                var department = jsonData["department"];
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var status  = jsonData["status"];
                var total_hours = jsonData["total_hours"];
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
       
                var student_data = {
                    fullname : fullname,
                    first_name : firstName,
                    last_name : lastName,
                    middle_name : middleName,
                    course : course,
                    year : year,
                    student_id : id,
                    applied_scholarship : scholarship,
                    department : department,
                    faculty : faculty,
                    schedule_time : schedule_time,
                    schedule_day : schedule_day,
                    total_hours : total_hours,
                    status : status,
                    semester : getSemester(),
                    school_year : myear
                }
                setTimeout( async() => {
                    db.collection("CSDL").doc("PrevDTR").collection("records").doc().set(student_data).then(function() {
                        console.log("Success saving previous record")
                }).catch((Error) => {
                    console.log(Error.messaege)
                })
                }, 1000 * i);
                i+=1;
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
 } else {
    localStorage.removeItem("end_sem");
 }
}
function deleteTableRows() {
    resultCount = 0;
    var len = renewTable.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        renewTable.deleteRow(headerRowIndex);
    }
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
function getSchoolYear() {
    var sy = "";
    if(month >= 6 && month <= 10) {
        sy =  year + " " + parseInt(year + 1);
    } else {
        sy =  parseInt(year - 1) + "-" + year ;
    }
    return sy;
}
function addUserLogs(log, id) {
    db.collection("CSDL").doc("Userlogs").collection("logs").where("date", "==", getDate()).where("time", "==", getTime()).where("activity", "==", log).get().then((queryDocs) => {
        if(queryDocs.empty) {
            db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", id).get().then((queryDocs) => {
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
                db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", id).get().then((queryDocs) => {
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
function addUserlogToArr(docid, student_userid) {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc(docid).update({
        users: firebase.firestore.FieldValue.arrayUnion(student_userid)
    }).then(() => {
        console.log("successfully udpate users")
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
    var m_year = myear;
    var datetime =  m_month + " " + m_day + ", " + m_year;
    return datetime;
  }
// TODO: => Firebase 
// var renewTable = document.getElementById("renewTable");
// var len = renewTable.rows.length;
// var row = `<tr id = ${len}>
//     <td class="row-data"></td>
//     <td class="row-data"></td>
//     <td class="row-data"></td>
//     <td class="row-data"></td>
//     <td class="row-data"></td>
//     <td class="row-data"></td>  
//     <td class="row-data"></td>
//     <td class="row-data"></td>    
//     <td>
//     <button class="renew" onclick="renew()"> view</button>`
// dtrTable.innerHTML += row;