//console.log('Working')

//Seleccionamos todos los elementos con la clase 'addToCart'
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
// console.log('addToShoppingCartButtons', addToShoppingCartButtons);

//Añadimos un evento por cada botón del carrito
addToShoppingCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

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
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}$MXN</p>
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
}
