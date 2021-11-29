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

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIAL VALUES
var status_active = "Inactive";
var totalHours = 0;
var userIDs = [];
var student_datas = [];
var resultCount = 0;
var setsched_log = "Student has been set schedule successfully";
var import_log = " New Student data imported";
var edit_log = " Student schedule editted successfully"
var count = 0;
// INITIAL VALUES
var faculty_indicator = document.getElementById("faculty_indicator");
// INITIALIZE LABELS
var school_year = document.getElementById("school_year");
var result = document.getElementById("result");
var notifCount = document.getElementById("notif_count");
var user_name = document.getElementById("user_name");
var void_count = document.getElementById("void_count");
// INITIALIZE LABELS

// INITIALIZE STUDENT TABLE
var studentTable = document.getElementById("studentTable");
// INITIALIZE STUDENT TABLE

// INITIALIZE SEARCH STUDENT FIELD
var search_student = document.getElementById("search_student_field");
// INITIALIZE SEARCH STUDENT FIELD

//INITIALIZED MODAL ADD FIELDS
var department_table_option = document.getElementById("department_table_option");

var first_name = document.getElementById("modal_add_firstname");
var last_name = document.getElementById("modal_add_lastname");
var middle_name= document.getElementById("modal_add_middlename");
var year_option = document.getElementById("modal_add_year_option");

var student_id = document.getElementById("modal_add_id");
var add_department_field = document.getElementById("modal_add_department_option");
var add_faculty_option = document.getElementById("modal_add_faculty_option");
var add_scheduletime_option = document.getElementById("modal_add_scheduletime_option");
var add_scheduleday_option = document.getElementById("modal_add_scheduleday_option");
var add_subjectcode = document.getElementById("modal_add_subjectcode");
//INITIALIZED MODAL ADD FIELDS

// INITIALIZE FIELDS IN MODAL EDIT
var modal_studentid = document.getElementById("modal_edit_studentid");
var modal_student_lastname = document.getElementById("modal_edit_lastname");
var modal_student_firstname = document.getElementById("modal_edit_firstname");
var modal_student_middlename = document.getElementById("modal_edit_middlename");
// INITIALIZE FIELDS IN MODAL EDIT

// INITIALIZE OPTIONS IN MODAL EDIT
var modal_department_option = document.getElementById("modal_edit_department_option");
var modal_scholaryear_option = document.getElementById("modal_edit_schoolyear_option");
var modal_faculty_option = document.getElementById("modal_edit_faculty_option");
var modal_scheduletime_option = document.getElementById("modal_edit_scheduletime_option");
var modal_scheduleday_option = document.getElementById("modal_edit_scheduleday_option");
var modal_scholarship_option = document.getElementById("modal_edit_scholarship_option");
var modal_subjectcode = document.getElementById("modal_edit_subjectcode");
// INITIALIZE OPTIONS IN MODAL EDIT

// ONCHANGE & ONINPUT FOR SET STUDENT SCHEDULE
function searchStudentOnInput() {
    if(search_student.value == "") {
        deleteTableRows();
        displayStudentData();
    }
}
function student_ID_oninput() {
    if(student_id.value.length >= 10) {
        findStudentByID(student_id.value);
    }
}
function departmentStudentOnChange() {
    if(department_table_option.value == "dept") {
        deleteTableRows();
        displayStudentData();
        return;
    }
    findStudentByDepartment(department_table_option.value);
}
// ONCHANGE & ONINPUT FOR SET STUDENT SCHEDULE


//ONCLICK ACTION FOR SET SCHEDULE
function searchAction() {
    findStudentByName(search_student.value)
}

function saveStudentAction() {
     if(student_id.value === "") {
         alert("Empty Student ID");
         return;
     }
     var student_dutydetails = {
        department : add_department_field.value,
        faculty : add_faculty_option.value,
        schedule_time : add_scheduletime_option.value,
        schedule_day : add_scheduleday_option.value,
        subject_code : add_subjectcode.value
    }
    saveStudents(student_id.value, student_dutydetails);
 }

