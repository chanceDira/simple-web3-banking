// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Banking {
    // Mapping of user addresses to their balances
    mapping(address => uint256) private balances;

    // Event for logging deposits
    event Deposited(address indexed user, uint256 amount);

    // Event for logging withdrawals
    event Withdrawn(address indexed user, uint256 amount);

    // Function to deposit ETH into the bank
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Function to withdraw ETH from the bank
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Function to check the balance of the sender
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // (Optional) View contract balance
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}