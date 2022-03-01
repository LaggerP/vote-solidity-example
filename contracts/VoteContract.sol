//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VoteContract {
    //Persona que inicia el contrato.
    address public personInitVote;

    struct Voter {
        address voterAddress;
        bool vote; //determina si ya voto.
        uint256 candidate; //candidato al que voto.
    }
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    //map de clave(address) valor(Voter)
    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    Voter[] public votersList;

    event LogEventVote(
        address indexed from,
        uint256 timestamp,
        uint256 votedCandidate
    );
    event LogVoters(address name, uint256 candidate);

    //Creando una nueva votación con los candidatos.
    constructor(string[] memory _candidates) {
        personInitVote = msg.sender;
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate({name: _candidates[i], voteCount: 0}));
        }
    }

    //Función que realiza la votación
    function vote(uint256 _candidate) public {
        Voter storage voter = voters[msg.sender];
        require(!voter.vote, "Ya realizo una votacion");
        voter.voterAddress = msg.sender;
        voter.vote = true;
        voter.candidate = _candidate;
        candidates[_candidate].voteCount += 1;
        votersList.push(voter);
        emit LogEventVote(msg.sender, block.timestamp, _candidate);
    }

    //Se obtienen todos los candidatos creados
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    //Se obtienen todos los votadores
    function getVoters() public view returns (Voter[] memory) {
        return votersList;
    }
}
