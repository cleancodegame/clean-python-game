## Task 7
## task7.py
def process_data(data, operation):
    if operation == "sum":
        ## replace
        s = 0
        for item in data:
            s += item
        return s
        ## with
        return sum(data)
        ## end
    elif operation == "avg":
        ## replace
        s = 0
        for item in data:
            s += item
        return s / len(data)
        ## with
        return sum(data) / len(data)
        ## end
    elif operation == "max":
        ## replace
        max_val = data[0]
        for item in data:
            if item > max_val:
                max_val = item
        return max_val
        ## with
        return max(data)
        ## end

result_sum = process_data([10, 20, 30, 40, 50], "sum")
result_avg = process_data([10, 20, 30, 40, 50], "avg")
result_max = process_data([10, 20, 30, 40, 50], "max")

print(result_sum, result_avg, result_max)
