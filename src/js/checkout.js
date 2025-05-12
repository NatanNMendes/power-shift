function formatCurrency(value) {
return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(value);
}
  
function updateCheckoutSummary() {
const orderItems = document.getElementById('order-items');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

orderItems.innerHTML = cart.map(item => `
    <div class="flex justify-between text-sm border-b pb-2">
    <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-gray-500 text-xs">${item.option} (Qtd: ${item.quantity})</p>
    </div>
    <div class="text-right">
        <p>${formatCurrency(item.price)}</p>
        <p class="text-xs text-gray-500">Total: ${formatCurrency(item.price * item.quantity)}</p>
    </div>
    </div>
`).join('');
}

const TAX_RATE = 0.12; // 12%
const FREE_SHIPPING_MIN = 1000;
const SHIPPING_COST = 50;
const VALID_COUPONS = {
  'POWER10': 0.10 // 10% de desconto
};

let appliedCoupon = null;

function calculateOrder() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? subtotal * appliedCoupon.value : 0;
  const taxableAmount = subtotal - discount;
  const taxes = taxableAmount * TAX_RATE;
  const shipping = taxableAmount >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
  const total = taxableAmount + taxes + shipping;

  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('discount').textContent = `- ${formatCurrency(discount)}`;
  document.getElementById('taxes').textContent = formatCurrency(taxes);
  document.getElementById('shipping').textContent = formatCurrency(shipping);
  document.getElementById('total').textContent = formatCurrency(total);
  document.querySelector('button[type="submit"]').textContent = `Pagar ${formatCurrency(total)}`;
}

function applyCoupon() {
  const couponInput = document.getElementById('coupon-code');
  const messageElement = document.getElementById('coupon-message');
  const code = couponInput.value.trim().toUpperCase();

  if(VALID_COUPONS[code]) {
    appliedCoupon = {
      code: code,
      value: VALID_COUPONS[code]
    };
    messageElement.textContent = `Cupom ${code} aplicado com sucesso!`;
    messageElement.className = 'text-sm mt-2 text-green-600';
    localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
  } else {
    messageElement.textContent = 'Cupom inválido ou expirado';
    messageElement.className = 'text-sm mt-2 text-red-600';
    appliedCoupon = null;
    localStorage.removeItem('appliedCoupon');
  }
  
  couponInput.value = '';
  calculateOrder();
}

document.addEventListener('DOMContentLoaded', () => {
  const savedCoupon = JSON.parse(localStorage.getItem('appliedCoupon'));
  if(savedCoupon && VALID_COUPONS[savedCoupon.code]) {
    appliedCoupon = savedCoupon;
    document.getElementById('coupon-message').textContent = `Cupom ${savedCoupon.code} aplicado!`;
  }
  calculateOrder();
});


window.addEventListener('cartUpdated', calculateOrder);
window.addEventListener('cartUpdated', updateCheckoutSummary);
document.addEventListener('DOMContentLoaded', updateCheckoutSummary);