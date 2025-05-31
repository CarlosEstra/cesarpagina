  const productos = [
  { id: 1, nombre: 'Short Deportivo', precio: 250, img: 'images/short_deportivo.jpg' },
  { id: 2, nombre: 'Playera EC.Sports', precio: 300, img: 'images/ECsports_playera.png' },
  { id: 3, nombre: 'Sudadera Rosa', precio: 500, img: 'images/sudadera_rosa.png' },
  { id: 4, nombre: 'Gorra Negra', precio: 150, img: 'images/gorra_negra.png' },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Contadores carrito en todas las páginas
  actualizarContador();

  // Mostrar productos destacados en index
  const destacados = document.getElementById('destacados-container');
  if (destacados) {
    [productos[0], productos[2]].forEach(p => crearProducto(p, destacados));
  }

  // Mostrar todos los productos en productos.html
  const productosContainer = document.getElementById('productos-container');
  if (productosContainer) {
    productos.forEach(p => crearProducto(p, productosContainer));
  }

  // En carrito.html mostrar los productos en carrito
  if (document.getElementById('cart-items')) {
    mostrarCarrito();
  }
});

function crearProducto(p, contenedor) {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}" class="producto-img" />
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio}</p>
    <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
  `;
  contenedor.appendChild(div);
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
  alert(`${producto.nombre} agregado al carrito.`);
}

function actualizarContador() {
  const contador = document.getElementById('cart-count');
  if (contador) {
    contador.textContent = carrito.length;
  }
}

function mostrarCarrito() {
  const lista = document.getElementById('cart-items');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}" class="producto-img-carrito" />
      <span>${item.nombre} - $${item.precio}</span>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  document.getElementById('total').innerText = total.toFixed(2);
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

function finalizarCompra() {
  if(carrito.length === 0){
    alert('El carrito está vacío.');
    return;
  }
  alert('¡Compra simulada completada! Gracias por elegir EC.Sports.');
  carrito = [];
  localStorage.removeItem('carrito');
  mostrarCarrito();
  actualizarContador();
}
