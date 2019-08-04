#include "FungibleToken.h"
#include "emscripten/bind.h"

using namespace emscripten;


FungibleToken::FungibleToken(std::string owner) {
  this->supply = 0;
  this->owner = owner;
}

bool FungibleToken::setOwner(std::string SENDER, std::string newOwner) {
  this->owner = newOwner;
  return true;
}

bool FungibleToken::mint(std::string SENDER, unsigned int amount) {
  // only the owner can mint
  if (SENDER != this->owner) {
    return false;
  }

  // mint tokens, assign to owner
  this->supply = this->supply + amount;

  // increment owner balance
  if (this->balances.find(SENDER) == this->balances.end()) {
    this->balances.insert(std::pair<std::string, unsigned int>(SENDER, amount));
  } else {
    unsigned int balance = this->balances[SENDER];
    this->balances[SENDER] = balance + amount;
  }

  return true;
}

bool FungibleToken::transfer(std::string SENDER, std::string recipient, unsigned int amount) {
  // check if SENDER has sufficient funds
  if (this->balances[SENDER] < amount) {
    return false;
  }

  // increment recipient balance
  if (this->balances.find(recipient) == this->balances.end()) {
    this->balances.insert(std::pair<std::string, unsigned int>(recipient, amount));
  } else {
    unsigned int recipientBalance = this->balances[recipient];
    this->balances[recipient] = recipientBalance + amount;
  }

  // decrement SENDER balance
  int senderBalance = this->balances[SENDER];
  this->balances[SENDER] = senderBalance - amount;

  return true;
}

const unsigned int& FungibleToken::getSupply() {
  return this->supply;
}

const std::string& FungibleToken::getOwner() {
  return this->owner;
}

const unsigned int& FungibleToken::getBalance(std::string address) {
  return this->balances[address];
}

EMSCRIPTEN_BINDINGS(FungibleToken_example) {
  class_<FungibleToken>("FungibleToken").constructor<std::string>()
    .function("setOwner", &FungibleToken::setOwner)
    .function("mint", &FungibleToken::mint)
    .function("transfer", &FungibleToken::transfer)
    .function("getSupply", &FungibleToken::getSupply)
    .function("getOwner", &FungibleToken::getOwner)
    .function("getBalance", &FungibleToken::getBalance);
 }
