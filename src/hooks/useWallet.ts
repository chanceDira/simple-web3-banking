"use client"

import { useEffect, useState } from "react";
import web3 from "@/lib/web3";
import contract from "@/lib/contract";

export function useWallet() {
  const [account, setAccount] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await web3.eth.requestAccounts();
        const currentAccount = accounts[0];
        setAccount(currentAccount);

      
      } catch (e) {
        console.error("Wallet connection error", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return { account, loading };
}
