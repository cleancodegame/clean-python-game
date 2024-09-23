##Task 35
##task35.py
##replace save_user_to_db
def save_user_to_db(user, save_as_admin=False):
    if save_as_admin:
        # Save with admin rights
        print(f"Saving {user} as admin")
    else:
        # Save as regular user
        print(f"Saving {user} as regular user")
##with
def save_user(user):
    print(f"Saving {user} as regular user")

def save_admin(admin):
    print(f"Saving {admin} as admin")
##end
