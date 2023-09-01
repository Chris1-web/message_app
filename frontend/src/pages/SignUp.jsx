import { Link } from "react-router-dom";
import RightNavLogo from "../components/groupMessageLogo";

export default function SignUp() {
  return (
    <div className="flex items-center mt-24">
      <div className="left-navigation w-[45%]">
        <h2 className="text-8xl mb-20">Sign Up</h2>
        <form className="login-form flex flex-col gap-9">
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
            Already have an account?{" "}
            <Link to="/login" className="underline text-[#6C63FF]">
              Log in
            </Link>
          </p>
          <button className="text-2xl bg-[#6C63FF] w-4/5 py-3 text-white rounded-xl hover:bg-white hover:text-[#6C63FF] border border-[#6C63FF]">
            Sign Up
          </button>
        </form>
      </div>
      <RightNavLogo />
    </div>
  );
}
