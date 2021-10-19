const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const leaderboardContractFactory = await hre.ethers.getContractFactory('Leaderboard');
  const leaderboardContract = await leaderboardContractFactory.deploy();
  await leaderboardContract.deployed();

  console.log("Contract deployed to:", leaderboardContract.address);
  console.log("Contract deployed by:", owner.address);

  let leaderboard = await leaderboardContract.getLeaderboard();
  console.log(leaderboard)

  let txn = await leaderboardContract.connect(randomPerson).saveScore(24444232);
  console.log("Saving score...")
  await txn.wait();

  leaderboard = await leaderboardContract.getLeaderboard();
  console.log(leaderboard)

  txn = await leaderboardContract.connect(randomPerson).saveScore(456669000);
  console.log("Saving score...")
  await txn.wait();

  leaderboard = await leaderboardContract.getLeaderboard();
  console.log(leaderboard)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();