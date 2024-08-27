## Task 20
## task20.py
#Hard

def is_prime(n):
    if n <= 1:
        return False
## replace
    for i in range(2, n):
        if n % i == 0:
            return False
## with
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
## end

print(is_prime(11))
