"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";

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
    <div className="relative flex-1 overflow-hidden">
       
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
                <AspectRatio ratio={1/1}>
                  <Image
                    src={src}
                    alt={`Image ${index}`}
                    layout="fill"
                    className="object-contain rounded rounded-t-none"
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
