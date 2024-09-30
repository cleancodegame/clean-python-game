## Task 27
## task27.py
#Medium

def get_final_price(base_price, tax_rate, discount):
    ## replace complexFunction
    taxed_price = base_price * (1 + tax_rate)
    discounted_price = taxed_price * (1 - discount)
    return discounted_price
    ## with
    return base_price * (1 + tax_rate) * (1 - discount)
    ## end
