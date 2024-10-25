import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ vendor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? vendor.uploadImagesOfService.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === vendor.uploadImagesOfService.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Shifts the entire set of images
        }}
      >
        {vendor.uploadImagesOfService?.map((value, index) => (
          <div
            key={index}
            className={`min-w-full flex-shrink-0 relative cursor-pointer transition-opacity duration-300 
              ${index === currentIndex ? 'opacity-100 scale-110' : 'opacity-30'}
            `}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={value}
              alt={`Service Image ${index}`}
              width={300} // Adjusted width
              height={200} // Adjusted height
              className="object-cover w-full h-auto rounded-lg transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Previous and Next buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default ImageCarousel;
