const modalContainer = document.querySelector('.modal-container');
const basketBtn = document.querySelector('#basketBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');

const cardsContainer = document.querySelector('.cards');

basketBtn.addEventListener('click',(e) => modalContainer.style.display = 'flex');
closeModalBtn.addEventListener('click',(e) => modalContainer.style.display = 'none');


import { productsData } from "./addProduct.js";

class Products {
    getProduct(){
        return productsData;
    }
};


class Ui {
    static renderDataInDom(product){
        let result = '';
        product.forEach(item => {
            result += `<div class="card">
            <div class="card-actions">
              <div class="circle">
                  <i class="fa-solid fa-bookmark"></i>
              </div>
              <div class="circle">
                <i class="fa-solid fa-basket-shopping" data-id=${item.id}></i>
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
}

class Storage{
    saveProductInStorage(products){
        localStorage.setItem('products', JSON.stringify(products))
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    const products = new Products();
    const productsData = products.getProduct();
    const saveData = new Storage();

    saveData.saveProductInStorage(productsData);
    Ui.renderDataInDom(productsData);
})