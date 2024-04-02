"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helper/api";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";

const CardPayment = () => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response: any = await api.post("/payment", { amount: amount });
      if (response?.data?.success) {
        const paymentPortalURL =
          response?.data?.data?.instrumentResponse?.redirectInfo.url;

        router.push(paymentPortalURL);
      }
    } catch (error) {
      toast({ title: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center h-[100vh] gap-y-4">
      <div>
        {" "}
        <Label>Recharge amount</Label>
      </div>
      <Input
        type="number"
        placeholder="amount"
        className="md:w-[30%] w-[80%] "
        value={amount}
        onChange={(e: any) => {
          setAmount(e.target.value);
        }}
      />

      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="bg-purple-600  hover:bg-purple-500"
      >
        {isLoading ? "Processing..." : "Make Payment"}
      </Button>
    </div>
  );
};

export default CardPayment;
