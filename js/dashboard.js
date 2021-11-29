
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

// ONCLICK ACTION
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
var faculty_indicator = document.getElementById("faculty_indicator");
var notif_bell = document.getElementById("notif_bell");
// INITIALIZE LABELS
var user_name = document.getElementById("user_name");
var school_year = document.getElementById("school_year");
var notifCount = document.getElementById("notif_count");
var void_count = document.getElementById("void_count");
// INITIALIZE LABELS
// INITIAL VALUE
var total_numberof_scholar_in_cas = 0;
var total_numberof_scholar_in_cite = 0;
var total_numberof_scholar_in_cma = 0;
var total_numberof_scholar_in_cea = 0;
var total_numberof_scholar_in_chs = 0;
var total_numberof_scholar_in_css = 0;
var count = 0;
// INITIAL VALUE
// INITIALIZE UL
var bars = document.getElementById("bars")

$(document).ready(function(){
  // CAS
  var casActive = $('.bars li .casActive')
  var casInactive = $('.bars li .casInactive')

  // CITE
  var citeActive = $('.bars li .citeActive')
  var citeInactive = $('.bars li .citeInactive')

  CEA
  var ceaActive = $('.bars li .ceaActive')
  var ceaInactive = $('.bars li .ceaInactive')

  //CHS
  var chsActive = $('.bars li .chsActive')
  var chsInactive = $('.bars li .chsInactive')

  //CSS
  var cssActive = $('.bars li .cssActive')
  var cssInactive = $('.bars li .cssInactive')

  // CMA
  var cmaActive = $('.bars li .cmaActive')
  var cmaInactive = $('.bars li .cmaInative')

  var itsActive = $('.bars li .itsActive')
  var itsInative = $('.bars li .itsInative')

  //ANIMATION STARTS HERE
  
  //displayBars(casActive, casInactive);
  casDashboard("CAS", casActive, casInactive);
  citeDashboard("CITE", citeActive, citeInactive);
  cmaDashboard("CMA", cmaActive, cmaInactive)
  ceaDashboard("CEA", ceaActive, ceaInactive);
  chsDashboard("CHS", chsActive, chsInactive);
  cssDashboard("CSS", cssActive, cssInactive);

  //ITS(itsActive,itsInative)
                  
  })
// DISPLAY HERE
displaySchoolYearAndSemester();
displayProfileImageAndUsername();
displayNotifCount();
voidCount();

