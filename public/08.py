## Task 8
## task8.py
# Simplify nested conditionals.
def determine_discount(customer_type, purchase_amount): 
    if customer_type == "premium":
    ## remove
        if purchase_amount > 1000:
            return 20
        else:
            return 10
    ## end
    ## add
        discount = 20 if purchase_amount > 1000 else 10
    ## end
    elif customer_type == "regular":
    ## remove
        if purchase_amount > 1000:
            return 10
        else:
            return 5
    else:
        return 0
    ## end
    ## add
        discount = 10 if purchase_amount > 1000 else 5
    ## end
    return discount

discount = determine_discount("premium", 1200)
print(f"Discount: {discount}%")
