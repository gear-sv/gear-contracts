#include "NamingService.h"
#include "emscripten/bind.h"

using namespace emscripten;
using namespace std;

NamingService::NamingService(string owner) {
  this->owner = owner;
}

bool NamingService::enroll(string SENDER, string name, string recipient) {
  // check if sender is the owner
  if (SENDER != this->owner) {
    return false;
  }

  // check if name is already registered
  if (this->names.find(name) != this->names.end()) {
    return false;
  }

  // add name to ledger
  this->names.insert(pair<string, string>(name, recipient));

  return true;
}

bool NamingService::transfer(string SENDER, string name, string recipient) {
  // check that name exists
  if (this->names.find(name) == this->names.end()) {
    return false;
  }

  // // check that SENDER owns the name
  if (this->names[name] != SENDER) {
    return false;
  }

  // transfer name
  this->names[name] = recipient;

  return true;
}

bool NamingService::setOwner(string SENDER, string newOwner) {
  // check that SENDER is the owner
  if (SENDER != this->owner) {
    return false;
  }

  this->owner = newOwner;

  return true;
}

const string& NamingService::getNameOwner(string name) {
  return this->names[name];
}

const string& NamingService::getOwner() {
  return this->owner;
}

EMSCRIPTEN_BINDINGS(NamingService_example) {
  class_<NamingService>("NamingService").constructor<string>()
    .function("enroll", &NamingService::enroll)
    .function("transfer", &NamingService::transfer)
    .function("setOwner", &NamingService::setOwner)
    .function("getNameOwner", &NamingService::getNameOwner)
    .function("getOwner", &NamingService::getOwner);

}
