import React from 'react'
import UnderLine from '../assets/underline.svg'
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <main className="flex flex-col justify-center items-center pt-24">
      <section className="flex flex-col justify-center items-center px-6 md:px-10 lg:px-40 py-16 max-w-full">
        <div className="flex flex-col justify-center items-center w-full max-w-[866px]">
          <header className="flex flex-col pb-8 w-full">
            <div className="flex flex-col px-5 pt-3.5 w-full">
              <h1 className="self-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-center text-indigo-950">
                Distributed EMS
              </h1>
              <div className="block z-10 flex-wrap gap-2 mt-2 w-full">
                <p className="flex-auto self-start mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-center text-indigo-950">
                  Tamper Proof, Transparent, and Secure
                </p>
                <div className="mt-2 justify-end flex">
                  <img
                    className="p-2 w-full max-w-xs md:max-w-sm lg:max-w-sm"
                    src={UnderLine}
                    alt="Underline"
                  />
                </div>
              </div>
            </div>
          </header>
          <section className="flex flex-col pb-10 w-full text-lg font-medium leading-8 text-center text-slate-600">
            <p className="px-5 w-full">
              Stand out with EMS, ensuring the integrity of your evidence.
            </p>
          </section>
          <div className="flex flex-wrap justify-center items-center w-full text-sm leading-tight text-center">
            <div className="flex flex-col justify-center items-center self-stretch my-auto">
              <Link to={'/dashboard'} className="rounded-full py-5 px-6 md:px-9 lg:px-9 min-h-[54px] rounded-[45px] gradient">
                Start Using
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
