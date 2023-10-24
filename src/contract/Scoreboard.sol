// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Scoreboard {
    using ECDSA for bytes32;

    struct ScoreEntry {
        address playerAddress;
        string playerName;
        uint playerScore;
    }

    ScoreEntry[] public scores;
    ScoreEntry[10] public topScores;
    ScoreEntry[10] public worstScores;
    address private _signer;

    constructor() {
        _signer = msg.sender;
    }

    function submitScore(
        string memory name,
        uint score,
        bytes memory signature
    ) public {
        require(getSigner(name, score, signature) == _signer);
        ScoreEntry memory newEntry = ScoreEntry({
            playerAddress: msg.sender,
            playerName: name,
            playerScore: score
        });
        scores.push(newEntry);
        _updateTopScores(newEntry);
        _updateWorstScores(newEntry);
    }

    function resetScores(bytes memory signature) public {
        require(getSigner("reset", 0, signature) == _signer);
        for (uint i = 0; i < 10; i++) {
            topScores[i] = ScoreEntry({
                playerAddress: address(0),
                playerName: "",
                playerScore: 0
            });

            worstScores[i] = ScoreEntry({
                playerAddress: address(0),
                playerName: "",
                playerScore: 0
            });
        }
    }

    function _updateTopScores(ScoreEntry memory newEntry) internal {
        for (uint i = 0; i < 10; i++) {
            if (
                newEntry.playerScore > topScores[i].playerScore ||
                (newEntry.playerScore == topScores[i].playerScore &&
                    newEntry.playerAddress > topScores[i].playerAddress)
            ) {
                // Shift scores to make room for new score
                for (uint j = 9; j > i; j--) {
                    topScores[j] = topScores[j - 1];
                }
                topScores[i] = newEntry;
                break;
            }
        }
    }

    function _updateWorstScores(ScoreEntry memory newEntry) internal {
        for (uint i = 0; i < 10; i++) {
            if (
                worstScores[i].playerAddress == address(0) ||
                newEntry.playerScore < worstScores[i].playerScore ||
                (newEntry.playerScore == worstScores[i].playerScore &&
                    newEntry.playerAddress < worstScores[i].playerAddress)
            ) {
                // Shift scores to make room for new score
                for (uint j = 9; j > i; j--) {
                    worstScores[j] = worstScores[j - 1];
                }
                worstScores[i] = newEntry;
                break;
            }
        }
    }

    function getTop10Scores() public view returns (ScoreEntry[10] memory) {
        return topScores;
    }

    function getWorst10Scores() public view returns (ScoreEntry[10] memory) {
        return worstScores;
    }

    function getRecent10Scores() public view returns (ScoreEntry[10] memory) {
        ScoreEntry[10] memory recentScores;
        uint length = scores.length;

        for (uint i = 0; i < 10 && i < length; i++) {
            recentScores[i] = scores[length - 1 - i];
        }
        return recentScores;
    }

    function toEthSignedMessageHash(
        bytes memory message
    ) internal pure returns (bytes32) {
        return
            keccak256(
                bytes.concat(
                    "\x19Ethereum Signed Message:\n",
                    bytes(Strings.toString(message.length)),
                    message
                )
            );
    }

    function getSigner(
        string memory name,
        uint score,
        bytes memory signature
    ) public pure returns (address) {
        (address signer, , ) = toEthSignedMessageHash(
            bytes(string.concat(name, Strings.toString(score)))
        ).tryRecover(signature);
        return signer;
    }
}
