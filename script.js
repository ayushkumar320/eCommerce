document.addEventListener("DOMContentLoaded", () => {
	const products = [
		{id: 1, name: "Product 1", price: 29.99},
		{id: 2, name: "Product 2", price: 19.99},
		{id: 3, name: "Product 3", price: 59.99},
	]
	
	const cart = [];
	const productList = document.querySelector("#product-list");
	const cartItems = document.querySelector("#cart-items");
	const emptyCartMessage = document.querySelector("#empty-cart");
	const cartTotalMessage = document.querySelector("#cart-total");
	const totalPriceDisplay = document.querySelector("#total-price");
	const checkOutBtn = document.querySelector("#checkout-btn");
	
	
	products.forEach((product) => {
		const productDiv = document.createElement("div");
		productDiv.classList.add("product");
		productDiv.innerHTML = `
		<span>${product.name} - $${product.price.toFixed(2)}</span> 
		<button data-id="${product.id}">Add to cart</button>
		`;
		productList.appendChild(productDiv);
	});

	productList.addEventListener("click", (event) => {
		if(event.target.tagName === "BUTTON"){
			const productId = parseInt(event.target.getAttribute("data-id"));
			const product = products.find((p) => p.id === productId);
			addToCart(product);
		}
	});

	function addToCart(product){
		cart.push(product);
		renderCart();
	}

	function renderCart(){
		cartItems.innerHTML = "";
		let totalPrice = 0;
		if(cart.length > 0){
			emptyCartMessage.classList.add("hidden");
			cartTotalMessage.classList.remove("hidden");
			cart.forEach((item, index) => {
				totalPrice += item.price;
				const cartItem = document.createElement("div");
				cartItem.innerHTML = `
				<span>${item.name} - $${item.price.toFixed(2)}</span>
				<button class="delete">Remove from cart</button> <br> <br>
				`;
				cartItems.appendChild(cartItem);
				totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`
			});
		} else {
			emptyCartMessage.classList.remove("hidden");
			totalPriceDisplay.textContent = `$0.00`
		}
	}
	cartItems.addEventListener("click", (event) => {
		if (event.target.classList.contains("delete")) {
			const itemIndex = Array.from(cartItems.children).indexOf(event.target.parentElement);
			cart.splice(itemIndex, 1); // remove item from cart
			renderCart(); // re-render the cart
		}
	});
	
	checkOutBtn.addEventListener("click", () => {
		cart.length = 0;
		alert("Checkout completed!");
		renderCart();
	});
});