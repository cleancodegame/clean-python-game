## Task 6
## task6.py
import random
## error 36
def roll():
    return random.randint(0, 36)
## fix
rouletteCount = 36
def roll():
    return random.randint(0, rouletteCount)
## end
print(roll())
## mistake rouletteCount
## correct ROULETTE_COUNT
