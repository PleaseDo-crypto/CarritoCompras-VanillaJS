//console.log('Working')

//Seleccionamos todos los elementos con la clase 'addToCart'
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
// console.log('addToShoppingCartButtons', addToShoppingCartButtons);

//Añadimos un evento por cada botón del carrito
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const buyButton = document.querySelector('.comprarButton');
buyButton.addEventListener('click', buyButtonClicked);

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

function updateShoppingCartTotal(){
    let total = 0;
    //Muestra el valor en pantalla (Lo imprime donde toma la clase)
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    // Seleccionamos todos los elementos con la clase shoppingCartItem
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        // Tomamos el Precio por cada Item
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
                                                                        //Sustituimos € por un String vacio 
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('€', ''));
        
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        //Tomamos el valor extraido de shoppingCartItemQuantityElement
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        //Operación de nuestro precio total
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    })
    //Mostramos nuestro valor total de la operación
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}MXN`
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

function buyButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}