// DISPLAY HERE


 

    function CAS(casActive,casInactive, numberOfActive, numberOfInactive)
    {
      var activePercent = $(casActive).data('percentage');
      var inactivePercent = $(casInactive).data('percentage');
      total_numberof_scholar_in_cas = total_numberof_scholar_in_cas != 0 ? total_numberof_scholar_in_cas : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_cas) * 100
      // total tally for inactive students put here 
      inactivePercent = (numberOfInactive / total_numberof_scholar_in_cas) * 100
  
      $(casActive).attr('data-percentage',activePercent.toFixed(1))
      $(casActive).animate(
      {'height' : activePercent.toFixed(1) + '%'})

      $(casInactive).attr('data-percentage',inactivePercent.toFixed(1))
      $(casInactive).animate(
      {'height' : inactivePercent.toFixed(1) + '%'})
    }

    /*************************************************/
  function ITS(itsActive,itsInactive, numberOfActive, numberOfInactive)
    {
    var activePercent = $(itsActive).data('percentage');
    var inactivePercent = $(itsInactive).data('percentage');

    // total tally for active students put here 
    activePercent = 90
    // total tally for inactive students put here 
    inactivePercent = 90

    $(itsActive).attr('data-percentage',activePercent)
    $(itsActive).animate(
    {'height' : activePercent + '%'})

    $(itsInactive).attr('data-percentage',inactivePercent)
    $(itsInactive).animate(
    {'height' : inactivePercent + '%'})
  }

    function CITE(citeActive,citeInactive, numberOfActive, numberOfInactive)
    {
      var activePercent = $(citeActive).data('percentage');
      var inactivePercent = $(citeInactive).data('percentage');
      total_numberof_scholar_in_cite = total_numberof_scholar_in_cite != 0 ? total_numberof_scholar_in_cite : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_cite) * 100
      // total tally for inactive students put here 
      inactivePercent = (numberOfInactive / total_numberof_scholar_in_cite) * 100

      $(citeActive).attr('data-percentage',activePercent.toFixed(1))
      $(citeActive).animate(
      {'height' : activePercent.toFixed(1) + '%'})

      $(citeInactive).attr('data-percentage',inactivePercent.toFixed(1))
      $(citeInactive).animate(
      {'height' : inactivePercent.toFixed(1) + '%'})
    }

    function CMA(cmaActive,cmaInactive, numberOfActive, numberOfInactive)
    {
      var activePercent = $(cmaActive).data('percentage');
      var inactivePercent = $(cmaInactive).data('percentage');
      total_numberof_scholar_in_cma = total_numberof_scholar_in_cma != 0 ? total_numberof_scholar_in_cma : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_cma) * 100
      // total tally for inactive students put here 
      inactivePercent = (numberOfInactive / total_numberof_scholar_in_cma) * 100

      $(cmaActive).attr('data-percentage',activePercent.toFixed(1))
      $(cmaActive).animate(
      {'height' : activePercent.toFixed(1) + '%'})

      $(cmaInactive).attr('data-percentage',inactivePercent.toFixed(1))
      $(cmaInactive).animate(
      {'height' : inactivePercent.toFixed(1) + '%'})
    }

      function CEA(ceaActive,ceaInactive, numberOfActive, numberOfInactive)
      {
      var activePercent = $(ceaActive).data('percentage');
      var inactivePercent = $(ceaActive).data('percentage');
      total_numberof_scholar_in_cea = total_numberof_scholar_in_cea != 0 ? total_numberof_scholar_in_cea : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_cea) * 100
      // total tally for inactive students put here 
      inactivePercent = (numberOfInactive / total_numberof_scholar_in_cea) * 100

      $(ceaActive).attr('data-percentage',activePercent.toFixed(1))
      $(ceaActive).animate(
      {'height' : activePercent.toFixed(1) + '%'})

      $(ceaInactive).attr('data-percentage',inactivePercent.toFixed(1))
      $(ceaInactive).animate(
      {'height' : inactivePercent.toFixed(1) + '%'})
    }
    function CHS(chsActive,chsInactive , numberOfActive, numberOfInactive)
    {
      var activePercent = $(chsActive).data('percentage');
      var inactivePercent = $(chsInactive).data('percentage');
      total_numberof_scholar_in_chs = total_numberof_scholar_in_chs != 0 ? total_numberof_scholar_in_chs : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_chs) / 100
      // total tally for inactive students put here 
      inactivePercent = (numberOfInactive / total_numberof_scholar_in_chs) / 100

      $(chsActive).attr('data-percentage',activePercent.toFixed(1))
      $(chsActive).animate(
      {'height' : activePercent.toFixed(1) + '%'})

      $(chsInactive).attr('data-percentage',inactivePercent.toFixed(1))
      $(chsInactive).animate(
      {'height' : inactivePercent.toFixed(1) + '%'})
      }

    function CSS(cssActive,cssInactive, numberOfActive, numberOfInactive)
      {
      var activePercent = $(cssActive).data('percentage');
      var inactivePercent = $(cssInactive).data('percentage');
      total_numberof_scholar_in_css = total_numberof_scholar_in_css != 0 ? total_numberof_scholar_in_css : 1;
      // total tally for active students put here 
      activePercent = (numberOfActive / total_numberof_scholar_in_css) / 100;
      // total tally for inactive students put here 

      inactivePercent = (numberOfInactive / total_numberof_scholar_in_css) / 100;

      $(cssActive).attr('data-percentage',activePercent)
      $(cssActive).animate(
      {'height' : activePercent + '%'})

      $(cssInactive).attr('data-percentage',inactivePercent)
      $(cssInactive).animate(
      {'height' : inactivePercent + '%'})
      }

      //casDashboard("CAS", "Inactive", casActive, casInactive);

      // BACKEND METHODS HERE
    
      function displayBars(casActive,casInactive) {
        db.collection("CSDL").doc("Student").collection("students").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.exists) {
              var jsonData = doc.data();
              var department = jsonData["department"];
              var barRow = `
      
              <li>
              <div class="bar casActive" data-percentage="0"><span>${department}</span></div>
              <div class="bar casActive" data-percentage="0"></div>
              </li>
              `
            bars.innerHTML += barRow;
            casDashboard("CAS", casActive, casInactive);

            }
          })

        })
      }
      function casDashboard(department, casActive, casInactive) {
        totalScholarsInCASDepartment();
        var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists){
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status == "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                  }
            })
        }).then(() => {

          CAS(casActive,casInactive, numberOfActive, numberOfInactive)
        }).catch((Error) => {
          console.log(Error.message);
        })
      }



      function citeDashboard(department,citeActive, citeInactive) {
        totalScholarsInCITEDepartment();

          var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status === "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                }
            })
        }).then(() => {
          CITE(citeActive, citeInactive, numberOfActive, numberOfInactive);
        }).catch((Error) => {
          console.log(Error.message);
        })
      }
      function cmaDashboard(department,cmaActive, cmaInactive) {
        totalScholarsInCMADepartment();
        var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status === "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                } 
            })
        }).then(() => {
        
            CMA(cmaActive, cmaInactive, numberOfActive, numberOfInactive)
        }).catch((Error) => {
          console.log(Error.message);
        })
      }
      function ceaDashboard(department,ceaActive, ceaInactive) {
        totalScholarsInCEADepartment();
        var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status === "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                }
            })
        }).then(() => {
          CEA(ceaActive, ceaInactive, numberOfActive, numberOfInactive)
        }).catch((Error) => {
          console.log(Error.message);
        })
      }

      function chsDashboard(department,chsActive, chsInactive) {
        totalScholarsInCHSDepartment();
        var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status === "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                }
            })
        }).then(() => {
          CHS(chsActive, chsInactive, numberOfActive, numberOfInactive)
        }).catch((Error) => {
          console.log(Error.message);
        })
      }
      function cssDashboard(department,cssActive, cssInactive) {
        totalScholarsInCSSDepartment();
        var numberOfActive = 0;
        var numberOfInactive = 0;
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", department).get().then((queryDocs) => {
            queryDocs.forEach((doc) => {
                if(doc.exists) {
                    var jsonData = doc.data();
                    var active_status = jsonData["active_status"];
                    if(active_status === "Active") {
                        numberOfActive+=1;
                    } else {
                        numberOfInactive+=1;
                    }
                }
            })
        }).then(() => {
          CSS(cssActive, cssInactive, numberOfActive, numberOfInactive)
        }).catch((Error) => {
          console.log(Error.message);
        })
      }
      // GET TOTAL NUMBER OF SCHOALR IN CAS DEPARTMENT
      function totalScholarsInCASDepartment() {
       
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CAS").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.exists) {
                total_numberof_scholar_in_cas+=1;
              }
          })
        })
      } 
       // GET TOTAL NUMBER OF SCHOALR IN CITE DEPARTMENT
      function totalScholarsInCITEDepartment() {
      
      //  var RefDoc = db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CITE").get();
      //  console.log(RefDoc);
        db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CITE").onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.exists) {
                total_numberof_scholar_in_cite+=1;
        
              } else {
                console.log("NO document")
              }
          })
        })
      }
      // GET TOTAL NUMBER OF SCHOALR IN CMA DEPARTMENT
      function totalScholarsInCMADepartment() {
        //total_numberof_scholar_in_cma = 3;
        // var RefDoc = db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CMA").get();
        // console.log(RefDoc);
          db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CMA").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                  total_numberof_scholar_in_cma+=1;
         
                } else {
                  console.log("NO document")
                }
                 })
               })
          }
             // GET TOTAL NUMBER OF SCHOALR IN CEA DEPARTMENT
      function totalScholarsInCEADepartment() {
        //total_numberof_scholar_in_cma = 3;
        // var RefDoc = db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CMA").get();
        // console.log(RefDoc);
          db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CEA").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                  total_numberof_scholar_in_cea+=1;
        
                } else {
                  console.log("NO document")
                }
                 })
               })
          }   
        // GET TOTAL NUMBER OF SCHOALR IN CHS DEPARTMENT
      function totalScholarsInCHSDepartment() {
        //total_numberof_scholar_in_cma = 3;
        // var RefDoc = db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CMA").get();
        // console.log(RefDoc);
          db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CEA").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                  total_numberof_scholar_in_chs+=1;

                } else {
                  console.log("NO document")
                }
                 })
               })
          }   
      // GET TOTAL NUMBER OF SCHOALR IN CSS DEPARTMENT
      function totalScholarsInCSSDepartment() {
        //total_numberof_scholar_in_cma = 3;
        // var RefDoc = db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CMA").get();
        // console.log(RefDoc);
          db.collection("CSDL").doc("Student").collection("students").where("department", "==", "CSS").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                  total_numberof_scholar_in_css+=1;
              
                } else {
                  console.log("NO document")
                }
                 })
               })
          }   
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


      function displaySchoolYearAndSemester() {
        var schooYearLabel = localStorage.getItem("school_year") != null ? localStorage.getItem("school_year") : "";
        var schoolSemesterLabel = localStorage.getItem("semester") != null ? localStorage.getItem("semester") + " Semester" : "";
        var headerSchoolYear = schoolSemesterLabel + " | " + schooYearLabel;
        school_year.innerHTML = headerSchoolYear != " | " ? headerSchoolYear:"";
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

      // google.charts.load('current', {'packages':['bar']});
//       google.charts.setOnLoadCallback(drawChart);

//       function drawChart() {
//         var data = google.visualization.arrayToDataTable([
//           ['June', 1000, 400, 200],
//           ['July', 1170, 460, 250],
//           ['August', 660, 1120, 300],
//           ['September', 1030, 540, 350],
//           ['October', 660, 1120, 300],
//           ['November', 660, 1120, 300],
//           ['December', 660, 1120, 300],
//         ]);

//         var options = {
//           chart: {
//             title: 'Company Performance',
//             subtitle: 'Sales, Expenses, and Profit: 2014-2017',
//           }
//         };

//         var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

//         chart.draw(data, google.charts.Bar.convertOptions(options));
//       }
