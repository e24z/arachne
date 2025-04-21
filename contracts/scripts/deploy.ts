import { ethers } from "hardhat";

async function main() {
    console.log("Deploying contracts...");

    const FaucetToken = await ethers.getContractFactory("FaucetToken");
    const faucetToken = await FaucetToken.deploy();

    await faucetToken.waitForDeployment();
    console.log("FaucetToken deployed to:", await faucetToken.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
