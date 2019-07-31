#include "NamingService.h"
#include "map"

bool NamingService::enroll(char* SENDER, char* name) {
  // check if name is already registered
  if (names.find(name) != names.end()) {
    return false;
  }

  // add name to ledger
  names.insert(std::pair<char*, char*>(name, SENDER));

  return true;
}

bool NamingService::transfer(char* SENDER, char* name, char* recipient) {
  // check that name exists
  if (names.find(name) != names.end()) {
    return false;
  }

  // check that SENDER owns the name
  if (names[name] != SENDER) {
    return false;
  }

  // transfer name
  names[name] = recipient;

  return true;
}

/*
 * instantiate class
 */
NamingService namingService;

/*
 * Interface
 */
extern "C" {
  bool enroll(char* sender, char* name) {
    return namingService.enroll(sender, name);
   }

   bool transfer(char* sender, char* name, char* recipient) {
    return namingService.transfer(sender, name, recipient);
   }

   bool getOwner(char* name) {
     return namingService.names[name];
   }
 }
