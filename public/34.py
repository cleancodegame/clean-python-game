##Task 34
##task34.py
# Problematic code
class Database:
    def __init__(self, logger):
        self.logger = logger

    def query(self, sql):
        self.logger.log(f"Executing SQL: {sql}")
        return "Query Result"
#Circular Logger
##replace Logger
class Logger:
    def __init__(self, database):
        self.database = database

    def log(self, message):
        print(f"LOG: {message}")
        self.database.query("SELECT * FROM logs")  # Circular dependency!
##with
class Logger:
    def log(self, message):
        print(f"LOG: {message}")
logger = Logger()
database = Database(logger)
database.query("SELECT * FROM users")
##end