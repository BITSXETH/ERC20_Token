const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("MyToken contract", function () {
    let MyToken;
    let myToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        myToken = await MyToken.deploy();
       
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await myToken.balanceOf(owner.address)).to.equal(100000);
        });

    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await myToken.transfer(addr1.address, 50);
            expect(await myToken.balanceOf(addr1.address)).to.equal(50);
        });

        it("Should fail if sender doesnt have enough tokens", async function () {
            await expect(myToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Insufficient balance");
        });

        it("Should update balances after transfers", async function () {
            await myToken.transfer(addr1.address, 100);
            await myToken.transfer(addr2.address, 50);

            const finalOwnerBalance = await myToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(100000 - 150);

            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await myToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });
});