//
// Created by Surface on 2023/9/14.
//

#ifndef CODECOUNTER_CODECOUNTER_H
#define CODECOUNTER_CODECOUNTER_H
#include "string"
#include "vector"
#include "filesystem"
#include "iostream"

class CodeCounter {
private:
    std::string root_path;
    std::vector<std::string > file_list;
    void GetFileList();
public:
    explicit CodeCounter(std::string path): root_path(path) {}
    void Count();
};


#endif //CODECOUNTER_CODECOUNTER_H
