## Naming styles
## bigrams.py
# Anders and Nicolaus wrote this code. 
# Their naming style is a little bit non typical for python...

def GetBigramsFrequency(ws):
    bigramsCount = len(ws) - 1
    bigramsfrequency = {}
    for I in range(bigramsCount):
        bg = ws[I] + ' ' + ws[I + 1]
        if bg in bigramsfrequency:
            bigramsfrequency[bg] += 1
        else:
            bigramsfrequency[bg] = 1
    return bigramsfrequency
## replace-inline $GetBigramsFrequency GetBigramsFrequency
## with get_bigrams_frequency
## replace-inline $bigramsCount bigramsCount
## with bigrams_count
## replace-inline $I I
## with i
## replace-inline $ws ws
## with words
## replace-inline $bg bg
## with bigram
## replace-inline $bigramsfrequency bigramsfrequency
## with bigrams_frequency