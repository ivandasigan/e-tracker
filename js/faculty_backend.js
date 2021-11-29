// ====> FIREBASE AUTH <========= //
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
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
            window.location.href = "log-in.html";
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
var faculty_indicator = document.getElementById("faculty_indicator");
//INITIAL VALUES
var count = 0;
var listofUserID = [];
var resultCount = 0;
var void_accept_log = "Void request accepted";
var void_reject_log = "Void request rejected";
var remove_log = "Faculty has been removed";
var edit_log = "Faculty's subject code has been updated";
var add_log = "Faculty's subject code has been added";
var import_log = "New Faculty Data imported";
var logout_logs = "User logged out";
//INITIAL VALUES

//INITIALIZE OPTIONS
var departmentTableOption = document.getElementById("department_table_option");
//INITIALIZE OPTIONS

//INITIALIZE SEARCH FACULTY FIELD
var search_faculty = document.getElementById("search_faculty_field");
//INITIALIZE SEARCH FACULTY FIELD

//INITIALIZE MODAL ADD & EDIT DIV VIEW
var modal_add = document.getElementById("modal_add");
var modal_edit = document.getElementById("modal_edit");
//INITIALIZE MODAL ADD DIV VIEW

// INITIALIZE FIELDS IN MODAL ADD
var faculty_id = document.getElementById("modal_add_id");
var faculty_lastname = document.getElementById("modal_add_lastname");
var faculty_firstname = document.getElementById("modal_add_firstname");
var faculty_middlename = document.getElementById("modal_add_middlename");
var faculty_subjectcode = document.getElementById("modal_add_subjectcode");
// INITIALIZE FIELDS IN MODAL ADD

// INITIALIZE FIELDS IN MODAL EDIT
var edit_faculty_id = document.getElementById("modal_edit_facultyid");
var edit_faculty_lastname = document.getElementById("modal_edit_lastname");
var edit_faculty_firstname = document.getElementById("modal_edit_firstname");
var edit_faculty_middlename = document.getElementById("modal_edit_middlename");
var edit_faculty_subjectcode = document.getElementById("subject_code");
// INITIALIZE FIELDS IN MODAL EDIT

//INITIALIZE TABLE
var faculty_Table = document.getElementById("faculty_Table");
//INITIALIZE TABLE

//INITIALIZE LABELS
var school_year = document.getElementById("school_year");
var resultLabel = document.getElementById("result");
var notif_count = document.getElementById("notif_count");
var user_name = document.getElementById("user_name");
var void_count = document.getElementById("void_count");
//INITIALIZE LABELS

// ONINPUT & ONACTION  FOR FACULTY

function departmentTableOnChange() {
    console.log(departmentTableOption.value);
    if(departmentTableOption.value == "dept") {
        deleteTableRows();
        displayFaculty();
        return;
    }
    findFacultyByDepartment(departmentTableOption.value);
}

function faculty_ID_oninput() {
    if(faculty_id.value.length >= 10) {
        findFacultyByID(faculty_id.value);
    }
}
function searchFacultyOnInput() {
    if(search_faculty.value == "") {
        deleteTableRows()
        displayFaculty()
    }
}
// ONINPUT & ONACTION FOR FACULTY