// ===> EDIT MODAL <=== //
function edit() {
    var modal_edit = document.getElementById("modal_edit");
    modal_edit.classList.add("active");
    //GET SELECTED DATA
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelectorAll(".row-data");
    var id = data[0].innerHTML;
    fetchSelectedStudentToEditModal(id);
}
// ===> EDIT MODAL <=== //
// ===> SAVE CHANGES ACTION <===//
function saveChangesAction() {
   if(modal_scheduletime_option.value==""||modal_scheduleday_option.value==""||modal_faculty_option.value=="") {
       return;
   }
    var student_dutydetails = {
        department : modal_department_option.value,
        faculty : modal_faculty_option.value,
        schedule_time : modal_scheduletime_option.value,
        schedule_day : modal_scheduleday_option.value,
        subject_code : modal_subjectcode.value,
    }
    editSchedule(modal_studentid.value, student_dutydetails);
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
    // OPEN FILE MANAGER & DISPLAY IN TABLE
var loadFile = function(event) {
    
    var row_id = 1;
    var file = event.target.files[0];
    readXlsxFile(file).then(function(data) {  
        var index = 0;
        data.forEach((row, i) => {
            if(index != 0) {
                var email = row[0];
                var password = row[1];
                var id = row[2];
                var firstName = row[3];
                var middleName = row[4];
                var lastName = row[5];
        
                var course = row[6];
                var year = row[7];
                var scholarship = row[8];
                var contact = row[9];
                var gender = row[10];
                // var contact = row[10];
                //var department = row[11];
                // var schedule_day = row[9];
                // var schedule_time = row[10];
                // var department = row[11];
                // var subjectcode = row[12];
                // var status = row[13];
                // //var faculty = row[14];
                // var contact = row[15];
                            
                var fullname = firstName + " " + middleName.charAt(0) + " " + lastName;
        
                var student_data = {
                    email : email,
                    student_id : id,
                    fullname : fullname,
                    first_name : firstName,
                    middle_name : middleName,
                    last_name : lastName,
                    course : course,
                    year : year,
                    department : "",
                    subject_code : "",
                    applied_scholarship : scholarship,
                    schedule_day : "",
                    schedule_time : "",
                    faculty : "",
                    status : "Incomplete",
                    contact : String(contact),
                    password : password,
                    active_status : status_active,
                    total_hours : totalHours,
                    profile_img : ""
                };
                var student_details = {
                    AppliedScholarship : scholarship,
                    Contact : String(contact),
                    Firstname : firstName,
                    Lastname : lastName,
                    Middlename : middleName,
                    Password : password,
                    StudentID : id,
                    YearAndCourse : year + " - " + course,
                    grant : true
                }
            var row = `<tr id = ${row_id}>
            <td class="row-data">${id}</td>
            <td class="row-data">${fullname}</td>
            <td class="row-data">${course}</td>
            <td class="row-data">${year}</td>
            <td class="row-data">${scholarship}</td>
            <td class="row-data">${""}</td>
            <td class="row-data">${""}</td>
            <td class="row-data">${""}</td>
            <td>
            <button class="edit" onclick="edit()">edit</button  
            </td>`
            setTimeout( async() => {
                studentTable.innerHTML+=row;
                row_id+=1;
                resultCount+=1;
                console.log(index);
                console.log(fullname);
                addUserLogs(import_log, id);
                createNewAccountFromImport(email, password, student_data, student_details);
            }, 3000 * i);
         }
        index+=1;
        })     
        displayResultCount();           
        }).catch((Error) => {
            alert(Error.message);
            displayStudentData();
        })
    }
function close_button() {

}
//ONCLICK ACTION FOR SET SCHEDULE


// DISPLAY DATA
displayStudentData()
fetchFaculty();
displayNotifCount();
displaySchoolYearAndSemester();
displayProfileImageAndUsername();
setHKScheduleDateTime();
voidCount();
// DISPLAY DATA


// METHODS HERE

function displayStudentData() {  
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
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var department  = jsonData["department"];
                if(faculty != "" || schedule_time != "" || schedule_day != "") {
                    return;
                } 
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
                
                var row = `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${scholarship}</td>
                <td class="row-data">${schedule_day}</td>
                <td class="row-data">${schedule_time}</td>
                <td class="row-data">${faculty}</td>
                <td>
                <button class="edit" onclick="edit()">edit</button  
                </td>`    

            studentTable.innerHTML += row;
            row_id+=1;
            resultCount+=1;
            } else {
                console.log("Data Doesn't exist");
            }
        })
    }).then(() => {
        displayResultCount();
    }).catch((Error => {
        console.log("ERROR FETCHING STUDENT " + Error.message);
    }))

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

