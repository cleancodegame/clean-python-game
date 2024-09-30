## Task 17
## task17.py
class Animal:
    def speak(self):
        pass
class Dog:
    def speak(self):
        return "Woof!"
## replace Dog Dog
## with Dog(Animal)
## end
class Cat:
    def speak(self):
        return "Meow!"
## replace Cat Cat
## with Cat(Animal)
## end

dog = Dog()
cat = Cat()

print(dog.speak())
print(cat.speak())
