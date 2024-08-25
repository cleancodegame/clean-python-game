## Task 9
## task9.py
## add: Replace the repetitive if-else structure with a more scalable solution using dictionaries.
def get_product_details(product_id):
    ## remove
    if product_id == 1:
        return "Laptop", 1200, "Electronics"
    ## end
    ## remove
    if product_id == 2:
        return "Smartphone", 800, "Electronics"
    ## end
    ## remove
    elif product_id == 3:
        return "Tablet", 600, "Electronics"
    ## end
    if product_id == 4:
        return "Headphones", 150, "Accessories"
    ## end
    ## remove
    if product_id == 5:
        return "Charger", 20, "Accessories"
    else:
        return "Unknown product", 0, "Unknown category"
    ## end
    ## add
    return PRODUCTS.get(product_id, ("Unknown product", 0, "Unknown category"))
    ## end
## add
PRODUCTS = {
    1: ("Laptop", 1200, "Electronics"),
    ## add
    2: ("Smartphone", 800, "Electronics"),
    ## end
    ## add
    3: ("Tablet", 600, "Electronics"),
    ## end
    ## add
    4: ("Headphones", 150, "Accessories"),
    ## end
    ## add
    5: ("Charger", 20, "Accessories"),
    ## end
}
## end

product_name, price, category = get_product_details(3)
print(f"Product: {product_name}, Price: {price}, Category: {category}")
