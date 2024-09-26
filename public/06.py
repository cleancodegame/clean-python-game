## Task 5
## task5.py
import random
## add-on magic_click
secondsperday = 24*60*60
## end
def get_delay():
    return random.randint(0, 86400)
## replace-inline magic_click 86400
## with secondsperday
## replace-inline _ secondsperday
## with seconds_per_day