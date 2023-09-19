//
// Created by Surface on 2023/9/14.
//

#include "CodeCounter.h"

using std::vector;
using std::string;
using std::cerr;

void CodeCounter::GetFileList() {
    int dirCounts = 0;
    int fileCounts = 0;
    std::filesystem::path rootPath(this->root_path);
    if(!exists(rootPath)){
        // 检测文件夹是否存在
        cerr << "error:" << rootPath << "不存在！" << std::endl;
        return;
    }
    std::filesystem::directory_entry dirEntry(rootPath);  // 定义文件入口
//    if(dirEntry.status().type() == std::filesystem::file_type::directory) {
//        // C++ 11 的强枚举类型
//        // 判断是一个目录
//    }
    std::filesystem::recursive_directory_iterator list(rootPath);  // 入口容器，递归遍历
    for(auto &it: list) {
        if(std::filesystem::is_directory(it)) {
            ++dirCounts;
        } else {
            ++fileCounts;
            this->file_list.push_back(it.path().string());
        }
    }
}

void CodeCounter::CodeCount() {
    int c = 0;
    vector<string> pathSplit;
    string codeType;
    for(auto &path :this->file_list) {
        c = this->CountOneFile(path);
        pathSplit = str::split(path, ".");
        codeType = pathSplit[pathSplit.size()-1];
        this->AddCount(codeType, c);
    }
}

int CodeCounter::CountOneFile(const string &path) {
    this->inFile.open(std::filesystem::path(path), std::ios::in);
    int c = 0;
    string tmp;
    if(!inFile.fail()) {
        while(getline(inFile, tmp, '\n')) ++c;
        inFile.close();
    } else {
        cerr <<"'" << path << "' 打开失败";
    }
    return c;
}

void CodeCounter::AddCount(const string &type, size_t count) {
    if(this->c_code.count(type) || this->java_code.count(type) || this->js_code.count(type) || this->python_code.count(type)) {
        this->nums += count;
    }
}
