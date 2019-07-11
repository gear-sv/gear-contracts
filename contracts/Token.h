/*
 * ERC20 interface as defined:
 * https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20.sol
 */
#include <map>
#include <iostream>

class Token {
  public:
    // represents integer value for total number of outstanding tokens
    unsigned int supply;

    // current owner of the contract
    char* owner;

    Token() {
      owner = "13geTUt3kqJ3vxMMBbWZwJ1NXnSEK2VDm6";
    }
    // current balance accounting
    std::map<char*, unsigned int> balances;

    bool mint(char* sender, unsigned int value);

    bool transfer(char* SENDER, char* recipient, unsigned int value);

    bool setOwner(char* SENDER, char* newOwner);
};
