
// ALL FIELDS
const fields = document.querySelectorAll("input")
const emailField = document.querySelector("#emailfield")
const passwordField = document.querySelector(".password")
const submitBtn = document.querySelector(".submit")
const userIcon = document.querySelector(".u-i")
const userIcon2 = document.querySelector(".u-i-1")
const errorMessage = document.querySelector(".error-message")
const errorx = document.querySelector(".error")
const formx = document.querySelector(".form-group-1")
const viewHide = document.querySelector(".show-pass")


fields.forEach(x => {

    x.onkeyup = e => {

        if(emailField.value.length !== 0 && passwordField.value.length !== 0 )
        {
            submitBtn.disabled = false
            submitBtn.style.background = "#006a26"
            e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
            errorMessage.classList.remove("active")
            errorx.innerHTML = "Please fill the field correctly."
        }
        else 
        {
            submitBtn.disabled = true
            submitBtn.style.background = "rgba(0, 0, 0, 0.1)"
            errorMessage.style.display = "block"
            errorMessage.classList.add("active")
            errorx.innerHTML = "Please fill the empty field"
        }
        if(!x.value)
        {
            e.target.style.border = "1px solid red"
            // submitBtn.disabled = true
            errorMessage.style.display = "block"
            errorMessage.classList.add("active")
            errorx.innerHTML = "Please fill the empty field"
        }
        else 
        {
            e.target.style.border = "1px solid rgba(0, 0, 0, 0.1)"
            // submitBtn.disabled = false
            // errorMessage.style.display = "none"
            errorMessage.classList.remove("active")
            errorx.innerHTML = "Please fill the field correctly."
            // errorx.innerHTML = "Incorrect email or password"
        }
    }
})

viewHide.onclick = o => {

    var x = document.getElementById("passwordfield")

    if (x.type === "password") {
        x.type = "text";
        o.innerHTML = "hello"
        viewHide.innerHTML = `<i class="fa fa-eye"></i>`
    } else {
        x.type = "password";
        viewHide.innerHTML = `<i class="fa fa-eye-slash"></i>`
   
    }

}


function incorrectEmailPassword(errorx,submitBtn)
{
    errorx.innerHTML = "Incorrect email or password"
    submitBtn.disabled = true
    submitBtn.style.background = "rgba(0, 0, 0, 0.1)"
    errorMessage.classList.add("active")
}