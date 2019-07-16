/*
 * ERC20 interface as defined:
 * https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20.sol
 */
#include <map>
#include <iostream>

class Token {
  public:
    unsigned int supply;
    unsigned int limit;
    char* owner;
    char* ticker;
    std::map<char*, unsigned int> balances;

    Token() {
      owner = "1EUSzmPjnDyvQgYTRukPDWaaeXSCHbCism";
      ticker = "TEST";
      limit = 1e6;
    }

    bool setOwner(char* SENDER, char* newOwner);

    bool mint(char* SENDER, unsigned int value);

    bool transfer(char* SENDER, char* recipient, unsigned int value);
};






