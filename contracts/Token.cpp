#include "Token.h"
#include "map"


/*
 *  sets bitcoin address owner of the contract
 */

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
}
