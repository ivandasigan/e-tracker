const createBtn = document.querySelector(".create-btn")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelectorAll(".close-btn")
const sents = document.querySelector(".sents")
const lists = sents.querySelectorAll("li")

const announceSave = document.querySelector(".announce-save")
const announceInput = document.querySelectorAll(".text-input")
const announceSubject = document.querySelector(".announce-subject")
const anounceMessage = document.querySelector("#message_announce")

//error-message
const errorMessage = document.querySelector(".error-message")
const errorx = document.querySelector(".error")

announceInput.forEach(x => {

    x.onkeyup = e => {

        errorMessage.classList.remove("gg")
        errorx.innerHTML = "Please fill the field correctly."

        if(announceSubject.value.length !== 0 && anounceMessage.value.length !== 0 )
        {
            announceSave.disabled = false
            announceSave.style.background = "#006a26"
            e.target.style.border = "2px solid rgba(0, 0, 0, 0.1)"
            // errorMessage.style.display = "none"
            errorMessage.classList.remove("active")
            errorx.innerHTML = "Please fill the field correctly."
        }
        else 
        {
            announceSave.disabled = true
            announceSave.style.background = "rgba(0, 0, 0, 0.1)"
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
            // announceSave.disabled = false
            // errorMessage.style.display = "none"
            errorMessage.classList.remove("active")
            errorx.innerHTML = "Please fill the field correctly."
            // errorx.innerHTML = "Incorrect email or password"
        }
    }
})

//const ol = document.querySelector("ol")

createBtn.addEventListener('click', e => {
    modal.classList.add("active")
})
closeBtn.forEach(close => {
    close.addEventListener('click', e => {
        modal.classList.remove("active")
        announceSave.style.background = "rgba(0, 0, 0, 0.1)"
        announceSave.disabled = true
        errorMessage.classList.remove("gg")
        errorx.innerHTML = "Please fill the field correctly."
        announceSubject.style.border = "2px solid rgba(0, 0, 0, 0.1)"
        anounceMessage.style.border = "2px solid rgba(0, 0, 0, 0.1)"
        announceSubject.value = ''
        anounceMessage.value = ''
        errorMessage.classList.remove("active")
    })  
})

// CODE TO BE TRANSFERRED SOON
// announceSave.onclick = () => 
// {
//     // errorMessage.classList.add("gg")
//     // errorx.innerHTML = "Message sent!"
//     announceSubject.value = ''
//     anounceMessage.value = ''
//     announceSave.style.background = "rgba(0, 0, 0, 0.1)"
//     announceSave.disabled = true
// }


// function deleteThis(e) {
//     //var data_sub = document.getElementById(rowId).querySelector(".row-data-sub");
//    // e.closest(".msg").remove()
  
// }
function sel(){
    var rowId = event.target.parentNode.id;
    // var data_sub = document.getElementById(rowId).querySelector(".row-data-sub");
    // var data_date = document.getElementById(rowId).querySelector(".row-data-date");
    // var data_mess = document.getElementById(rowId).querySelector(".row-data-mess");
    //console.log(rowId);
 

}
// saves.addEventListener('click', e => {
//     let createLi = ""

//     createLi += ` <a href="announcement-viewing.html">
//     <li class="msg">
//     <span class="message-subject"><strong>Lorem ipsum</strong> </span>&nbsp
//     <br>
//     <p class="whole-message" style="color: rgba(0, 0,0,.3);"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo distinctio, nulla aliquam sequi illum dolorum expedita vero provident nemo eum, sunt enim iusto minus odit autem labore tempore ab quibusdam.</p>
//     </a>
//     <button class="btn-delete" onclick="deleteThis(this)">&times;</button>
//     </li>`
//     ol.innerHTML += (createLi)
// })

