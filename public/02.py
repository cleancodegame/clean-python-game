## Task 3
## task3.py
## replace uppercase_click uppercase
def transform(s, uppercase):
    bad_variable_name = "..."
    if uppercase:
        return s.upper()
    else:
        return s.lower()
## with
def uppercase(s):
    return s.upper()

def lowercase(s):
    return s.lower()
## end


print("Hello")
another_bad_name = "Pavel"
print(another_bad_name)
## replace-on uppercase_click
print(transform(another_bad_name, True))
## with
print(uppercase(another_bad_name))
## end
print("123123")
## mistake another_bad_name
## correct name