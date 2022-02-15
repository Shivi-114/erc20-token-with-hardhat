const { expect } = require("chai");
const { ethers } = require("hardhat");




let token,owner, addr1, addr2;
describe("token", function () {

  // let token;
  // let owner;
  // let addr1;
  // let addr2;

  beforeEach(async function() {
    const DemoToken = await hre.ethers.getContractFactory("token");
    token = await DemoToken.deploy(1000000,"token","ts",18);
    await token.deployed();
  
    [owner, addr1, addr2] = await ethers.getSigners();
  
  });

  it("Should should successfully deploy", async function () {
    console.log(token);
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function() {
      const balance = await token.balanceOf(owner.address);
      expect(ethers.utils.formatEther(balance) == (1000000));
      console.log(balance);
});

it("Name of the token must be equal to token", async function(){

            expect(await token.name()).to.equal("token");
        });

        it("Name of the Token's symbol must be equal to st", async function(){

            expect(await token.symbol()).to.equal("ts");
        });

        it("Token's decimal value must be equal to 18", async function(){

            expect(await token.decimal()).to.equal(18);
        });
      });

describe("Transfer", function(){

  it("Caller's Account balance should have enough tokens", async function(){

   await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Caller account balance does not have enough tokens to spend.");
 
  });
  
  it("Owner's Account balance should have enough tokens", async function(){
     
    expect(await token.transfer(addr1.address, 1000));
    console.log("Owner's Account Balance "+await token.balanceOf(owner.address));

 });

 it("Should transfer Tokens b/w the Accounts", async function(){

        
  //Transfer 1000 Tokens from Owner to Address 1
  expect(await token.transfer(addr1.address, 1000));
  expect(await token.balanceOf(addr1.address)).to.equal(2000);
  expect(await token.balanceOf(owner.address)).to.equal(998000);
 
  
  //Transfer 500 Tokens from Address 1 to Address 2
  expect(await token.connect(addr1).transfer(addr2.address, 500));
  expect(await token.balanceOf(addr2.address)).to.equal(500);
  expect(await token.balanceOf(addr1.address)).to.equal(1500);
 
  
});

describe("mint", function(){

  it("Amount to be minted on Owner's Account", async function(){
      
      let initialOwnerBalance=await token.balanceOf(owner.address);
      console.log(initialOwnerBalance);
      await token.mint(400);
      expect(await token.balanceOf(owner.address)).to.not.equal(initialOwnerBalance);
       
       await console.log(await token.balanceOf(owner.address));
  })
  it("After Minting totalSupply will increase", async function(){
        
    let initialTotalSupply=await token.totalSupply();
    console.log(initialTotalSupply);
    
    await token.mint(400);
     expect(await token.totalSupply()).to.not.equal(initialTotalSupply);

     await console.log(await token.totalSupply());


})








it("Should let you give another address the approval to send on your behalf",async function() {
  await token.connect(addr1).approve(owner.address, ("1000"));
  
  await token.connect(addr1).approve(addr2.address,("1000"));
  console.log(await token.balanceOf(owner.address))
  await token.connect(owner).transfer(addr1.address, ("1000"));
  console.log(await token.allowance(addr1.address,owner.address));
  await token.transferFrom(addr1.address, addr2.address,("1000"));
  console.log("a")
  expect(await token.balanceOf(addr2.address)).to.equal(("1500"));

})


});
});
   