
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

// GET CURRENT DATETIME //
var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //

// INITIAL VALUES

var edit_log = "student editted schedule";
var resultCount = 0;
var cas = 0;
var cea = 0;
var cite = 0;
var chs = 0;
var css = 0;
var cma = 0;
var coo = 0;
var total_active = 0;
var total_inactive = 0;
var total_male = 0;
var total_female = 0;
var total_all = 0;
var isFilterByDept = false;
var selDept = "";
var count = 0;
// INITIAL VALUES

//INITIALIZE LABELS ELEMENT
var school_year = document.getElementById("school_year");
var user_name = document.getElementById("user_name");
var result = document.getElementById("result")
var notifCount = document.getElementById("notif_count");
var cas_total = document.getElementById("cas_total");
var cea_total = document.getElementById("cea_total");
var cite_total = document.getElementById("cite_total");
var chs_total = document.getElementById("chs_total");
var css_total = document.getElementById("css_total");
var cma_total = document.getElementById("cma_total");
var coo_total = document.getElementById("coo_total");
var result_active = document.getElementById("result_active");
var result_inactive = document.getElementById("result_inactive");
var result_male = document.getElementById("result_male");
var result_female = document.getElementById("result_female");
var result_all = document.getElementById("result_all");
var void_count = document.getElementById("void_count");
//INITIALIZE LABELS ELEMENT

// INITIALIZE SEARCH STUDENT FIELD
var search_student = document.getElementById("search_student_field");
// INITIALIZE SEARCH STUDENT FIELD

// INITIALIZE STUDENT TABLE
var studentTable = document.getElementById("studentTable");
// INITIALIZE STUDENT TABLE

//INITIALIZE MODAL ADD & EDIT DIV VIEW
var modal_edit = document.getElementById("modal_edit");
//INITIALIZE MODAL ADD DIV VIEW

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
// INITIALIZE OPTIONS IN MODAL EDIT
var faculty_indicator = document.getElementById("faculty_indicator");
// INITIALIZE BY DEPARTMENT OPTION
var byDepartment_option = document.getElementById("department_table_option");
var year_file_selection = document.getElementById("year_file_selection");
// ONCHANGE & ONINPUT FOR STUDENT
function year_selection_onchange() {
    findStudentByYearLevelOrDept(year_file_selection.value, selDept);
}
function scholarshipOnChange() {
    console.log(modal_scholarship_option.value);
    if(modal_scholarship_option.value === "Handog Kaibigan Program") {
        setHKScheduleDateTime();
    } else {
        setSAScheduleDateTime();
    }
}
function searchStudentOnInput() {
    if(search_student.value == "") {
        deleteTableRows();
        displayStudentData()
    }
}
function departmentStudentOnChange() {
    if(byDepartment_option.value == "dept") {
        deleteTableRows();
        displayStudentData();
        return;
    }
    findStudentByDepartment(byDepartment_option.value);
}
// ONCHANGE & ONINPUT FOR STUDENT

