#include <string>
#include <map>

class NamingService {
  public:
    std::string owner;
    std::map<std::string, std::string> names;

    NamingService(std::string owner);

    bool enroll(std::string SENDER, std::string name, std::string recipient);
    bool transfer(std::string SENDER, std::string name, std::string recipient);
    bool setOwner(std::string SENDER, std::string newOwner);

    const std::string& getNameOwner(std::string name);
    const std::string& getOwner();
};
