//
// Created by Surface on 2023/9/14.
//

#ifndef CODECOUNTER_CODECOUNTER_H
#define CODECOUNTER_CODECOUNTER_H
#include <string>
#include <vector>
#include <filesystem>
#include <iostream>
#include <set>
#include <fstream>
#include "str.h"

class CodeCounter {
private:
    std::string root_path;
    std::vector<std::string > file_list;
    std::fstream inFile;
    void GetFileList();
    int CountOneFile(const std::string &path);
    void AddCount(const std::string &type, size_t count);
private:
    std::set<std::string> java_code{"java"};
    std::set<std::string> c_code{"c", "h", "cpp", "hpp"};
    std::set<std::string> python_code{"py"};
    std::set<std::string> js_code{"js", "ts"};
    size_t java_count = 0;
public:
    explicit CodeCounter(std::string path): root_path(path) {
        this->GetFileList();
    }
    void CodeCount();
    size_t nums = 0;
};


#endif //CODECOUNTER_CODECOUNTER_H
