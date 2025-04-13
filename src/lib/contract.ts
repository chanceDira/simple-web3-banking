import web3 from "./web3";
import abi from './abi'
// import contractJSON from "../../build/contracts/Banking.json";
import contractJSON from "./Banking.json";


// const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"; // ← Replace after deploy

const networkId = Object.keys(contractJSON.networks)[1] as keyof typeof contractJSON.networks;
const contractAddress = contractJSON.networks[networkId]?.address;

const instance = new web3.eth.Contract(
  contractJSON.abi as any,
  contractAddress
);

export default instance;