// ONCLICK ACTIONS FOR FACULTY
    // ===> SEARCH <===== //
    function searchAction() {
        console.log(search_faculty.value);
        findFacultyByName(search_faculty.value);
    }
    // ===> SEARCH <===== //

    // ===> SAVE <==== //
    function saveFacultyAction() {
        var ID = faculty_id.value;
        var fullname = faculty_firstname.value + " " + faculty_lastname.value;
        var subjectCode = faculty_subjectcode.value;
    
        if(ID != "") {
            var subjectcode_data = {
                subject_code : subjectCode
            };
            assignSubjectCode(ID, subjectcode_data);
            return;
            // errorx.innerHTML = "Successfully Added."
        } 
    }
    // ===> SAVE <==== //

    // ===> VIEW <==== //
    function view() {
        var rowId = event.target.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        var name = data[1].innerHTML;
    
        localStorage.setItem("faculty_name", name);
        localStorage.setItem("faculty_id", id);
        window.location.href = "view-faculty.html";
    }
    // ===> VIEW <==== //

    // ===> EDIT <==== //
    function edit() {
        modal_edit.classList.add("active");
        //GET SELECTED DATA
        var rowId = event.target.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        var name = data[1].innerHTML;
        var splitName = name.split(" ");
        var firstname = splitName[0];
        var lastName = splitName[1];

        // GET DATA FROM FIRESTORE
        db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var firstName = jsonData["first_name"];
                    var lastName = jsonData["last_name"];
                    var middleName = jsonData["middle_name"];
                    var id = jsonData["faculty_id"];
                    var subjectCode = jsonData["subject_code"];
    
                    edit_faculty_id.value = id;
                    edit_faculty_firstname.value = firstName;
                    edit_faculty_lastname.value = lastName;
                    edit_faculty_middlename.value = middleName;
    
                    if(subjectCode == null) {
                        edit_faculty_subjectcode.value = "None";
                    } else {
                        edit_faculty_subjectcode.value = subjectCode;
                    }
    
                }
            })
        }).catch((Error) => {
            console.log("ERROR FETCHING FACULTY " + Error.message);
        })
    }
    // ===> EDIT <==== //

    // ===> DELETE / REMOVE <==== //
    function remove() {
        var rowId = event.target.parentNode.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        console.log(id);
        removeFaculty(id);
    }
    // ===> Accept Request Void <==== //
    function acceptRequestAction() {
        var rowId = event.target.parentNode.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        acceptVoidRequest(id);
    }
    // ===> Reject Request Void <==== //
    function rejectRequestAction() {
        var rowId = event.target.parentNode.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        rejectFacultyRequestVoid(id);
    }

    function deleteAllFacultyAction() {
        deleteAllFaculties();
    }
    // ===> SAVE CHANGES <===== //
    function saveChangesAction() {
        var id = edit_faculty_id.value;
        var name = edit_faculty_firstname.value + " " + edit_faculty_lastname.value;
        if(id != "") {
            var faculty_data = {
                subject_code : edit_faculty_subjectcode.value
            }
            saveEditFaculty(id, faculty_data);
        }
    }
    // ===> SAVE CHANGES <===== //
    // OPEN FILE MANAGER & DISPLAY IN TABLE
    var loadFile = function(event) {
        
        deleteTableRows();
        var row_id = 1;
        var file = event.target.files[0];
        readXlsxFile(file).then(function(data) {
        var index = 0;
        data.forEach((row, i) => {           
            if(index == 0) {
                //console.log(row[0] + row[1])
            } else {
                var email = row[0];
                var password = row[1];
                var id = row[2];
                var firstname = row[3];
                var middlename = row[4];
                var lastname = row[5];
                var contact = row[6];
                var fullname = firstname + " " + middlename.charAt(0) + " " + lastname;
                var department = row[7];

                var faculty_data = {
                    faculty_id : id,
                    email : email,
                    password : password,
                    first_name : firstname,
                    middle_name : middlename,
                    last_name : lastname,
                    contact : String(contact),
                    department : department,
                    fullname : fullname,
                    profile_img : "",
                    report : "no"
                }

                var row = 
                `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${department}</td> 
                <td>
                <button class="view" onclick="view()"> view</button>
                <Button class="edit" onclick="edit()">edit</Button>
                <button class="delete" onclick="remove()"><i class="fa fa-trash"></i></button>
                </td>
                <td style="position: relative;">
                <center>
                <button class="void-indicator one">Accept</button>
                <button class="void-indicator two">Reject</button>
                </center>
                </td>
                </tr>`
                setTimeout( async() => {
                    faculty_Table.innerHTML+=row;
                    row_id+=1;
                    resultCount+=1;
                    displayResultCount();
                    addUserLogs(import_log, id);
                    createNewAccountFromImport(id,email, password, faculty_data);
                }, 3000 * i)
            }    
            index+=1;
        })
       
    }).catch((Error) => {
        alert(Error.message);
    }) 
    }

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
// ONCLICK ACTIONS FOR FACULTY

// DISPLAY DATA
displayFaculty();
displayNotifCount();
displayProfileImageAndUsername();
displaySchoolYearAndSemester();
voidCount();
// DISPLAY DATA



