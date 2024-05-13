const phone = document.getElementById("phone");
const book_table_form = document.getElementById("book-table-form")
const book_button = document.getElementById("book-button");
const nom = document.getElementById("name");
const event_date = document.getElementById("date")



function errorMsg(input,msg){
    const form_grp = input.parentElement;
    // console.log(form_grp);
    // form_grp.className = "form-grp error-style"
    form_grp.classList.add("error-style")
    form_grp.classList.remove("success-style")
    const small = form_grp.querySelector('small');
    // console.log(small);
    small.innerText=msg
}

// success message function
function successMsg(input){
    const form_grp = input.parentElement;
    // form_grp.className = "form-grp success-style"
    form_grp.classList.add("success-style")
    form_grp.classList.remove("error-style")
}
function phoneNumCheck(input){
    const phonePatt = /^\+212[5-9][0-9]{8}$/

    if(phonePatt.test(input.value.trim())){
     successMsg(input);
    }else{
     errorMsg(input,'Enter a valid phone number')
    }
 }
book_button.addEventListener("click",function(event){
    event.preventDefault();
     // phone
     console.log("ok")
     if ((phone.value.trim() === "")){
         errorMsg(phone,"Phone number is required !");
     }else if(phone.value.trim() != ""){
        phoneNumCheck(phone)
     } else{
         successMsg(phone);
     }
 
    //  name
     if (nom.value.trim() === ""){
         errorMsg(nom,"Name is required !");
     }else if (nom.value.trim() !== ""){
         checkLength(nom,4,20)
     }else {
         successMsg(nom);
     }

    //  event date
    if(event_date.value.trim() ===""){
        errorMsg(event_date,"Event date is required !")
    }else{
        successMsg(event_date)
    }


 })