const Migrations = artifacts.require("Migrations");
const Banking = artifacts.require("Banking");

module.exports = function (deployer) {
    deployer.deploy(Migrations)
    deployer.deploy(Banking)
}