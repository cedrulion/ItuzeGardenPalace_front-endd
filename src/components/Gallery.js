import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [featuredPhotos, setFeaturedPhotos] = useState({});
  const token = localStorage.getItem('Token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/photos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setPhotos(res.data);
        const uniqueCategories = [...new Set(res.data.map(photo => photo.category))];
        setCategories(uniqueCategories);
        const featured = {};
        uniqueCategories.forEach(category => {
          const categoryPhotos = res.data.filter(photo => photo.category === category);
          featured[category] = categoryPhotos.length > 0 ? categoryPhotos[0] : null;
        });
        setFeaturedPhotos(featured);
      })
      .catch(err => console.error(err));
  }, [token]);

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  const handleCreate = async newPhotoData => {
    try {
      const res = await axios.post('http://localhost:5000/api/photos', newPhotoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos([...photos, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/photos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos(photos.filter(photo => photo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/photos/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos(photos.map(photo => (photo._id === id ? res.data : photo)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPhotos = selectedCategory
    ? photos.filter(photo => photo.category === selectedCategory)
    : photos;

  return (
    <div className="container mx-auto px-4 py-8">
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newPhotoData = {
            title: formData.get('title'),
            category: formData.get('category'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
          };
          handleCreate(newPhotoData);
          e.target.reset();
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Photo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className="border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Photo
        </button>
      </form>

      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory} Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map(photo => (
              <div key={photo._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-64 object-cover" />
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                  <p className="text-gray-600">{photo.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{photo.category}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDelete(photo._id)}
                      className="text-red-500 hover:text-red-700 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        const updatedData = prompt('Enter updated title:');
                        if (updatedData) {
                          handleUpdate(photo._id, { title: updatedData });
                        }
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
