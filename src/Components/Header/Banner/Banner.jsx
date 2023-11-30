
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='relative '>
      <AwesomeSlider
        className="awesome-slider opacity-60"
        media={[
          {
            source: 'https://i.ibb.co/XZ6Kh7c/12086570.jpg',
          },
          {
            source: 'https://i.ibb.co/5nn2Z6W/29233659.jpg',
          },
          {
            source: 'https://i.ibb.co/8rkSN9M/38061654.jpg',
          },
          {
            source: 'https://i.ibb.co/br6J5Sm/1878463.jpg',
          },
        ]}
      />
      <div className="absolute lg:top-[950px] top-[280px] md:top-[390px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black z-10   lg:p-20">
        <h1 className="md:text-2xl lg:text-6xl font-bold lg:mb-20 md:mb-5 mb-2 ">Join as a <span className='text-orange-500'>Donor !</span></h1>
        <div className="flex justify-center space-x-4">
          <Link to="/registration" className="btn btn-primary text-white font-medium px-8 py-2">
            Join as a Donor
          </Link>
          <Link to="/searchdonors" className="btn btn-secondary text-white font-medium px-8 py-2">
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
