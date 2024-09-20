## Task 24
## task24.py
#Hard

## replace calculate_salary
def calculate_salary(base_salary, bonus, tax_rate, health_insurance, retirement_savings):
    return base_salary + bonus - (base_salary * tax_rate) - health_insurance - retirement_savings
## with
class Employee:
    def __init__(self, name, base_salary, bonus, tax_rate, health_insurance, retirement_savings):
        ## add-on employee
        self.name = name
        ## end
        ## add-on calculate_salary
        self.base_salary = base_salary
        ## end
## end

## remove employee
employee = {
    'name': 'Alice',
    'base_salary': 50000,
    'bonus': 5000,
    'tax_rate': 0.2,
    'health_insurance': 2000,
    'retirement_savings': 3000
}
## end
## remove calculate_salary
print(calculate_salary(
    employee['base_salary'], 
    employee['bonus'], 
    employee['tax_rate'], 
    employee['health_insurance'], 
    employee['retirement_savings']
))
## end
