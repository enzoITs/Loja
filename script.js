document.addEventListener('DOMContentLoaded', function() {
    // Dados dos produtos
    const products = [
        {
            id: 1,
            name: 'Conjunto Eco Tupperware',
            description: 'Conjunto de potes ecológicos para armazenamento de alimentos.',
            price: 89.90,
            oldPrice: 120.00,
            image: 'https://images.unsplash.com/photo-1583947581924-a6d1c6e0eecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: true
        },
        {
            id: 2,
            name: 'Jogo de Panelas Tupperware',
            description: 'Jogo completo de panelas antiaderentes e duráveis.',
            price: 299.90,
            oldPrice: 350.00,
            image: 'https://images.unsplash.com/photo-1556910639-1dd32a739035?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: false
        },
        {
            id: 3,
            name: 'Pote Hermético Grande',
            description: 'Pote hermético ideal para armazenar grãos e farináceos.',
            price: 49.90,
            oldPrice: 0,
            image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: false
        },
        {
            id: 4,
            name: 'Conjunto de Copos Portáteis',
            description: 'Copos portáteis com tampa para bebidas quentes e frias.',
            price: 75.50,
            oldPrice: 90.00,
            image: 'https://images.unsplash.com/photo-1583947581924-a6d1c6e0eecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: true
        },
        {
            id: 5,
            name: 'Faqueiro Organizador',
            description: 'Organizador de talheres com divisórias práticas.',
            price: 65.00,
            oldPrice: 0,
            image: 'https://images.unsplash.com/photo-1583947581924-a6d1c6e0eecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: false
        },
        {
            id: 6,
            name: 'Tigela para Micro-ondas',
            description: 'Tigela prática e segura para uso no micro-ondas.',
            price: 39.90,
            oldPrice: 50.00,
            image: 'https://images.unsplash.com/photo-1583947581924-a6d1c6e0eecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            isPromo: true
        }
    ];

    // Carrinho de compras
    let cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    const productGrid = document.getElementById('product-grid');
    const promoGrid = document.getElementById('promo-grid');

    // Exibir produtos
    function displayProducts() {
        productGrid.innerHTML = '';
        promoGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let promoTag = '';
            if (product.isPromo) {
                promoTag = '<div class="promo-tag">PROMOÇÃO</div>';
            }

            let oldPrice = '';
            if (product.oldPrice > 0) {
                oldPrice = `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>`;
            }

            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${promoTag}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <div>
                            ${oldPrice}
                            <span class="price">R$ ${product.price.toFixed(2)}</span>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
                    </div>
                </div>
            `;

            if (product.isPromo) {
                promoGrid.appendChild(productCard);
            } else {
                productGrid.appendChild(productCard);
            }
        });

        // Adicionar eventos aos botões
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Adicionar ao carrinho
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Atualizar carrinho
    function updateCart() {
        // Atualizar contador
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Atualizar modal do carrinho
        cartItemsContainer.innerHTML = '';
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Atualizar total
        cartTotalElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
        
        // Adicionar eventos aos botões do carrinho
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Diminuir quantidade
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCart();
    }

    // Aumentar quantidade
    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        item.quantity += 1;
        updateCart();
    }

    // Remover item
    function removeItem(e) {
        const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Abrir/fechar carrinho
    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Fechar carrinho ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Finalizar compra
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        alert('Compra finalizada com sucesso! Obrigado por comprar na TupperStore.');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });

    // Formulário de contato
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        e.target.reset();
    });

    // Inicializar
    displayProducts();
});