// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string studentName;
        string course;
        string ipfsHash;
        uint256 issueDate;
    }

    mapping(string => Certificate) public certificates;
    address public university;

    constructor() {
        university = msg.sender;
    }

    modifier onlyUniversity() {
        require(msg.sender == university, "Not authorized");
        _;
    }

    function issueCertificate(
        string memory certId,
        string memory studentName,
        string memory course,
        string memory ipfsHash
    ) public onlyUniversity {
        require(certificates[certId].issueDate == 0, "Certificate ID already exists");
        certificates[certId] = Certificate(studentName, course, ipfsHash, block.timestamp);
    }

    function verifyCertificate(string memory certId) public view returns (
        string memory, string memory, string memory, uint256
    ) {
        Certificate memory cert = certificates[certId];
        return (cert.studentName, cert.course, cert.ipfsHash, cert.issueDate);
    }
}
