let cart = [];
let cartVisible = false;

function toggleCart() {
  cartVisible = !cartVisible;
  const dropdown = document.getElementById('cart-dropdown');
  dropdown.classList.toggle('hidden');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function syncCart() {
  const cartEvent = new CustomEvent('cartUpdated');
  window.dispatchEvent(cartEvent);
}

function addToCart(event) {
  const button = event.currentTarget;
  const product = {
    name: button.dataset.productName,
    price: parseFloat(button.dataset.productPrice),
    quantity: 1,
    option: getSelectedOption(button.closest('.modal'))
  };

  const existingIndex = cart.findIndex(item => 
    item.name === product.name && 
    item.option === product.option
  );

  if(existingIndex > -1) {
    cart[existingIndex].quantity++;
  } else {
    cart.push(product);
  }

  saveCart();
  syncCart();
  toggleCart();
}

function getSelectedOption(modal) {
  const selectedOption = modal.querySelector('input[name="size-choice"]:checked');
  return selectedOption ? selectedOption.parentElement.textContent.trim() : 'Sem opções';
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between border-b pb-2">
      <div class="flex-1">
        <p class="font-medium">${item.name}</p>
        <p class="text-sm text-gray-500">${item.brand} - ${item.option}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="updateQuantity(${cart.indexOf(item)}, -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
        <span class="min-w-[20px] text-center">${item.quantity}</span>
        <button onclick="updateQuantity(${cart.indexOf(item)}, 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
      </div>
      <p class="ml-4 font-medium">${formatCurrency(item.price * item.quantity)}</p>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cart-total').textContent = formatCurrency(total);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  
  if(cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  
  updateCartUI();
}

document.addEventListener('click', (e) => {
  const cartBtn = document.querySelector('[onclick="toggleCart()"]');
  const dropdown = document.getElementById('cart-dropdown');
  
  if(!cartBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
    cartVisible = false;
  }
});

function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', loadCart);