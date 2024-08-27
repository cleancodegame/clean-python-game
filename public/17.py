## Task 17
## task17.py
class Animal:
    def speak(self):
        pass
## replace
class Dog:
    def speak(self):
        return "Woof!"
## with
class Dog(Animal):
    def speak(self):
        return "Woof!"
## end
## replace
class Cat:
    def speak(self):
        return "Meow!"
## with
class Cat(Animal):
    def speak(self):
        return "Meow!"
## end

dog = Dog()
cat = Cat()

print(dog.speak())
print(cat.speak())
