const modalContainer = document.querySelector('.modal-container');
const basketBtn = document.querySelector('#basketBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');

const cardsContainer = document.querySelector('.cards');

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

                const addedProduct = Storage.getProduct(id);
                btn.style.color = "#FA8907";
                btn.disabled = true;

                // add cart products

                
                cart = [...cart,{...addedProduct , quantity:1}];

                Storage.addProductToCart(cart);
            })
        })
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
    
}

document.addEventListener('DOMContentLoaded', ()=>{
    const products = new Products();
    const productsData = products.getProduct();
    const saveData = new Storage();

    saveData.saveProductInStorage(productsData);
    Ui.renderDataInDom(productsData);
    Ui.getAddToCartBtn();
})