//ONCLICK ACTIONS FOR STUDENT
    function savechangesAction() {
        var student_duty_details = {
            schedule_time : modal_scheduletime_option.value,
            schedule_day : modal_scheduleday_option.value,
            department : modal_department_option.value,
            faculty_name : modal_faculty_option.value,
            applied_scholarship : modal_scholarship_option.value
        };
        addUserLogs(edit_log);
        updateStudentSchedule(modal_studentid.value,student_duty_details);
    }

    //SEARCH STUDENT
    function searchStudentAction() {
        if(search_student.value != "") {
            findStudentByName(search_student.value);
        }
    }
    //SEARCH STUDENT

    // ===> EDIT <==== //
    function edit() {
        //var modalEdit = document.getElementById("modal_edit");
        modal_edit.classList.add("active");
        // GET SELECTED STUDENT DATA
        var rowId = event.target.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        var name = data[1].innerHTML;
        var year = data[2].innerHTML;
        console.log(id);
        fetchSelectedEditStudent(id)
    }
    // ===> EDIT <==== //

    // ===> VIEW <==== //
    function view() {
    
        var rowId = event.target.parentNode.parentNode.id;
        var data = document.getElementById(rowId).querySelectorAll(".row-data");
        var id = data[0].innerHTML;
        var name = data[1].innerHTML;
        var course = data[2].innerHTML;
        var year = data[3].innerHTML;
       
        console.log("Name " + name + " ID " + id);
    
        localStorage.setItem("student_name", name);
        localStorage.setItem("student_id", id);
        window.location.href = "view-student.html"
    }
    // ===> VIEW <==== //

    // CLOSE EDIT MODAL
    function close_button() {
        var modalEdit = document.getElementById("modal_edit");
        modalEdit.classList.remove("active"); 
    }
    // CLOSE EDIT MODAL

    $("#casFilter").click(function() {
       isFilterByDept = true;
       selDept = "CAS";
       findStudentByDepartment(selDept);
    })
    $("#ceaFilter").click(function() {
        isFilterByDept = true;
        selDept = "CEA";
        findStudentByDepartment(selDept);
    })
    $("#citeFilter").click(function() {
        isFilterByDept = true;
        selDept = "CITE";
        findStudentByDepartment(selDept);
    })
    $("#chsFilter").click(function() {
        isFilterByDept = true;
        selDept = "CHS";
        findStudentByDepartment(selDept);
    })
    $("#cssFilter").click(function() {
        isFilterByDept = true;
        selDept = "CSS";
        findStudentByDepartment(selDept);
    })
    $("#cmaFilter").click(function() {
        isFilterByDept = true;
        selDept = "CMA";
        findStudentByDepartment(selDept);
    })
    $("#cooFilter").click(function() {
        isFilterByDept = true;
        selDept = "COO";
        findStudentByDepartment(selDept);
    })

    function inactiveFilter(){
        findStudentByActiveStatusOrDept("Inactive", selDept);
    }
    function activeFilter(){
        findStudentByActiveStatusOrDept("Active", selDept);
    }
    function maleFilter(){
        findStudentByGenderOrDept("Male", selDept);
    }
    function femaleFilter() {
        findStudentByGenderOrDept("Female", selDept);
    }
    function allFilter() {
        deleteTableRows();
        isFilterByDept = false;
        displayAll();
      
    }
    // LOGOUT
    function logout_action() {
        firebase.auth().signOut().then(() => {
            console.log("user logged out");
         
        })
        .catch((error) => {
            console.log("ERROR SIGN OUT: " + error.message);
        });
        console.log("logout");
    }
    // LOGOUT
//ONCLICK ACTIONS FOR STUDENT

// DISPLAY DATA
displayStudentData();
displayNotifCount();
displayProfileImageAndUsername();
displaySchoolYearAndSemester();
fetchFaculty();
setHKScheduleDateTime();
countAllScholarsInAllDepartment();
voidCount();
// DISPLAY DATA



// FIND STUDENT BY DEPARTMENT

function saveStudentAction() {
   var student_id = document.getElementById("addid_field").value;
    var add_department_field = document.getElementById("adddepartment_option").value;
    var add_faculty_option = document.getElementById("addfaculty_optional").value;
    var add_scheduletime_option = document.getElementById("addschedule-time_option").value;
    var add_scheduleday_option = document.getElementById("addschedule-day_option").value;

    var student_dutydetails = {
        department : add_department_field,
        faculty : add_faculty_option,
        schedule_time : add_scheduletime_option,
        schedule_day : add_scheduleday_option
    }
    if(student_id === "" || student_id == null) {
        alert("Empty Fields");
        return;
    }
    saveStudents(student_id, student_dutydetails);
}

