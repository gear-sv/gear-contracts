/*  
 * ERC20 interface as defined: 
 * https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20.sol
 */
#include <map>

class Token {
  public:
    // represents integer value for total number of outstanding tokens
    unsigned int supply;
    
    // current owner of the contract
    char* owner; 

    // current balance accounting  
    std::map<char*, unsigned int> balances;
    
    bool mint(unsigned int amount);

    bool transfer(char* recipient, unsigned int value);
    
    bool setOwner(char* _owner);
};

