//
// Created by Surface on 2023/9/14.
//

#ifndef CODECOUNTER_CODECOUNTER_H
#define CODECOUNTER_CODECOUNTER_H
#include <string>
#include <utility>
#include <vector>
#include <filesystem>
#include <iostream>
#include <set>
#include <fstream>
#include "str.h"

class CodeCounter {
private:
    std::string root_path;
    std::vector<std::string> exclude_keys;  // 排除关键字
    std::vector<std::string > file_list;
    std::fstream inFile;
    void GetFileList(); // 递归获取文件路径
    int CountOneFile(const std::string &path);
    void AddCount(const std::string &type, size_t count);
    bool IsExclude(const std::string &path);  // 判断路径是否排除
private:
    std::set<std::string> java_code{"java"};
    std::set<std::string> c_code{"c"};
    std::set<std::string> cpp_code{"cpp"};
    std::set<std::string> c_head{"h"};

    std::set<std::string> python_code{"py"};
    std::set<std::string> js_code{"js", "ts", "vue"};
    size_t java_count = 0;
    size_t c_count = 0;
    size_t cpp_count = 0;
    size_t chead_count = 0;
    size_t js_count = 0;
    size_t python_count = 0;
    size_t c_files = 0;
    size_t cpp_files = 0;
    size_t c_head_files = 0;
    size_t java_files = 0;
public:
    explicit CodeCounter(std::string path): root_path(std::move(path)) {
        this->GetFileList();
    }
    void CodeCount();
    void TellDetails();
};


#endif //CODECOUNTER_CODECOUNTER_H
