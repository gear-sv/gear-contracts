#include <string>
#include <vector>
// class Order {
//   public:
//     Order(unsigned int price, unsigned int amount);
// }

class DoubleAuction {
  public:
    DoubleAuction();

    std::vector<unsigned int> bookA;
    std::vector<unsigned int> bookB;

    const std::string& order(std::string SENDER, unsigned int book, unsigned int price, unsigned int amount);

    const std::vector<unsigned int>& getBookA();
    const std::vector<unsigned int>& getBookB();
};