// METHODS HERE
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
                var option = `
                    <option value="${fullname}">${fullname}</option>
                    `
                    modal_faculty_option.innerHTML+=option;
            }
        })
    }).catch((error) => {
        console.log(error.message)
    })
}
function displayAcademicYear() {
    var syText = getSemester() + " | " + getSchoolYear();
    school_year.innerHTML = syText;
}
function findStudentByYearLevelOrDept(year, dept) {
    deleteTableRows()
    var row_id = 1;
    var docRef;
    if(isFilterByDept) {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("year","==", year).where("department", "==", dept);
    } else {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("year","==",year);
    }
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                var jsonData = doc.data();
                            
                var name = jsonData["fullname"];
                var id = jsonData["student_id"];
                var course = jsonData["course"];
                var year = jsonData["year"];

                var row = `<tr id = ${row_id}>
                    <td class="row-data">${id}</td>
                    <td class="row-data">${name}</td>
                    <td class="row-data">${course}</td>
                    <td class="row-data">${year}</td>
    
                    <td>
                    <button class="view" onclick="view()"> view</button>
                    <button class="edit" onclick="edit()">edit</button  
                    </td>`
             studentTable.innerHTML += row;
             row_id+=1;
            } else {
                console.log("Document doesn't exist");
            }
        })
    })
}
function findStudentByActiveStatusOrDept(status, dept) {
    deleteTableRows()
    var row_id = 1;
    var docRef;
    if(isFilterByDept) {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("active_status", "==", status).where("department", "==", dept);
    } else {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("active_status", "==", status);
    }
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                var jsonData = doc.data();
                            
                var name = jsonData["fullname"];
                var id = jsonData["student_id"];
                var course = jsonData["course"];
                var year = jsonData["year"];
                var row = `<tr id = ${row_id}>
                    <td class="row-data">${id}</td>
                    <td class="row-data">${name}</td>
                    <td class="row-data">${course}</td>
                    <td class="row-data">${year}</td>
                    <td>
                    <button class="view" onclick="view()"> view</button>
                    <button class="edit" onclick="edit()">edit</button  
                    </td>`
             studentTable.innerHTML += row;
             row_id+=1;
            } else {
                console.log("Document doesn't exist");
            }
        })
    })
}
function findStudentByGenderOrDept(gender, dept) {
    deleteTableRows();
    var row_id = 1;
    var docRef;
    if(isFilterByDept) {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("gender", "==", gender).where("department", "==", dept);
    } else {
        docRef = db.collection("CSDL").doc("Student").collection("students").where("gender", "==", gender);
    }
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                var jsonData = doc.data();
                            
                var name = jsonData["fullname"];
                var id = jsonData["student_id"];
                var course = jsonData["course"];
                var year = jsonData["year"];

                var row = `<tr id = ${row_id}>
                    <td class="row-data">${id}</td>
                    <td class="row-data">${name}</td>
                    <td class="row-data">${course}</td>
                    <td class="row-data">${year}</td>
    
                    <td>
                    <button class="view" onclick="view()"> view</button>
                    <button class="edit" onclick="edit()">edit</button  
                    </td>`
             studentTable.innerHTML += row;
             row_id+=1;
            } else {
                console.log("Document doesn't exist");
            }
        })
    })
}
function findStudentByDepartment(department) {
    deleteTableRows()
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").where("department" , "==", department).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                var jsonData = doc.data();
                            
                var name = jsonData["fullname"];
                var id = jsonData["student_id"];
                var course = jsonData["course"];
                var year = jsonData["year"];

                var row = `<tr id = ${row_id}>
                    <td class="row-data">${id}</td>
                    <td class="row-data">${name}</td>
                    <td class="row-data">${course}</td>
                    <td class="row-data">${year}</td>
    
                    <td>
                    <button class="view" onclick="view()"> view</button>
                    <button class="edit" onclick="edit()">edit</button  
                    </td>`
             studentTable.innerHTML += row;
             row_id+=1;
            resultCount+=1;
             var department = jsonData["department"];
             var active_status = jsonData["active_status"];
             var gender = jsonData["gender"];
             total_all+=1;
             if(active_status==="Active") {
                 total_active+=1;
             }
             if(active_status==="Inactive") {
                 total_inactive+=1;
             }
             if(gender==="Male") {
                 total_male+=1;
             }
             if(gender==="Female") {
                 total_female+=1;
             }
             if(department==="CAS") {
                 cas+=1;
             }
             if(department==="CEA") {
                 cea+=1;
             }
             if(department==="CITE") {
                 cite+=1;
             }
             if(department==="CHS") {
                 chs+=1;
             }
             if(department==="CSS") {
                 css+=1;
             }
             if(department==="CMA") {
                 cma+=1;
             }
             if(department==="COO") {
                 coo+=1;
             }
            } else {
                console.log("Document doesn't exist");
            }
        })
    }).then(() => {
        displayResultCount();
        displayTotalCountByFilter();
    }).catch((error) => {
        console.log(error);
    })
}

