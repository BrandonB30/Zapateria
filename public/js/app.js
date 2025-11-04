// Formato de moneda COP
const fmt = (n) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

// Función para mostrar mensajes flotantes (sin botón)
function showMessage(text, type = 'info') {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
  msg.style.zIndex = '9999';
  msg.style.minWidth = '300px';
  document.body.appendChild(msg);

  // Desaparece automáticamente a los 3 segundos
  setTimeout(() => msg.remove(), 3000);
}

// Cargar productos desde la API
async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const list = document.getElementById('product-list');

  // Renderizar los productos en tarjetas
  list.innerHTML = products.map(p => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="text-muted mb-2">${p.description}</p>
          <p class="fw-bold">${fmt(p.price)}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-primary" data-id="${p.id}" data-qty="1">Agregar</button>
            <a href="/cart.html" class="btn btn-outline-secondary">Ver carrito</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Agregar evento a cada botón "Agregar"
  list.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const productId = Number(btn.dataset.id);
      const qty = Number(btn.dataset.qty);

      // Validación antes de enviar al servidor
      if (!productId || qty <= 0) {
        showMessage('❌ Error: datos inválidos.', 'danger');
        return;
      }

      try {
        const res = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, qty })
        });

        if (res.ok) {
          showMessage('✅ Producto agregado al carrito 🛒', 'success');
          updateCartCount();
        } else {
          const error = await res.json();
          showMessage(`❌ ${error.message || 'No se pudo agregar el producto.'}`, 'danger');
        }
      } catch (err) {
        showMessage('⚠️ Error de conexión con el servidor.', 'warning');
      }
    });
  });

  updateCartCount();
}

// Actualizar el contador del carrito (ícono)
async function updateCartCount() {
  const res = await fetch('/api/cart');
  const cart = await res.json();
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById('cart-count').textContent = String(count);
}

// Ejecutar al cargar
loadProducts();
