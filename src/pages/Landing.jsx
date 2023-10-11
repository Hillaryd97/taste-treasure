import { Link } from "react-router-dom";
import Nav from "../components/NavLanding";
import img1 from "../assets/img8.jpg";
import img2 from "../assets/img2.jpg";
import img5 from "../assets/img5.jpg";
import img4 from "../assets/img4.jpg";
import img3 from "../assets/img (7).jpeg";
import img9 from "../assets/img (10).jpeg";
import img10 from "../assets/img (13).jpeg";
import {
  BsTwitter,
  BsInstagram,
  BsTelephoneFill,
  BsFacebook,
} from "react-icons/bs";

const Landing = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <div className="relative">
        <div className="absolute md:top-24 top-28 -left-[14rem] md:-left-44 w-[19rem] lg:w-[22rem] z-0">
          <img src={img9} alt="" />
        </div>
        <div className="absolute lg:top-28 md:top-40 top-72 -right-[28.8rem] md:-right-[24rem] lg:-right-80 w-[44rem] md:w-[46.5rem] lg:w-[50rem] z-0 transform lg:rotate-[82deg] md:rotate-[88deg] rotate-[90deg]">
          <img src={img10} alt="" />
        </div>
      </div>
      <Nav />
      <div className="container mx-auto pt-10 text-center flex flex-col space-y-2 md:space-y-3 items-center">
        <div className="lg:px-[19rem] md:px-56 px-[2rem] z-10">
          <h2 className="font-playfair-display font-bold text-4xl md:text-4xl lg:text-6xl">
            Unveil & Share Culinary Creations
          </h2>
        </div>
        <p className="text-xl text-secondary font-bold z-10">
          Savor. Share. Create
        </p>
        <div className="lg:px-80 md:px-32 px-20 z-10">
          <p>
            Connect with friends to exchange recipes and uncover exciting new
            ones. Explore a diverse collection of recipes from all around the
            globe.
          </p>
        </div>
        <div className="md:pt-5 pt-2">
          {/* <Link
            to={"/login"}
            className=" bg-primary px-6 py-3 w-fit font-bold rounded-full text-white hover:bg-opacity-80 duration-300"
          >
            ADD RECIPES
          </Link> */}
          <Link
            to={"/home"}
            className="bg-primary px-6 py-3 w-fit font-bold rounded-full text-white hover:bg-opacity-80 duration-300"
          >
            EXPLORE
          </Link>
        </div>
      </div>
      <div className="container md:mx-auto mx-12 mt-14 md:mt-16 md:mb-9 mb-6 flex items-center justify-center">
        <div className="flex md:space-x-5 space-x-3 lg:space-x-10 items-center justify-center">
          <img
            src={img1}
            alt="food"
            className="lg:w-40 lg:h-40 md:w-36 md:h-36 w-32 h-32 z-10"
          />
          <img
            src={img2}
            alt="food"
            className="lg:w-40 lg:h-40 md:w-36 md:h-36 w-32 h-32"
          />
          <img
            src={img3}
            alt="food"
            className="lg:w-40 lg:h-40 md:w-36 md:h-36 w-32 h-32 hidden md:block"
          />
          <img
            src={img4}
            alt="food"
            className="lg:w-40 lg:h-40 md:w-36 md:h-36 w-32 h-32 hidden md:block z-10"
          />
          <img
            src={img5}
            alt="food"
            className="lg:w-40 lg:h-40 md:w-36 md:h-36 w-32 h-32 hidden lg:block z-10"
          />
          <div className="pr-24 z-10">
            <Link
              to={"/home"}
              className="underline font-bold text-primary md:bg-transparent md:p-0  p-1"
            >
               <span className="invisible">RECIPES</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 md:px-0 ">
        <div className="absolute px-4 md:px-8 py-4 w-full bottom-0 left-0">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 font-bold text-gray-400">
              <Link to={"/home"}>Explore</Link>
              <a href="mailto:hillaryd97@gmail.com">Contact</a>
            </div>
            <div className="flex space-x-3">
              <a
                href="http://www.facebook.com/simihillarydickson"
                className="text-xl text-accent z-10"
              >
                <BsFacebook size={25} className="drop-shadow-md rounded-full" />
              </a>
              <a
                href="http://www.instagram.com/simi_hillary"
                className="text-xl text-accent z-10"
              >
                <BsInstagram size={25} className="drop-shadow-md " />
              </a>
              <a
                href="http://www.twitter.com/hik_ari"
                className="text-xl text-accent z-10"
              >
                <BsTwitter size={25} className="drop-shadow-md rounded-full" />
              </a>
              <a href="tel:+2348024370107" className="text-xl text-accent z-10">
                <BsTelephoneFill
                  size={25}
                  className="drop-shadow-md rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
