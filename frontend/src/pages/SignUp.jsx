import { Link, useNavigate } from "react-router-dom";
import RightNavLogo from "../components/groupMessageLogo";
import Form from "../components/Form";
import { useState } from "react";

export default function SignUp() {
  const history = useNavigate();
  const [person, setPerson] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState(null);

  function changeUsername(e) {
    setPerson({
      ...person,
      username: e.target.value.toLowerCase(),
    });
  }

  function changePassword(e) {
    setPerson({
      ...person,
      password: e.target.value.toLowerCase(),
    });
  }

  function changeConfirmPassword(e) {
    setPerson({
      ...person,
      confirm_password: e.target.value.toLowerCase(),
    });
  }

  async function createAccount(e) {
    e.preventDefault();
    console.log(person);
    try {
      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      if (!response.ok) {
        // make input value empty
        setPerson({
          username: "",
          password: "",
          confirm_password: "",
        });
        const result = await response.text();
        throw new Error(result);
      }
      // if successful, redirect to login page
      console.log("login page");
      history("/login");
    } catch (error) {
      const errorMessage = JSON.parse(error.message);
      setErrors([...errorMessage.errors]);
    }
  }
  return (
    <div className="flex items-center mt-10">
      <div className="left-navigation w-[45%]">
        <Form
          formClass={"login-form flex flex-col gap-9"}
          submitForm={createAccount}
        >
          <h2 className="text-8xl mb-20">Sign Up</h2>
          <ul className="list-disc w-3/4 grid grid-cols-2 gap-4">
            {errors &&
              errors.map((error, element) => {
                return (
                  <li key={element} className="text-red-900">
                    {error.msg}
                  </li>
                );
              })}
          </ul>
          <div className="username-container flex flex-col gap-1">
            <label htmlFor="username" className="text-2xl">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="px-3 py-4 w-4/5 border border-[#6C63FF] outline-none rounded-xl"
              value={person.username}
              onChange={changeUsername}
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
              value={person.password}
              onChange={changePassword}
            />
          </div>
          <div className="confirm-password-container flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-2xl">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              className="px-3 py-4 w-4/5 border border-[#6C63FF] outline-none rounded-xl"
              value={person.confirm_password}
              onChange={changeConfirmPassword}
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
        </Form>
      </div>
      <RightNavLogo />
    </div>
  );
}
