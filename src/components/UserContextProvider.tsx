import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import IReactElementProps from "../interfaces/ReactElement";
import { UserData } from "../types/UserData";
import { getUserInfo } from "../services/api_service";

export default function UserContextProvider({ children }: IReactElementProps) {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    getUserInfo().then((value) => {
      if (value) {
        setUserInfo(value);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
