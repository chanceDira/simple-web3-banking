"use client";

import Navbar from "@/components/Navbar";
import contract from "@/lib/contract";
import web3 from "@/lib/web3";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";

export default function BankPage() {
  const { account } = useWallet();
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = async () => {
    try {
      if (!depositAmount || isNaN(Number(depositAmount))) {
        setStatus("⚠️ Please enter a valid deposit amount.");
        return;
      }

      setStatus(`⏳ Depositing ${depositAmount} ETH...`);
      await contract.methods.deposit().send({
        from: account,
        value: web3.utils.toWei(depositAmount, "ether"),
      });
      setStatus(`✅ Deposited ${depositAmount} ETH successfully!`);
      setDepositAmount(""); // Clear input
    } catch (err) {
      console.error(err);
      setStatus("❌ Deposit failed.");
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
        setStatus("⚠️ Please enter a valid withdrawal amount.");
        return;
      }

      setStatus(`⏳ Withdrawing ${withdrawAmount} ETH...`);
      await contract.methods
        .withdraw(web3.utils.toWei(withdrawAmount, "ether"))
        .send({ from: account });

      setStatus(`✅ Withdrew ${withdrawAmount} ETH successfully!`);
      setWithdrawAmount(""); // Clear input
    } catch (err) {
      console.error(err);
      setStatus("❌ Withdrawal failed.");
    }
  };

  const handleCheckBalance = async () => {
    try {
      const result = await contract.methods.getBalance().call({ from: account }) as string;
      const ethBalance = web3.utils.fromWei(result, "ether");
      setBalance(ethBalance);
      setStatus(`💰 Your balance is ${ethBalance} ETH`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to fetch balance.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-10 space-y-4">

        {/* Deposit Section */}
        <div className="flex flex-col items-center space-y-2">
          <input
            type="number"
            placeholder="Enter amount to deposit (ETH)"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </div>

        {/* Withdraw Section */}
        <div className="flex flex-col items-center space-y-2 mt-4">
          <input
            type="number"
            placeholder="Enter amount to withdraw (ETH)"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>

        {/* Balance Section */}
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleCheckBalance}
          >
            Check Balance
          </button>
          <p className="text-sm text-gray-700 mt-2">Current Balance: {balance} ETH</p>
        </div>

        {/* Status Message */}
        <p className="text-md mt-4 text-gray-800">{status}</p>
      </div>
    </div>
  );
}
