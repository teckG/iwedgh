"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import {
  Facebook,
  Instagram,
  MessageCircle,
  PhoneCallIcon,
  SendHorizonal,
  Twitter,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import axios from "axios";
import tiktok from "../../../images/tiktok.svg";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function VendorDetailPage({ params }) {
  const { id } = params;
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0); // State to track the selected rating
  const [comment, setComment] = useState("");
  const [vendorId, setvendorId] = useState(id);
  const [replyingTo, setReplyingTo] = useState(null); // Track which review is being replied to
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { user } = useUser(); // Get user data from Clerk
  const [formData, setFormData] = useState({
    comment: ""
   })


  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Send rating to api
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setvendorId(id);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          email: user.primaryEmailAddress.emailAddress,
          vendorId,
          rating,
          comment,
        }),
      });

      if (response.ok) {
        toast.success("Review submitted successfully! 🎉");

        setRating(0); // Reset rating
        setComment(""); // Clear the comment
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Fetch vendor details
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const res = await fetch(`/api/vendors/${id}`, {
          next: {
            revalidate: 50,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setVendor(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?vendorId=${id}`);
      const data = await response.json();


      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]); // Set to empty if the format is unexpected
      }

      setLoading(false);
    };
    fetchReviews();
  }, [id]);

  // Function to extract initials from business name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

// replies
const handleReplySubmit = async (reviewId) => {
  try {
    if (!user.primaryEmailAddress.emailAddress || !formData.comment) {
      console.error("Email or comment is missing");
      return;
    }

    await axios.put(`/api/reviews/${reviewId}`, {
      email: user.primaryEmailAddress.emailAddress,  // Ensure this exists
      comment: formData.comment  // Ensure this is not empty
    });


    // Optionally clear the input after success
    setFormData({ comment: "" });
    setReplyingTo(null);
  } catch (err) {
    console.error("Error updating review:", err);
  }
};
  
  
// Handle input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,  // Updates the field dynamically based on the input name
  }));
};



  // Function to add 'https://' if missing
  const formatURL = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`;
    }
    return link;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width={200}
        >
          <rect
            fill="#F5A47E"
            stroke="#F5A47E"
            strokeWidth="4"
            strokeLinejoin="round"
            width="30"
            height="30"
            x="85"
            y="85"
            rx="0"
            ry="0"
          >
            <animate
              attributeName="rx"
              calcMode="spline"
              dur="1.7"
              values="15;15;5;15;15"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="ry"
              calcMode="spline"
              dur="1.7"
              values="15;15;10;15;15"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="height"
              calcMode="spline"
              dur="1.7"
              values="30;30;1;30;30"
              keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="y"
              calcMode="spline"
              dur="1.7"
              values="40;170;40;"
              keySplines=".6 0 1 .4;0 .8 .2 1"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </svg>
      </div>
    );
  }
  
  if (!vendor && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r text-gray-800">
        <div className="text-center p-6 rounded-sm ">
          <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">
            Oops! Vendor Not Found
          </h1>
          <p className="text-gray-600 text-lg">
            It seems like the vendor you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="mt-6">
            <button
              className="bg-[#fe8f40] text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-500 transition-colors"
              onClick={() => (window.location.href = "/vendors")}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-4xl p-10 rounded-none bg-transparent shadow-none border-none ">
        <div>
          <Carousel>
            <CarouselContent>
              {vendor.uploadImagesOfService?.map((value, index) => (
                <CarouselItem
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(value)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={value}
                      alt={`Service Image ${index}`}
                      width={500}
                      height={400}
                      className="object-cover w-full h-auto"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Next and Previous buttons */}
            <CarouselPrevious className="absolute top-1/2 left-2 transform-translate-y-1/2  rounded-full p-2 shadow-md " />
            <CarouselNext className="absolute top-1/2 right-2 transform-translate-y-1/2  rounded-full p-2 shadow-md" />
          </Carousel>
        </div>

        <CardHeader className="bg-white p-4">
          <div className="flex justify-between items-center">
          <div className="flex items-center">
  {vendor.uploadLogo ? (
    <Image
      src={vendor.uploadLogo}
      alt={vendor.businessName}
      width={50}
      height={50}
      className="rounded-full object-cover w-16 h-16 cursor-zoom-in" // Magnifying glass effect
    />
  ) : (
    <div className="flex justify-center items-center w-16 h-16 bg-gray-300 rounded-full text-2xl font-bold text-white">
      {getInitials(vendor.businessName)}
    </div>
  )}
  <CardTitle className="flex flex-col ml-2">
    <span>{vendor.businessName}</span>
    <span className="text-sm">
      {vendor.businessCategory} 📍 {vendor.address}
    </span>
  </CardTitle>
</div>
            <div className="flex space-x-4">
  {Object.entries(vendor.socialMediaLinks)
    .filter(([platform, link]) => link) // Filter out empty links
    .map(([platform, link], index) => {
      const formattedLink = formatURL(link);
      const iconProps = {
        instagram: <Instagram className="w-6 h-6" />, // Icon size
        twitter: <Twitter className="w-6 h-6" />,
        facebook: <Facebook className="w-6 h-6" />,
        tiktok: (
          <Image
            src={tiktok}
            width={24}
            height={24}
            alt="tiktok logo"
            className="w-6 h-6" // Apply consistent size
          />
        ),
        whatsapp: <MessageCircle className="w-6 h-6" />,
      };

      return (
        <Link
          key={index}
          href={formattedLink}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-transform duration-200">
            {iconProps[platform]}
          </button>
        </Link>
      );
    })}

  <Link
    href={`tel:+233${vendor.activePhoneNumber.slice(1)}`}
    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-transform duration-200"
  >
    <PhoneCallIcon className="w-6 h-6" /> {/* Apply icon size */}
  </Link>
</div>


          </div>

          <CardDescription className="pt-4 text-gray-700">
            <p>{vendor.briefIntroduction}</p>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 text-sm bg-white">
          {vendor.subcategory && (
            <p>
              <span className="font-semibold">Subcategory:</span>{" "}
              {vendor.subcategory}
            </p>
          )}
          <p>
            <span className="font-semibold">First Name:</span>{" "}
            {vendor.firstName}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {vendor.lastName}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {vendor.region}
          </p>
          {vendor.website && (
  <p>
    <span className="font-semibold">Website:</span>
    <Link
      className="text-blue-600 underline ml-2"
      href={formatURL(vendor.website)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {vendor.businessName}
    </Link>
  </p>
)}

        </CardContent>

        <CardFooter className="bg-gray-50 p-4">
          <p className="font-semibold">Email:</p>
          <p>{vendor.email}</p>
        </CardFooter>

        <div className="p-6 bg-white rounded-md">
      <hr className="mb-4" />
      <h1 className="text-xl font-bold mb-4">Share your experience.</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <span>Comment as </span>
          <Badge className="py-1 px-2">
            {user?.firstName || "Anonymous"}
          </Badge>
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <input
                type="radio"
                name="rate"
                id={`star${index + 1}`}
                value={index + 1}
                className="hidden peer"
                onChange={() => setRating(index + 1)}
              />
              <label
                htmlFor={`star${index + 1}`}
                className={`text-2xl cursor-pointer ${
                  index < rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                &#9733;
              </label>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Your feedback"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none flex-1"
          />
          <Button type="submit" className="text-white flex items-center">
            <SendHorizonal className="mr-1" />
          </Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Reviews Section */}{/* Reviews Section */}
<div className="space-y-4 mt-8">
  <h1 className="text-xl font-bold mb-4">Reviews</h1>
  {reviews.length === 0 ? (
    <p>No reviews available.</p>
  ) : (
    reviews.map((review) => (
      <div key={review._id} className="flex gap-4 p-4 border-b">
        {/* Avatar/Initials */}
        <div className="flex justify-center items-center w-12 h-12 bg-gray-300 rounded-full text-2xl font-bold text-white">
          {getInitials(review.firstName)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{review.firstName}</span>
              <div className="flex items-center">
                {/* Rating Stars */}
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {timeSince(new Date(review.createdAt))} ago
            </div>
          </div>
          {/* Review Comment */}
          <p className="mt-1">{review.comment}</p>

          {/* Reply button */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <button
              onClick={() => setReplyingTo(review._id)} // Set the review to reply to
              className="hover:text-blue-600"
            >
              Reply
            </button>
            <div className="flex space-x-2">
              <button className="hover:text-blue-600">
                👍 {review.upvotes?.length || 0}
              </button>
              <button className="hover:text-blue-600">
                👎 {review.downvotes?.length || 0}
              </button>
            </div>
          </div>

{/* Render Replies */}
{review.replies && review.replies.length > 0 && ( // Ensure replies exist
  <div className="mt-4 space-y-2">
    <h4 className="font-semibold text-sm">Replies:</h4>
    {review.replies.map((reply, index) => (
      <div key={index} className="ml-6 mt-2 border-l-2 pl-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{reply.email}</span>
          <span className="text-xs text-gray-500">
            {timeSince(new Date(reply.createdAt))} ago
          </span>
        </div>
        <p className="text-sm">{reply.comment}</p>
      </div>
    ))}
  </div>
)}



          {/* Conditionally render reply input */}
          {replyingTo === review._id && (
            <div className="mt-4">
              <Textarea
                name="comment" // Add name to the input to match formData
                placeholder="Write your reply..."
                value={formData.comment}
                onChange={handleInputChange}
                className="resize-none flex-1"
              />
              <div className="mt-2 flex justify-end">
                <Button
                  onClick={() => handleReplySubmit(review._id)}
                  className="text-white flex items-center"
                >
                  <SendHorizonal className="mr-1" />
                  Submit Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    ))
  )}
</div>

    </div>

        {/* Modal for image preview */}
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogTitle>{vendor.businessName}</DialogTitle>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected Image"
                width={600}
                height={400}
                className="object-cover"
              />
            )}
          <DialogFooter>
          <div className="flex space-x-4">
  {Object.entries(vendor.socialMediaLinks)
    .filter(([platform, link]) => link) // Filter out empty links
    .map(([platform, link], index) => {
      const formattedLink = formatURL(link);
      const iconProps = {
        instagram: <Instagram className="w-6 h-6" />, // Icon size
        twitter: <Twitter className="w-6 h-6" />,
        facebook: <Facebook className="w-6 h-6" />,
        tiktok: (
          <Image
            src={tiktok}
            width={24}
            height={24}
            alt="tiktok logo"
            className="w-6 h-6" // Apply consistent size
          />
        ),
        whatsapp: <MessageCircle className="w-6 h-6" />,
      };

      return (
        <Link
          key={index}
          href={formattedLink}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-transform duration-200">
            {iconProps[platform]}
          </button>
        </Link>
      );
    })}

  <Link
    href={`tel:+233${vendor.activePhoneNumber.slice(1)}`}
    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-transform duration-200"
  >
    <PhoneCallIcon className="w-6 h-6" /> {/* Apply icon size */}
  </Link>
</div>
          </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
}

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes";
  return seconds + " seconds";
};
