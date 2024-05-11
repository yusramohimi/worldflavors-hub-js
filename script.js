// fonction pour generer les cartes des menus (italien americain asiatique)

function cards(selectedCategory, targetId) {
    const request = new XMLHttpRequest();
    request.open("GET", "menus.json", true);
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            let content = "";
            for (let menu of data.menus) {
                for (let category of menu.categories) {
                    const foundSubcategory = category.subcategories.find(subcategory => subcategory.name === selectedCategory);
                    if (foundSubcategory) {
                        foundSubcategory.products.forEach(product => {
                            content += 
                            `<div class="card" style="width: 18rem;">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                  <h5 class="card-title">${product.name} <span>${product.pieces}</span></h5>
                                  <p class="card-text">${product.description}</p>
                                  <div class="price-rating">
                                    <h5><i class="fa-solid fa-dollar-sign"></i> ${product.price}</h5>
                                    <h5><i class="fa-regular fa-star"></i> ${product.rating}</h5>
                                  </div>
                                  <button class="order-button">Order Now <i class="fa-solid fa-cart-shopping"></i></button>
                                </div>
                            </div>`;
                        });
                    }
                }
            }
            if (content) {
                document.getElementById(targetId).innerHTML = content;
            }
        }
    };
    request.send();
}


//function pour calculer le total prix,calories,protein,carbs des produits selectionnés dans le healthy menu

document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            calculeTotals()
        })
    })

    function calculeTotals() {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'healthy.json', true)
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const ingredientsData = JSON.parse(xhr.responseText)
                let totalPrix = 0
                let totalCalories = 0
                let totalProteines = 0
                let totalGlucides = 0
                
                checkboxes.forEach(function(checkbox) {
                    if (checkbox.checked) {
                        const ingredientName = checkbox.getAttribute('data-ingredient');
                        const ingredientData = ingredientsData.ingredients.find(function(ingredient) {
                            return ingredient.name === ingredientName;
                        })
                        totalPrix += ingredientData.price
                        totalCalories += ingredientData.calories
                        totalProteines += ingredientData.protein
                        totalGlucides += ingredientData.carbs
                    }
                })
                document.getElementById('total-calories').textContent = totalCalories + ' Kcal';
                document.getElementById('total-protein').textContent = totalProteines + ' g';
                document.getElementById('total-carbs').textContent = totalGlucides + ' g';
                document.getElementById('total-price').textContent = totalPrix+ ' DH';
            }
            
        }
        
        
        xhr.send()
    }
});




// Event page

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
    

// validation des formulaires


    

// declaration
const events_form = document.getElementById("events-form");
const submit_button = document.getElementById("submit")
const first_name = document.getElementById("first-name");
const last_name = document.getElementById("last-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const type_event = document.getElementById("type-event");
const nbr_people = document.getElementById("nbr-people");

// functions
    // error message function
    function errorMsg(input,msg){
        const form_grp = input.parentElement;
        // console.log(form_grp);
        form_grp.className = "form-grp error-style"
        const small = form_grp.querySelector('small');
        // console.log(small);
        small.innerText=msg
    }

    // success message function
    function successMsg(input){
        const form_grp = input.parentElement;
        form_grp.className = "form-grp success-style"

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

    if ((phone.value.trim() === "")){
        errorMsg(phone,"Phone number is required !");
    }else if(phone.value.trim() != ""){
       phoneNumCheck(phone)
    } else{
        successMsg(phone);
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