#include "DoubleAuction.h"
#include "emscripten/bind.h"

using namespace emscripten;
using namespace std;

DoubleAuction::DoubleAuction() {
  this->bookA = {};
  this->bookB = {};
}

const string& DoubleAuction::order(string SENDER, unsigned int book, unsigned int price, unsigned int amount) {
    switch (book) {
      case 0:
        this->bookA.push_back(price);
        return "pass";
      case 1:
        this->bookB.push_back(price);
        return "pass";
      default:
        return "fail";
    }
}

const vector<unsigned int>& DoubleAuction::getBookA() {
  return this->bookA;
}

const vector<unsigned int>& DoubleAuction::getBookB() {
  return this->bookB;
}

EMSCRIPTEN_BINDINGS(DoubleAuction_example) {
  register_vector<unsigned int>("book");
  class_<DoubleAuction>("DoubleAuction").constructor()
    .function("order", &DoubleAuction::order)
    .function("getBookA", &DoubleAuction::getBookA)
    .function("getBookB", &DoubleAuction::getBookB);
}
