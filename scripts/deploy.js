import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
  const contract = await CertificateRegistry.deploy();
  await contract.waitForDeployment(); // ✅ NEW METHOD for Hardhat 2.21+

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
