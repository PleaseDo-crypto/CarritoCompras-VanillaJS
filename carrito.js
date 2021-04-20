//console.log('Working')

//Seleccionamos todos los elementos con la clase 'addToCart'
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
// console.log('addToShoppingCartButtons', addToShoppingCartButtons);

//Añadimos un evento por cada botón del carrito
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const discountInputElement = document.querySelector('.discountTotal');
discountInputElement.addEventListener('keyup', discountInputKeyup);



const voidButton = document.querySelector('.vaciarButton');
voidButton.addEventListener('click', voidButtonClicked);

const buyButton = document.querySelector('.pagarButton');
buyButton.addEventListener('click', pagarButtonClicked);



const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');



//Recibimos el evento en la función
function addToCartClicked(event){
    const button = event.target;
    // Tomamos el elemento más cercano de la clase item
    const item = button.closest('.item');
    // Tomamos las clases item y extraemos el contenido de cada una
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    // Pasamos nuestras 3 variables a una nueva función
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}
function addItemToShoppingCart(itemTitle, itemPrice, itemImage){
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName
    ('shoppingCartItemTitle');

    for(let i = 0; i< elementsTitle.length; i++){
        if (elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.
            querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    // console.log(itemTitle, itemPrice, itemImage)
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    //Tomamos el contenido generado dentro de la variable ShoppingCartRow
    shoppingCartRow.innerHTML = shoppingCartContent
    //Lo incluimos con append en shoppingCartItemsContainer
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow.querySelector('.buttonDelete').addEventListener
    ('click', removeShoppingCartItem);

    shoppingCartRow
     .querySelector('.shoppingCartItemQuantity')
     .addEventListener('change', quantityChanged);

    updateShoppingCartTotal()
}

function updateShoppingCartTotal(discountInput){
    let total = 0;
    let total2 = 0;

    //Selecciona el elemento por la clase
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartTotalModal = document.querySelector('.shoppingCartTotalModal');

    //Muestra el valor en pantalla en el Modal
    const shoppingCartQuantity = document.querySelector('.shoppingCartQuantity');

    //Tomamos la clase de notificaciones del botón de arriba
    const notifQuantity = document.querySelector('.notifQuantity');

    // Seleccionamos todos los elementos con la clase shoppingCartItem
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    let quantity = 0;

    shoppingCartItems.forEach((shoppingCartItem) => {
        // Tomamos el Precio por cada Item
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
                                                                        //Sustituimos € por un String vacio 
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$MXN', ''));
        
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        //Tomamos el valor extraido de shoppingCartItemQuantityElement
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        
        //Tomamos la cantidad de productos para mostrarsela al usuario.
        quantity = quantity + shoppingCartItemQuantity;

        //Operación de nuestro precio total
            total = total + shoppingCartItemPrice * shoppingCartItemQuantity;    
            total2 = total;
            if(total < 0){
                total = 0
            }
       
    });
        

        if(discountInput > 0){
            total2 = total - discountInput;
            if(total2 < 0)
            {
                total2 = 0
            }
        }
      
    //Mostramos nuestro valor total de la operación
    shoppingCartTotal.innerHTML = `${total.toFixed(2)} $MXN`
    shoppingCartTotalModal.value = `${total2.toFixed(2)} $MXN`


    notifQuantity.innerHTML = `<span class="badge badge-light"> ${quantity}</span>`;
    shoppingCartQuantity.value = ` ${quantity}`;
   
      
        
}

function removeShoppingCartItem(event){
    //Tomamos el evento
    const buttonClicked = event.target;
    //Removemos el nodo
    buttonClicked.closest('.shoppingCartItem').remove();
    //Actualizamos el precio haciendo de nuevo la operación de total.
    updateShoppingCartTotal();
}

function quantityChanged(event){
    //Tomamos el evento
    const input = event.target;
    if (input.value <=0){
        //El valor no podrá ser 0 ni negativo.
        input.value = 1;
    }
    updateShoppingCartTotal();
}



//Funcion para vaciar el carrito
function voidButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();  
}

//Funcion para vaciar el carrito pagando
function pagarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();  
}

function checkchange(){
    var checkBox = document.getElementById("Checked");
    const generate = document.querySelector('.generateTotal');
    if (checkBox.checked == true){
        generate.innerHTML = `Monedas de descuento (99 máximo):
        <input class="form-control small shoppingCartTotalModal discountTotal" id='discount' type="text">`;

      } else {
        generate.innerHTML = ''
      }
}

//Funcion para aplicar descuento
function discountInputKeyup(){
    let discountInput = 0;
    discountInput = Number(discountInputElement.value)

    var input=  document.getElementById('discount');
    input.addEventListener('input',function(){
    if (this.value.length > 2) 
        this.value = this.value.slice(0,2); 
    })
    // console.log(discountInput)
    updateShoppingCartTotal(discountInput);
}

//Función Mouseover
$(document).ready(function(){
    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
});





function cargarProvincias() {
    var array = ["Edomex", "Jalisco", "Michoacán", "Chiapas", "Guerrero"];
    array.sort();
    addOptions("provincia", array);
}


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    for (provincia in array) {
        var opcion = document.createElement("option");
        opcion.text = array[provincia];
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[provincia].toLowerCase()
        selector.add(opcion);
    }
}



function cargarPueblos() {
    // Objeto de provincias con pueblos
    var listaPueblos = {
      edomex: ["Toluca", "Valle de Bravo", "San Juan", "Aculco", "Ecatepec"],
      jalisco: ["Guadalajara", "Mazamitla", "Tapalpa", "Lagos de Moreno", "San Pedro"],
      michoacan: ["Morelia", "Pátzcuaro", "Santa Clara", "Uruapan", "Zamora de Hidalgo"],
      chiapas: ["Tuxtla ", "San Pedro", "Tapachula", "Palenque", "Chiapa de Corzo"],
      guerrero: ["Acapulco", "Taxco", "Tlapa", "Teloloapan", "Pilcaya"]
    }
    
    var provincias = document.getElementById('provincia')
    var pueblos = document.getElementById('pueblo')
    var provinciaSeleccionada = provincias.value
    
    // Se limpian los pueblos
    pueblos.innerHTML = '<option value="">Seleccione un Pueblo...</option>'
    
    if(provinciaSeleccionada !== ''){
      // Se seleccionan los pueblos y se ordenan
      provinciaSeleccionada = listaPueblos[provinciaSeleccionada]
      provinciaSeleccionada.sort()
    
      // Insertamos los pueblos
      provinciaSeleccionada.forEach(function(pueblo){
        let opcion = document.createElement('option')
        opcion.value = pueblo
        opcion.text = pueblo
        pueblos.add(opcion)
      });
    }
    
  }
  cargarProvincias();