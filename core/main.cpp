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
        cout << this->name << "eat." << endl;
    }
};

int main() {

    Feeder *feeder = new Feeder();
    vector<Animal*> animals = {new Lion()};
    feeder->feed(animals);
    return 0;
}