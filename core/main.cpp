
#include "CodeCounter.h"

int main() {
    CodeCounter cc = CodeCounter("C:\\myCodes\\c\\扫雷");
    cc.CodeCount();
    std::cout << cc.nums << std::endl;
    return 0;
}