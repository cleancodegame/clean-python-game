## Task 19
## task19.py
#Medium

def fibonacci(n):
## replace
    if n == 1 or n == 2:
        return 1
## with
    if n <= 2:
        return 1
## end 
    else:
        return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(5))
