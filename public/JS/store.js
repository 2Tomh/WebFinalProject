
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

fetchProducts()
const cart = [];

const categoryContainer = document.getElementById("category-container")

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    const username = localStorage.getItem("username");
    fetch("/purchase",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({products:cart, username})
    }).then(res => console.log(res))
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function fetchProducts(){
    fetch("/categories").then(res =>res.json()).then(categories =>{
        for(let i =0; i< categories.length ; i++){
            createCategories(categories[i]);
    }}
    )
}

function createCategories(category){
        const categorySection = document.createElement('section');
        const categoryTitle = document.createElement("h2");
        const itemsContainer = document.createElement("div");
        categorySection.className = 'container content-section';
        categoryTitle.className = 'section-header';
        categoryTitle.innerHTML = category.name;
        itemsContainer.className = 'shop-items';

        categorySection.appendChild(categoryTitle)
        categorySection.appendChild(itemsContainer)



        console.log(category)
        for(let i =0; i<category.products.product.length; i++){

        const itemContainer = document.createElement("div");
        const itemTitle = document.createElement("span");
        const image = document.createElement("img");
        const itemsDetails = document.createElement("div");
        const itemPrice = document.createElement("span");
        const button = document.createElement("button");
    

        itemContainer.className = 'shop-item';
        itemContainer.id = category.products.product[i]._id
        itemTitle.className = 'shop-item-title';
        itemTitle.innerHTML =category.products.product[i].name;
        image.className = 'shop-item-image';
        image.src = `${category.products.product[i].imagePath}`
        itemsDetails.className = 'shop-item-details';
        itemPrice.className= 'shop-item-price';
        itemPrice.innerHTML = category.products.product[i].price
        button.className = 'btn btn-primary shop-item-button'
        button.type = 'button'
        button.innerHTML = 'Add to cart'

        itemsDetails.appendChild(itemPrice)
        itemsDetails.appendChild(button);
        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(image);
        itemContainer.appendChild(itemsDetails);
        console.log(itemContainer)
        itemsContainer.appendChild(itemContainer)
        }

        categoryContainer.appendChild(categorySection)

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    cart.push({title, price});
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₪', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₪' + total
}

