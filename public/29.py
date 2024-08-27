## Task 29
## task29.py
#Medium

# The function is too complex. Refactor it to make it simpler.
## replace
def calculate_final_score(scores):
    return sum([score * 1.5 if score > 90 else score for score in scores]) / len(scores)
## with
def adjust_score(score):
    return score * 1.5 if score > 90 else score

def calculate_final_score(scores):
    adjusted_scores = [adjust_score(score) for score in scores]
    return sum(adjusted_scores) / len(scores)
## end