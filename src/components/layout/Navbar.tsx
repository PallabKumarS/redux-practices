import Logo from "@/assets/Logo";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/themeToggle";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto items-center mb-10 flex gap-10 justify-between">
      <div className="flex gap-10 items-center">
        <Logo />

        {/* links here  */}
        <Link className="" to={"/"}>
          <Button>Task</Button>
        </Link>
      </div>

      {/* theme toggle here  */}
      <div className="text-end border-l-2 pl-10">
        <ModeToggle />
      </div>
    </nav>
  );
}
