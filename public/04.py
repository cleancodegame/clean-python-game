## Task 4
## task4.py
def process_data(data):
## replace@clean
    # Cleaning data
    cleaned_data = []
    for item in data:
        cleaned_item = item.strip().lower().replace(",", "")
        cleaned_data.append(cleaned_item)
## with
    cleaned_data = clean_data(data)
## end

## replace # Filtering data
    # Filtering data
    filtered_data = []
    for item in cleaned_data:
        if len(item) > 3:
            filtered_data.append(item)
## with
    filtered_data = filter_data(cleaned_data)
## end

## replace # Formatting data
    # Formatting data
    final_data = []
    for item in filtered_data:
        final_data.append(f"Processed: {item}")
## with
    final_data = format_data(filtered_data)
## end
    
    return final_data

## add@clean
def clean_data(data):
    cleaned_data = []
    for item in data:
        cleaned_item = item.strip().lower().replace(",", "")
        cleaned_data.append(cleaned_item)
    return cleaned_data
## end

## add # Filtering data
def filter_data(cleaned_data):
    filtered_data = []
    for item in cleaned_data:
        if len(item) > 3:
            filtered_data.append(item)
    return filtered_data
## end
## add # Formatting data
def format_data(filtered_data):
    final_data = []
    for item in filtered_data:
        final_data.append(f"Processed: {item}")
    return final_data
# end

data = ["  Data1,", "Data2,", "Da", "Information,", "Info"]
print(process_data(data))
