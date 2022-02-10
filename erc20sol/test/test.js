const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("token", function () {

  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function() {
    const DemoToken = await hre.ethers.getContractFactory("token");
    token = await DemoToken.deploy(1000000,"token","ts",18);
    await token.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });
  
  it("Should should successfully deploy", async function () {
    console.log("success!");
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function() {
      const balance = await token.balanceOf(owner.address);
      expect(ethers.utils.formatEther(balance).to.equal(1000000));
});
});
   