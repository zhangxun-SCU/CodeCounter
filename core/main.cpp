
#include "CodeCounter.h"
#include "ctime"

int main() {
    std::clock_t start = std::clock();
    CodeCounter cc = CodeCounter("D:\\代码统计");
    cc.CodeCount();
    cc.TellDetails();
    std::clock_t end = std::clock();
    std::cerr <<(double)(end - start) / CLOCKS_PER_SEC << "s" << std::endl;
    return 0;
}