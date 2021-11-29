
// ====> FIREBASE AUTH <========= //
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    muser = firebase.auth().currentUser;
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
var myear = date.getFullYear();
var _date = date.getDate();
// GET CURRENT DATETIME //
// INITIALIZE SUPEADMIN LABELS
var superadmin_username_ = document.getElementById("superadmin_username");
var superadmin_id_ = document.getElementById("superadmin_id");
var superadmin_contact_ = document.getElementById("superadmin_contact");
var superadmin_email_ = document.getElementById("superadmin_email");
var void_count = document.getElementById("void_count");
// Edit and Update
var superadmin_firstname = document.getElementById("superadmin_firstname_field");
var superadmin_lastname = document.getElementById("superadmin_lastname_field");
var superadmin_contact = document.getElementById("superadmin_contact_field");
var superadmin_email = document.getElementById("superadmin_email_field");
var superadmin_oldpassword = document.getElementById("superadmin_oldpassword_field");
var superadmin_newpassword = document.getElementById("superadmin_newpassword_field");
var superadmin_confirmpassword = document.getElementById("superadmin_confirmpassword_field");

var user_name = document.getElementById("user_name");
var notifCount = document.getElementById("notif_count");
var notifBell = document.getElementById("notifBell");
// INITIALIZE SUPEADMIN LABELS
var faculty_indicator = document.getElementById("faculty_indicator");
// INITIAL VALUES
var count = 0;
var mold_password = "";
var muser = "";
var changepic_log = "User change profile picture successfully";
var changepass_log = "User change password successfully";
var changeinfo_log = "User change profile account successfully";
// INITIAL VALUES

// ONFILEEVENT FOR SUPER ADMIN 
    // PROFILE IMAGE
    var loadFile = function(event) {
        var image = document.getElementById("profileImage");
        var image1 = document.getElementById("profileImage1");
        var file = event.target.files[0];
        image.src = URL.createObjectURL(file)
        image1.src = URL.createObjectURL(file)
     
        saveProfileImage(file)
    }
    // PROFILE IMAGE
// ONFILEEVENT FOR SUPER ADMIN 

// ONCLICK ACTION FOR SUPER ADMIN 
    //LOGOUT
        function logout_action() {            
            firebase.auth().signOut().then(() => {
                window.location.href = "log-in.html";
            })
            .catch((error) => {
                console.log("ERROR SIGN OUT: " + error.message);
            });
        }
    //LOGOUT

    // ==> EDIT USER INFO <==== //
    function editUserInfo() {
        const firstName = superadmin_firstname_field.value
        if(superadmin_firstname.value != "" && superadmin_firstname.value != null) {
            if(superadmin_lastname.value != "" && superadmin_lastname.value != null) {
                if(superadmin_contact.value != "" && superadmin_contact.value != null) {
                    if(superadmin_email.value != "" && superadmin_email.value != null) {
                        var user_profile = {
                            first_name : superadmin_firstname.value,
                            last_name : superadmin_lastname.value,
                            email : superadmin_email.value,
                            contact : superadmin_contact.value,
                            superadmin_id : "01-0001-00001"
                        }
                        addUserLogs(changeinfo_log);
                        //updateUserProfile(user_profile,superadmin_email.value);
                    }
                }
            } else {
                console.log("Empty lastname");
            }
        } else {
            console.log("Empy firstname");
        }
    }
     // ==> EDIT USER INFO <==== //
     // ==> CHANGE PASSWORD <==== //
    function changePasswordAction() {
        if(superadmin_oldpassword.value != "" && superadmin_oldpassword.value != null) {
            if(superadmin_newpassword.value != "" && superadmin_newpassword.value != null) {
                if(superadmin_confirmpassword.value != "" && superadmin_confirmpassword.value != null) {
                    var setnew_password = {
                        password : superadmin_newpassword.value
                    }
                    if(mold_password == superadmin_oldpassword.value) {
                       if(superadmin_confirmpassword.value == superadmin_newpassword.value) {
                            updatePassword(setnew_password, superadmin_newpassword.value);
                        } else {
                            alert("NEW PASSWORD AND CONFIRM PASSWORD ARE NOT MATCHED ... ");
                        }
                    } else {
                        alert("NOT MATCH OLD PASSWORD ... ");
                    }
                } 
            } 
        } 
    // ==> CHANGE PASSWORD <==== //
    }
