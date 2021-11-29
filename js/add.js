const addBtn = document.querySelector(".add-btn")
const editBtn = document.querySelectorAll(".edit")
const modalAdd = document.querySelector(".modal-add")
const modalEdit= document.querySelector(".modal-edit")
const addNewStudent = document.querySelector(".add-student-inputs")
const closeBtn = document.querySelectorAll(".close-btn")
const importFile =  document.querySelector(".import-file")
const importBtn =  document.querySelector(".import-btn")

//const modalBtn = document.querySelectorAll("button.changes")

addBtn.addEventListener('click', e => {
    modalAdd.classList.add("active")
})

importBtn.onclick = () =>
{
    importFile.click()
}

editBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        modalEdit.classList.add("active")
    })
})
closeBtn.forEach(close => {
    close.addEventListener('click', e => {

        modalEdit.classList.remove("active")
        modalAdd.classList.remove("active")

        clearAll(id,fname,lname,mname,scode,editScode)
        removeUnecessaryStyling(errorMessageEdit,errorMessage,saveBtn,editSave,editScode)
        removeBorderWarning(id,fname,lname,mname,scode,editScode)

        errorMessage.classList.remove("gg")
        errorx.innerHTML = "Please fill the field correctly."
        errorMessageEdit.classList.remove("gg")
        errorxEdit.innerHTML = "Please fill the field correctly."
        errorMessage.classList.remove("active")

    })
})

// modalBtn.forEach(btn => {
//     btn.onclick = () => {
   
//         //clearAll(id,fname,lname,mname,scode)
//         //editScode.value = ''
//         //btn.disabled = true
//         //btn.style.background = "rgba(0, 0, 0, 0.1)"

//     }
// })




