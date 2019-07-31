#include <map>

class NamingService {
  public:
    std::map<char*, char*> balances;

    bool enroll(char* SENDER, char* name);
    bool transfer(char* SENDER, char* name, char* recipient);
}
