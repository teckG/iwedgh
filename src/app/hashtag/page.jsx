"use client";

import { CopyIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoveStory from "@/components/LoveStory";

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to extract initials from names
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

function HashTag() {
  const [firstName, setFirstName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [nicknames, setNicknames] = useState("");
  const [hashtags, setHashtags] = useState([]);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.join(", ")).then(() => {
      toast.success("Hashtags copied to clipboard!");
    });
  };

  // Load saved hashtags from local storage on component mount
  useEffect(() => {
    const savedHashtags = JSON.parse(localStorage.getItem("generatedHashtags")) || [];
    setHashtags(savedHashtags);
  }, []);

  // Function to generate fun and random hashtags
  const generateHashtags = () => {
    let hashtagOptions = [];
    const formattedDate = weddingDate.replace(/-/g, ""); // Format date without dashes
    const shortYear = formattedDate.slice(2, 4); // Use only the last two digits of the year
    const funWords = ["Love", "Forever", "Hitched", "TiedTheKnot", "Vows", "DreamTeam"];

    const initials = `${getInitials(firstName)}&${getInitials(partnerName)}`;
    const initialsWithLove = `${getInitials(firstName)}❤️${getInitials(partnerName)}`;

    if (firstName && partnerName) {
      const nameCombinations = shuffleArray([
        `${firstName.replace(/\s+/g, "")}${partnerName.replace(/\s+/g, "")}`,
        `${partnerName.replace(/\s+/g, "")}${firstName.replace(/\s+/g, "")}`,
        `${firstName.replace(/\s+/g, "")}And${partnerName.replace(/\s+/g, "")}`,
        `${partnerName.replace(/\s+/g, "")}And${firstName.replace(/\s+/g, "")}`,
      ]);

      const funCombinations = shuffleArray([
        `#${nameCombinations[0]}Forever`,
        `#${nameCombinations[1]}Love`,
        `#${nameCombinations[0]}Hitched`,
        `#${nameCombinations[1]}Vows`,
        `#Team${firstName}${partnerName}`,
        `#${initials}`,
        `#${initialsWithLove}`,
      ]);

      hashtagOptions = [...hashtagOptions, ...funCombinations];
    }

    if (nicknames) {
      const nicknameCombinations = shuffleArray([
        `#${nicknames}Forever`,
        `#Team${nicknames}`,
        `#${nicknames}LoveStory`,
        `#${nicknames}Vows`,
      ]);
      hashtagOptions = [...hashtagOptions, ...nicknameCombinations];
    }

    if (weddingDate) {
      const dateHashtags = shuffleArray([
        `#${firstName}${partnerName}${shortYear}`,
        `#${firstName}And${partnerName}${shortYear}`,
        `#${firstName}And${partnerName}Wedding${shortYear}`,
      ]);
      hashtagOptions = [...hashtagOptions, ...dateHashtags];
    }

    // Add some fun and random wedding-themed combinations
    const funTwists = shuffleArray([
      `#${firstName}And${partnerName}TiedTheKnot`,
      `#${firstName}And${partnerName}Forever${shortYear}`,
      `#${firstName}Weds${partnerName}`,
      `#${partnerName}Weds${firstName}`,
      `#${firstName}${funWords[0]}${partnerName}`,
      `#${partnerName}${funWords[1]}${firstName}`,
    ]);

    hashtagOptions = [...hashtagOptions, ...funTwists];

    const shuffledOptions = shuffleArray(hashtagOptions).slice(0, 7); // Display 7 randomized hashtags
    setHashtags(shuffledOptions);
    localStorage.setItem("generatedHashtags", JSON.stringify(shuffledOptions)); // Save to local storage
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Input Form */}
      <Card className="flex-1 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Hashtag Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your Name"
            className="border-gray-300 rounded-md"
          />
          <Input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Partner's Name"
            className="border-gray-300 rounded-md"
          />
          <Input
            type="text"
            value={nicknames}
            onChange={(e) => setNicknames(e.target.value)}
            placeholder="Nicknames (Optional)"
            className="border-gray-300 rounded-md"
          />
          <Input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="border-gray-300 rounded-md"
          />
          <Button
            onClick={generateHashtags}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Generate Hashtags
          </Button>
        </CardContent>
      </Card>

      {/* Generated Hashtags */}
      {hashtags.length > 0 && (
        <Card className="flex-1 shadow-md bg-slate-700">
          <CardHeader className="bg-orange-500 rounded-t-md">
            <CardTitle className="text-lg font-bold text-white text-center">Generated Hashtags</CardTitle>
          </CardHeader>
          <CardContent className=" p-5 rounded-b-md relative">
            <Button
              onClick={() => copyToClipboard(hashtags)}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md"
            >
              <CopyIcon className="w-4 h-4 mr-1 inline-block" /> Copy All
            </Button>
            <ul className="space-y-2">
              {hashtags.map((hashtag, index) => (
                <li key={index} className="text-white text-sm">
                  {hashtag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {hashtags.length == 0 && (
        <Card className="flex-1 shadow-md">
          <CardHeader className="bg-orange-500 rounded-t-md">
            <CardTitle className="text-lg font-bold text-white text-center">Generated Hashtags</CardTitle>
          </CardHeader>
          <CardContent className=" p-5 rounded-b-md relative">
           No Hash Tags Generated yet
          </CardContent>
        </Card>
      )}
    </div>
      
       {/* Blog Section */}
       {hashtags.length > 0 ||!firstName ||!partnerName && (
       <div className="mt-10 p-6 bg-gray-50 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Our Love Story</h2>
       <LoveStory firstName={firstName} partnerName={partnerName} />
      </div>)}
    </div>  
  );
}

export default HashTag;
