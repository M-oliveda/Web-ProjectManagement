import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "flowbite-react";
import Subscribe from "../components/Subscribe";
import { unsubscribeUser } from "../services/api_service";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function unsubscribeHandler() {
    if (userContext && userContext.userInfo) {
      unsubscribeUser(userContext.userInfo.email).then((value) => {
        if (value) {
          navigate("/profile");
        }
      });
    }
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      {userContext && userContext.userInfo && (
        <p>
          Subscription Status:{" "}
          <span className="font-bold">
            {userContext.userInfo.subscription_id
              ? "Subscribed"
              : "Not Subscribed"}
          </span>
        </p>
      )}
      {userContext &&
      userContext.userInfo &&
      !userContext.userInfo.subscription_id ? (
        <Subscribe />
      ) : (
        <Button onClick={unsubscribeHandler}>Unsubscribe</Button>
      )}
    </div>
  );
}
