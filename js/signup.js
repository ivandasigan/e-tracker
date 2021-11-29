// ALL FIELDS
const fields = document.querySelectorAll("input")
const submit = document.querySelector(".submit")

fields.forEach(x => {

    x.onkeyup = () => {
        submit.style.background = "#006a26"
    }
})
