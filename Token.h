/*  
 * ERC20 interface as defined: 
 * https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20.sol
 */
#include <map>

class Token {
  public:
    // represents integer value for total number of outstanding tokens
    unsigned int supply;
  
    // current balance accounting  
    std::map<char*, unsigned int> balances;
  
    bool transfer(char* recipient, unsigned int value);
};

