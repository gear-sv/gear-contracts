#include "FungibleToken.h"
#include "emscripten/bind.h"

using namespace emscripten;

FungibleToken::FungibleToken(std::string owner) {
  this->supply = 0;
  this->owner = owner;
}

const std::string& FungibleToken::setOwner(std::string SENDER, std::string newOwner) {
  // check that SENDER is the current owner
  if (SENDER != this->owner) {
    return "fail";
  }

  this->owner = newOwner;
  return "success";
}

const std::string& FungibleToken::mint(std::string SENDER, unsigned int amount) {
  // only the owner can mint
  if (SENDER != this->owner) {
    return "fail";
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

  return "success";
}

const std::string& FungibleToken::transfer(std::string SENDER, std::string recipient, unsigned int amount) {
  // check if SENDER has sufficient funds
  if (this->balances[SENDER] < amount) {
    return "fail";
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

  return "success";
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

const std::map<std::string, unsigned int>& FungibleToken::getBalances() {
  return this->balances;
}

EMSCRIPTEN_BINDINGS(FungibleToken_example) {
  register_vector<std::string>("keys");
  register_map<std::string, unsigned int>("balances");
  class_<FungibleToken>("FungibleToken").constructor<std::string>()
    .function("setOwner", &FungibleToken::setOwner)
    .function("mint", &FungibleToken::mint)
    .function("transfer", &FungibleToken::transfer)
    .function("getSupply", &FungibleToken::getSupply)
    .function("getOwner", &FungibleToken::getOwner)
    .function("getBalance", &FungibleToken::getBalance)
    .function("getBalances", &FungibleToken::getBalances);
 }
