"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";

export default function CarouselSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cachedImages = localStorage.getItem("vendorImages");
        if (cachedImages) {
          setImages(JSON.parse(cachedImages));
        } else {
          const response = await axios.get("/api/vendor-images");
          setImages(response.data);
          localStorage.setItem("vendorImages", JSON.stringify(response.data));
        }
      } catch (error) {
        setError("Failed to load images.");
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (images.length === 0) return;

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
  }, [images]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden bg-slate-100">
      {/* Spinner while loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          {error}
        </div>
      )}

     {/* Carousel */}
<div className="relative w-full h-[600px]">
  <div
    className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
      isLoading ? "opacity-0" : "opacity-100"
    }`}
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {images.length > 0
      ? images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={src}
                alt={`Vendor image ${index + 1}`}
                width={800} 
                height={600} 
                className="object-cover"
                loading={index === currentIndex ? "eager" : "lazy"} // Onscreen: eager, Offscreen: lazy
                priority={index === currentIndex} // Only prioritize the current image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
          </div>
        ))
      : !isLoading && (
          <div className="w-full flex items-center justify-center text-gray-500">
            No images to display.
          </div>
        )}
  </div>
</div>


      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3  p-4 rounded-full shadow-lg border border-gray-200">
        {images.map((_, index) => (
          <button
          key={index}
          className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
            currentIndex === index
              ? "bg-[#ffffff] ring-2 ring-green-700"
              : "bg-[#fe8f40]  hover:opacity-100"
          }`}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
        
        ))}
      </div>

      {/* Manual Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          )
        }
        aria-label="Next Slide"
      >
        ›
      </button>
    </div>
  );
}
