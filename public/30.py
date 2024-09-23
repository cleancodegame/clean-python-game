## Task 30
## task30.py
#VH
def find_discounted_price(prices, discount_threshold):
    ## remove final_price
    final_price = None
    ## end
    for price in prices:
        if price < discount_threshold:
            final_price = price
    ## replace final_price
    return final_price
    ## with
    return None

