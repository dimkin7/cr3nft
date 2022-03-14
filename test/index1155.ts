import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("1155", function () {

  let erc1155: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  const CATS = 1; 

  before(async function () {
    //console.log("before");

    [owner, addr1, addr2] = await ethers.getSigners();

    //create contract
    const factory1155 = await ethers.getContractFactory("Dima1155");
    erc1155 = await factory1155.deploy();
    await erc1155.deployed();
  });

  it("Mint 10 cats", async function () {
    await expect(erc1155.mint(addr1.address, CATS, 100))
      .to.emit(erc1155, "Mint")
      .withArgs(addr1.address, 1, 100) ;
  });



  it("Error in tokenID", async function () {
    await expect(erc1155.mint(addr1.address, 33, 100)).to.be.revertedWith("Error in tokenId");
  });

  it("Supports interface", async function () {
    expect(await erc1155.supportsInterface(0x01ffc9a7)).to.equal(true);
  });
});
