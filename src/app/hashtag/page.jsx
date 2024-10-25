"use client";
import { CopyIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
      
    });
  };

  // Load saved hashtags from local storage on component mount
  useEffect(() => {
    const savedHashtags = JSON.parse(localStorage.getItem('generatedHashtags')) || [];
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

    setHashtags(shuffleArray(hashtagOptions).slice(0, 7)); // Display 7 randomized hashtags
    localStorage.setItem('generatedHashtags', JSON.stringify(hashtagOptions)); // Save to local storage

  };

  return (
    
    <div className="container mx-auto py-5 flex-row  lg:flex lg:gap-5 gap-10">
      <Card className="shadow-lg p-4 flex-1 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Hashtag Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your Name"
            className="border border-gray-300 p-2"
          />
          <Input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Partner's Name"
            className="border border-gray-300 p-2"
          />
          <Input
            type="text"
            value={nicknames}
            onChange={(e) => setNicknames(e.target.value)}
            placeholder="Nicknames (Optional)"
            className="border border-gray-300 p-2"
          />
          <Input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="border border-gray-300 p-2"
          />
          <Button onClick={generateHashtags} className="w-full text-black bg-[#fe8f40] hover:bg-[#dd8342]">
            Generate Hashtags
          </Button>
        </CardContent>
      </Card>

      {hashtags.length > 0 && (
        <Card className="shadow-lg flex-1">
          <CardHeader className="bg-[#fe8f40]">
            <CardTitle className="font-bold text-lg text-center rounded-t-lg">
              Generated Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-[#000000] relative p-5 rounded-b-lg">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(hashtags)}
              className="absolute top-4 right-4"
            >
              <CopyIcon className="mr-2" />
              Copy All
            </Button>
            <ul className="space-y-2">
              {hashtags.map((hashtag, index) => (
                <li key={index} className="text-[#ffffff]  py-2">
                  {hashtag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};



export default HashTag;