// ===> SAVE STUDENT's NEW SCHEDULE <==== //
function saveStudents(id,student_duty_details) {
    addUserLogs(setsched_log, id);
    deleteTableRows()
    var modalAdd = document.getElementById("modal_add");
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).update(student_duty_details).then(() => {
                    console.log("Successfully updated !");
                    displayStudentData();
                    modalAdd.classList.remove("active");
                }).catch((error) => {
                    console.log("ERROR UPDATING DATA " + error.message);
                    modalAdd.classList.remove("active");
                })
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })

 
}
// ===> SAVE STUDENT's NEW SCHEDULE <==== //

  // ===> Display AcadYear <=== //
  function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    school_year.innerHTML = syText;
}
// ===> Display AcadYear <=== //

// EDIT STUDENT's SCHEDULE
function editSchedule(id, student_dutydetails) {
    addUserLogs(edit_log, id);
    deleteTableRows();
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).update(student_dutydetails).then(() => {
                    console.log("SUCCESS UPDATING")
                    displayStudentData();
                    modal_edit.classList.remove("active");
                }).catch((Error) => {
                    console.log(Error.message);
                })
            }
        })
    })
}
// EDIT STUDENT's SCHEDULE
function fetchSelectedStudentToEditModal(id) {
    db.collection("CSDL").doc("Student").collection("students").where("student_id" ,"==", id).get().then((queryDoc) => {
        queryDoc.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var id = jsonData["student_id"];
                var scholarship = jsonData["applied_scholarship"];
                // Duty Details
                var subjectCode = jsonData["subject_code"];
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var department  = jsonData["department"];
    
                modal_studentid.value = id;
                modal_student_firstname.value = firstName;
                modal_student_lastname.value = lastName;
                modal_student_middlename.value = middleName;
                modal_faculty_option.value = faculty;
                modal_scheduletime_option.value = schedule_time;
                modal_scheduleday_option.value = schedule_day;
                modal_department_option.value = department;
                if(subjectCode != null || scholarship === " Handog Kaibigan Program") {
                    modal_subjectcode.value = subjectCode;
                    setHKScheduleDateTime();
                } else {
                    modal_subjectcode.value = "";
                    setSAScheduleDateTime();
                }
            }
        })
    }).catch((Error) => {
        console.log("ERROR FETCHING SELECTED STUDENT " + Error.message);
    })
}
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
function displayResultCount() {
    result.innerHTML = resultCount;
}
    // ===> SAVE OLD STUDENT FROM IMPORT FILE MANAGER <==== //
    async function saveImportStudentDetailsToFireStore(id, student_details) {
        await db.collection("STUDENT_MOBILE").doc(id).set(student_details).then(async function() {
            console.log("Successfully save student details")
        }).catch((Error) => {
            console.log(Error.message);
        })
    }
       async function saveImportStudentDutyToFireStore(id, student_data) {
        //STORE DATA TO FIRESTORE
        let batch = db.batch();
        
        console.log("USER ID FIRESTORE => " + id);
        //var ref = db.collection("CSDL").doc("Student").collection("students").doc(id);
         await db.collection("CSDL").doc("Student").collection("students").doc(id).set(student_data).then( async function(){
            console.log("Successfully written!")
        }).catch((Error) => {
            console.log("ERROR SAVING FACULTY " + Error.message)
        })
        // batch.set(ref, student_data);
        // await batch.commit().then(() => {
        //     console.log("Successfully written!")
        // })
    }
     // ===> SAVE OLD STUDENT FROM IMPORT FILE MANAGER <==== //
     // ===> CREATE ACCOUNT FROM IMPORT FILE MANAGER <==== //
    async function createNewAccountFromImport(email, password, student_date, student_details) {
        var userID = "";
      // CREATE NEW ACCOUNT
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(userCredential){
        // Signed in    
        const user = userCredential.user;
        userID = user.uid;
        console.log(user.uid)
           
        // ...
      }).then(function() {

        saveImportStudentDetailsToFireStore(userID, student_details)
        saveImportStudentDutyToFireStore(userID, student_date)
        console.log("SUCCESSFULLY CREATE A NEW ACCOUNT")
      }).catch((Error) => {
          console.log("ERROR CREATE NEW ACCOUNT " + Error.message);
      })
}

