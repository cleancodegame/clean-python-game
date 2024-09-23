## Task 8
## task8.py
# Simplify nested conditionals.
def determine_discount(customer_type, purchase_amount): 
    if customer_type == "premium":
    ## replace PREMIUM
        if purchase_amount > 1000:
            return 20
        else:
            return 10
    ## with
        return 20 if purchase_amount > 1000 else 10
    ## end

    elif customer_type == "regular":
    ## replace REGULAR
        if purchase_amount > 1000:
            return 10
        else:
            return 5
    else:
        return 0
    ## with
        return 10 if purchase_amount > 1000 else 5
    ## end
    

discount = determine_discount("premium", 1200)
print(f"Discount: {discount}%")
