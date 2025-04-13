import Web3 from "web3";

let web3: Web3;

if (typeof window !== "undefined" && (window as any).ethereum) {
  web3 = new Web3((window as any).ethereum);
} else {
  // fallback to local dev node
  web3 = new Web3("http://127.0.0.1:7545"); // Ganache
}

export default web3;
