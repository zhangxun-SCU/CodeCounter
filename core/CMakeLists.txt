cmake_minimum_required(VERSION 3.26)
project(codeCounter)

set(CMAKE_CXX_STANDARD 17)

add_executable(codeCounter main.cpp
        CodeCounter.cpp
        CodeCounter.h
        str.cpp
        str.h)
