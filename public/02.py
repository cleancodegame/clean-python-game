## Task 2
## task2.py

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

## explain uppercase_click Prefer not to use boolean arguments — they make the code harder to read. Instead, create separate methods for each case.

print("Hello")
another_bad_name = "Pavel"
print(another_bad_name)

## replace-on uppercase_click
print(transform(another_bad_name, True))
## with
print(uppercase(another_bad_name))
## end

print("123123")
## replace-inline another_bad_name another_bad_name
## with name