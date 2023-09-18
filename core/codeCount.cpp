//
// Created by Surface on 2023/9/14.
//

#include "codeCount.h"
int codeCount(const string& fileName) {
    fstream inFile(fileName, ios::in);
    int count = 0;
    string tmp;
    if(inFile) {
        while(getline(inFile,tmp,'\n')) {
            ++count;
        }
        inFile.close();
        return count;
    } else {
        cerr << fileName << "打开失败"<< endl;
        return -1;
    }
}