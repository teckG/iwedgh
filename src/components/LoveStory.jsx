import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { CopyIcon } from "lucide-react";

const LoveStory = ({ firstName, partnerName }) => {
  const stories = [
    `Our love story began with a serendipitous meeting and blossomed into a beautiful journey. ${firstName} and ${partnerName} can't wait to tie the knot and begin forever together! Thanks to iWedGH for helping make our day extra special.`,
    `From the moment ${firstName} and ${partnerName} met, they knew their hearts were destined to beat as one. Together, they’ve shared laughter, adventures, and dreams, and can't wait to build a lifetime of happiness. Thank you, iWedGH, for being part of our love story!`,
    `${firstName} and ${partnerName} started as strangers, became best friends, and now they’re about to be lifelong partners. Their love is a tapestry of joy, care, and endless memories. Big thanks to iWedGH for adding a touch of magic to their journey!`,
    `Two souls, one incredible journey. ${firstName} and ${partnerName}'s love is a celebration of everything that makes life beautiful. Thank you, iWedGH, for helping create unforgettable moments!`,
    `It’s not just love; it’s an adventure. From sweet nothings to shared dreams, ${firstName} and ${partnerName}'s story is just beginning, and they’re so excited for what’s ahead. iWedGH, you’ve made this journey extra special—thank you!`,
  ];

  const [selectedStory, setSelectedStory] = useState(stories[0]);

  const generateRandomStory = () => {
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    setSelectedStory(randomStory);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedStory).then(() => {
      toast.success("Love story copied to clipboard!");
    });
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">{firstName}  & {' '} {partnerName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <p className="text-gray-700 text-center">{selectedStory}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={generateRandomStory} className="bg-[#fe8f40] text-white hover:bg-[#dd8342]">
            Generate New Story
          </Button>
          <Button onClick={copyToClipboard} variant="secondary" className="flex items-center gap-2">
            <CopyIcon /> Copy Story
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoveStory;
