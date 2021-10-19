const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const leaderboardContractFactory = await hre.ethers.getContractFactory('Leaderboard')
  const leaderboardContract = await leaderboardContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1')
  });
  await leaderboardContract.deployed()

  console.log("Contract deployed to:", leaderboardContract.address)
  console.log("Contract deployed by:", owner.address);

  let leaderboard = await leaderboardContract.getLeaderboard()
  console.log(leaderboard)

  let contractBalance = await hre.ethers.provider.getBalance(
    leaderboardContract.address
  )
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  let txn = await leaderboardContract.connect(randomPerson).saveScore(24444232)
  console.log("Saving score...")
  await txn.wait();

  leaderboard = await leaderboardContract.getLeaderboard();
  console.log(leaderboard)
  contractBalance = await hre.ethers.provider.getBalance(leaderboardContract.address)
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )

  txn = await leaderboardContract.connect(randomPerson).saveScore(456669000)
  console.log("Saving score...")
  await txn.wait();

  leaderboard = await leaderboardContract.getLeaderboard()
  console.log(leaderboard)

  contractBalance = await hre.ethers.provider.getBalance(leaderboardContract.address)
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  )
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