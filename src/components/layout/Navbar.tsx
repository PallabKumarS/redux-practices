import Logo from "@/assets/Logo";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/themeToggle";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto items-center mb-10 md:flex gap-10 justify-between">
      <div className="md:flex gap-10 items-center text-center">
        <Logo />

        {/* links here  */}
        <Link className="" to={"/"}>
          <Button>Task</Button>
        </Link>
        <Link className="" to={"/users"}>
          <Button>User</Button>
        </Link>
      </div>

      {/* theme toggle here  */}
      <div className="mt-4 md:mt-0 text-center md:text-end border-l-2 md:pl-10">
        <ModeToggle />
      </div>
    </nav>
  );
}
