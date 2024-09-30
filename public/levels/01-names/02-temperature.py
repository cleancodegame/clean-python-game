## Understandable
## fmt_temp.py
# Okay, you are ready to some real work.
# Check if this code is easy to understand.

def fmt_temp(idx, tt):
    dnms = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return "Temperature for " + dnms[idx] + " is " + tt + "̈° C"
## replace-inline $idx idx
## with day_of_week
## replace-inline $tt tt
## with temperature
## replace-inline $dnms dnms
## with day_names
## replace-inline $fmt_temp fmt_temp
## with format_temperature