// METHODS HERE
function acceptVoidRequest(id) {
    addUserLogs2(void_accept_log, id);
    db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                changeReportFaculty(doc.id);
                getStudentToVoidTimein(doc.id);
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function getStudentToVoidTimein(facultyid) {
    var i=0;
    db.collection("CSDL").doc("Report").collection("report").doc(facultyid).collection("request").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var hours = jsonData["TOTAL_HOURS"];
                setTimeout( async() => {
                    deductHoursToStudent(doc.id, hours, facultyid);
                }, 1000 * i)
                i+=1;
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function deductHoursToStudent(student_id, hours, facultyid) {
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", student_id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var total_hours = jsonData["total_hours"];
                var deduct_hours = total_hours - hours;
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).update({
                    total_hours : deduct_hours
                }).then(() => {
                    console.log("Successfully deducted");
                    deleteVoidRequestWhenDone(facultyid, student_id);
                })
            }
        })
    })
}
function deleteVoidRequestWhenDone(facultyid, stud_id) {
    db.collection("CSDL").doc("Report").collection("report").doc(facultyid).collection("request").doc(stud_id).delete().then(() => {
        console.log("DELETED REQUEST VOID")
    })
}
function rejectFacultyRequestVoid(id) {
    addUserLogs2(void_reject_log, id);
    db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists){
                db.collection("CSDL").doc("Report").collection("report").doc(doc.id).delete().then(() => {
                    console.log("delete faculty request void");
                })
            }
        })
    }).catch((Error) => {

    })
}
function changeReportFaculty(id) {
    deleteTableRows();
    db.collection("CSDL").doc("Faculty").collection("faculties").doc(id).update({
        report : "no"
    }).then(() => {
        console.log("Successfully change report of faculty")
        displayFaculty();
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function checkFacultyIfAlreadyExists(id, index ,name) {
    db.collection("CSDL").doc("Faculty").collection("faculties").doc(id).get().then((doc) => {
        if(!doc.exists) {
            console.log("NOT EXISTS")
        } else {
            console.log("ALREADY EXISTs")
            existAccount[index] = name;
            index++;
        }
    }).catch((Error) => {
        console.log(error.message);
    })
}

    function deleteAllFaculties() {
        var batch = db.batch();
        db.collection("CSDL").doc("Faculty").collection("faculties").get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var docRef = db.collection("CSDL").doc("Faculty").collection("faculties").doc(doc.id);
                    batch.delete(docRef);
                }
            })
        }).then(() => {
            batch.commit().then(() => {
                console.log("Successfully DELETED ALL")
            });
        })
    }
    // ==> ASSIGN SUBJECT CODE TO FACULTY <==== //
    function assignSubjectCode(id, data) {
        db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    db.collection("CSDL").doc("Faculty").collection("faculties").doc(doc.id).update(data).then(() => {
                        console.log("SUCCCESS ADDING SUBJECT CODE!!");
                        clearAll(id,fname,lname,mname,scode);
                        addUserLogs(add_log, id);
                        modal_add.classList.remove("active");
              
                    }).catch((Error) => {
                        console.log("ERROR SAVING SUBJECT CODE " + Error.message);
                        modal_add.classList.remove("active");
                    })
                }
            })
        }).catch((Error) => {
            console.log(Error.message);
        }) 
    }
    // ==> ASSIGN SUBJECT CODE TO FACULTY <==== //

    // ==> FETCH FACULTY <== //
    function displayFaculty() {
        var row_id = 1;
        db.collection("CSDL").doc("Faculty").collection("faculties").get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var firstName = jsonData["first_name"];
                    var lastName = jsonData["last_name"];
                    var middleName = jsonData["middle_name"];
                    var department = jsonData["department"];
                    var id = jsonData["faculty_id"];
                    var report = jsonData["report"];
                    const fullname = firstName + " " + middleName.charAt(0) + " " + lastName;
                    var row = 
                        `<tr id = ${row_id}>
                        <td class="row-data">${id}</td>
                        <td class="row-data">${fullname}</td>
                        <td class="row-data">${department}</td> 
                        <td>
                        <button class="view" onclick="view()">View</button>
                        <button class="edit" onclick="edit()">Edit</button>  
                        <button class="delete" onclick="remove()"><i class="fa fa-trash"></i></button>
                        </td>
                        <td style="position: relative;">
                        `
                        if(report=="yes") {
                            row+=`
                            <center>
                            <button class="void-indicator one" onclick="acceptRequestAction()">Accept</button>
                            <button class="void-indicator two" onclick="rejectRequestAction()">Reject</button>
                            </center>
                            </td>
                            </tr>
                            `
                        } else {
                            row+=`
                            <center>
                            N/A
                            </center>
                            </td>
                            </tr>
                            `
                        }
  
                    faculty_Table.innerHTML+=row;
                    row_id+=1;
                    resultCount+=1;
                }
            })
        }).then(()=> {
            displayResultCount();
        }).catch((Error) => {
            console.log("ERROR FETCHING DATA " + Error.message)
        })  
    }
    // ==> FETCH FACULTY <== //
    // ===> Display AcadYear <=== //
    function displayAcademicYear() {
        var syText = getSemester() + " | " + getSchoolYear();
        school_year.innerHTML = syText;
    }
    // ===> Display AcadYear <=== //
    // ==> DISPLAY RESULT COUNT <=== //
    function displayResultCount() {
        resultLabel.innerHTML = resultCount;
    }
    // ==> DISPLAY RESULT COUNT <=== //
    // ==> DISPLAY NOTIF COUNT <== //
    function displayNotifCount() {
        var count = 0;
        db.collection("STUDENT_MOBILE").where("grant", "==", false).onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if(change.type === "added") {
                 count+=1;
            } 
        })
        localStorage.setItem("notif_count", count);
        notif_count.innerHTML = localStorage.getItem("notif_count") != 0 ? localStorage.getItem("notif_count") : "";
        notif_bell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
        })
    }
    // ==> DISPLAY NOTIF COUNT <== //
    // ==> USER PROFILE IMAGE <== //
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
    // ==> USER PROFILE IMAGE <== //

    // ===> SAVE EDIT FACULTY <==== //
    function saveEditFaculty(id, data) {
        addUserLogs(edit_log, id);
        deleteTableRows();
        db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    db.collection("CSDL").doc("Faculty").collection("faculties").doc(doc.id).update(data).then(() => {
                        clearAll(id,fname,lname,mname,scode);
                        displayFaculty();
                        modal_edit.classList.remove("active");
                        console.log("SUCCESS UPDATE FACULTY SUBJECR CODE");
                    }).catch((Error) => {
                        console.log("ERROR EDITING FACULTY " + Error.message);
                    })
                } else {
                    console.log("Not exist")
                }
            })
        }).catch((Error) => {
            console.log(Error.message); 
        })
    }
    // ===> SAVE EDIT FACULTY <==== //

    // ===> FIND FACULTY BY ID <==== //
    function findFacultyByID(id) {
        db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    faculty_id.value = jsonData["faculty_id"];
                    faculty_firstname.value = jsonData["first_name"];
                    faculty_lastname.value = jsonData["last_name"];
                    faculty_middlename.value = jsonData["middle_name"];
               
                    console.log(jsonData["middle_name"])
                } else {
                    console.log("Document doesnt exist");
                }
            })
        }).catch((Error) => {
            console.log("ERROR FINDING STUDENT BY ID " + Error.message);
        })
    }
    // ===> FIND FACULTY BY ID <==== //
    // ===> FIND FACULTY BY NAME <==== //
    function findFacultyByName(name) {
        deleteTableRows();
        var row_id = 1;
        db.collection("CSDL").doc("Faculty").collection("faculties").where("fullname", "==", name).get().then((queryDocs) => {
                queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var id = jsonData["faculty_id"];
                    var firstName = jsonData["first_name"];
                    var lastName = jsonData["last_name"];
                    var department = jsonData["department"];
                    var fullname = firstName + " " + lastName;
                    //faculty_middlename.value = jsonData["middle_name"];
                    var row = 
                        `<tr id = ${row_id}>
                        <td class="row-data">${id}</td>
                        <td class="row-data">${fullname}</td>
                        <td class="row-data">${department}</td> 
                        <td>
                        <button class="view" onclick="view()"> view</button>
                        <Button class="edit" onclick="edit()">edit</Button>  
                        <button class="delete" onclick="remove()"><i class="fa fa-trash"></i></button>
                        </td>
                        <td class="row-data" style="position: relative;">
                        <center>
                        <button class="void-indicator one">Accept</button>
                        <button class="void-indicator two">Reject</button>
                        </center>
                        </td>
                        </tr>`
                    faculty_Table.innerHTML+=row;
                    row_id+=1;
                    resultCount+=1;
                } else {
                    console.log("Document doesnt exist");
                }
            })
        }).then(() => {
            displayResultCount();
        }).catch((Error) => {
            console.log("ERROR FINDING STUDENT BY NAME " + Error.message);
        })
    }
    // ===> FIND FACULTY BY NAME <==== //
    // ===> FIND FACULTY BY DEPARTMENT <==== //
    function findFacultyByDepartment(department) {
        deleteTableRows();
        var row_id = 1;
        db.collection("CSDL").doc("Faculty").collection("faculties").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var id = jsonData["faculty_id"];
                    var firstName = jsonData["first_name"];
                    var lastName = jsonData["last_name"];
                    var fullname = firstName + " " + lastName;
                    var department = jsonData["department"];
                    
                    var row = 
                    `<tr id = ${row_id}>
                    <td class="row-data">${id}</td>
                    <td class="row-data">${fullname}</td>
                    <td class="row-data">${department}</td> 
                    <td>
                    <button class="view" onclick="view()"> view</button>
                    <Button class="edit" onclick="edit()">edit</Button>  
                    <button class="delete" onclick="remove()"><i class="fa fa-trash"></i></button>
                    </td>
                    <td class="row-data" style="position: relative;">
                    <center>
                    <button class="void-indicator one">Accept</button>
                    <button class="void-indicator two">Reject</button>
                    </center>
                    </td>
                    </tr>`

                faculty_Table.innerHTML+=row;
                row_id+=1;
                resultCount+=1;
                }
            })
        }).then(() => {
            displayResultCount();
        }).catch((Error) => {
            console.log("ERROR fetCHING BY DEPARTMENT " + Error.message);
        })
    }
    // ===> FIND FACULTY BY DEPARTMENT <==== //
    // ===> SAVE FACULTY FROM IMPORT FILE MANAGER <==== //
    function saveImportFacultyToFireStore(id, faculty_data) {
        //STORE DATA TO FIRESTORE
        console.log(id);
        db.collection("CSDL").doc("Faculty").collection("faculties").doc(id).set(faculty_data).then(function(){
            console.log("Successfully written!")
            //alert("Successfully import faculty");
        }).catch((Error) => {
            console.log("ERROR SAVING FACULTY " + Error.message)
        })
    }
     // ===> SAVE FACULTY FROM IMPORT FILE MANAGER <==== //
    function createNewAccountFromImport(id, email, password, faculty_data) {
                var userID = "";
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(userCredential){
                    // Signed in
                    var user = userCredential.user;
                    userID = user.uid;
                    console.log(user.uid)
                    // ...
                }).then(function() {
                    saveImportFacultyToFireStore(userID, faculty_data)
                    console.log("SUCCESSFULLY CREATE A NEW ACCOUNT")
                }).catch((Error) => {
                    console.log("ERROR CREATE NEW ACCOUNT " + Error.message);
                })
                // db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
                //     queryDocs.forEach((doc) => {
                //         if(!doc.exists){
                //         // CREATE NEW ACCOUNT
                        
                //         } else {
                //             alert("Faculty already exist");
                //         }
                //     })
                // }).catch((Error) => {
                //     console.log(Error.message);
                // })
    }
    // FOR STUDENT USER LOGS
    function addUserLogs2(log, id) {
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
    // FOR STUDENT USER LOGS
    // FOR FACULTY USER LOGS
    function addUserLogs(log, id) {
        db.collection("CSDL").doc("Userlogs").collection("logs").where("date", "==", getDate()).where("time", "==", getTime()).where("activity", "==", log).get().then((queryDocs) => {
            if(queryDocs.empty) {
                db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
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
                    db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
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
    function addUserlogToArr(docid, faculty_userid) {
        db.collection("CSDL").doc("Userlogs").collection("logs").doc(docid).update({
            users: firebase.firestore.FieldValue.arrayUnion(faculty_userid)
        }).then(() => {
            console.log("successfully udpate users")
        })
    }
    // FOR FACULTY USER LOGS
  // ====> REMOVE / DELETE FACULTY <===== //
  function removeFaculty(id) {
      deleteTableRows()
      addUserLogs(remove_log, id);
        db.collection("CSDL").doc("Faculty").collection("faculties").where("faculty_id", "==", id).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    db.collection("CSDL").doc("Faculty").collection("faculties").doc(doc.id).delete().then(() => {
                        console.log("Successfully delete faculty");
                        displayFaculty();
                    }).catch((Error) => {
                        console.log(Error.message);
                    })
                }
            })
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
function deleteTableRows() {
    resultCount = 0;
    var len = faculty_Table.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        faculty_Table.deleteRow(headerRowIndex);
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