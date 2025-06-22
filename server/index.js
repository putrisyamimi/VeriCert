import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { create } from "ipfs-http-client";
import axios from "axios";
import FormData from "form-data";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import contractJSON from "../artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json" assert { type: "json" };

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// IPFS via Infura
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

// Blockchain setup
const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // update if needed
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(CONTRACT_ADDRESS, contractJSON.abi, wallet);

// Test route
app.get("/", (req, res) => {
  res.send("✅ VERICERT Backend is Running (Ethers v6)");
});

// Upload to IPFS
app.post("/upload", async (req, res) => {
  try {
    const { fileBase64 } = req.body;
    const fileBuffer = Buffer.from(fileBase64, "base64");

    const data = new FormData();
    data.append("file", fileBuffer, "certificate.pdf");

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
          ...data.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      }
    );

    res.json({ cid: result.data.IpfsHash });
  } catch (error) {
    console.error("Upload to Pinata failed:", error.response?.data || error.message);
    res.status(500).send("Pinata upload failed");
  }
});

// Issue certificate
app.post("/issue", async (req, res) => {
  const { certId, studentName, course, ipfsHash } = req.body;

  try {
    const tx = await contract.issueCertificate(certId, studentName, course, ipfsHash);
    await tx.wait();
    res.send("✅ Certificate issued successfully.");
  } catch (error) {
    console.error("Blockchain issue failed:", error);
    if (error.reason?.includes("Certificate ID already exists")) {
      res.status(400).send("Certificate ID already exists. Please use a unique ID.");
    } else {
      res.status(500).send("Certificate issuance failed.");
    }
  }
});

// Verify certificate
app.get("/verify/:certId", async (req, res) => {
  try {
    const cert = await contract.verifyCertificate(req.params.certId);
    res.json({
      studentName: cert[0],
      course: cert[1],
      ipfsHash: cert[2],
      issueDate: parseInt(cert[3]),
    });
  } catch (error) {
    console.error("Verification failed:", error);
    res.status(404).send("Certificate not found");
  }
});

app.listen(3001, () => {
  console.log("✅ VERICERT Backend (ethers v6) running on http://localhost:3001");
});
