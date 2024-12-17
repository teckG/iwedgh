'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  // Positions for SVGs to form a circle
  const circlePositions = [
    { top: '10%', left: '50%', transform: 'translate(-50%, -10%)' },
    { top: '30%', left: '15%', transform: 'translate(-15%, -30%)' },
    { top: '30%', right: '15%', transform: 'translate(15%, -30%)' },
    { top: '70%', left: '5%', transform: 'translate(-5%, -70%)' },
    { bottom: '10%', left: '50%', transform: 'translate(-50%, 10%)' },
    { bottom: '30%', left: '15%', transform: 'translate(-15%, 30%)' },
    { bottom: '30%', right: '15%', transform: 'translate(15%, 30%)' },
    { top: '70%', right: '5%', transform: 'translate(5%, -70%)' },
  ];

  return (
    // bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500
    <div className="relative isolate px-6 pt-0 lg:px-8">
      {/* Background Effects */}
      {/* bg-gradient-to-t from-black via-transparent to-black */}
      <div className="absolute inset-0 opacity-30 -z-10"></div>

      {/* Decorative SVG Elements */}
      {circlePositions.map((pos, index) => (
        <div
          key={index}
          style={{ ...pos }}
          className="absolute w-20 h-20 md:w-24 md:h-24 opacity-15"
        >
          <Image src='/heart.svg' alt='love emoji' width={100} height={20} />
        </div>
      ))}

      {/* Hero Section */}
      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
        {/* Announcement */}
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-4 py-2 text-sm leading-6 bg-white text-gray-800 shadow-sm ring-1 ring-green-300 hover:ring-green-400">
            🎉 Announcing the #1 wedding vendor platform in Ghana!{' '}
            <Link
              href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
              target="_blank"
              className="font-semibold text-green-700 underline hover:text-green-900"
            >
              Join us today for free <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center relative">
          <h4 className="text-4xl font-extrabold tracking-tight text-green-500  sm:text-6xl">
            List your service today.
          </h4>
          <p className="mt-6 text-lg leading-8">
            Reach your audience by listing your services on our platform.{' '} <br />
            <span className="font-medium text-green-500">Get started below</span> to grow your business.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Get Started Button */}
            <Link
              href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
              target="_blank"
              className="inline-block rounded-md bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >
              Get Started
            </Link>
            {/* Login Button */}
            <Link
              href="/sign-in"
              className="inline-block text-sm font-semibold leading-6 text-green-500  hover:text-green-800 "
            >
              Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
