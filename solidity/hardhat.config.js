require("@nomiclabs/hardhat-waffle");



module.exports = {
  solidity: "0.8.13",
  networks: {
    rinkeby: {
      url: "api",
      accounts: ["privatekey"]
    },
  },
};





