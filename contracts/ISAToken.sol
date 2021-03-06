pragma solidity ^0.4.18;

import './ERC721Token.sol';
import './Ownable.sol';

/**
 * The ISAToken contract does this and that...
 */
contract ISAToken is Ownable, ERC721Token {
    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    bool public mintingFinished = false;

    function ISAToken() {
        
    }

    /**
    * @dev Function to mint tokens
    * @param _to The address that will receive the minted tokens.
    * @param _amount The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
    function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to, _amount);
        Transfer(address(0), _to, _amount);
        return true;
    }
    modifier canMint() {
        require(!mintingFinished);
        _;
    }
}
