## Task 31
## task31.py

#VH


def apply_discount(cart, discount):
    total_discount = 0
    for item in cart:
        ## replace
        item['price'] *= (1 - discount)
        total_discount += item['price'] * discount
        ## with
        discounted_price = item['price'] * (1 - discount)
        total_discount += item['price'] - discounted_price
        ## end
    return total_discount
