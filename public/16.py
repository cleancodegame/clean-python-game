## Task 16
## task16.py
class Rectangle:
    ## replace set_dimensions
    def set_dimensions(self, length, width):
    ## with
    def __init__(self, length, width):
    ## end
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

rect = Rectangle()
## replace rect.set_dimensions(10, 5)
rect.set_dimensions(10, 5)
## with
rect = Rectangle(10, 5)
## end
rect_area = rect.area()
