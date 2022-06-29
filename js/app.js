const modalContainer = document.querySelector('.modal-container');
const basketBtn = document.querySelector('#basketBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
const clearCartBtn = document.querySelector('.clear-btn');

const totalPricePlaceholder = document.querySelector('.total-price-number');
const numberOfproductInCardBadge = document.querySelector('.icon__badge');

const cardsContainer = document.querySelector('.cards');

const cardProductsContainer = document.querySelector('.items');

let cart = [];

basketBtn.addEventListener('click',(e) => modalContainer.style.display = 'flex');
closeModalBtn.addEventListener('click',(e) => modalContainer.style.display = 'none');


import { productsData } from "./addProduct.js";

class Products {
    // get products from products list array.
    getProduct(){
        return productsData;
    }
};


class Ui {
    //show products in dom.
    static renderDataInDom(product){
        let result = '';
        product.forEach(item => {
            result += `<div class="card">
            <div class="card-actions">
              <div class="circle">
                  <i class="fa-solid fa-bookmark"></i>
              </div>
              <div class="circle">
                <i class="fa-solid fa-basket-shopping add-to-card-btn" data-id=${item.id}></i>
              </div>
            </div>
            <img src=${item.imageUrl} alt="">
            <div class="model">
                ${item.name}
            </div>
            <div class="price">
                ${item.price}$
            </div>
          </div>`;

            cardsContainer.innerHTML = result;
        });
    }
    static getAddToCartBtn(){
        const btns = document.querySelectorAll('.add-to-card-btn');
        const btnsList = [...btns]
        btnsList.forEach(btn =>{
            const id = btn.dataset.id;
            const isItemInCart = cart.find((i)=> i.id === id)
            if(isItemInCart){
                btn.style.color = "#FA8907";
                btn.disabled = true;
            }

            btn.addEventListener('click',(e)=>{

                const addedProduct = {...Storage.getProduct(id),quantity:1};
                btn.style.color = "#FA8907";
                btn.disabled = true;

                // add cart products

                
                cart = [...cart , addedProduct];

                Storage.addProductToCart(cart);

                this.totalPriceAndNumberOfProductAdded(cart);
                this.addCartItem(addedProduct);

                // add item to cart

            })
        })
    }
    static totalPriceAndNumberOfProductAdded(cart){
        let totalPrice = 0;
        let numberOfProductInCard = 0;
        totalPrice = cart.reduce((acc , curr)=>{
            numberOfProductInCard += curr.quantity;
            return acc + curr.quantity * curr.price;
        },0);
        
        totalPricePlaceholder.innerHTML = `$${totalPrice.toFixed(2)}`
        numberOfproductInCardBadge.innerText = numberOfProductInCard;
    }

    static addCartItem(item){
        let div = document.createElement('div');
        div.classList.add('item')
        div.innerHTML = `
              <div class="item-image">
                <img src=${item.imageUrl} alt="item">
              </div>
              <div class="item-detail">
                <div class="item-model">
                  ${item.name}
                </div>
                <div class="item-price">
                  ${item.price}
                </div>
              </div>
              <div class="item-counter">
                <i class="fa-solid fa-plus" data-id=${item.id}></i>
                <span class="count">${item.quantity}</span>
                <i class="fa-solid fa-minus" data-id=${item.id}></i>
              </div>
              <i class="fa-solid fa-trash" data-id=${item.id}></i>
        `

        cardProductsContainer.appendChild(div);
    }
    static setupUi(){
        cart = Storage.getCart() || [];

        const products = new Products();
        const productsData = products.getProduct();
        

        this.totalPriceAndNumberOfProductAdded(cart);

        cart.forEach((item)=> this.addCartItem(item));
    }
    static cartLogic(){
        clearCartBtn.addEventListener('click',()=> this.clearCart());
    }
    static clearCart(){
        cardProductsContainer.innerHTML='';
        modalContainer.style.display = 'none';
        numberOfproductInCardBadge.innerText = 0;
        localStorage.removeItem('cart');
        
        const btns = document.querySelectorAll('.add-to-card-btn');
        const addToCartBtns = [...btns];
        addToCartBtns.forEach(btn => btn.style.color = '#000');

        cart = [];
        
    }
}

class Storage{
    //save data in local storage.
    saveProductInStorage(product){
        localStorage.setItem('products', JSON.stringify(product))
    };

    static getProduct(id){
        const _products = JSON.parse(localStorage.getItem('products'));
        return _products.find((p)=> p.id === parseInt(id));
    };

    static addProductToCart(product){
        localStorage.setItem('cart', JSON.stringify(product));
    };

    static getCart(){
        return JSON.parse(localStorage.getItem('cart'));
    }
    
}

document.addEventListener('DOMContentLoaded', ()=>{
    // set up app
    Ui.setupUi();
    // get cart
    const products = new Products();
    const productsData = products.getProduct();
    const saveData = new Storage();

    saveData.saveProductInStorage(productsData);
    Ui.renderDataInDom(productsData);
    Ui.getAddToCartBtn();
    Ui.cartLogic()
})