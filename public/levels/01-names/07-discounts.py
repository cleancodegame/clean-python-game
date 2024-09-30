## Flags
## discounts.py
# If we have already 'flag' and we need the second one, how should we name it?
# flag1 or flag2? What is your opinion?

def is_discount_hunter(customer):
    flag = True
    for order in customer.orders:
        flag2 = False
        for item in order.items:
            if item.product.discount > 0:
                flag2 = True
        flag = flag and flag2
    return flag

## replace-inline $flag flag
## with every_order_has_discounted_item
## replace-inline $flag2 flag2
## with has_discount

