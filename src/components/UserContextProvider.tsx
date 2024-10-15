import { useState } from "react";
import { UserContext } from "../context/UserContext";
import IReactElementProps from "../interfaces/ReactElement";
import { UserData } from "../types/UserData";

export default function UserContextProvider({ children }: IReactElementProps) {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
