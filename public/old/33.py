##Task 33
##task33.py
class Order:
    def __init__(self, order_id, products):
        self.order_id = order_id
        self.products = products

    def calculate_total(self):
        return sum(product['price'] for product in self.products)
##replace print_order
    def print_order(self):
        print(f"Order ID: {self.order_id}")
        for product in self.products:
            print(f"Product: {product['name']}, Price: {product['price']}")
##with
class OrderPrinter:
    @staticmethod
    def print_order(order):
        print(f"Order ID: {order.order_id}")
        for product in order.products:
            print(f"Product: {product['name']}, Price: {product['price']}")
##end