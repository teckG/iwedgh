"use client"; // For client-side rendering in Next.js
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Checklist() {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Check if we are on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load checklist from localStorage on initial client render
  useEffect(() => {
    if (isClient) {
      const savedChecklist = JSON.parse(localStorage.getItem("checklist")) || [];
      setChecklist(savedChecklist);
      updateProgress(savedChecklist);
    }
  }, [isClient]);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("checklist", JSON.stringify(checklist));
      updateProgress(checklist);
    }
  }, [checklist, isClient]);

  const addItem = () => {
    if (newItem) {
      const updatedChecklist = [...checklist, { task: newItem, completed: false }];
      setChecklist(updatedChecklist);
      setNewItem("");
    }
  };

  const toggleCompletion = (index) => {
    const updatedChecklist = checklist.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setChecklist(updatedChecklist);
  };

  const removeItem = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const updateProgress = (updatedChecklist) => {
    const totalTasks = updatedChecklist.length;
    const completedTasks = updatedChecklist.filter((item) => item.completed).length;
    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    setProgress(percentage);

    if (percentage === 100 && totalTasks > 0) {
      toast.success("Congratulations! You've completed all tasks 🎉");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
  <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
    {/* Left side: Form */}
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">Your Wedding Checklist</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="p-2 border rounded-md w-full mb-4"
        placeholder="Add a new item..."
      />
      <button
        onClick={addItem}
        className="w-full p-2 bg-[#fe8f40] text-white rounded-md mb-4"
      >
        Add Item
      </button>
      {/* Checklist */}
      <ul className="list-none p-0">
        {checklist.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between my-2 p-2 border-b"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompletion(index)}
                className="mr-2"
              />
              <span
                className={`cursor-pointer ${
                  item.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleCompletion(index)}
              >
                {item.task}
              </span>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="ml-4 text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Right side: Donut Progress Bar */}
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-48 h-48">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textColor: "#fe8f40", // Tailwind blue-500
            pathColor: "#fe8f40",
            trailColor: "#E5E7EB", // Tailwind gray-200
          })}
        />
      </div>
    </div>
  </div>
</div>
  );
}
