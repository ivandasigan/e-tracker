

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(user != null) {
        console.log("user is signed in");
        window.location.href = "addStudent.html";
      } else {
          // user is null
      }
     
    } else {
      // No user is signed in.
      console.log("user is not signed in");
      // window.location.href = "log-in.html";
    }
  });
// INITIALIZE FIRESTORE
  var db = firebase.firestore();

function signUpAction() {
    var signup_firstname = document.getElementById("firstname_field").value;
    var signup_lastname = document.getElementById("lastname_field").value;
    var signup_id = document.getElementById("id_field").value;
    var signup_phonenumber= document.getElementById("phonenumber_field").value;
    var signup_email = document.getElementById("email_field").value;
    var signup_password = document.getElementById("password_field").value;
    var signup_confirmpassword = document.getElementById("confirmpassword_field").value;

    if(signup_firstname != null && signup_firstname != "") {
        if(signup_lastname != null && signup_lastname != "") {
            if(signup_id != null && signup_id != "") {
                if(signup_phonenumber != null && signup_phonenumber != "") {
                    if(signup_email != null && signup_email != "") {
                        if(signup_password != null && signup_password) {
                            if(signup_confirmpassword != null && signup_confirmpassword != "") {
                                if(signup_password === signup_confirmpassword) {
                                    
                                    var account = {
                                        first_name : signup_firstname,
                                        last_name : signup_lastname,
                                        contact : signup_phonenumber,
                                        email : signup_email,
                                        superadmin_id : signup_id,
                                        password : signup_password
                                    };
                                    alert("SIGNUP .... ");
                                    saveAccount(account);

                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

// METHODS
function saveAccount(csdl_data) {
    db.collection("CSDL").doc("Profile").set(csdl_data).then(() => {
        console.log("Successfully save account");
        alert("Successfully Create an account")
        window.location.href = "log-in.html";
    }).catch((error) => {
        console.log("ERROR SAVING ACCOUNT .. " + error.message);
    })
}