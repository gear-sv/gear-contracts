#include <string>
#include <map>

class NonFungibleToken {
  public:
    std::string owner;
    std::map<unsigned int, std::string> tokens;

    NonFungibleToken(std::string owner);

    bool setOwner(std::string SENDER, std::string owner);
    bool mint(std::string SENDER, std::string recipient);
    bool transfer(std::string SENDER, unsigned int token, std::string recipient);

    const std::string& getOwner();
    std::string& getTokenOwner(unsigned int index);
    std::map<unsigned int, std::string>& getTokens();
};
