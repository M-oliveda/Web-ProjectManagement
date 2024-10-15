import { Label, Radio, Button } from "flowbite-react";
import { FormEvent } from "react";
import { subscribe } from "../services/api_service";
import { useNavigate } from "react-router-dom";

export default function Subscribe() {
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subscription_type = document.querySelector(
      'input[name="subscription_type"]:checked',
    ).value;

    if (subscription_type) {
      subscribe(subscription_type).then((value) => {
        if (value) {
          navigate(`/checkout?subscription_type=${subscription_type}`);
        }
      });
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Ready to subscribe?</h3>
      <p>Choose your subscription type</p>
      <form onSubmit={handleSubmit} className="">
        <div className="flex items-center gap-2">
          <Radio
            id="subscriptionMonthly"
            name="subscription_type"
            value="monthly"
            defaultChecked
          />
          <Label htmlFor="subscriptionMonthly">Monthly</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="subscriptionAnnual"
            name="subscription_type"
            value="annual"
          />
          <Label htmlFor="subscriptionAnnual">Annual</Label>
        </div>
        <Button className="mx-auto mt-3 block" type="submit">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
