## Task 16
## task16.py
class Rectangle:
    def set_dimensions(self, length, width):
    ## replace set_dimensions set_dimensions
    ## with __init__
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
