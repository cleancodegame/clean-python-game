## Meaningful
## cells.py
# Nice work! After your fixes code becomes much more readable. 
# And this piece of code is realy short and simple.
# Not sure if it needs any changes.

def get(lst):
    lst1 = []
    for c in lst:
        if c.IsEmpty: 
            lst1.Add(c.position)
    return lst1

lst = readfile("data.txt")
print(get(lst))

## replace-inline $get get
## with get_empty_positions
## replace-inline $lst lst
## with cells
## replace-inline $lst1 lst1
## with empty_positions
## replace-inline $c c
## with cell
