
const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-us-section p-10 lg:py-36 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="lg:text-5xl text-3xl font-bold mb-6 text-amber-500">Contact Us</h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-xl font-semibold text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border input border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xl font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border input border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-xl font-semibold text-gray-600">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {/* Contact Number */}
        <div>
          <h3 className="text-3xl font-semibold mb-2">Contact Number</h3>
          <p className="text-xl">For inquiries, please call: <span className="font-bold">123-456-7890</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
