
const FeaturedSection = () => {
  const featuredItems = [
    {
      title: 'Emergency Blood Drive',
      description: 'Join us in our emergency blood drive. Your donation can save lives!',
      imageUrl: 'https://i.ibb.co/mFQz8yD/pexels-erik-mclean-9391904.jpg',
    },
    {
      title: 'Donor Appreciation Week',
      description: 'Create Holiday Cheer Give Blood Come to give blood Nov. 10-30 and we’ll say thanks ',
      imageUrl: 'https://i.ibb.co/fpXfdq7/blood-2842450-1920.jpg',
    },
    // Add more featured items as needed
  ];

  return (
    <div className="featured-section bg-gray-900 text-white lg:my-20 my-12 lg:py-32 py-14">
      <h2 className="section-title text-center lg:text-5xl md:text-3xl text-2xl font-bold text-red-500 lg:mb-36 md:mb-10 mb-5">Featured Section</h2>
      <div className="featured-items-container max-w-screen-xl lg:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:gap-12 md:mx-4 md:gap-4 gap-4 mx-3">
        {featuredItems.map((item, index) => (
          <div key={index} className="featured-item relative">
            <img src={item.imageUrl} alt={item.title} className="featured-image w-full h-full rounded-lg" />
            <div className="featured-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h3 className="item-title lg:text-3xl md:text-xl font-bold text-rose-600">{item.title}</h3>
              <p className="item-description text-lg mt-4">{item.description}</p>
              <button className="btn btn-success text-white font-medium mt-6">LEARN MORE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
