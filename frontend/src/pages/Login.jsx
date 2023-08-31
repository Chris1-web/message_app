import { Link } from "react-router-dom";
import loginLogo from "../assets/loginPageLogo.svg";

export default function Login() {
  return (
    <div className="flex items-center mt-24">
      <div className="left-navigation w-[45%]">
        <h2 className="text-8xl mb-20">
          Connect with <br /> your friends, <br /> anytime
        </h2>
        <form className="signup-form flex flex-col gap-9">
          <div className="username-container flex flex-col gap-1">
            <label htmlFor="username" className="text-2xl">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="px-3 py-4 w-4/5 border border-[#6C63FF] outline-none rounded-xl"
            />
          </div>
          <div className="password-container flex flex-col gap-1">
            <label htmlFor="password" className="text-2xl">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="px-3 py-4 w-4/5 border border-[#6C63FF] outline-none rounded-xl"
            />
          </div>
          <p className="text-4xl">
            New to messaging app?{" "}
            <Link to="/sign-up" className="underline text-[#6C63FF]">
              Create an account
            </Link>
          </p>
          <button className="text-2xl bg-[#6C63FF] w-4/5 py-3 text-white rounded-xl hover:bg-white hover:text-[#6C63FF] border border-[#6C63FF]">
            Log in
          </button>
        </form>
      </div>
      <div className="right-navigation grid">
        <img
          src={loginLogo}
          alt="group chat"
          width={"100%"}
          className="justify-self-end"
        />
      </div>
    </div>
  );
}
