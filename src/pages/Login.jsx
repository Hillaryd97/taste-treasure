import { Link } from "react-router-dom";
import img9 from "../assets/img (10).jpeg";
import img10 from "../assets/img (13).jpeg";
import {
  BsTwitter,
  BsInstagram,
  BsTelephoneFill,
  BsFacebook,
} from "react-icons/bs";

const Login = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <div className="relative">
        <div className="absolute md:top-24 top-28 -left-[14rem] md:-left-44 w-[19rem] lg:w-[22rem] z-0">
          <img src={img9} alt="img" />
        </div>
        <div className="absolute lg:top-28 md:top-40 top-72 -right-[28.8rem] md:-right-[24rem] lg:-right-80 w-[44rem] md:w-[46.5rem] lg:w-[50rem] z-0 transform lg:rotate-[82deg] md:rotate-[88deg] rotate-[90deg]">
          <img src={img10} alt="img" />
        </div>
      </div>
      <div className="container md:mx-auto md:px-0 px-2 py-4">
        <div className="flex justify-between items-center">
          <div className="text-primary md:text-2xl text-2xl font-bold z-10">
            <h1>
              {" "}
              Taste<span className=" text-secondary">Treasure</span>
            </h1>
          </div>
        </div>{" "}
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-playfair-display font-bold text-3xl pb-2 md:pt-12 pt-4">
            Login
          </h3>
          <p className="text-gray-500 font-bold">
            Connect with <span className="text-primary">friends</span> and
            exchange recipes!
          </p>
          <div className="flex flex-col w-2/5 p-16 rounded-md shadow-md border-t border-t-primary mt-8">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="rounded-full border px-4 py-1.5 w-full duration-300 bg-gray-50 focus:outline-none focus:bg-secondary placeholder:focus:text-white"
                placeholder="Email "
              />
              <input
                type="text"
                className="rounded-full border px-4 py-1.5 w-full duration-300 bg-gray-50 focus:outline-none focus:bg-secondary placeholder:focus:text-white"
                placeholder="Password"
              />
              <button
                type="submit"
                className="font-bold text-white bg-primary py-2 rounded-full hover:opacity-80 focus:scale-95 duration-300"
              >
                LOGIN
              </button>
              <p className="text-center pt-2 font-bold">
                Not a user? <Link to={"/register"} className="text-primary hover:text-opacity-75">Register</Link>
              </p>
            </div>
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

export default Login;
