## Task 21
## task21.py
#Hard

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
## replace
    return left + middle + right
## with
    return quicksort(left) + middle + quicksort(right)
## end

print(quicksort([3,6,8,10,1,2,1]))
