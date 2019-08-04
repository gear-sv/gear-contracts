#include "NamingService.h"
#include "emscripten/bind.h"

using namespace emscripten;

NamingService::NamingService(std::string owner) {
  this->owner = owner;
}

bool NamingService::enroll(std::string SENDER, std::string name, std::string recipient) {
  // check if sender is the owner
  if (SENDER != this->owner) {
    return false;
  }

  // check if name is already registered
  if (this->names.find(name) != this->names.end()) {
    return false;
  }

  // add name to ledger
  this->names.insert(std::pair<std::string, std::string>(name, recipient));

  return true;
}

bool NamingService::transfer(std::string SENDER, std::string name, std::string recipient) {
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

bool NamingService::setOwner(std::string SENDER, std::string newOwner) {
  // check that SENDER is the owner
  if (SENDER != this->owner) {
    return false;
  }

  this->owner = newOwner;

  return true;
}

const std::string& NamingService::getNameOwner(std::string name) {
  return this->names[name];
}

const std::string& NamingService::getOwner() {
  return this->owner;
}

EMSCRIPTEN_BINDINGS(NamingService_example) {
  class_<NamingService>("NamingService").constructor<std::string>()
    .function("enroll", &NamingService::enroll)
    .function("transfer", &NamingService::transfer)
    .function("setOwner", &NamingService::setOwner)
    .function("getNameOwner", &NamingService::getNameOwner)
    .function("getOwner", &NamingService::getOwner);

}
