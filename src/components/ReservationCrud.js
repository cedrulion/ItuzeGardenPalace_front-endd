import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ReservationCrud = () => {
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    seats: '',
    description: '',
    price: '',
  });
  const [updatingId, setUpdatingId] = useState(null);
  const token = localStorage.getItem('Token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reservations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/reservations', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        name: '',
        seats: '',
        description: '',
        price: '',
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/${updatingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        name: '',
        seats: '',
        description: '',
        price: '',
      });
      setUpdatingId(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (reservation) => {
    setFormData({
      name: reservation.name,
      seats: reservation.seats,
      description: reservation.description,
      price: reservation.price,
    });
    setUpdatingId(reservation._id);
  };

  return (
    <div className="overflow-y-auto bg-stone-600 text-white">
      <nav className="pt-4 bg-transparent-600 sticky top-0 z-10 flex justify-between p-4">
        <div className="flex items-center">
          <button className="text-white mr-4 block sm:hidden">
            <FaBars className="text-3xl" />
          </button>
          <ul className="capitalize ml-32 text-2xl space-x-9 sm:flex">
            <li className="hover:bg-black hover:text-white"><Link to="/">Home</Link></li>
            <li className="hover:bg-black hover:text-white"><Link to="/gallery">Gallery</Link></li>
            <li className="hover:bg-black hover:text-white"><Link to="/reservation">Reservation</Link></li>
            <li className="hover:bg-black hover:text-white"><Link to="/menu">Menu</Link></li>
          </ul>
        </div>
        <div className="flex justify-end items-center">
          <FaUser className="text-orange-300 z-10 rounded-full p-1 text-3xl bg-yellow-900 md:text-5xl" />
          <h2 className="text-lg font-bold md:text-xl hover:bg-black hover:text-white"><Link to="/signin">Login</Link></h2>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Reservation CRUD</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Add New Reservation</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              name="seats"
              placeholder="Seats"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {updatingId ? (
              <button type="button" onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Update Reservation
              </button>
            ) : (
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add Reservation
              </button>
            )}
          </form>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reservations.map(reservation => (
            <div key={reservation._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold">{reservation.name}</h3>
                <p className="text-gray-600">Seats: {reservation.seats}</p>
                <p className="text-gray-600">Description: {reservation.description}</p>
                <p className="text-gray-600">Price: ${reservation.price}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationCrud;
