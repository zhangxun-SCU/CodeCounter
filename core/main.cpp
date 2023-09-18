//#include <iostream>
//#include <string>
//#include "getFileNames.h"
//#include "codeCount.h"
//#include "filesystem"
//
//int main() {
//
//    std::cout << "Hello, World!" << std::endl;
//    string path;
//    cout << "输入代码路径:";
//    cin >> path;
//    vector<string> fileNames;
//    getFileNames(path, fileNames);
//    int count = 0;
//    for(auto &i:fileNames) {
//        count += codeCount(i);
//    }
//    cout << count << endl;
//    return 0;
//}

#include "filesystem"
#include "iostream"
int main() {
    int dir_counts = 0;
    int file_counts = 0;
    std::filesystem::path root_path("C:\\Users\\18785\\Desktop\\animate.css-main");
    if (!exists(root_path))		//必须先检测目录是否存在才能使用文件入口.
        return 1;
    std::filesystem::directory_entry entry(root_path);		//文件入口
    if (entry.status().type() == std::filesystem::file_type::directory)	//这里用了C++11的强枚举类型
        std::cout << "该路径是一个目录" << std::endl;
    std::filesystem::recursive_directory_iterator list(root_path);	        //文件入口容器
    for (auto& it:list){
        std::cout << it.path()<< std::endl;	//通过文件入口（it）获取path对象，再得到path对象的文件名，将之输出
        if(std::filesystem::is_directory(it)) {
            ++dir_counts;
        } else {
            ++file_counts;
        }
    }
    std::cout << "文件夹总数：" << dir_counts << "文件总数" << file_counts << std::endl;
    return 0;
}