// Formato de moneda COP
const fmt = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

// Mostrar mensaje temporal
function showMessage(text, type = 'info') {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  msg.style.zIndex = '9999';
  msg.style.minWidth = '300px';
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000); // desaparece después de 3 segundos
}

// Obtener productos del servidor
async function getProducts() {
  const res = await fetch('/api/products');
  return res.json();
}

// Obtener carrito actual
async function getCart() {
  const res = await fetch('/api/cart');
  return res.json();
}

// Renderizar tabla del carrito
async function renderCart() {
  const [products, cart] = await Promise.all([getProducts(), getCart()]);
  const map = new Map(products.map(p => [p.id, p]));
  const tbody = document.getElementById('cart-body');
  let total = 0;

  tbody.innerHTML = cart.map(item => {
    const p = map.get(item.productId);
    const sub = p ? p.price * item.qty : 0;
    total += sub;
    return `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${p?.image || ''}" alt="${p?.name || ''}" width="70" height="50" class="rounded">
            <div>
              <div class="fw-semibold">${p?.name || 'Producto'}</div>
              <div class="text-muted">${fmt(p?.price || 0)}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="input-group" style="max-width:160px">
            <button class="btn btn-outline-secondary btn-sm" data-action="dec" data-id="${item.productId}">-</button>
            <input class="form-control form-control-sm text-center" value="${item.qty}" readonly>
            <button class="btn btn-outline-secondary btn-sm" data-action="inc" data-id="${item.productId}">+</button>
          </div>
        </td>
        <td class="fw-semibold">${fmt(sub)}</td>
        <td>
          <button class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${item.productId}">
            Quitar
          </button>
        </td>
      </tr>
    `;
  }).join('');

  document.getElementById('cart-total').textContent = fmt(total);
  document.getElementById('cart-count').textContent = String(cart.reduce((a, i) => a + i.qty, 0));

  // Manejar acciones
  tbody.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      if (!id) {
        showMessage("❌ Error: ID del producto inválido.", "danger");
        return;
      }

      if (action === 'remove') {
        await fetch('/api/cart/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id })
        });
        showMessage('🗑️ Producto eliminado del carrito', 'warning');
      }

      else if (action === 'inc') {
        await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id, qty: 1 })
        });
        showMessage('✅ Cantidad aumentada', 'success');
      }

      else if (action === 'dec') {
        const curr = cart.find(i => i.productId === id)?.qty || 0;
        if (curr > 1) {
          await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: id, qty: -1 })
          });
          showMessage('➖ Cantidad reducida', 'info');
        } else {
          await fetch('/api/cart/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: id })
          });
          showMessage('🗑️ Producto eliminado del carrito', 'warning');
        }
      }

      renderCart();
    });
  });
}

// Vaciar carrito
document.getElementById('btn-clear')?.addEventListener('click', async () => {
  await fetch('/api/cart/clear', { method: 'POST' });
  showMessage('🧹 Carrito vaciado', 'danger');
  renderCart();
});

// Ejecutar al cargar
renderCart();

