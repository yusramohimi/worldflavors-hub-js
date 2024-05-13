// show and hide : si l utilisateur choisit le type "company" , la page affiche deux autres champs : le nom de l entreprise et le numero TVA: 
    document.addEventListener("DOMContentLoaded", function() {
        const typeRd = document.getElementsByName("type")
        const companyInfo = document.getElementById("company-info")
    
        for(var i = 0; i < typeRd.length; i++) {
            typeRd[i].addEventListener("change", function(event) {
                if(event.target.value === "company") {
                    // console.log(event.target.value)
                    companyInfo.style.display = "block"
                    
                } else {
                    companyInfo.style.display = "none"
                }
            })
        }
    })
    




//validation formulaire 
// declaration
const events_form = document.getElementById("events-form");
const submit_button = document.getElementById("submit")
const first_name = document.getElementById("first-name");
const last_name = document.getElementById("last-name");
const email = document.getElementById("email");
const phone_event = document.getElementById("phone-event");
const type_event = document.getElementById("type-event");
const nbr_people = document.getElementById("nbr-people");

// functions
    // error message function
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

    // email function
    function emailCheck(input){
        const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if(re.test(input.value.trim())){
            successMsg(input);
        }else{
            errorMsg(input,'Enter a valid Email address')
        }
        
    }
    
    // phone number function
    function phoneNumCheck(input){
       const phonePatt = /^\+212[5-9][0-9]{8}$/

       if(phonePatt.test(input.value.trim())){
        successMsg(input);
       }else{
        errorMsg(input,'Enter a valid phone number')
       }
    }

    // check length function
    function checkLength(input,min,max){
        if(input.value.length < min){
            errorMsg(input,`${(input.name)} must be atleast ${min} characters`)
        } else if (input.value.length > max){
            errorMsg(input,`${(input.name)} must be less then ${max} characters`)
        } else {
            successMsg(input)
        }   
}




// event page formulaire 
submit_button.addEventListener("click",function(event){
    event.preventDefault();

    // first name
    if (first_name.value.trim() === ""){
        errorMsg(first_name,"First name is required !");
    }else if (first_name.value.trim() !== ""){
        checkLength(first_name,4,20)
    }else {
        successMsg(first_name);
    }

    // last name
    if (last_name.value.trim() === ""){
        errorMsg(last_name,"Last name is required !");
    }else if (last_name.value.trim() !== ""){
        checkLength(last_name,4,20)
    }else {
        successMsg(last_name);
    }

    // email
    if ((email.value.trim() === "")){
        errorMsg(email,"Email is required !");
    }else if(email.value.trim() != ""){
       emailCheck(email)
    } else{
        successMsg(email);
    }

    //phone

    if ((phone_event.value.trim() === "")){
        errorMsg(phone_event,"Phone number is required !");
    }else if(phone_event.value.trim() != ""){
       phoneNumCheck(phone_event)
    } else{
        successMsg(phone_event);
    }

    //type of the event
    if ((type_event.value.trim() === "")){
        errorMsg(type_event,"Nature of the event is required !");
    }else {
        successMsg(type_event);
    }


    //number of people
    if ((nbr_people.value.trim() === "")){
        errorMsg(nbr_people,"Number of people is required !");
    }else {
        successMsg(nbr_people);
    }  
})