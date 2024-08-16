## Task 10
## task10.py
#replace
def process_transaction(transaction_data):
    if transaction_data["type"] == "withdrawal":
        if transaction_data["amount"] > 0:
            if transaction_data["account_balance"] >= transaction_data["amount"]:
                if not transaction_data["account_locked"]:
                    if transaction_data["currency"] == "USD":
                        fee = 5  # Fixed fee for withdrawals in USD
                    else:
                        fee = 10  # Fixed fee for withdrawals in other currencies
                    transaction_data["account_balance"] -= transaction_data["amount"] + fee
                    print(f"Withdrawal successful. New balance: {transaction_data['account_balance']}")
                else:
                    print("Error: Account is locked")
            else:
                print("Error: Insufficient funds")
        else:
            print("Error: Invalid amount")
    elif transaction_data["type"] == "deposit":
        if transaction_data["amount"] > 0:
            if not transaction_data["account_locked"]:
                transaction_data["account_balance"] += transaction_data["amount"]
                print(f"Deposit successful. New balance: {transaction_data['account_balance']}")
            else:
                print("Error: Account is locked")
        else:
            print("Error: Invalid amount")
    else:
        print("Error: Unknown transaction type")
#with
class TransactionProcessor:
    FEES = {
        "USD": 5,
        "OTHER": 10
    }

    def __init__(self, transaction_data):
        self.transaction_data = transaction_data

    def is_valid_amount(self):
        return self.transaction_data["amount"] > 0

    def has_sufficient_funds(self):
        return self.transaction_data["account_balance"] >= self.transaction_data["amount"]

    def is_account_locked(self):
        return self.transaction_data["account_locked"]

    def apply_fee(self):
        currency = self.transaction_data.get("currency", "OTHER")
        fee = self.FEES.get(currency, self.FEES["OTHER"])
        self.transaction_data["account_balance"] -= fee

    def process_withdrawal(self):
        if self.is_valid_amount() and self.has_sufficient_funds() and not self.is_account_locked():
            self.apply_fee()
            self.transaction_data["account_balance"] -= self.transaction_data["amount"]
            self.print_success("Withdrawal")
        else:
            self.print_error()

    def process_deposit(self):
        if self.is_valid_amount() and not self.is_account_locked():
            self.transaction_data["account_balance"] += self.transaction_data["amount"]
            self.print_success("Deposit")
        else:
            self.print_error()

    def process(self):
        transaction_type = self.transaction_data.get("type")
        if transaction_type == "withdrawal":
            self.process_withdrawal()
        elif transaction_type == "deposit":
            self.process_deposit()
        else:
            self.print_error("Unknown transaction type")

    def print_success(self, transaction_type):
        print(f"{transaction_type} successful. New balance: {self.transaction_data['account_balance']}")

    def print_error(self, message="Transaction failed"):
        print(f"Error: {message}")

#end
