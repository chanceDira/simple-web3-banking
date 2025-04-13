"use client";

import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";
import { useState } from "react";
import web3 from "@/lib/web3";

const Navbar = () => {
  const { account } = useWallet();
  const [status, setStatus] = useState("");

  const handleConnect = async (e: any) => {
    e.preventDefault()
    try {
      // console.log('account: ', account)

      const ethereum = (window as any).ethereum;
      
  
      if (!ethereum || !ethereum.request) {
        setStatus("❌ MetaMask or wallet not detected.");
        return;
      }
  
      // await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.location.reload(); // Or re-trigger hook if you prefer
    } catch (err: any) {
      if (err.code === 4001) {
        setStatus("❌ Connection rejected by user.");
      } else {
        setStatus("❌ Wallet connection failed.");
      }
      console.error("Wallet connection error:", err);
    }
  };
  return (
    <nav className="bg-block text-white shadow-md py-3 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">🪙 Simple Bank</h1>


      <div className="flex items-center gap-4">
        {account ? (
          <span className="text-sm text-gray-200">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
