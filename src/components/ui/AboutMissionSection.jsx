"use client";
import React from "react";

export default function AboutMissionSection() {
  return (
    <div className="py-24 px-24 flex flex-col md:flex-row items-center md:items-start md:space-x-4 gap-16">
      <div className="col flex-1">
        <h1 className="scroll-m-20 mb-4 text-2xl text-green-600 font-extrabold leading-tight">
          About us
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </p>
      </div>

      <div className="col flex-1">
        <h1 className="scroll-m-20 mb-4 text-2xl  text-green-600 font-extrabold leading-tight">
          Mission
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Aliquam aperiam neque
          quibusdam perspiciatis cupiditate minima impedit consequatur harum
          dolorem! Beatae cumque itaque similique corporis praesentium fuga
          officia quidem delectus minus.
        </p>
      </div>
    </div>
  );
}
