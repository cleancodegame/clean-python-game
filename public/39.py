##Task 39
##task39.py
import threading

counter = 0

##add
counter_lock = threading.Lock()
##end

##replace
def increment_counter():
    global counter
    for _ in range(1000):
        counter += 1
##with
def increment_counter():
    global counter
    for _ in range(1000):
        with counter_lock:
            counter += 1

thread1 = threading.Thread(target=increment_counter)
thread2 = threading.Thread(target=increment_counter)

thread1.start()
thread2.start()

thread1.join()
thread2.join()

print(counter)
