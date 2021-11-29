const inputs =  document.querySelectorAll("input")

const id =  document.querySelector(".id")
const fname =  document.querySelector(".fname")
const lname =  document.querySelector(".lname")
const mname =  document.querySelector(".mname")
const scode =  document.querySelector(".scode")

const x = document.querySelectorAll(".x")

// EVENT ELEMENTS
const saveBtn = document.querySelector(".add-save")
const editSave = document.querySelector(".edit-save")

//ERROR CONTAINERS ADD
const errorMessage = document.querySelector(".error-message")
const errorx = document.querySelector(".error")

//ERROR CONTAINERS EDIT
const errorMessageEdit = document.querySelector(".em-2")
const errorxEdit = document.querySelector(".er-2")

const modaleditScode = document.querySelector("#modal_edit_subjectcode")

//BUTTONS FOR SAVE AND EDIT
// const modalButtons = document.querySelectorAll("button.set")



    inputs.forEach(x => {
        x.onkeyup = e => {

        // errorMessage.classList.remove("gg")
        errorx.innerHTML = "Please fill the field correctly."
        // errorMessageEdit.classList.remove("gg")
        errorxEdit.innerHTML = "Please fill the field correctly."

        id.value.length !== 0 && fname.value.length !== 0 && lname.value.length !== 0 && mname.value.length !== 0 && scode.value.length !== 0 ? allField(saveBtn,e,errorMessage,errorx) : emptyFields(saveBtn,errorMessage,errorx)
        
        !x.value ? error1(errorMessage,e,errorx) : error2(errorMessage,e,errorx)

       // modaleditScode.value.length !== 0 ? editNotEmpty(e,editSave,errorMessageEdit,errorxEdit) : editEmpty(editSave,errorMessageEdit,errorxEdit)
       
    }})

    // saveBtn.onclick = () => 
    // {
    // alert("saved")
    // saveBtn.disabled = true
    // saveBtn.style.background = "rgba(0, 0, 0, 0.1)"
    // clearAll(id,fname,lname,mname,scode)
    
    // // errorMessage.classList.add("gg")
    // // errorx.innerHTML = "Schedule set successfully."
    // }


    // editSave.onclick = () => 
    // {

    // editSave.disabled = true
    // editSave.style.background = "rgba(0, 0, 0, 0.1)"
    // modaleditScode.value = ''
    
    // // errorMessageEdit.classList.add("gg")
    // // errorxEdit.innerHTML = "Schedule set successfully."
    // }

    x.forEach(btn => {
        btn.onclick = () =>
        {
        //   alert("CLOSED!")  
        //   errorMessage.classList.remove("gg")
          errorx.innerHTML = "Please fill the field correctly."
        //   errorMessageEdit.classList.remove("gg")
          errorxEdit.innerHTML = "Please fill the field correctly."
        //   errorMessageEdit.classList.remove("active")
          errorMessage.classList.remove("active")
          removeBorderWarning(id,fname,lname,mname,scode,modaleditScode)
          clearAll(id,fname,lname,mname,scode)
          modaleditScode.value = ''
          saveBtn.disabled = true
          saveBtn.style.background = "rgba(0, 0, 0, 0.1)"
          //editBtn.disabled = true
          //editSave.style.background = "rgba(0, 0, 0, 0.1)"
        }
    })



function allField(saveBtn,e,errorMessage,errorx)
{
    saveBtn.disabled = false
    saveBtn.style.background = "#006a26"
    e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    errorMessage.classList.remove("active")
    errorx.innerHTML = "Please fill the field correctly."
}

function emptyFields(saveBtn,errorMessage,errorx)
{
    saveBtn.disabled = true
    saveBtn.style.background = "rgba(0, 0, 0, 0.1)"
    errorMessage.style.display = "block"
    errorMessage.classList.add("active")
    errorx.innerHTML = "Please fill the empty field."
}

function error1(errorMessage,e,errorx)
{
    errorMessage.classList.add("active")
    e.target.style.border = "1px solid red"
    errorx.innerHTML = "Please fill the empty field."
}

function error2(errorMessage,e,errorx)
{
    errorMessage.classList.remove("active")
    e.target.style.border = "1px solid rgba(0, 0, 0, 0.1)"
    errorx.innerHTML = "Please fill the field correctly."
}


function editEmpty(editSave,errorMessageEdit,errorxEdit)
{
    editSave.disabled = true
    editSave.style.background = "rgba(0, 0, 0, 0.1)"
    errorMessageEdit.style.display = "block"
    // errorMessageEdit.classList.add("active")
    // errorMessageEdit.classList.remove("gg")
    errorxEdit.innerHTML = "Please fill the empty field"
}

function editNotEmpty(e,editSave,errorMessageEdit,errorxEdit)
{
    editSave.disabled = false
    editSave.style.background = "#006a26"
    e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    // errorMessageEdit.classList.remove("active")
    errorxEdit.innerHTML = "Please fill the field correctly."
}

function clearAll(id,fname,lname,mname,scode)
{
    id.value = ''
    fname.value = ''
    lname.value = ''
    mname.value = ''
    scode.value = ''
    
}
function removeBorderWarning(id,fname,lname,mname,scode,editScode)
{
    id.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    fname.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    lname.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    mname.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    scode.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    editScode.style.border = "2px solid rgba(0, 0, 0, 0.1)"
}