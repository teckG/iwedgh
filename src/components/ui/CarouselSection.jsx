"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import Link from "next/link";

export default function CarouselSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/vendor-images');
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    intervalRef.current = setInterval(goToNextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  return (
    <div className="relative flex-1 py-4 overflow-hidden">
       <Link
        href="/vendors"
        className="block bg-green-600  px-6 py-3 text-center text-white font-semibold 
        shadow-md hover:bg-yellow-500 transition-transform duration-200 transform  
         focus:outline-none focus:ring-4 focus:ring-yellow-300 m-0"
      >
        Check out our vendors &rarr;
      </Link>
      <div className="relative w-full h-[500px]"> 
        <div
          className="absolute py-0 inset-0 flex transition-transform duration-500 ease-in-out "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.length > 0 ? (
            images.map((src, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
              >
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={src}
                    alt={`Image ${index}`}
                    layout="fill"
                    className="object-cover rounded-md rounded-t-none"
                  />
                </AspectRatio>
              </div>
            ))
          ) : (
            <p></p>
          )}
          
        </div>
      </div>
     
    </div>
  );
}
