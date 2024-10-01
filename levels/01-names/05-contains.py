## Confusing
## search.py
# Uhh.. Can't find a bug here... Can you help me a little?

def contains(text, pattern):
    l = len(pattern)
    for i in range(len(text)):
        if text[i:i+1] == pattern:
            return True
    return False
## add-on $1

# Hint for the future: never use lowercase 'l' as a variable name!
## end
## replace-inline $l l
## with pattern_len
## replace-inline $1 i+1
## with i+l
