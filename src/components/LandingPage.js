import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaUser, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import backgroundImage from '/ItuzeGardenPalace_front-endd/src/Assets/restaurant.jpg';
import chickenImage from '/ItuzeGardenPalace_front-endd/src/Assets/chicken.jpg';

const LandingPage = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = (path) => {
    navigate(path);
 
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  const getAllReservations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reservations');
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getReservationById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reservations/${id}`);
      setSelectedReservation(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="overflow-y-auto bg-stone-600 text-white">
      <div className="min-h-screen" style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8,
      }}>
      <nav className="pt-4 bg-transparent-600 sticky top-0 z-10 flex justify-between p-4">
      <div className="flex items-center">
        <button
          className="text-white mr-4 block sm:hidden"
          onClick={toggleNavbar}
        >
          <FaBars className="text-3xl" />
        </button>
        <ul className={`capitalize ml-32 text-2xl space-x-9  ${isOpen ? 'block' : 'hidden'} sm:flex `}>
          <li className="hover:bg-black hover:text-white"><Link to="/">Home</Link></li>
          <li className="hover:bg-black hover:text-white"><Link to="/gallery">Gallery</Link></li>
          <li  className="hover:bg-black hover:text-white"><Link to="/reservation">Reservation</Link></li>
          
            <button className="hover:bg-black hover:text-white" onClick={() => setIsOn(!isOn)}> Menu</button>
            {isOn && (
                        <div className="absolute z-10 top-full left-0 mt-2 text-sm bg-gray-700 rounded-md shadow-lg">
                          <Link
                            to="/dashboard/approved"
                            onClick={() => handleItemClick('/dashboard/approved')}
                            className="block px-4 py-2 text-white hover:bg-gray-600"
                          >
                            Food Menu
                          </Link>
                          <Link
                            to="/dashboard/myappointment"
                            onClick={() => handleItemClick('/dashboard/myappointment')}
                            className="block px-4 py-2 text-white hover:bg-gray-600"
                          >
                          Drinks Menu
                          </Link>
                        </div>
                      )}
           
        </ul>
      </div>
      <div className="flex justify-end items-center">
        <FaUser className="text-orange-300 z-10 rounded-full p-1 text-3xl bg-yellow-900 md:text-5xl" />
        <h2 className="text-lg font-bold md:text-xl  hover:bg-black hover:text-white"><Link to="/signin">Login</Link></h2>
      </div>
    </nav>
        <div className="bg-transparent flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl">RESTAURANT Experience</h2>
            <p className="text-lg pt-2 md:text-xl">Experience  Ituze Garden Palace: Fine dining, rooftop views, and the best craft cocktails in Kigali.</p>
            <button className="bg-transparent border border-l-white text-white px-4 py-2 rounded mt-4">
              <Link to="/menu">Menu</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex p-4 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{reservation.name}</h2>
              <p className="mb-2">{reservation.description}</p>
              <p className="text-lg font-bold">{reservation.price} Rwandan francs</p>
              <p>RF {reservation.price}</p>
              <button
                onClick={() => getReservationById(reservation._id)}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              >
                Confirm with Deposit
              </button>
            </div>
          ))}
        </div>
      </div>
  
      <div className="flex justify-center py-12 md:py-32 px-6 md:px-12 lg:px-24" style={{
        backgroundImage: `url(${chickenImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8,
      }}>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Satisfy - Your Craving</h2>
          <p className="text-2xl md:text-3xl font-bold">Order Online</p>
          <button className="bg-transparent border border-l-white text-white px-6 py-3 rounded mt-4">
            <Link to="/order">Order Now</Link>
          </button>
        </div>
      </div>
      <div className="p-12 md:p-32">
      <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={5000}
      transitionTime={500}
      className="my-carousel" // Add a custom class name for the carousel
    >
      <div>
        <h3>Jackson Duvert</h3>
        <p className="testimonial-text">This place is very nice and has great food. The view is amazing at night!! A must-go.</p>
      </div>
      <div>
        <h3>Another Testimonial</h3>
        <p className="testimonial-text">Insert another testimonial here.</p>
      </div>
      <div>
        <h3>Yet Another Testimonial</h3>
        <p className="testimonial-text">Insert another testimonial here.</p>
      </div>
    </Carousel>
      </div>
      <div className="flex justify-center items-center py-12 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="flex gap-4">
          <input placeholder="Enter your email here*" type="email" className="bg-transparent border border-l-white text-white px-4 py-2 rounded text-lg md:text-xl" />
          <button className="bg-gray-200 text-black px-6 py-3 rounded text-3xl md:text-4xl">Subscribe Now</button>
        </div>
      </div>
      <footer className="bg-stone-900 text-white p-4">
      <div className="p-4 md:p-8 lg:p-12">
        <div className="flex flex-col justify-center md:justify-between md:flex-row items-center md:space-x-4">
          <p className="text-center md:text-left">Kigali - Rwanda<br />Kimuhurura, KG 623 St</p>
          <div>
            <p className="text-2xl">Ituze Garden Palace</p>
          <ul className="flex space-x-8 text-xl">
            <li><a href="https://www.facebook.com/" className="text-white hover:text-gray-400"><FaFacebookF /></a></li>
            <li><a href="https://twitter.com/" className="text-white hover:text-gray-400"><FaTwitter /></a></li>
            <li><a href="https://www.instagram.com/" className="text-white hover:text-gray-400"><FaInstagram /></a></li>
          </ul>
          </div>
          <p className="text-lg">+250 791 375 628</p>
        </div>
        <div className="flex justify-center mt-4 md:mt-8 lg:mt-12">
          <p className="text-sm md:text-base">FAQ | Terms & Conditions | Privacy Policy | Shipping Policy | Refund Policy | Cookie Policy</p>
        </div>
        <div className="flex justify-center mt-4 md:mt-8 lg:mt-12">
          <p className="text-xs md:text-sm">&copy;2024 Ituze Garden Palace</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default LandingPage;
