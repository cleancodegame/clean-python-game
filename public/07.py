## Task 7
## task7.py
def process_data(data, operation):
    if operation == "sum":
        ## remove return data[0] + data[1] + data[2] + data[3] + data[4]
        return data[0] + data[1] + data[2] + data[3] + data[4]
        ## end
        ## add sum(data)
        return sum(data)
        ## end
    elif operation == "avg":
        ## remove return (data[0] + data[1] + data[2] + data[3] + data[4]) / 5
        return (data[0] + data[1] + data[2] + data[3] + data[4]) / 5
        ## end
        ## add sum(data) / len(data)
        return sum(data) / len(data)
        ## end
    elif operation == "max":
        ## remove
        if data[1] > max_val:
            max_val = data[1]
        if data[2] > max_val:
            max_val = data[2]
        if data[3] > max_val:
            max_val = data[3]
        if data[4] > max_val:
            max_val = data[4]
        return max_val
        ## end
        ## add
        return max(data)
        ## end

result_sum = process_data([10, 20, 30, 40, 50], "sum")
result_avg = process_data([10, 20, 30, 40, 50], "avg")
result_max = process_data([10, 20, 30, 40, 50], "max")

print(result_sum, result_avg, result_max)
