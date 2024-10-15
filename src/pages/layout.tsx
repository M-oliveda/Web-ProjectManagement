import { Outlet } from "react-router-dom";
import WebsiteHeader from "../components/Header";

export default function RootLayout() {
  return (
    <div>
      <WebsiteHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
