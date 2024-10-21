import { createContext, Dispatch, SetStateAction } from "react";
import { UserData } from "../types/UserData";

export interface UserContextType {
  userInfo: UserData | null;
  setUserInfo: Dispatch<SetStateAction<UserData | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);
