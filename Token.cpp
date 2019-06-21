#include "Token.h"
#include "map"

bool Token::transfer(char* recipient, unsigned int value) {
  balances.insert(std::pair<char*, unsigned int>(recipient, value));
  return true;
}


