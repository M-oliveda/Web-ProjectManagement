import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useRef, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authservice";
import Logo from "../components/Logo";

export default function RegisterPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [alert, setAlert] = useState<null | { message: string }>(null);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 1000);
    }
  }, [alert]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current && password2ref.current) {
      if (passwordRef.current.value === password2ref.current.value) {
        registerUser(emailRef.current.value, passwordRef.current.value).then(
          (value) => {
            if (value && typeof value === "boolean") {
              navigate("/");
            } else {
              setAlert({ message: value });
            }
          },
        );
      } else {
        setAlert({ message: "Passwords do not match" });
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-6">
        <Logo />
        {alert && <Alert color="failure">{alert.message}</Alert>}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="example@example.com"
              required
              shadow
              ref={emailRef}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              required
              shadow
              ref={passwordRef}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              required
              shadow
              ref={password2ref}
            />
          </div>
          <Button type="submit">Register new account</Button>
        </form>
        <div>
          <p>
            Don you have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-blue-400 hover:underline"
            >
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
