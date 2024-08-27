## Task 26
## task26.py
#Medium

def get_even_numbers(numbers):
    ## replace
    even_numbers = []
    for number in numbers:
        if number % 2 == 0:
            even_numbers.append(number)
    return even_numbers
    ## with
    return [number for number in numbers if number % 2 == 0]
    ## end