// ONCLICK ACTION FOR SUPER ADMIN 

// DISPLAY DATA
displayCSDLData()
displayProfileImageAndUsername();
displayNotifCount();
getPassword();
voidCount();
// DISPLAY DATA


// METHODS HERE
function displayCSDLData() {
    db.collection("CSDL").doc("Profile").onSnapshot((doc) => {
        if(doc.exists) {
            var jsonData = doc.data()
            var firstName = jsonData["first_name"];
            var lastName = jsonData["last_name"];
            var email = jsonData["email"];
            var contact = jsonData["contact"]; 
            var id = jsonData["superadmin_id"];
            var name = firstName + " " + lastName;

            superadmin_username_.innerHTML = name;
            superadmin_email_.innerHTML = email;
            superadmin_contact_.innerHTML = contact;
            superadmin_id_.innerHTML = id;
            
            superadmin_firstname.value = firstName;
            superadmin_lastname.value = lastName;
            superadmin_email.value = email;
            superadmin_contact.value = contact;
        } else {
            console.log("Document doesn't exist");
        }
    })
}

function displayProfileImageAndUsername() {
   // PROFILE IMAGE DISPLAY
   var image = document.getElementById("profileImage");
   var image1 = document.getElementById("profileImage1");
   var image_name = localStorage.getItem("image_name");
   storage.ref("CSDL/profilePicture/" + image_name).getDownloadURL().then((url) => {
       saveImagetoFirestore(url)
       console.log(url);
       image.src = url;
       image1.src = url;
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
    notifBell.style.background = localStorage.getItem("notif_count") != 0 ? "#e1ae2d" : "#e1ae2d00";
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
function getPassword() {
    db.collection("CSDL").doc("Profile").get().then((doc) => {
        if(doc.exists) {    
            var jsonData = doc.data()
            var oldPassword = jsonData["password"];
            mold_password = oldPassword;
            console.log(mold_password);
        } else {
            console.log("Document Profile doesn't exist");
        }
    }).catch((error) => {
        console.log(error);
    })
}
function updateUserProfile(user_profile,email) {
    if(muser != null ) {
        muser.updateEmail(email).then(function() {
            console.log("Successfully update email auth .. ");
            db.collection("CSDL").doc("Profile").set(user_profile).then(() => {
                addUserLogs(changeinfo_log);
                console.log("Successfully updated the user profile")
            }).catch((error) => {
                console.log(error.message);
            })
        }).catch((error) => {
            console.log(error.message);
            alert(error.message);
        })
    }
}
function updatePassword(new_password, new_passwordString) {
    if(muser != null ) {
        muser.updatePassword(new_passwordString).then(function() {
            console.log("Password auth updated successfully .. ")
            db.collection("CSDL").doc("Profile").update(new_password).then(() => {
                addUserLogs(changepass_log);
                console.log("Successfully updated  the password");
            }).catch((error) => {
                console.log(error.message);
            })
        }).catch((error) => {
            console.log(error.message);
            alert(error.message);
        })
    }

}
function saveImagetoFirestore(url) {
    db.collection("CSDL").doc("Profile").update({
        profile_img : url
    }).then(() => {
        console.log("Success storing profile image")
    }).catch((Error) => {
        console.log(Error.message);
    })
}
function saveProfileImage(file) {
    localStorage.setItem("image_name", file.name);
    var user = firebase.auth().currentUser;
    if(user != null) {
        var storageRef = storage.ref("CSDL/profilePicture/" + file.name);
        storageRef.put(file).then((snapshot) => {
            console.log("SNAPSHOT " + snapshot.url);
            localStorage.setItem("image_url", null);
            addUserLogs(changepic_log);
            //alert("SUCCESS UPLOADING IMAGE ... ");
        }).catch((error) => {
            alert(error.message)
            console.log(error.message);
        })
    } else {
        console.log("USER IS NULL");
    }
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