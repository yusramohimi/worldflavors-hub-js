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
    