// ===> Display STUDENT DATA <=== //
function displayStudentData() {  
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
               console.log(jsonData);
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var course = jsonData["course"];
                var year = jsonData["year"];
                var id = jsonData["student_id"];
                
                var schedule_time = jsonData["schedule_time"];
                var scheudule_day = jsonData["schedule_day"];
                var faculty = jsonData["faculty"];
                if(schedule_time == "" || scheudule_day == "" || faculty == "") {
                    return;
                }
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName
                      
                var row = `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td>
                <button class="view" onclick="view()"> view</button>
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
   
    }).catch((Error) => {
        console.log("ERROR FETCHIN ALL STUDENT DATA " + Error.message);
    })
}
function displayAll() {  
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
                
                var schedule_time = jsonData["schedule_time"];
                var scheudule_day = jsonData["schedule_day"];
                var faculty = jsonData["faculty"];
                if(schedule_time == "" || scheudule_day == "" || faculty == "") {
                    return;
                }
                const middileInitial = middleName.charAt(0);
                const fullname = firstName + " " + middileInitial + " " + lastName;
                var row = `<tr id = ${row_id}>
                <td class="row-data">${id}</td>
                <td class="row-data">${fullname}</td>
                <td class="row-data">${course}</td>
                <td class="row-data">${year}</td>
                <td>
                <button class="view" onclick="view()"> view</button>
                <button class="edit" onclick="edit()">edit</button  
                </td>`
                studentTable.innerHTML += row;
                row_id+=1;
                resultCount+=1;
                var department = jsonData["department"];
                var active_status = jsonData["active_status"];
                var gender = jsonData["gender"];
                total_all+=1;
                if(active_status==="Active") {
                    total_active+=1;
                }
                if(active_status==="Inactive") {
                    total_inactive+=1;
                }
                if(gender==="Male") {
                    total_male+=1;
                }
                if(gender==="Female") {
                    total_female+=1;
                }
            } else {
                console.log("Data Doesn't exist");
            }
        })
    }).then(() => {
        displayResultCount();
        displayTotalCountByFilter();
    }).catch((Error) => {
        console.log("ERROR FETCHIN ALL STUDENT DATA " + Error.message);
    })
}
// ===> Display STUDENT DATA <=== //
// ===> UPDATE STUDENT SCHEDULE <=== //
function updateStudentSchedule(studentid,student_duty_details) {
    deleteTableRows();
    db.collection("CSDL").doc("Student").collection("students").where("student_id", "==", studentid).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                db.collection("CSDL").doc("Student").collection("students").doc(doc.id).update(student_duty_details).then(() => {
                    console.log("Update Student Duty Details")
                    displayStudentData();
                    modal_edit.classList.remove("active");
                    // location.reload();
                    // return false;
                }).catch((error) => {
                    console.log(error);
                })
            }
        })
    }).catch((Error) => {
        console.log(Error.message);
    })
}
// ===> UPDATE STUDENT SCHEDULE <=== //
// ===> FETCH SELECTED STUDENT <=== //
function fetchSelectedEditStudent(id) {
    db.collection("CSDL").doc("Student").collection("students").where("student_id" , "==" ,id).get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var firstName = jsonData["first_name"];
                var lastName = jsonData["last_name"];
                var middleName = jsonData["middle_name"];
                var id = jsonData["student_id"];
                var year = jsonData["year"];
                var scholarship = jsonData["applied_scholarship"]
    
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                var department  = jsonData["department"];
    
                modal_student_firstname.value = firstName;
                modal_student_lastname.value = lastName;
                modal_student_middlename.value = middleName;
                modal_studentid.value = id;
                modal_scholaryear_option.value = year;
                modal_scholarship_option.value = scholarship;
    
                modal_faculty_option.value = faculty;
                modal_scheduletime_option.value = schedule_time;
                modal_scheduleday_option.value = schedule_day;
                modal_department_option.value = department;
            } else {
                console.log("Dosent exist")
            }
        })
    }).then(() => {

    }).catch((Error) => {
        console.log("ERROR FETCHING EDIT STUDENT " + Error.message);
    })
}
// ===> FETCH SELECTED STUDENT <=== //
// ===> FIND STUDENT BY NAME <==== //
function findStudentByName(name) {
    deleteTableRows();
    var row_id = 1;
    db.collection("CSDL").doc("Student").collection("students").where("fullname" , "==", name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                            
                var name = jsonData["fullname"];
                var id = jsonData["student_id"];
                var course = jsonData["course"];
                var year = jsonData["year"];
                var scholarship = jsonData["applied_scholarship"]
                var faculty = jsonData["faculty"];
                var schedule_time = jsonData["schedule_time"] ;
                var schedule_day = jsonData["schedule_day"];
                if(schedule_time == "" || schedule_day == "" || faculty == "") {
                    return;
                }
                var row = `<tr id = ${row_id}>
                          <td class="row-data">${id}</td>
                          <td class="row-data">${name}</td>
                          <td class="row-data">${course}</td>
                          <td class="row-data">${year}</td>
              
                          <td>
                          <button class="view" onclick="view()"> view</button>
                          <Button class="edit" onclick="edit()">edit</Button  
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
    }).catch((error) => {
        console.log("ERROR QUERY " + error.message);
    });
}
// ===> FIND STUDENT BY NAME <==== //
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

