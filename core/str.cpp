//
// Created by Surface on 2023/9/18.
//

#include "str.h"

using std::vector;
using std::string;
vector<string> str::split(const string &str, const string& interval) {
    if(str == "") return {};
    vector<string> res;
    string newStr = str + interval;  // 方便最后一部分得查找
    size_t pos = newStr.find(interval);
    while(pos != newStr.npos) {
        string temp = newStr.substr(0, pos);
        res.push_back(temp);
        newStr = newStr.substr(pos+interval.size(), newStr.size());
        pos = newStr.find(interval);
    }
    return res;
}

void str::lower(string &type) {
    for(char & i : type) i = std::tolower(i);
}
