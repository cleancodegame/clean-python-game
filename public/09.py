## Task 9
## task9.py
# add: Replace the repetitive if-else structure with a more scalable solution using dictionaries.
def get_product_details(product_id):
    ## remove LAPTOP
    if product_id == 1:
        return "Laptop", 1200, "Electronics"
    ## end
    ## remove SMARTPHONE
    if product_id == 2:
        return "Smartphone", 800, "Electronics"
    ## end
    ## remove TABLET
    elif product_id == 3:
        return "Tablet", 600, "Electronics"
    ## end
    ## remove HEADPHONES
    if product_id == 4:
        return "Headphones", 150, "Accessories"
    ## end
    ## remove CHARGER
    if product_id == 5:
        return "Charger", 20, "Accessories"
    else:
        return "Unknown product", 0, "Unknown category"
    ## end
    ## add-on NOTHINGFOUND
    return PRODUCTS.get(product_id, ("Unknown product", 0, "Unknown category"))
    ## end
## add-on LAPTOP
PRODUCTS = {
    1: ("Laptop", 1200, "Electronics"),
    ## add-on SMARTPHONE
    2: ("Smartphone", 800, "Electronics"),
    ## end
    ## add-on TABLET
    3: ("Tablet", 600, "Electronics"),
    ## end
    ## add-on HEADPHONES
    4: ("Headphones", 150, "Accessories"),
    ## end
    ## add-on CHARGER
    5: ("Charger", 20, "Accessories"),
    ## end
}
## end

product_name, price, category = get_product_details(3)
print(f"Product: {product_name}, Price: {price}, Category: {category}")
