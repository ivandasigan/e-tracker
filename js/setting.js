//INPUT
const setting_inputs = document.querySelectorAll("input")

//button
const settingBtn = document.querySelector(".save-btn")

const year = document.querySelector(".school-year-input")
const semester = document.querySelector(".semester-input")

setting_inputs.forEach(inpt => {

    inpt.onkeyup = () => {
    
        if(year.value.length !== 0 && semester.value.length !== 0)
        {
            settingBtn.disabled = false
            settingBtn.style.background = "#e1ae2d"
        }
        else 
        {
            settingBtn.disabled = true
            settingBtn.style.background = "rgba(0, 0, 0, 0.1)";
        }
    }
})
