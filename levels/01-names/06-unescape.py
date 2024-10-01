## Flag
## unescape.py
# If a variable stores string, it is 's'. 
# If it stores a boolean, it is 'flag'.
# However, sometimes one also need 's1', 's2', etc. 
# But I personally prefer 'ss', 'sss', etc.
# Briliant, isn't it?

def unescape(s):
    ss = ""
    flag = False
    for c in s:
        if flag and c == 'n':
            ss += '\n'
        elif flag and c == 't':
            ss += '\t'
        elif flag and c == '\\':
            ss += '\\'
        elif c == '\\':
            flag = True
        else:
            ss += c
    return ss
## add-on $flag

# Hint for the future: do not use 'flag' as a variable name! 
# (unless it denoted real flags i.e. symbol of the country)
## end
## replace-inline $flag flag
## with after_slash
## replace-inline $ss ss
## with unescaped
## replace-inline $s s
## with escaped
