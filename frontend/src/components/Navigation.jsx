import { Link, Outlet } from "react-router-dom";
import chatLogo from "../assets/logo.svg";
import githubLogo from "../assets/github.png";

export default function Navigation() {
  return (
    <main className="container mx-auto mt-4">
      <nav className="flex justify-between items-center h-[10vh]">
        <div className="left-navigation flex items-center gap-3">
          <img src={chatLogo} width={40} />
          <p className="text-3xl">MESSAGING APP.</p>
        </div>
        <div className="right-navigation">
          <Link to="https://github.com/Chris1-web/message_app" target="_blank">
            <img src={githubLogo} height="auto" width={40} />
          </Link>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}
