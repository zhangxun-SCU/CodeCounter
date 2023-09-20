//
// Created by Surface on 2023/9/14.
//

#include <algorithm>
#include "CodeCounter.h"

using std::vector;
using std::string;
using std::cerr;
using std::cout;

#include "ctime"

void CodeCounter::GetFileList() {
    std::clock_t start = clock();
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
        if(this->IsExclude(it.path().string())) {
            continue;
        }
        if(std::filesystem::is_directory(it)) {
            ++dirCounts;
        } else {
            ++fileCounts;
            this->file_list.push_back(it.path().string());
        }
    }
    std::clock_t end = clock();
    std::cerr << "文件统计时间: " <<(double)(end - start) / CLOCKS_PER_SEC << "s" << std::endl;
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
    if(this->c_code.count(type)) {
        this->c_count += count;
    } else if(this->java_code.count(type)) {
        this->java_count += count;
    } else if(this->js_code.count(type)) {
        this->js_count += count;
    } else if(this->python_code.count(type)) {
        this->python_count += count;
    }
}

void CodeCounter::TellDetails() {
    cout << "{\n"
    << "    c: " << this->c_count << " lines.\n"
    << "    java: " << this->java_count << " lines.\n"
    << "    js: " << this->js_count << " lines.\n"
    << "    python: " << this->python_count << " lines.\n"
    << "}"
    << std::endl;
}

bool CodeCounter::IsExclude(const string &path) {
    return std::any_of(this->exclude_keys.begin(), this->exclude_keys.end(),[&](const string &key){
        /**
         * 这里为了查找路径中是否带有某些需要排除的关键词，想到的有三种实现方式
         *  1. 使用path.find 方法
         *  2. 使用algorithm 中的search函数
         *  3. 使用正则表达式匹配（还未实现）
         */
        return path.find(key) != string::npos;
//        return std::search(path.begin(), path.end(), key.begin(), key.end()) != path.end();
    });
}
