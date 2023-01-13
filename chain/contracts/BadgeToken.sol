// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract BadgeToken is ERC721 {
    // 设置自增id
    uint256 private _currentTokenId = 0; 

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {

    }

    /**
     * 铸造令牌到地址
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public {
        uint256 newTokenId = _getNextTokenId();
        //往一个地址是转一个值
        _mint(_to, newTokenId);
        //再将id 自增 防重攻击
        _incrementTokenId();
    }

    /**
     * 让这个自增id +1
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId+1;
    }

    /**
     * @dev 将id +1 
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    /**
     * json 
     * {"name":"Badge #1","description":"Badge NFT with on-chain SVG image.","image":"data:image/svg+xml;base64,[svg base64 encoded]"}
     *
     *  根据id 获取 svg图片
     * @dev return tokenURI, image SVG data in it.
     *  元数据函数
     */
    function tokenURI(uint256 tokenId) override public pure returns (string memory) {
        string[3] memory parts;

        parts[0] = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 300px; }</style><rect width='100%' height='100%' fill='brown' /><text x='100' y='260' class='base'>";

        parts[1] = Strings.toString(tokenId);

        parts[2] = "</text></svg>";

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            "{\"name\":\"Badge #", 
            Strings.toString(tokenId), 
            "\",\"description\":\"Badge NFT with on-chain SVG image.\",",
            "\"image\": \"data:image/svg+xml;base64,", 
            // Base64.encode(bytes(output)), 
            Base64.encode(bytes(abi.encodePacked(parts[0], parts[1], parts[2]))),     
            "\"}"
            ))));

        return string(abi.encodePacked("data:application/json;base64,", json));
    }    
}
