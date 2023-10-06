//
// Created by Surface on 2023/9/18.
//

#ifndef CODECOUNTER_STR_H
#define CODECOUNTER_STR_H
#include <vector>
#include <string>

class str {
public:
    static std::vector<std::string> split(const std::string &str, const std::string& interval);
    static void lower(std::string &type);
};

#endif //CODECOUNTER_STR_H
