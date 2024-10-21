import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import Logo from "../components/Logo";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);
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

    if (emailRef.current && passwordRef.current && rememberRef.current) {
      loginUser(
        emailRef.current.value,
        passwordRef.current.value,
        rememberRef.current.checked,
      ).then((value) => {
        if (value && typeof value === "boolean") {
          navigate("/");
        } else {
          setAlert({ message: value });
        }
      });
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
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="example@example.com"
              required
              ref={emailRef}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              ref={passwordRef}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" ref={rememberRef} />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Login</Button>
          <div>
            <p>
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="font-medium text-blue-400 hover:underline"
              >
                Sign up.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
