const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("MyTokenModule", (m) => {
  

  const tokencontract = m.contract("MyToken", []);
   
  return { tokencontract };
});