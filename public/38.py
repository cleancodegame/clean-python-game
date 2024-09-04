##Task 38
##task38.py
##replace
def append_to_list(value, my_list=[]):
    my_list.append(value)
    return my_list
##with
def append_to_list(value, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(value)
    return my_list
##end

result1 = append_to_list(1)
result2 = append_to_list(2)

print(result1)  # [1, 2]
print(result2)  # [1, 2]
