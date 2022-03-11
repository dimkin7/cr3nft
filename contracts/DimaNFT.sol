//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DimaNFT is ERC721, AccessControl {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private nftCounter;

    constructor() ERC721("DimaNFT", "DIMANFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    //override funciton

    //https://ipfs.io/ipfs/QmP2aNgzCpt5Rz8zTifc7X2BB2E39ZTTzo3HwbghaxiWbK

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return string(abi.encodePacked("https://ipfs.io/ipfs/QmP2aNgzCpt5Rz8zTifc7X2BB2E39ZTTzo3HwbghaxiWbK/", tokenId.toString(), ".json"));
    }

    //Mint new token
    function mint(address to)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (uint256)
    {
        nftCounter.increment();

        uint256 newItemId = nftCounter.current();
        _safeMint(to, newItemId);

        //TODO emit event
        return newItemId;
    }

    //burn token
    function burn(uint256 tokenId) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(tokenId);
    }

    //to fix error: Derived contract must override function "supportsInterface".
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
