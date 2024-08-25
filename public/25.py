## Task 25
## task25.py
#Medium

def calculate_bonus(salary, performance):
    ## replace
    if performance == 'excellent':
        return salary * 0.2
    else:
        return salary * 0.1
    ## with
    if performance == 'excellent':
        return salary * 0.2
    return salary * 0.1
    ## end
