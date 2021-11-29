
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

// INITIAL VALUES
var resultCount = 0;
var incomplete = 0;
var complete = 0;
var sem = "1st Semester";
var sy = "2021";
var count = 0;
// INITIAL VALUES

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIALIZE LABELS
var numberOfCompleteDtr = document.getElementById("number_complete_dtr");
var numberOfIncompleteDtr = document.getElementById("number_incomplete_dtr");
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var result = document.getElementById("result")
var notifCount = document.getElementById("notif_count");
var void_count = document.getElementById("void_count");
// INITIALIZE LABELS
var faculty_indicator = document.getElementById("faculty_indicator");
// INITIALIZE DTR TABLE
var dtrTable = document.getElementById("dtrTable");
// INITIALIZE DTR TABLE
// INITIALIZE SEARCH DTR FIELD
var search_DTR = document.getElementById("search_DTR_field");
// INITIALIZE SEARCH DTR FIELD

// ONCHANGE & ONINPUT FOR DTR
function searchDTROnInput() {
    if(search_DTR.value === "") {
        complete = 0;
        incomplete = 0;
        deleteTableRows();
        dipslayStudentDTR();
    }
}
function year_onselect() {
    var selection_year = document.getElementById("year_selection").value;
    sy = selection_year;
    findStudentByYearAndSemester();
}
function sem_onselect() {
    var selection_semester = document.getElementById("sem_selection").value;
    if(selection_semester == 1) {
        sem = "1st Semester";
    } else {
        sem = "2nd Semester";
    }
    findStudentByYearAndSemester();
}
// ONCHANGE & ONINPUT FOR DTR
// ONCLICK ACTIONS FOR DTR
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
// ONCLICK ACTIONS FOR DTR
// SEARCH FIELD
function searchAction() {

    if(search_DTR.value != "") {
        complete = 0;
        incomplete = 0;
        deleteTableRows();
        findSTRByStudent(search_DTR.value);
    } else {
        alert("Enter a name");
    }
}
// DROPDOWNS < Year selection, Semester Selection>

// DISPLAY DATA
dipslayStudentDTR();
displayProfileImageAndUsername();
displaySchoolYearAndSemester();
displayNotifCount();
voidCount();
//DISPLAY DATA

// METHOD HERE
// ==> DISPLAY STUDENT DATA <==== //
function dipslayStudentDTR() {
   
    db.collection("CSDL").doc("PrevDTR").collection("records").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var jsonData = doc.data();
            var firstName = jsonData["first_name"];
            var lastName = jsonData["last_name"];
            var middleName = jsonData["middle_name"];
            var course = jsonData["course"];
            var year = jsonData["year"];
            var id = jsonData["student_id"];
            var scholarship = jsonData["applied_scholarship"];
            // Duty Details
            var faculty = jsonData["faculty"];
            var schedule_time = jsonData["schedule_time"] ;
            var schedule_day = jsonData["schedule_day"];
            var status  = jsonData["status"];
            var total_hours = jsonData["total_hours"];
            const middileInitial = middleName.charAt(0);
            const fullname = firstName + " " + middileInitial + " " + lastName
            // if(getMonth(month)!="October" || getMonth(month)!="March") {
            //     return;
            // }
            var row = `
                <td>${id}</td>
                <td>${fullname}</td>
                <td>${year}</td>
                <td>${course}</td>
                <td>${scholarship}</td>
                <td>${faculty}</td>
                <td>${schedule_day}</td>
                <td>${schedule_time}</td>
                <td>${total_hours}</td> 
                <td>${total_hours < 90 ? "Incomplete" : "Complete"}</td>
            `
            dtrTable.innerHTML+=row;
            resultCount+=1;
            countStatus(total_hours);
        })
    }).then(() => {
        displayResultCount();
        displayStatus();
    }).catch((error) => {
        console.log("ERROR RETRIEVING STUDENT" + error.messaeg);
    })
}
function findStudentByYearAndSemester() {
    console.log(sem);
    console.log(sy);
    deleteTableRows();
    db.collection("CSDL").doc("PrevDTR").collection("records").where("semester", "==", sem).where("school_year", "==", sy).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(!doc.exists) { return }
                var jsonData = doc.data();
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var course = jsonData["course"];
                var year = jsonData["year"];
                var id = jsonData["student_id"];
                var scholarship = jsonData["applied_scholarship"];
                // Duty Details
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var status  = jsonData["status"];
                var total_hours = jsonData["total_hours"];
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
                // if(getMonth(month)!="October" || getMonth(month)!="March") {
                //     return;
                // }
                var row = `
                    <td>${id}</td>
                    <td>${fullname}</td>
                    <td>${year}</td>
                    <td>${course}</td>
                    <td>${scholarship}</td>
                    <td>${faculty}</td>
                    <td>${schedule_day}</td>
                    <td>${schedule_time}</td>
                    <td>${total_hours}</td> 
                    <td>${total_hours < 90 ? "Incomplete" : "Complete"}</td>
                `
                dtrTable.innerHTML+=row;
                resultCount+=1;
                countStatus(total_hours);
            })
        }).then(() => {
            displayResultCount();
            displayStatus();
        }).catch((error) => {
            console.log("ERROR RETRIEVING STUDENT" + error.messaeg);
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
function countStatus(total_hours) {
    if(total_hours >= 90) {
        complete+=1;
    } else if(total_hours < 90) {
        incomplete+=1;
    }
}
function displayStatus() {
    numberOfCompleteDtr.innerHTML = complete;
    numberOfIncompleteDtr.innerHTML = incomplete;
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
function displayResultCount() {
    result.innerHTML = resultCount + "  &nbsp; &nbsp;|";
}

// ===> FIND DTR By STudent
function findSTRByStudent(name) {
    db.collection("CSDL").doc("PrevDTR").collection("records").where("fullname", '==', name).get().then((queryDocs) => {
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
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var department  = jsonData["department"];
                var total_hours = jsonData["total_hours"];
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
    
                var row = `
                    <td>${id}</td>
                    <td>${fullname}</td>
                    <td>${year}</td>
                    <td>${course}</td>
                    <td>${scholarship}</td>
                    <td>${faculty}</td>
                    <td>${schedule_day}</td>
                    <td>${schedule_time}</td>
                    <td>${total_hours}</td> 
                    <td>${total_hours < 90 ? "Incomplete" : "Complete"}</td>
                `
                dtrTable.innerHTML += row;
                resultCount+=1;
            }
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error) => {
        console.log("ERROR SEARCHING DTR " + Error.messaeg);
    }) 
}
function deleteTableRows() {
    resultCount = 0;

    var len = dtrTable.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        dtrTable.deleteRow(headerRowIndex);
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
function getSchoolYear() {
    var sy = "";
    if(month >= 6 && month <= 10) {
        sy =  year + " " + parseInt(year + 1);
    } else {
        sy =  parseInt(year - 1) + "-" + year ;
    }
    return sy;
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
// METHOD ENDS HERE

// DTR Table

// TODO: => Firebase
// var dtrTable = document.getElementById("dtrTable");
// var row = `<tr id = ${len}>
//     <td class="row-data">${first_name} ${middle_initial} ${last_name}</td>
//     <td class="row-data">${department}</td>
//     <td class="row-data">${year}</td>
//     <td class="row-data">${department}</td>
//     <td class="row-data">${schedule_time} ${schedule_day}</td>
//     <td class="row-data">${scholarship}</td>    
//     <td>
//     <button class="view" onclick="view()"> view</button>
//     <Button class="edit" onclick="show()">edit</Button  
//     </td>`
// dtrTable.innerHTML += row;