##Task 37
##task37.py
def fibonacci(n):
    ##replace fibonacci
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    else:
        cache[n] = fibonacci(n-1) + fibonacci(n-2)
        return cache[n]
    ##with
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
    ##end

