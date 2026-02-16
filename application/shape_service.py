from datetime import datetime
from domain.shapes import Shape
from infrastructure.loggers import Logger


class ShapeService:
    def __init__(self, logger: Logger):
        self._logger = logger
        self._history = []

    @property
    def history(self):
        return list(self._history)

    def process(self, shape: Shape) -> float:
        result = shape.area()

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
        report = f"[{timestamp}] Shape={shape.name} Area={result:.4f}"

        self._logger.log(report)
        self._history.append(report)

        return result
