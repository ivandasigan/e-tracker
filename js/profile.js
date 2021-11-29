// To open the file manager
const openFile = document.querySelector(".choose")
const choosePicture = document.querySelector(".change")
// TOP BUTTON : EDIT/CHANGE PASSWORD
const editBtnTop = document.querySelector(".edit")
const changeBtnTop = document.querySelector(".change-pass")
// To edit field
const editParentElement = document.querySelector(".edit-inputs")
const editInputs = editParentElement.querySelectorAll("input")
const editBtn = document.querySelector(".update-btn")
// To update field
const changeParentElement = document.querySelector(".change-inputs")
const changeInputs = changeParentElement.querySelectorAll("input")
const changeBtn = document.querySelector(".savebtn")

// START
editParentElement.classList.add("inactive")
editInputs.forEach(fields => {
   fields.disabled = true
})
changeParentElement.classList.add("inactive")
changeInputs.forEach(fields => {
   fields.disabled = true
})
var isToEditProfile = false;
var isToChangePassword = false;
//************************************************************ */

// ACTIONS FOR EDIT
editBtnTop.addEventListener('click', e => {
 
   
   editInputs.forEach(fields => {
      if(isToEditProfile) {
         fields.disabled = true
      } else {
         fields.disabled = false
      }
      
   })
   if(isToEditProfile) {
      editBtnTop.style.borderBottom = "none"
      editBtn.style.background = "rgba(0, 0, 0, 0.2)"
      editBtn.disabled = true
      editParentElement.classList.add("inactive")
      isToEditProfile = !isToEditProfile;
   } else {
      e.target.style.borderBottom = "2px solid #006a26"
      editBtn.style.background = "#006a26"
      editBtn.disabled = false
      editParentElement.classList.remove("inactive")
      isToEditProfile = !isToEditProfile
   }


})
//BUTTON TO UPDATE

editBtn.addEventListener('click', e => {
   editBtnTop.style.borderBottom = "none"

   //DISABLE INPUT AFTER SAVING
   editInputs.forEach(fields => {
   
      fields.disabled = true
   })
   editBtn.style.background = "rgba(0, 0, 0, 0.2)"
   editBtn.disabled = true
   editParentElement.classList.add("inactive")

})
//************************************************************ */



//************************************************************ */
// ACTIONS FOR CHANGE PASSWORD
changeBtnTop.addEventListener('click', e => {
   

   changeInputs.forEach(fields => {
      if(isToChangePassword) {
         fields.disabled = true
      } else {
         fields.disabled = false
      }
     
   })
   if(isToChangePassword) {
      changeBtnTop.style.borderBottom = "none"
 
      changeBtn.style.background = "rgba(0, 0, 0, 0.2)"
      changeBtn.disabled = true
      changeParentElement.classList.add("inactive")
      isToChangePassword = !isToChangePassword
   } else {
      e.target.style.borderBottom = "2px solid #006a26"
      changeBtn.style.background = "#006a26"
      changeBtn.disabled = false
      changeParentElement.classList.remove("inactive")
      isToChangePassword = !isToChangePassword
   }


})
//BUTTON TO CHANGE PASSWORD

changeBtn.addEventListener('click', e => {
   changeBtnTop.style.borderBottom = "none"
   //DISABLE INPUT AFTER SAVING
   changeInputs.forEach(fields => {
      fields.disabled = true
   })
   changeBtn.style.background = "rgba(0, 0, 0, 0.2)"
   changeBtn.disabled = true
   changeParentElement.classList.add("inactive")

})
//************************************************************ */

// To open the file manager
openFile.addEventListener('click', e => {
   choosePicture.click()
})
