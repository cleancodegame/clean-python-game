##Task 32
##task32.py
##replace 
def add_user(name):
    user = {"name": name}
    users.append(user)
    return user
##with
def add_user(users_list, name):
    new_user = {"name": name}
    return users_list + [new_user]
##end
current_users = []
new_users = add_user(current_users, "Alice")