//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

//cats:
//https://ipfs.io/ipfs/QmV3Hyu1a8qqtiZMgrjpYW4SG97kjESfRuNZfYJcSywtqG/0000000000000000000000000000000000000000000000000000000000000001.json
//https://ipfs.io/ipfs/QmQPkL4D8xZBAG4xwa4d83FcUaWSkf3GAHyCX62LuLVHdp/cat.png
//dogs:
//https://ipfs.io/ipfs/QmV3Hyu1a8qqtiZMgrjpYW4SG97kjESfRuNZfYJcSywtqG/0000000000000000000000000000000000000000000000000000000000000002.json
//https://ipfs.io/ipfs/QmQPkL4D8xZBAG4xwa4d83FcUaWSkf3GAHyCX62LuLVHdp/dog.png

contract Dima1155 is ERC1155, AccessControl {
    uint256 public constant CATS = 1;
    uint256 public constant DOGS = 2;

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/QmV3Hyu1a8qqtiZMgrjpYW4SG97kjESfRuNZfYJcSywtqG/{id}.json"
        )
    {
        //_mint(msg.sender, CATS, 100, "");
        //_mint(msg.sender, DOGS, 200, "");
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    //event for Mint
    event Mint(address indexed to, uint256 tokenId, uint256 count);

    //Mint new token
    function mint(
        address to,
        uint256 tokenId,
        uint256 count
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(tokenId == CATS || tokenId == DOGS, "Error in tokenId");

        _mint(to, tokenId, count, "");
        //event
        emit Mint(to, tokenId, count);
    }

    //to fix error: Derived contract must override function "supportsInterface".
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
