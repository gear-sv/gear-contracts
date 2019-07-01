#include "Token.h"
#include "map"


/*
 *  sets bitcoin address owner of the contract
 */
bool Token::setOwner(char* sender, char* _owner) {
  owner = _owner;
  return true;
}

/*
 * mints amount of tokens, issues to owner
 */
bool Token::mint(char* sender,unsigned int amount) {
  supply = supply + amount;
  return true;
}

/*
 * transfers value of tokens to a recipient
 */
bool Token::transfer(char* sender, char* recipient, unsigned int value) {
  balances.insert(std::pair<char*, unsigned int>(recipient, value));
  return true;
}

/*
 * instantiate class
 */
Token token;

/*
 * Interface
 */
extern "C" {
  bool mint(char* sender, int amount) {
    token.mint(sender, amount);   
    return true;
  }       
  
  int getSupply() {
    return token.supply;
  }
  
  bool setOwner(char* sender, char* owner) {
    token.setOwner(sender, owner);
    return true;
  }

  char* getOwner() {
    return token.owner;
  }

  bool transfer(char* sender, char* recipient, int value) {
    token.transfer(sender, recipient, value);
    return true;
  }

}
