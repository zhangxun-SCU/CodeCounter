#include<vector>
#include<string>
#include "iostream"
using namespace std;
class Animal {
public:
    virtual void eat() const = 0;
};

class Feeder {
public:
    void feed(const vector<Animal*>& animals) {
        for(Animal* animal: animals) {
            animal->eat();
        }
    }
};

class Lion: public Animal {
public:
    string name = "Lion";
    void eat() const override {
        cout << this->name << " eat food." << endl;
    }
};

class Cat: public Animal {
public:
    string name = "Cat";
    void eat() const override {
        cout << this->name << " eat food." << endl;
    }
};


int main() {

    auto *feeder = new Feeder();
    vector<Animal*> animals = {new Lion(), new Cat()};
    feeder->feed(animals);
    return 0;
}