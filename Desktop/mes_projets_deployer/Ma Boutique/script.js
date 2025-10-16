const products = [
    { id: 1, name: "T-shirt ISEP", price: 5000, image: "https://via.placeholder.com/200x150?text=T-shirt" },
    { id: 2, name: "Casquette", price: 3000, image: "https://via.placeholder.com/200x150?text=Casquette" },
    { id: 3, name: "Sac à dos", price: 8000, image: "https://via.placeholder.com/200x150?text=Sac+à+dos" }
  ];
  
  let cart = [];
  
  const productList = document.getElementById('product-list');
  const cartSection = document.getElementById('cart-section');
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalDisplay = document.getElementById('total');
  
  function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} FCFA</p>
        <button onclick="addToCart(${product.id})">Ajouter au panier</button>
      `;
      productList.appendChild(div);
    });
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
  }
  
  function updateCart() {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price} FCFA `;
      const delBtn = document.createElement('button');
      delBtn.textContent = "🗑️";
      delBtn.onclick = () => removeFromCart(index);
      li.appendChild(delBtn);
      cartItems.appendChild(li);
    });
    cartCount.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.textContent = total;
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  document.getElementById('show-cart').onclick = () => {
    cartSection.classList.remove('hidden');
  };
  
  document.getElementById('close-cart').onclick = () => {
    cartSection.classList.add('hidden');
  };
  
  displayProducts();
  