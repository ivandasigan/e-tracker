<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Tracker | Announcement</title>
    <link rel="stylesheet" href="css/announce.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="js/announce.js" defer></script>
    <script src="js/jquery-3.6.0.min.js"></script>
</head>
    <style>
        .faculty-indicator 
        {
        display: flex;
        height: 30px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0,0,.5);
        color: #fafafa;
        margin-top: 10px;
        transition: .5s ease;
        padding: 0 5px;
        position: relative;
        }
        .faculty-indicator .fa 
        {
        margin-right: 5px;
        }
        .faculty-indicator .fa::after
        {
        content: '';
        position: absolute;
        width: 1px;
        height: 30px;
        background-color:#cfd2cd;
        top: 0;
        left: 27px;
                    
        }
        .faculty-indicator span 
        {
        font-size: .8rem;
        padding: 0 8px;
        }
        .faculty-indicator:hover
        {
        background-color: #212529;
        }
    </style>
<body>

        <!----------------------HOME----------------------------->       
        <div class="wrapper">
        <!----------------------NAVIGATION----------------------------->       
        <div class="navigation">
            <!-- LEFT - NAV - LINKS -->
            <div class="side-nav">
            <!-- PROJECT - NAME -->
            <div class="title-name"><h1 class="project-name header-title">PHINMA Scholar <br>E-Tracker</h1><span class="position">superadmin</span></div>
            <!-- UL LI -->
            <div class="link">
            <ul class="links">
            <li>
                <a href="dashboard.html" class="dashboard" ><i class="fa fa-bar-chart" aria-hidden="true"></i><span>Dashboard</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true" id="icon"></i>
            </li>
            <li>
                <a href="addStudent.html" class="student dashboard"><i class="fa fa-user" aria-hidden="true"></i><span>Student</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true" ></i>
            </li>
            <li>
                <a href="faculty.html" class="faculty dashboard" ><i class="fa fa-address-book" aria-hidden="true"></i><span>Faculty</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
                
                <!-- INDICATOR -->
                <div class="faculty-indicator" id="faculty_indicator">
                <i class="fa fa-bell" style="color: #fafafa;"></i>
                <span id="void_count">3</span>
                </div>
                <!-- INDICATOR -->

            </li>
            <li>
                <a href="setSchedule.html" class="setting dashboard"><i class="fa fa-clock-o" aria-hidden="true"></i><span>Set Schedule</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
            </li>
            <li>
                <a href="dtr.html" class="dtr dashboard" ><i class="fa fa-calendar-times-o" aria-hidden="true"></i><span>DTR</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
            </li>
            <li>
                <a href="renew.html" class="renewal dashboard" ><i class="fa fa-check-square-o" aria-hidden="true"></i><span>Renewal</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
            </li>
            <li  class="active">
                <a href="Announcement.php" class="announcement dashboard" ><i class="fa fa-envelope-open" aria-hidden="true"></i><span>Announcement</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
            </li>
            <li>
                <a href="setting.html" class="announcement dashboard" ><i class="fa fa-cog" aria-hidden="true"></i><span>Settings</span></a><i class="fa fa-angle-right right-icon" aria-hidden="true"></i>
            </li>
    
            </div>
            </ul>
                    
            <!-- FOOTER LEFT -->
            <div class="left-footer">
                <img class="phinma" src="img/phinma.svg" alt="">
            <div class="socials">
                <a href="https://www.facebook.com/phinmaupang"><img src="img/fb.svg" alt=""></a><a href="https://www.instagram.com/phinmaupangs" ><img src="img/ig.svg" alt=""></a><a href="http://www.up.phinma.edu.ph/" ><img src="img/mail.svg" alt=""></a> 
            </div>
            <span>(075) 522 5635</span>
            </div>
            <!-- SIDE NAV END -->
            </div>
            <!-- NAV CONTAINER END -->
            </div>
    
            <!----------------------TOP MENU----------------------------->       
            <div class="add-home home">
    
            <div class="row indent upper-nav"> 
            <div class="col-1">
            <!----------------------DISPLAY SEMESTER----------------------------->       
            <span class="school-year header-title" id="school_year">1st Semester | 2019-2020 </span>
            </div>
             <!-- LOGO DISPLAY  -->
            <div class="col-2">
                <center><img src="img/main.png" alt="" width="45" class="logo" style="transform: translateY(-16px);" ></center>
            </div>
    
             <!----------------------TOTAL NOTIFICATION NUMBER----------------------------->       
             <!-- NOTIFICATION DISPLAY  -->
            <div class="col-3"> 
            <a href="userlogs.html" class="user-activity" style="transform: translateX(-15px);">
            <i class="fa fa-cogs"></i>
            </a> 
            <div class="notif">
    
            <div class="badge" id="notif_bell"><span class="total-notif"  id="notif_count"></span></div>
            <a href="applicant.html" ><i class="fa fa-bell" aria-hidden="true"></i></a>
            </div>
               
            <div class="user-cred ">
            <!----------------------DISPLAY PHOTO----------------------------->
            <img src="img/default_user_image.png" id="profileImage" alt="" width="40" height="40" class="user-photo">
    
            <!----------------------USER NAME TOP----------------------------->   
            <span class="user-name" id="user_name"></span>
    
            <!----------------------PROFILE DROPDOWN----------------------------->
            <div class="dropdown">
    
            <i class="fa fa-sort-desc user-dropdown" aria-hidden="true"></i>
            <div class="dropdown-content">
            <a href="profile.html">Profile</a><a href="#" onclick="logout_action()">Logout</a>
            </div>
            </div>
            </div>
            </div>
            </div>

        <!-- x -->

         <!----------------------ANNOUNCEMENT----------------------------->

        <!-- HEADER TITLE -->
        <div class="announce-container indent">
        <div class="announce">
        <span>Announcement </span>
        <button class="create-btn" onclick="createAnnouncementAction()"><i class="fa fa-plus">&nbsp;</i> Create</button>
        </div>
        </div>

       <!----------------------MESSAGE SUMMARY LISTS----------------------------->
        <br>
        <div class="header-details" style="width: 89%;margin: auto;margin-bottom: 10px;">
        <span style="margin-left: 30px;color: rgba(0, 0,0,.5);">Sents</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: rgba(0, 0,0,.3);">|</span> <span style="margin-left: 30px;" id="result">Results : </span>
        </div>
       
        <ol class="sents" start="1" id="ol" style="max-height: 550px;overflow-y: scroll;">                
        </ol>    

        <!----------------------CREATE ANNOUNCEMENT----------------------------->
    
        <div class="modal" id="rcpt_modal">
        <div class="create-student-announce">
        <button class="close-btn" ><i class="fa fa-close"></i></button>
        <h1>Create Announcement </h1>

    
        <!-- RECEPIENT -->
    
        <div class="rcpt" >
        <label for="">To : 
        <select class="receipient" id="recipient_option" >
        <option value="Handog Kaibigan Program">Handog Kaibigan Program</option>
        <option value="Student Assistant Program">Student Assistant Program</option>
        <option value="ALL">ALL</option>
        </select>
        </label>
        </div>

        <!-- SENDER -->
        <div class="sender">
        <label for="">From : <span class="sender">CSDL</span></label>
        </div>

        <br>
        <div class="error-message">
        <p class="error">Please fill the empty field.</p>
        </div>

        <input type="text"  class="announce-subject text-input" id="subject_field"  placeholder="Enter Subject" style="padding: 8px;font-size: 18px;border-radius: 4px;border: none;margin-bottom: 10px;border: 1px solid rgba(0, 0,0,.3);">
            
        <div class="announce-message">
        <!-- TEXT AREA -->
        <textarea name="message" id="message_announce" cols="30" rows="10" class="announce-input-message text-input" placeholder="Enter message..." style="border-radius: 5px;font-size: 18px;padding: 10px ;"></textarea>
        <!-- BUTTON SAVE -->
        <button class="announce-save" onclick="sendAnnouncement()" disabled><i class="fa fa-paper-plane"></i></button>
        </div>
            
        </div>
        </div>


        <!-- x -->
   
        

           <!-- JS BACKEND -->
           <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
           <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-auth.js"></script>
           <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js"></script>
           <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-storage.js"></script>
           <script>
               // Your web app's Firebase configuration
               // For Firebase JS SDK v7.20.0 and later, measurementId is optional
               var firebaseConfig = {
                   apiKey: "AIzaSyCznGmM6_l9vuddjONG8c-Z4du3-LXlQNw",
                   authDomain: "e-tracker-51b2a.firebaseapp.com",
                   projectId: "e-tracker-51b2a",
                   storageBucket: "e-tracker-51b2a.appspot.com",
                   messagingSenderId: "180907238573",
                   appId: "1:180907238573:web:c5745adb36aaea4299d224",
                   measurementId: "G-Z0YPB2DTZN"
               };
               // Initialize Firebase
               firebase.initializeApp(firebaseConfig);
               //firebase.analytics();



               </script>
        <script src="js/announce_backend.js">

    </script>
</body>
</html>
