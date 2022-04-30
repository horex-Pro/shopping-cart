const modalContainer = document.querySelector('.modal-container');
const basketBtn = document.querySelector('#basketBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');

basketBtn.addEventListener('click',(e)=>{
    modalContainer.style.display = 'flex';
})
closeModalBtn.addEventListener('click',(e)=>{
    modalContainer.style.display = 'none'
})