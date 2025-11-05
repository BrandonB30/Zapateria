// public/js/app.js

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

let allProducts = []; // Aquí guardaremos todos los productos originales

// Función para renderizar productos en pantalla
function renderProducts(products) {
  const list = document.getElementById('product-list');
  
  if (!list) {
    console.error('Error: No se encontró el elemento product-list');
    return;
  }
  
  if (!products || !Array.isArray(products) || !products.length) {
    list.innerHTML = `<p class="text-center text-muted">No se encontraron productos</p>`;
    return;
  }

  list.innerHTML = products.map(p => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height: 200px; object-fit: cover;">
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

  // Agregamos los eventos de agregar al carrito
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
}

// Cargar productos desde la API
async function loadProducts() {
  try {
    console.log('Cargando productos...');
    const res = await fetch('/api/products');
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
    }
    
    allProducts = await res.json(); // Guardamos todos los productos en memoria
    console.log('Productos cargados:', allProducts);
    renderProducts(allProducts);
    updateCartCount();
  } catch (error) {
    console.error('Error al cargar productos:', error);
    showMessage(`❌ Error al cargar los productos: ${error.message}`, 'danger');
  }
}

// Actualizar el contador del carrito (ícono)
async function updateCartCount() {
  try {
    const res = await fetch('/api/cart');
    if (!res.ok) return;
    
    const cart = await res.json();
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    document.getElementById('cart-count').textContent = String(count);
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
  }
}

// Filtro de búsqueda
function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const filterBtn = document.getElementById('filter-btn');

  if (!searchInput || !minPriceInput || !maxPriceInput || !filterBtn) {
    console.warn('Algunos elementos del filtro no se encontraron');
    return;
  }

  function applyFilters() {
    const text = searchInput.value.trim().toLowerCase();
    const min = parseFloat(minPriceInput.value) || 0;
    const max = parseFloat(maxPriceInput.value) || Infinity;

    const filtered = allProducts.filter(p => {
      const matchesName = p.name.toLowerCase().includes(text) || 
                          p.description.toLowerCase().includes(text);
      const matchesPrice = p.price >= min && p.price <= max;
      return matchesName && matchesPrice;
    });

    renderProducts(filtered);
  }

  // Filtrar al hacer clic en el botón
  filterBtn.addEventListener('click', applyFilters);

  // Filtrar al presionar Enter en cualquier input
  [searchInput, minPriceInput, maxPriceInput].forEach(input => {
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
      });
    }
  });

  // Filtrar mientras escribe 
  searchInput.addEventListener('input', () => {
    const text = searchInput.value.trim().toLowerCase();
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(text) || 
      p.description.toLowerCase().includes(text)
    );
    renderProducts(filtered);
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM cargado, inicializando...');
  await loadProducts();
  setupFilters();
  console.log('Inicialización completada');
});