function setHKScheduleDateTime() {
  
    var option_time = `
    <option value="7:30 AM - 9:00 AM">7:30 AM - 9:00 AM</option>
    <option value="9:00 AM - 10:30 AM">9:00 AM - 10:30 AM</option>
    <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM</option>
    <option value="12:00 PM - 1:30 PM">12:00 PM -1:30 PM</option>
    <option value="1:30 PM - 3:00 PM">1:30 PM - 3:00 PM</option>
    <option value="3:00 PM - 4:30 PM">3:00 PM - 4:30 PM</option>
    <option value="4:30 PM - 5:00 PM">4:30 PM - 5:00 PM</option>
    <option value="5:00 PM - 6:30 PM">5:00 PM - 6:30 PM</option>
    `
    modal_scheduletime_option.innerHTML = option_time;
    add_scheduletime_option.innerHTML = option_time;
    var option_day = `
    <option value="Mon/Wed">Mon/Wed</option>
    <option value="Tue/Thur">Tue/Thur</option>
    <option value="Wed/Fri">Wed/Fri</option>
    <option value="Thurs/Sat">Thurs/Sat</option>
    `
    modal_scheduleday_option.innerHTML = option_day;
    add_scheduleday_option.innerHTML = option_day
}
function setSAScheduleDateTime() {

    var option_time = `
    <option value="7:30 AM - 9:00 AM">7:30 AM - 9:00 AM</option>
    <option value="9:00 AM - 10:30 AM">9:00 AM - 10:30 AM</option>
    <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM</option>
    <option value="12:00 PM - 1:30 PM">12:00 PM -1:30 PM</option>
    <option value="1:30 PM - 3:00 PM">1:30 PM - 3:00 PM</option>
    <option value="3:00 PM - 4:30 PM">3:00 PM - 4:30 PM</option>
    <option value="4:30 PM - 5:00 PM">4:30 PM - 5:00 PM</option>
    <option value="5:00 PM - 6:30 PM">5:00 PM - 6:30 PM</option>
    `
    modal_scheduletime_option.innerHTML = option_time;
    add_scheduletime_option.innerHTML = option_time;
    var option_day = `
    <option value="Mon-Fri">Mon-Fri</option>
    `
    modal_scheduleday_option.innerHTML = option_day;
    add_scheduletime_option.innerHTML = option_time;
}

function findStudentByID(id) {
    db.collection("CSDL").doc("Student").collection("students").where("student_id" ,"==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data()
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var year = jsonData["year"];
                var scholarship = jsonData["applied_scholarship"];
                var middleInitial = middleName.charAt(0);
                console.log(jsonData);
                first_name.value = firstName;
                last_name.value = lastName;
                middle_name.value = middleName;
                year_option.value = year;
                if(scholarship === "Handog Kaibigan Program") {
                    setHKScheduleDateTime();
                    console.log("HANDOG")
                } else {
                    console.log("SAKDOG")
                    setSAScheduleDateTime();
                }
            } else {
                console.log("Document doesn't exist")
            }
        })

    }).catch((error) => {
        console.log(error.message);
    })
}
function findStudentByName(name) {
    deleteTableRows();
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").where("fullname", "==", name).get().then((queryDocs) => {
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

                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName;
                var row = `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${scholarship}</td>
                <td class="row-data">${schedule_day}</td>
                <td class="row-data">${schedule_time}</td>
                <td class="row-data">${faculty}</td>
                <td>
                <button class="edit" onclick="edit()">edit</button  
                </td>`    
            studentTable.innerHTML += row;
            row_id+=1;
            resultCount+=1;
            }
        })
    }).then(() => {
        displayResultCount()
    }).catch((Error) => {
        console.log("ERROR SEARCHING BY NAME " + Error.message);
    })
}
function findStudentByDepartment(department) {
    deleteTableRows();
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
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

                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
       
                var row = `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td class="row-data">${scholarship}</td>
                <td class="row-data">${schedule_day}</td>
                <td class="row-data">${schedule_time}</td>
                <td class="row-data">${faculty}</td>
                <td>
                <button class="edit" onclick="edit()">edit</button  
                </td>`    
            studentTable.innerHTML += row;
            row_id+=1;
            resultCount+=1;
            }
        })
    }).then(function(){
        displayResultCount();
    }).catch((Error) => {
        console.log("ERROR FINDING STUDENT BY DEPARTMENT " + Error.message);
    })
}
// ==> FETCH FACULTY TO MODAL ADD
function fetchFaculty() {
    db.collection("CSDL").doc("Faculty").collection("faculties").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var fullname = firstName + " " + middleName.charAt(0) + " " + lastName;
                console.log(jsonData);
                var option = `
                    <option value="${fullname}">${fullname}</option>
                    `
                    add_faculty_option.innerHTML+=option;
                    modal_faculty_option.innerHTML+=option;
            }
        })
    }).catch((error) => {
        console.log(error.message)
    })
}
// ==> FETCH FACULTY TO MODAL ADD
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
function deleteTableRows() {
    resultCount = 0;
    var len = studentTable.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        studentTable.deleteRow(headerRowIndex);
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

// METHODS ENDS HERE