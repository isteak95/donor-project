// UpdateDonation.jsx

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDonation = () => {
  const [book, setBook] = useState({});
  const [brand, setBrand] = useState('');
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/donor/create-donation-request/${params._id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent donation requests:', error);
      });
  }, [params._id]);

  const { _id, name, anotherName, rating, image, Category } = book;

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleProduct = (event) => {
    event.preventDefault();

    const form = event.target;

    const updatedBook = {
      name: form.name.value,
      brand: brand,
      anotherName: form.anotherName.value,
      rating: form.rating.value,
      image: form.image.value,
      Category: form.Category.value,
    };

    fetch(`http://localhost:5000/donor/create-donation-request/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`Updated ${updatedBook.name}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        form.reset();
        setBrand('');
      });
  };

  const Categorys = ['novel', 'thriller', 'history', 'drama', 'sci-fi', 'Other'];

  return (
    <div className="lg:my-[180px] md:mx-16">
      <Toaster position="top-right" reverseOrder={false} autoClose={300} hideProgressBar={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <h1 className="text-center text-5xl font-bold my-10">Update Product</h1>
      <div className="bg-base-200">
        <div className="">
          <div className="card w-full">
            <form onSubmit={handleProduct} className="card-body">
              <div className="lg:flex gap-24 lg:my-20">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={name}
                    className="input input-bordered lg:w-[575px] md:w-[575px]"
                    type="text"
                    placeholder="Enter the name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="Category"
                    value={Category}
                    className="input input-bordered lg:w-[575px] md:w-[575px]"
                    onChange={handleBrandChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {Categorys.map((CategoryName) => (
                      <option key={CategoryName} value={CategoryName}>
                        {CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:flex gap-24 ">
                <div className="">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl">Another Name</span>
                    </label>
                    <input
                      name="anotherName"
                      defaultValue={anotherName}
                      className="input input-bordered lg:w-[575px] md:w-[575px]"
                      type="text"
                      placeholder="Enter another name"
                      required
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rating</span>
                  </label>
                  <input
                    name="rating"
                    defaultValue={rating}
                    className="input input-bordered lg:w-[575px] md:w-[575px]"
                    type="text"
                    placeholder="Enter the rating of the product"
                  />
                </div>
              </div>
              <div className="form-control lg:my-20">
                <label className="label">
                  <span className="label-text text-xl">Image</span>
                </label>
                <input
                  defaultValue={image}
                  name="image"
                  className="input input-bordered"
                  type="text"
                  placeholder="Enter the Image URL"
                  required
                />
              </div>
              <div className="form-control my-16">
                <button className="btn btn-primary" type="submit">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonation;
