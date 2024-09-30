## Docstring
## copy.py
# Huh, somebody wrote documentation for their code?! Weakling!
# Real coders don't read or write docs.
# They read and write CODE!

def copy(xs, ys, j, k, n):
## remove $doc
    """Copy elements from ys to xs

    Args:
        xs - destination
        ys - source
        j - start index in xs
        k - start index in ys
        n - number of elements to copy
    """
## end
    for i in range(n):
        xs[j+i] = ys[k+i]
## replace-inline $xs xs
## with destination
## replace-inline $ys ys
## with source
## replace-inline $j j
## with dest_start
## replace-inline $k k
## with src_start
## replace-inline $n n
## with count

