import React, { useState, useEffect, useRef } from "react";
import { fetchMenu } from "./api";import ReactDOM from "react-dom/client";
import { saveCart, loadCart } from "./api";

import burger from "./images/burger.png";
import pie from "./images/pie.png";
import coffee from "./images/coffee.png";
import fries from "./images/fries.png";
import milk from "./images/milk.png";
import pancakes from "./images/pancakes.png";
import logo from "./images/logo3.png";
import bannerBg from "./images/banner2.jpg"; 

//helper
function getCartId() {
  let id = localStorage.getItem("cartId");
  if (!id) {
    id = "cart_" + Math.random().toString(36).slice(2);
    localStorage.setItem("cartId", id);
  }
  return id;
}

const Index = () => {
  return (
    <div className="font-sans m-0 p-0 bg-[#fdfdfd] text-[#333]">
      <Header />
      <Banner />
      <Menu />
      <Gallery />
      <Cart />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-[#111] text-white p-4 flex flex-col md:flex-row items-start md:items-center justify-between">
      <img className="h-[120px] w-[110px] object-contain" src={logo} alt="logo" />
      <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
        {["Home", "Menu", "About", "Contact"].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            className="text-white no-underline px-2 md:px-4 text-base md:text-lg"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};

const Banner = () => {
  return (
    <section id="home" className="h-[220px] md:h-[450px] flex items-center justify-center text-white text-2xl md:text-5xl font-bold bg-cover bg-center text-center p-4" style={{ backgroundImage: `url(${bannerBg})` }}></section>
  );
};

const Menu = () =>{
  return (
  <section  id="menu" className="menu p-5 md:p-10">
    <h2 className="text-2xl md:text-3xl mb-5 font-bold">Menu</h2>
    <div className="menu-section flex flex-col md:flex-row gap-8">
      <div className="bg-[#f5f5f5] p-4 rounded-lg flex-1">
        <h3 className="text-xl font-bold mb-2">Breakfast</h3>
        <p>Pancakes with Syrup - $7</p>
        <p>French Toast - $8</p>
        <p>Omelette with Cheese - $9</p>
      </div>
      <div className="bg-[#f5f5f5] p-4 rounded-lg flex-1">
        <h3 className="text-xl font-bold mb-2">Main Course</h3>
        <p>Classic Cheeseburger - $11</p>
        <p>Grilled Chicken Sandwich - $10</p>
        <p>Meatloaf with Mashed Potatoes - $13</p>
      </div>
      <div className="bg-[#f5f5f5] p-4 rounded-lg flex-1">
        <h3 className="text-xl font-bold mb-2">Desserts</h3>
        <p>Apple Pie - $5</p>
        <p>Milkshake (Vanilla, Chocolate, Strawberry) - $6</p>
        <p>Ice Cream Sundae - $5</p>
      </div>
    </div>
  </section>
  )
}

const cartItemsStore = []; 

const Gallery = () => {
  const slidesRef = useRef(null);
  const indexRef = useRef(0);

  const showSlide = (i) => {
    const slides = slidesRef.current;
    if (!slides) return;

    const images = slides.querySelectorAll("img");
    if (images.length === 0) return;

    if (i >= images.length) indexRef.current = 0;
    if (i < 0) indexRef.current = images.length - 1;

    slides.style.transform = `translateX(-${indexRef.current * 100}%)`;
  };

  const next = () => {
    indexRef.current++;
    showSlide(indexRef.current);
  };

  const prev = () => {
    indexRef.current--;
    showSlide(indexRef.current);
  };

  useEffect(() => {
    showSlide(0);

    const addBtn = document.getElementById("addToCartBtn");
    const slides = slidesRef.current;

    if(addBtn && slides) {
  addBtn.onclick = async () => {
    const images = slides.querySelectorAll("img");
    const currentImg = images[indexRef.current];

    const item = {
      // no menuItemId for these image-based items; ok to store name+price
      name: currentImg.alt,
      price: Number(currentImg.getAttribute("data-price")),
      qty: 1
    };

    cartItemsStore.push(item);
    // save to backend
    try {
      const cartId = getCartId();
      await saveCart(cartId, cartItemsStore.map(i => ({ name: i.name, price: i.price, qty: i.qty })));
    } catch (err) {
      console.error("Failed to save cart", err);
    }

    if (window.renderCart) window.renderCart(); // rerender when item added
  };
}

  }, []);

  return (
    <div className="pb-10">
      <h2 className="pl-8 text-2xl font-bold mb-5">Image Gallery</h2>
      
      <section className="relative w-[90%] max-w-[900px] mx-auto rounded-xl">
        <div className="relative w-full md:w-3/5 mx-auto overflow-hidden rounded-lg bg-gray-200">
            <div className="flex transition-transform duration-300 ease-out" ref={slidesRef}>
                <img src={burger} alt="Burger" data-price="11" className="w-full flex-shrink-0 rounded-lg" />
                <img src={pie} alt="Pie" data-price="5" className="w-full flex-shrink-0 rounded-lg" />
                <img src={coffee} alt="Coffee" data-price="4" className="w-full flex-shrink-0 rounded-lg" />
                <img src={fries} alt="Fries" data-price="6" className="w-full flex-shrink-0 rounded-lg" />
                <img src={milk} alt="Milk-shake" data-price="3" className="w-full flex-shrink-0 rounded-lg" />
                <img src={pancakes} alt="Pancakes" data-price="7" className="w-full flex-shrink-0 rounded-lg" />
            </div>
            <button 
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black cursor-pointer z-10" 
                onClick={prev}
            >
            &lt;
            </button>
            <button 
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-black cursor-pointer z-10" 
                onClick={next}
            >
            &gt;
            </button>
        </div>

        <button 
            id="addToCartBtn" 
            className="block mx-auto mt-5 px-5 py-3 bg-[#111] text-white rounded hover:bg-[#333] transition-colors cursor-pointer"
        >
            Add to Cart
        </button>
      </section>
    </div>
  );
};

window.renderCart = () => {};

const Cart = () => {
  useEffect(() => {
    const cartIcon = document.getElementById("cartIcon");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");

    if (!cartIcon || !cartPanel || !closeCart) return;

    cartIcon.onclick = () => {
      cartPanel.style.opacity = "1";
      cartPanel.style.pointerEvents = "auto";
      cartPanel.style.right = "0";
      renderCart(); 
    };

    closeCart.onclick = () => {
      cartPanel.style.opacity = "0";
      cartPanel.style.pointerEvents = "none";
      cartPanel.style.right = "-320px";
    };

    const clearBtn = document.getElementById("clearCart");
    if (clearBtn) {
        clearBtn.onclick = () => {
            cartItemsStore.length = 0; 
            renderCart();
        };
    }

    (async () => {
    try {
      const cid = localStorage.getItem("cartId");
      if (cid) {
        const data = await loadCart(cid);
        if (data && data.items && data.items.length) {
          // replace cartItemsStore content
          cartItemsStore.length = 0;
          data.items.forEach(it => cartItemsStore.push(it));
          if (window.renderCart) window.renderCart();
        }
      }
    } catch (err) {
      console.error("Could not load cart from server", err);
    }
  })();

  }, []);

  function renderCart() {
    const cartList = document.getElementById("cartItems");
    const totalBox = document.getElementById("cartTotal");

    if (!cartList) return;

    cartList.innerHTML = "";

    cartItemsStore.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center py-2 border-b border-gray-200 text-sm";
      li.innerHTML = `
        ${item.name} - $${item.price}
        <button class="remove remove-item text-red-600 font-bold cursor-pointer hover:text-red-800" data-index="${index}">✖</button>
      `;
      cartList.appendChild(li);
    });

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        cartItemsStore.splice(i, 1);
        renderCart();
      });
    });

    const total = cartItemsStore.reduce((sum, item) => sum + item.price, 0);
    totalBox.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;

    window.renderCart = renderCart;
  }

  return (
    <div>
      <div 
        id="cartIcon" 
        className="fixed top-1/2 right-5 bg-[#ccccccce] text-white text-2xl p-4 rounded-2xl cursor-pointer z-50 shadow-md hover:scale-105 transition-transform"
      >🛒</div>
      <div 
        id="cartPanel" 
        className="fixed top-0 -right-[320px] w-[300px] h-full bg-white shadow-2xl p-5 z-50 transition-all duration-300 opacity-0 pointer-events-none overflow-y-auto"
      >
        <h3 className="text-xl font-bold mt-0 mb-4">Your Cart</h3>
        <ul id="cartItems" className="list-none p-0 m-0"></ul>
        
        <div id="cartTotal" className="mt-4 pt-2 border-t border-gray-300 text-right text-lg font-bold">
            <strong>Total:</strong> $0.00
        </div>
        
        <button 
            id="clearCart" 
            className="w-full mt-3 p-2 bg-red-700 text-white rounded hover:bg-red-800 cursor-pointer"
        >
            Clear Cart
        </button>
        <button 
            id="closeCart" 
            className="w-full mt-3 p-2 bg-[#111] text-white rounded hover:bg-[#333] cursor-pointer"
        >
            Close
        </button>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="p-5 md:p-10 bg-[#fafafa]">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="leading-relaxed max-w-4xl">
        <strong>Our restaurant</strong> has been serving delicious cuisine since{" "}
        <strong>2009</strong>. We specialize in traditional dishes made with
        fresh, local ingredients. Our mission is to provide a warm and inviting
        atmosphere where guests can enjoy exceptional food and service.
      </p>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="p-5 md:p-10 flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2">
        <iframe
          src="https://www.google.com/maps?q=Hunter+College,+695+Park+Ave,+New+York,+NY+10065&output=embed"
          className="w-full h-[300px] border-none rounded-md shadow-sm"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      </div>
      <form className="w-full md:w-1/2 flex flex-col gap-3">
        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            required 
            className="p-3 border border-gray-300 rounded w-full" 
        />
        <input 
            type="text" 
            name="email" 
            placeholder="Email" 
            required 
            className="p-3 border border-gray-300 rounded w-full" 
        />
        <textarea 
            name="text" 
            placeholder="Message" 
            rows="5" 
            required 
            className="p-3 border border-gray-300 rounded w-full"
        ></textarea>
        <button className="p-3 bg-[#111] text-white rounded cursor-pointer hover:bg-[#333]">
            Send
        </button>
      </form>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white p-5 text-center">
      <p className="mb-2">
        Follow us: <a href="#" className="text-white mx-2">Facebook</a> | <a href="#" className="text-white mx-2">Instagram</a>
      </p>
      <p className="text-gray-400 text-sm">Business Hours: Mon-Sun 10am - 10pm</p>
    </footer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);