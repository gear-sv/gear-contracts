#include "NonFungibleToken.h"
#include "emscripten/bind.h"

using namespace emscripten;
using namespace std;

NonFungibleToken::NonFungibleToken(string owner) {
  this->owner = owner;
}

bool NonFungibleToken::setOwner(string SENDER, string owner) {
  this->owner = owner;
  return true;
}

bool NonFungibleToken::mint(string SENDER, string recipient) {
  // check SENDER is the owner
  if (SENDER != this->owner) {
    return false;
  }

  this->tokens.insert(pair<unsigned int, string>(this->tokens.size(), recipient));
  return true;
}

bool NonFungibleToken::transfer(string SENDER, unsigned int token, string recipient) {
  // check that SENDER owns the token
  if (this->tokens[token] != SENDER) {
    return false;
  }

  // transfer ownership
  this->tokens[token] = recipient;

  return true;
}

const string& NonFungibleToken::getOwner() {
  return this->owner;
}

string& NonFungibleToken::getTokenOwner(unsigned int index) {
  return this->tokens[index];
}

map<unsigned int, string>& NonFungibleToken::getTokens() {
  return this->tokens;
}

EMSCRIPTEN_BINDINGS(NonFungibleToken_example) {
  register_vector<unsigned int>("keys");
  register_map<unsigned int, string>("tokens");
  class_<NonFungibleToken>("NonFungibleToken").constructor<string>()
    .function("setOwner", &NonFungibleToken::setOwner)
    .function("mint", &NonFungibleToken::mint)
    .function("transfer", &NonFungibleToken::transfer)
    .function("getOwner", &NonFungibleToken::getOwner)
    .function("getTokenOwner", &NonFungibleToken::getTokenOwner)
    .function("getTokens", &NonFungibleToken::getTokens)
    .function("getToken", &NonFungibleToken::getTokenOwner);
 }
