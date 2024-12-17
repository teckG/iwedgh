'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  // Circle positions for images around the text
  const circlePositions = [
    { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }, // Top center
    { top: '25%', left: '85%', transform: 'translate(-50%, -50%)' }, // Top right
    { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' }, // Middle right
    { bottom: '25%', left: '85%', transform: 'translate(-50%, 50%)' }, // Bottom right
    { bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' }, // Bottom center
    { bottom: '25%', left: '15%', transform: 'translate(-50%, 50%)' }, // Bottom left
    { top: '50%', left: '0%', transform: 'translate(0%, -50%)' }, // Middle left
    { top: '25%', left: '15%', transform: 'translate(-50%, -50%)' }, // Top left
    { top: '12%', left: '30%', transform: 'translate(-50%, -50%)' }, // New top-left inner
    { bottom: '12%', left: '70%', transform: 'translate(-50%, 50%)' }, // New bottom-right inner
  ];

  // Images for each position
  const images = [
    { src: '/Wedding_Proposal_Vector.png', alt: 'Wedding proposal' },
    { src: '/loveintheair.png', alt: 'Ilove in the air' },
    { src: '/twohearts.png', alt: 'two hearts joined' },
    { src: '/proposal.png', alt: 'Man propose to lady' },
    { src: '/Wedding_Proposal.png', alt: 'Man gives heart to lady' },
    { src: '/ring.png', alt: 'A wedding ring' },
    { src: '/Wedding_propose.png', alt: 'Man gives ring to lady on his kneels' },
    { src: '/Wedding_Proposal_.png', alt: 'Man proposes in a park' },
    { src: '/heartjoined.png', alt: 'Two hearts joined' },
    { src: '/heart_extended.png', alt: 'Marriage proposal' },
  ];

  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="absolute inset-0 bg-orange-200 opacity-20"></div>
      {/* Decorative Images in Circle */}
      {circlePositions.map((pos, index) => (
        <div
          key={index}
          style={{ ...pos }}
          className="absolute w-20 h-20 md:w-40 md:h-40 opacity-50"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            width={200}
            height={200}
            className="object-contain hover:scale-110 transition-transform duration-3000 "
          />
        </div>
      ))}

      {/* Hero Section Centered */}
      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        {/* Announcement */}
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="rounded-full px-4 py-2 text-sm bg-white text-gray-800 shadow-sm ring-1 ring-green-300 hover:ring-green-400">
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
        <h1 className="text-4xl font-extrabold tracking-tight text-green-500 sm:text-6xl">
          List your service today.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          Reach your audience by listing your services on our platform.{' '} <br />
          <span className="font-medium text-green-500">Get started below</span> to grow your business.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
            target="_blank"
            className="inline-block rounded-md bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-600 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="inline-block text-sm font-semibold text-green-500 hover:text-green-800"
          >
            Login <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
