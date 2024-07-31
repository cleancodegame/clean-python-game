## Task 2
## task2.py
## error uppercase
def transform(s, uppercase):
    bad_variable_name = "..."
    if uppercase:
        return s.upper()
    else:
        return s.lower()
## fix
def uppercase(s):
    return s.upper()

def lowercase(s):
    return s.lower()
## end


print("Hello")
another_bad_name = "Pavel"
print(another_bad_name)
## error uppercase
print(transform(another_bad_name, True))
## fix
print(uppercase(another_bad_name))
## end
print("123123")
## mistake another_bad_name
## correct name