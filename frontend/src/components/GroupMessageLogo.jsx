import loginLogo from "../assets/loginPageLogo.svg";

export default function RightNavLogo() {
  return (
    <div className="right-navigation grid">
      <img
        src={loginLogo}
        alt="group chat"
        width={"100%"}
        className="justify-self-end"
      />
    </div>
  );
}
