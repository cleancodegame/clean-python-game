#Task 36
#task36.py
def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read()
    ##replace exception
    except Exception as e:
        return None
    ##with
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        return None
    except IOError:
        print(f"Error: Cannot read the file {file_path}.")
        return None
    ##end
