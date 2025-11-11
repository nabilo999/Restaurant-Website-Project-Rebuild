import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import burger from './images/burger.png';
import pie from './images/pie.png';
import coffee from './images/coffee.png';
import fries from './images/fries.png';
import milk from './images/milk.png';
import pancakes from './images/pancakes.png';
import logo from './images/logo3.png';

const Index = () => {
  return (
    <html>
    <Header/>
    <Banner/>
    <Menu/>
    <Gallery/>
    <About/>
    <Contact/>
    <Footer/>
    </html>
  )
}

const Header = () =>{
  return (
  <header>
    <img className="logo" src={logo} alt="logo"></img>
    <nav>
      <a href="#home">Home</a>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  )
}

const Banner = () =>{
  return (
    <section id="home"  className="hero"></section>
  )
}

const Menu = () =>{
  return (
  <section  id="menu" className="menu">
    <h2>Menu</h2>
    <div className="menu-section">
      <div>
        <h3>Breakfast</h3>
        <p>Pancakes with Syrup - $7</p>
        <p>French Toast - $8</p>
        <p>Omelette with Cheese - $9</p>
      </div>
      <div>
        <h3>Main Course</h3>
        <p>classNameic Cheeseburger - $11</p>
        <p>Grilled Chicken Sandwich - $10</p>
        <p>Meatloaf with Mashed Potatoes - $13</p>
      </div>
      <div>
        <h3>Desserts</h3>
        <p>Apple Pie - $5</p>
        <p>Milkshake (Vanilla, Chocolate, Strawberry) - $6</p>
        <p>Ice Cream Sundae - $5</p>
      </div>
    </div>
  </section>
  )
}

const Gallery = () =>{
  return (
  <div>
  <h2 className="test">Image Gallery</h2>
    <section className="gallery-slider">
      <div className="slider-container">
        <div className="slides">
          <img src={burger} alt="Burger" data-price="11"/>
          <img src={pie} alt="Pie" data-price="5"/>
          <img src={coffee} alt="Coffee" data-price="4"/>
          <img src={fries} alt="Fries" data-price="6"/>
          <img src={milk} alt="Milk-shake" data-price="3"/>
          <img src={pancakes} alt="Pancakes" data-price="7"/>
        </div>
        <button className="prev">&lt;</button>
        <button className="next">&gt;</button>
        
      </div>
      <button id="addToCartBtn" className="add-to-cart">Add to Cart</button>
    </section>
  </div>
  )
}



const About = () =>{
  return (
  <section  id="about" className="about">
    <h2>About</h2>
    <p><strong>Our restaurant</strong> has been serving delicious cuisine since <strong>2009</strong>. 
    We specialize in traditional dishes made with fresh, local ingredients. 
    Our mission is to provide a warm and inviting atmosphere where guests can enjoy exceptional food and service.</p>
  </section>
  )
}

const Contact = () =>{
  return (
    <section  id="contact" className="contact">
      <div className="map">
          <iframe
              src="https://www.google.com/maps?q=Hunter+College,+695+Park+Ave,+New+York,+NY+10065&output=embed"
              width="400"
              height="300"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
          </iframe>
      </div>
      <form>
        <h2>Contact Us</h2>
        <input type="text" name="name" placeholder="Name" required/>
        <input type="text" name="email" placeholder="Email" required/>
        <textarea name="text" placeholder="Message" rows="5" required></textarea>
        <button>Send</button>
      </form>
  </section>
  )
}



const Footer = () =>{
  return (
  <footer>
    <p>Follow us: 
      <a href="#">Facebook</a> | 
      <a href="#">Instagram</a>
    </p>
    <p>Business Hours: Mon-Sun 10am - 10pm</p>
  </footer>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
