#include "Token.h"
#include "map"


/*
 *  sets bitcoin address owner of the contract
 */
bool Token::setOwner(char* _owner) {
  owner = _owner;
  return true;
}

/*
 * mints amount of tokens, issues to owner
 */
bool Token::mint(unsigned int amount) {
  supply = supply + amount;
  return true;
}

/*
 * transfers value of tokens to a recipient
 */
bool Token::transfer(char* recipient, unsigned int value) {
  balances.insert(std::pair<char*, unsigned int>(recipient, value));
  return true;
}

/*
 * instantiate class
 */
Token token;

extern "C" {
  bool mint(int amount) {
    token.mint(amount);   
    return true;
  }       
  
  int getSupply() {
    return token.supply;
  }
  
  bool setOwner(char* owner) {
    token.setOwner(owner);
    return true;
  }
}
