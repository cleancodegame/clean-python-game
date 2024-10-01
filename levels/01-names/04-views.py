## Magic numbers
## date.py
# Do not change any constants here! They are magically calculated.
# Nobody knows how, but everything works perfectly.

def get_views_per_second(views, date):
## add-on $magic1
    n = 24 * 60 * 60
## end
    daily_views = sum(1 for v in views if v.date == date)
    return daily_views / 86400

## replace-inline $magic 86400
## with 24*60*60
## replace-inline $magic1 24*60*60
## with n
## replace-inline $n n
## with seconds_in_24h
