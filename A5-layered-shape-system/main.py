from domain.shapes import Circle, Rectangle, Triangle
from infrastructure.loggers import ConsoleLogger
from application.shape_service import ShapeService


def main():
    logger = ConsoleLogger()
    service = ShapeService(logger)

    service.process(Circle(3))
    service.process(Rectangle(4, 5))
    service.process(Triangle(10, 2))


if __name__ == "__main__":
    main()
