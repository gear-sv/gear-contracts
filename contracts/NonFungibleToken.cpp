#include "NonFungibleToken.h"
#include "emscripten/bind.h"

using namespace emscripten;

NonFungibleToken::NonFungibleToken(std::string owner) {
  this->owner = owner;
}

bool NonFungibleToken::setOwner(std::string SENDER, std::string owner) {
  this->owner = owner;
  return true;
}

bool NonFungibleToken::mint(std::string SENDER, std::string recipient) {
  // check SENDER is the owner
  if (SENDER != this->owner) {
    return false;
  }

  this->tokens.insert(std::pair<unsigned int, std::string>(this->tokens.size(), recipient));
  return true;
}

bool NonFungibleToken::transfer(std::string SENDER, unsigned int token, std::string recipient) {
  // check that SENDER owns the token
  if (this->tokens[token] != SENDER) {
    return false;
  }

  // transfer ownership
  this->tokens[token] = recipient;

  return true;
}

const std::string& NonFungibleToken::getOwner() {
  return this->owner;
}

std::string& NonFungibleToken::getTokenOwner(unsigned int index) {
  return this->tokens[index];
}

std::map<unsigned int, std::string>& NonFungibleToken::getTokens() {
  return this->tokens;
}



EMSCRIPTEN_BINDINGS(NonFungibleToken_example) {
  register_map<unsigned int, std::string>("Tokens");
  class_<NonFungibleToken>("NonFungibleToken").constructor<std::string>()
    .function("setOwner", &NonFungibleToken::setOwner)
    .function("mint", &NonFungibleToken::mint)
    .function("transfer", &NonFungibleToken::transfer)
    .function("getOwner", &NonFungibleToken::getOwner)
    .function("getTokenOwner", &NonFungibleToken::getTokenOwner)
    .function("tokens", &NonFungibleToken::getTokens)
    .function("getToken", &NonFungibleToken::getTokenOwner);
 }
