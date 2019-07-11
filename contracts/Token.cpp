#include "Token.h"
#include "map"

/*
 *  sets bitcoin address owner of the contract
 */
bool Token::setOwner(char* SENDER, char* newOwner) {
  // check if SENDER is the current owner
  if (strcmp(SENDER, owner) != 0) {
    return false;
  }

  // set new owner
  owner = newOwner;

  return true;
}

/*
 * mints value of tokens, issues to owner
 */
bool Token::mint(char* SENDER, unsigned int value) {
  // check if SENDER is the owner
  if (strcmp(SENDER, owner) != 0) {
    return false;
  }

  // increment supply
  supply = supply + value;

  // increment owner balance
  if (balances.find(SENDER) == balances.end()) {
    balances.insert(std::pair<char*, unsigned int>(SENDER, value));
  } else {
    int balance = balances[SENDER];
    balances[SENDER] = balance + value;
  }

  return true;
}

/*
 * transfers value of tokens to a recipient
 */
bool Token::transfer(char* SENDER, char* recipient, unsigned int value) {
  // check if SENDER has sufficient funds
  if (balances[SENDER] < value) {
    return false;
  }

  // increment recipient balance
  if (balances.find(recipient) == balances.end()) {
    balances.insert(std::pair<char*, unsigned int>(recipient, value));
  } else {
    int recipientBalance = balances[recipient];
    balances[recipient] = recipientBalance + value;
  }

  // decrement SENDER balance
  int senderBalance = balances[SENDER];
  balances[SENDER] = senderBalance - value;

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
    return token.mint(sender, amount);
  }

  int getSupply() {
    return token.supply;
  }

  bool setOwner(char* sender, char* owner) {
    return token.setOwner(sender, owner);
  }

  char* getOwner() {
    return token.owner;
  }

  bool transfer(char* sender, char* recipient, int value) {
    return token.transfer(sender, recipient, value);
  }

  int getBalance(char* address) {
    return token.balances[address];
  }
}
