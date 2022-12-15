import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      {/* left side */}
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          {/* image */}
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="bike delivery"
            />
          </div>
        </div>
        {/* heading */}
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-[3rem] lg:text-[5rem] text-orange-600">
            Your City
          </span>
        </p>
        {/* about  */}
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          consequuntur asperiores vero omnis nemo quas modi maiores voluptates!
          Corrupti voluptatem aspernatur odio quis a vitae accusantium ea
          dolorem iure provident!
        </p>
        {/* order now btn */}
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now!
        </button>
      </div>

      {/* right side */}
      <div className="py-2 flex-1 flex items-center relative">
        {/* bg image */}
        <img
          src={HeroBg}
          alt="hero-bg"
          className="h-[510] lg:h-650 w-full lg:w-auto ml-auto"
        />

        {/* food cards */}
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 lg:px-32 flex-wrap gap-4">
          {heroData &&
            heroData.map((card) => (
              //food card
              <div
                key={card.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                {/* image */}
                <img
                  src={card.imageSrc}
                  alt="I1"
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                />
                {/* name */}
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {card.name}
                </p>
                {/* description */}
                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3 ">
                  {card.decp}
                </p>
                {/* price */}
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>
                  {card.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
