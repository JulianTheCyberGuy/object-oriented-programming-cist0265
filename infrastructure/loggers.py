class Logger:
    def log(self, message: str) -> None:
        raise NotImplementedError("Subclasses must implement log()")


class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(message)


class FileLogger(Logger):
    def __init__(self, path: str):
        if not path:
            raise ValueError("path is required")
        self.path = path

    def log(self, message: str) -> None:
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(message + "\n")
