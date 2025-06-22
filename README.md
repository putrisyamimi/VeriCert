# VERICERT

**Blockchain-Based Certificate Verification System**

VERICERT is a web-based decentralized application (dApp) developed as part of the Blockchain and Application course at IIUM. It enables university panels to issue secure digital certificates, and allows employers to verify the authenticity of those certificates using Ethereum blockchain and IPFS.

---

## Objectives

- **University Panel (Issuer):** Upload and issue certificates in a secure, tamper-proof way
- **Employer (Verifier):** Instantly verify a candidate’s certificate using the Certificate ID

---

## Key Features

- Certificate issuing by authorized university personnel
- Secure file storage using IPFS via Pinata
- Ethereum smart contract to record and verify certificate data
- Public verification system based on Certificate ID
- User-friendly interface with access control for issuing

---

## Tech Stack

- **Smart Contract:** Solidity (`CertificateRegistry.sol`)
- **Blockchain Framework:** Hardhat (local development network)
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **File Storage:** IPFS via Pinata API
- **Wallet Integration:** MetaMask

---

## How to Run
1. **Clone the Repository & Install dependencies**
   ```bash
   npm install

2. **Start Hardhat local node**
    npx hardhat node

3. **Compile and deploy smart contract**
    npx hardhat run scripts/deploy.js --network localhost

4. **Run backend server**
    node server/index.js

5. **Open the Frontend**
    - Open index.html to verify certificates
    - Open upload.html to upload certificate PDFs to IPFS
    - Open issue.html to issue certificates on-chain
---

## 🔐 Environment Variables
Create a `.env` file inside your `/server` folder and paste the following (replace with your real keys):

```env
PRIVATE_KEY=your_hardhat_wallet_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
```
---

## Project Structure
```bash
vericert/
├── contracts/ # Solidity smart contract
├── scripts/ # Deployment scripts (Hardhat)
├── server/ # Backend: Express + IPFS + Ethereum
├── test/ # Smart contract test cases
├── public/
│ ├── index.html # Certificate verification page (Employer)
│ ├── upload.html # Upload PDF to IPFS (University)
│ └── issue.html # Issue certificate to blockchain
├── .env # 🔒 Environment variables (excluded from Git)
├── .gitignore # Git ignore rules
├── hardhat.config.js # Hardhat configuration
├── package.json # Node.js dependencies
└── README.md # Project overview and setup guide
```
