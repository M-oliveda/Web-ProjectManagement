import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../services/api_service";
import { UserData } from "../types/UserData";

export default function HomePage() {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    getUserInfo().then((value) => {
      if (value) {
        setUserInfo(value);
      }
    });
  }, []);

  if (
    localStorage.getItem("token") === null &&
    sessionStorage.getItem("token") === null
  ) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-56 flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Project Management</h1>
      {userInfo && (
        <p className="font-regular text-xl">
          Hello, <span className="text-red-700">{userInfo.email}</span>
        </p>
      )}
    </div>
  );
}
