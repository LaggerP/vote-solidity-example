// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const VoteFactory = await hre.ethers.getContractFactory("VoteContract");
  const voteContract = await VoteFactory.deploy(["candidato1","candidato2"]);

  await voteContract.deployed();

  console.log("VoteContract deployed to:", voteContract.address);

  let candidates = await voteContract.getCandidates();
  console.log(candidates)

  const [_, randomAddress] = await hre.ethers.getSigners();
  let vote = await voteContract.connect(randomAddress).vote(1);
  console.log(vote)

  candidates = await voteContract.getCandidates();
  console.log(candidates[1].voteCount.toNumber())




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
