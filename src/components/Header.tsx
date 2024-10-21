import { Navbar, Button } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { logoutUser } from "../services/authservice";

export default function WebsiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  function logoutHandler() {
    logoutUser().then((sucess) => {
      if (sucess) {
        navigate("/login");
      }
    });
  }
  return (
    <div className="px-4">
      <Navbar fluid rounded>
        <Navbar.Brand as={Link} href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="[&_ul]:md:items-center">
          <Navbar.Link href="/" active={location.pathname === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/profile"
            active={location.pathname === "/profile"}
          >
            Profile
          </Navbar.Link>
          <Navbar.Link
            href="/projects"
            active={location.pathname === "/projects"}
          >
            Projects
          </Navbar.Link>
          <Navbar.Link href="/tasks" active={location.pathname === "/tasks"}>
            Tasks
          </Navbar.Link>
          <div className="mx-auto my-1.5">
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