// COUNT SCHOLARS IN EVERY DEPARTMENT
function countAllScholarsInAllDepartment() {
    db.collection("CSDL").doc("Student").collection("students").get().then((queryDocs) => {
        queryDocs.forEach((doc) => {
            if(doc.exists) {
                var jsonData = doc.data();
                var department = jsonData["department"];
                var active_status = jsonData["active_status"];
                var gender = jsonData["gender"];
                var faculty = jsonData["faculty"];
                var sched_day = jsonData["schedule_day"];
                var sched_time = jsonData["schedule_time"];
                if(faculty=="" || sched_day=="" || sched_time=="") {
                    return;
                }
                total_all+=1;
                if(active_status==="Active") {
                    total_active+=1;
                }
                if(active_status==="Inactive") {
                    total_inactive+=1;
                }
                if(gender==="Male") {
                    total_male+=1;
                }
                if(gender==="Female") {
                    total_female+=1;
                }
                if(department==="CAS") {
                    cas+=1;
                }
                if(department==="CEA") {
                    cea+=1;
                }
                if(department==="CITE") {
                    cite+=1;
                }
                if(department==="CHS") {
                    chs+=1;
                }
                if(department==="CSS") {
                    css+=1;
                }
                if(department==="CMA") {
                    cma+=1;
                }
                if(department==="COO") {
                    coo+=1;
                }
            }
        })
    }).then(() => {
        displayTotalScholarsInDepartmentsAndActiveStatus();
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function displayTotalScholarsInDepartmentsAndActiveStatus() {
    cas_total.innerHTML = cas;
    cea_total.innerHTML = cea;
    cite_total.innerHTML = cite;
    chs_total.innerHTML = chs;
    css_total.innerHTML = css;
    cma_total.innerHTML = cma;
    coo_total.innerHTML = coo;

    result_active.innerHTML = `&nbsp;${total_active}`;
    result_inactive.innerHTML = `&nbsp;${total_inactive}`;
    result_male.innerHTML = `&nbsp;${total_male}`;
    result_female.innerHTML = `&nbsp;${total_female}`;
    result_all.innerHTML = `&nbsp;${total_all}`;
}
function displayTotalCountByFilter() {
    result_active.innerHTML = `&nbsp;${total_active}`;
    result_inactive.innerHTML = `&nbsp;${total_inactive}`;
    result_male.innerHTML = `&nbsp;${total_male}`;
    result_female.innerHTML = `&nbsp;${total_female}`;
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
    var option_day = `
    <option value="Mon/Wed">Mon/Wed</option>
    <option value="Tue/Thur">Tue/Thur</option>
    <option value="Wed/Fri">Wed/Fri</option>
    <option value="Thurs/Sat">Thurs/Sat</option>
    `
    modal_scheduleday_option.innerHTML = option_day;
}
function addUserLogs(log) {
    db.collection("CSDL").doc("Userlogs").collection("logs").doc().set({
        activity : log,
        date : getDate(),
        time : getTime()
      }).then(() => {
      
      }).catch((Error) => {

      })
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
    var option_day = `
    <option value="Mon-Fri">Mon-Fri</option>
    `
    modal_scheduleday_option.innerHTML = option_day;
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
function displayResultCount() {
    result.innerHTML = resultCount;
}
function deleteTableRows() {
    resultCount = 0;
    total_active = 0;
    total_inactive = 0;
    total_male = 0;
    total_female = 0;
  
    var len = studentTable.rows.length;
    var headerRowIndex = 1;
    for(var i=headerRowIndex; i<len; i++) {
        studentTable.deleteRow(headerRowIndex);
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

// function displayProfileImageAndUsername() {
 
//     // FETCH IMAGE URL N DISPALY
//     var image_name = localStorage.getItem("image_name");
//     var profileImage = document.getElementById("profileImage");
//     var image_url = localStorage.getItem("image_url");
//     var username = localStorage.getItem("user_name");

//     console.log(image_url);
//         if(image_url != null) {
//             profileImage.src = image_url
//         } else {
//             storage.ref("CSDL/profilePicture/" + image_name).getDownloadURL().then((url) => {

//                 localStorage.setItem("image_url", url)
//                 profileImage.src = url;
                
//             }).catch((error) => {
//                 console.log(error.message);
//             })
//         }
//         if(username != null) {
//             console.log("USERNAME LOCAL IS NOT NULL " + username)
//             user_name.innerHTML = username
//         } else {
//             console.log("USERNAME LOCAL IS  NULL")
//             db.collection("CSDL").doc("Profile").get().then((doc) => {
//                 if(doc.exists) {
//                     var jsonData = doc.data();
//                     var firstName = jsonData["first_name"];
//                     user_name.innerHTML = firstName;
//                     localStorage.setItem("user_name", firstName);
                 
//                 }
//             }).catch((Error) => {
//                 console.log(Error.message);
//             })
//         }
// }