const modalContainer = document.querySelector('.modal-container');
const basketBtn = document.querySelector('#basketBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');

basketBtn.addEventListener('click',(e) => modalContainer.style.display = 'flex');
closeModalBtn.addEventListener('click',(e) => modalContainer.style.display = 'none');


import { productsData } from "./addProduct.js";

class Products {
    getProduct(){
        return productsData;
    }
}



document.addEventListener('DOMContentLoaded', ()=>{
    const products = new Products();
    const productsData = products.getProduct();

    console.log(productsData);
})