const SecondContract = artifacts.require("AdvancedStorage");

module.exports = function (deployer) {
    deployer.deploy(SecondContract);
};
