import Image from "next/image"

export default function CTA() {
    return (
      <div >
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-[#16833a]  px-6 pt-16 shadow-xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your market.
                <br />
                List your service with us.
              </h2>
              <p className="mt-6 text-lg leading-8">
              Are you a vendor? Kindly click the link below to register and get your service listed on our platform              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="https://forms.gle/Q5MNwfZbwDNQUQBX6"
                  target="_blank"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm  text-[#fe8f40] shadow-sm hover:bg-[#c57033] hover:text-[#ffff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8 mx-auto pt-12">
            <Image key={1} src='https://res.cloudinary.com/dl2k5jq2r/image/upload/v1725674202/jyl0mhrssuh5xsqgr4r4.jpg' 
                  height={500} width={500} alt=""
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
  