const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VoteContract vote function", function () {
  it("Should return the new vote Count from 'candidato1' once it's changed", async function () {
    const VoteFactory = await ethers.getContractFactory("VoteContract");
    const voteContract = await VoteFactory.deploy(["candidato1", "candidato2"]);

    await voteContract.deployed();

    const [_, randomAddress] = await ethers.getSigners();
    await voteContract.connect(randomAddress).vote(0);

    candidates = await voteContract.getCandidates();

    expect(candidates[0].voteCount.toNumber()).to.equal(1);
  });
});

describe("VoteContract vote function", function () {
  it("Should return the new vote Count from 'candidato2' once it's changed", async function () {
    const VoteFactory = await ethers.getContractFactory("VoteContract");
    const voteContract = await VoteFactory.deploy(["candidato1", "candidato2"]);

    await voteContract.deployed();

    const [_, randomAddress] = await ethers.getSigners();
    await voteContract.connect(randomAddress).vote(1);

    candidates = await voteContract.getCandidates();

    expect(candidates[1].voteCount.toNumber()).to.equal(1);
  });
});

describe("VoteContract candidates list not equals 0", function () {
  it("List of candidates not equals 0", async function () {
    const VoteFactory = await ethers.getContractFactory("VoteContract");
    const voteContract = await VoteFactory.deploy(["candidato1", "candidato2"]);

    await voteContract.deployed();

    let candidates = await voteContract.getCandidates();

    expect(candidates.length).to.not.equals(0);
  });
});
