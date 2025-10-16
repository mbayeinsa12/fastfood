const allProducts = [
  { id: 1, name: "T-shirt ISEP", price: 5000, image: "https://via.placeholder.com/300x200?text=T-shirt" },
  { id: 2, name: "Casquette", price: 3000, image: "https://via.placeholder.com/300x200?text=Casquette" },
  { id: 3, name: "Sac à dos", price: 8000, image: "https://via.placeholder.com/300x200?text=Sac+à+dos" },
  { id: 4, name: "Chaussures", price: 12000, image: "https://via.placeholder.com/300x200?text=Chaussures" }
];

let cart = [];

function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}">
      <h3>\${product.name}</h3>
      <p>\${product.price} FCFA</p>
      <button onclick="addToCart(\${product.id})">Ajouter au panier</button>
    \`;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  showToast("Produit ajouté au panier 🛒");
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  const cartCount = document.getElementById('cart-count');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = \`\${item.name} - \${item.price} FCFA \`;
    const delBtn = document.createElement('button');
    delBtn.textContent = "❌";
    delBtn.onclick = () => removeFromCart(index);
    li.appendChild(delBtn);
    cartItems.appendChild(li);
  });

  totalDisplay.textContent = total;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById('show-cart').onclick = () => {
  document.getElementById('cart-section').classList.remove('hidden');
};

document.getElementById('close-cart').onclick = () => {
  document.getElementById('cart-section').classList.add('hidden');
};

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}



document.getElementById('search-bar').addEventListener('input', displayProducts);
document.getElementById('category-filter').addEventListener('change', displayProducts);
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Commande envoyée avec succès !");
  cart = [];
  updateCart();
  document.getElementById('cart-section').classList.add('hidden');
});

function displayProducts() {
  const keyword = document.getElementById('search-bar').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  const filteredProducts = allProducts.filter(p =>
    (category === 'all' || p.category === category) &&
    p.name.toLowerCase().includes(keyword)
  );
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}">
      <h3>\${product.name}</h3>
      <p>\${product.price} FCFA</p>
      <button onclick="addToCart(\${product.id})">Ajouter au panier</button>
    \`;
    productList.appendChild(div);
  });
}

const allProducts = [
  { id: 1, name: "T-shirt ISEP", category: "vetement", price: 5000, image: "https://via.placeholder.com/300x200?text=T-shirt" },
  { id: 2, name: "Casquette", category: "accessoire", price: 3000, image: "https://via.placeholder.com/300x200?text=Casquette" },
  { id: 3, name: "Sac à dos", category: "accessoire", price: 8000, image: "https://via.placeholder.com/300x200?text=Sac+à+dos" },
  { id: 4, name: "Chaussures", category: "vetement", price: 12000, image: "https://via.placeholder.com/300x200?text=Chaussures" }
];

displayProducts();
