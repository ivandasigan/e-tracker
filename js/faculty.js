//ERROR MESSAGE FOR FRONT END

const inputs =  document.querySelectorAll("input")
const inputEdit =  document.querySelectorAll("input")
const id =  document.querySelector(".id")
const fname =  document.querySelector(".fname")
const lname =  document.querySelector(".lname")
const mname =  document.querySelector(".mname")
const scode =  document.querySelector(".scode")

const editScode =  document.querySelector("#subject_code")
const setSchedScode = document.querySelector("#modal_edit_subjectcode")

// EVENT ELEMENTS
const saveBtn = document.querySelector(".add-save")
const editSave = document.querySelector(".edit-save")

//ERROR CONTAINERS ADD
const errorMessage = document.querySelector(".error-message")
const errorx = document.querySelector(".error")

//ERROR CONTAINERS EDIT
const errorMessageEdit = document.querySelector(".em-2")
const errorxEdit = document.querySelector(".er-2")

inputs.forEach(x => {
    x.onkeyup = e => {

        errorMessage.classList.remove("gg")
        errorx.innerHTML = "Please fill the field correctly."
        errorMessageEdit.classList.remove("gg")
        errorxEdit.innerHTML = "Please fill the field correctly."

        //MODAL ADD
        id.value.length !== 0 && fname.value.length !== 0 && lname.value.length !== 0 && mname.value.length !== 0 && scode.value.length !== 0 ? notEmpty(e,saveBtn,errorMessage,errorx) : empty(saveBtn,errorMessage,errorx)
        
        !x.value ? disabled(e,saveBtn,errorMessage,errorx) : enabled(e,saveBtn,errorMessage,errorx)

        editScode.value.length !== 0 ? editNotEmpty(e,editSave,errorMessageEdit,errorxEdit) : editEmpty(editSave,errorMessageEdit,errorxEdit)
        
    }

})

//ADD
function enabled(e,saveBtn,errorMessage,errorx)
{
 
    e.target.style.border = "1px solid rgba(0, 0, 0, 0.1)"
    saveBtn.disabled = false
    errorMessage.classList.remove("active")
    errorx.innerHTML = "Please fill the field correctly."
    // errorMessage.classList.remove("gg")
}

function disabled(e,saveBtn,errorMessage,errorx)
{

    e.target.style.border = "1px solid red"
    errorMessage.style.display = "block"
    errorMessage.classList.add("active")
    errorx.innerHTML = "Please fill the empty field"
}

function empty(saveBtn,errorMessage,errorx)
{
    saveBtn.disabled = true
    saveBtn.style.background = "rgba(0, 0, 0, 0.1)"
    errorMessage.style.display = "block"
    errorMessage.classList.add("active")
    // errorMessage.classList.remove("gg")
    errorx.innerHTML = "Please fill the empty field"
}

function notEmpty(e,saveBtn,errorMessage,errorx)
{
    saveBtn.disabled = false
    saveBtn.style.background = "#006a26"
    e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    errorMessage.classList.remove("active")
    errorx.innerHTML = "Please fill the field correctly."
}

//EDIT 

function editEmpty(editSave,errorMessageEdit,errorxEdit)
{
    editSave.disabled = true
    editSave.style.background = "rgba(0, 0, 0, 0.1)"
    errorMessageEdit.style.display = "block"
    errorMessageEdit.classList.add("active")
    errorMessageEdit.classList.remove("gg")
    errorxEdit.innerHTML = "Please fill the empty field"
}

function editNotEmpty(e,editSave,errorMessageEdit,errorxEdit)
{
    editSave.disabled = false
    editSave.style.background = "#006a26"
    e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
    errorMessageEdit.classList.remove("active")
    errorxEdit.innerHTML = "Please fill the field correctly."
}

function removeUnecessaryStyling(errorMessageEdit,errorMessage,saveBtn,editSave,editScode)
{
    errorMessageEdit.classList.remove("active")
    saveBtn.disabled = true
    editSave.disabled = true
    editScode.style.border = "1px solid rgba(0, 0, 0, 0.1)"
    saveBtn.style.background = "rgba(0, 0, 0, 0.1)"
    editSave.style.background = "rgba(0, 0, 0, 0.1)"

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
