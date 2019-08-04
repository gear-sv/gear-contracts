#include <string>
#include <map>

class FungibleToken {
  public:
    unsigned int supply;
    std::string owner;
    std::map<std::string, unsigned int> balances;

    FungibleToken(std::string owner);

    bool setOwner(std::string SENDER, std::string newOwner);
    bool mint(std::string SENDER, unsigned int amount);
    bool transfer(std::string SENDER, std::string recipient, unsigned int amount);

    const unsigned int& getSupply();
    const std::string& getOwner();
    const unsigned int& getBalance(std::string address);
};
