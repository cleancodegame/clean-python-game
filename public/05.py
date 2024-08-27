## Task 5
## task5.py
## remove argsClick host, port, use_https, timeout, retries, logging_enabled
def configure_server(host, port, use_https, timeout, retries, logging_enabled):
    protocol = "https" if use_https else "http"
    print(f"Starting server at {protocol}://{host}:{port}")
    print(f"Retries: {retries}")
    if logging_enabled:
        print("Logging is enabled")
    else:
        print("Logging is disabled")
## end
## add-on argsClick
def configure_server(options):
    protocol = "https" if options['use_https'] else "http"
    print(f"Starting server at {protocol}://{options['host']}:{options['port']}")
    print(f"Retries: {options['retries']}")
    if options['logging_enabled']:
        print("Logging is enabled")
    else:
        print("Logging is disabled")
## end

## remove-on argsClick
configure_server("localhost", 8080, True, 30, 5, True)
##end

## add-on argsClick
serverUsedoption = {
    "host": "localhost",
    "port": 8080,
    "use_https": True,
    "timeout": 30,
    "retries": 5,
    "logging_enabled": True
}

configure_server(serverUsedoption)
## end

## replace-inline _ serverUsedoption
## with server_options
