from dataclasses import dataclass
from math import pi
from math import sqrt

class Shape:
    @property
    def name(self) -> str:
        return self.__class__.__name__

    def area(self) -> float:
        raise NotImplementedError("Subclasses must implement area()")


@dataclass(frozen=True)
class Circle(Shape):
    radius: float

    def __post_init__(self):
        if self.radius <= 0:
            raise ValueError("radius must be greater than 0")

    def area(self) -> float:
        return pi * self.radius * self.radius


@dataclass(frozen=True)
class Rectangle(Shape):
    width: float
    height: float

    def __post_init__(self):
        if self.width <= 0 or self.height <= 0:
            raise ValueError("width and height must be greater than 0")

    def area(self) -> float:
        return self.width * self.height


@dataclass(frozen=True)
class Triangle(Shape):
    base: float
    height: float

    def __post_init__(self):
        if self.base <= 0 or self.height <= 0:
            raise ValueError("base and height must be greater than 0")

    def area(self) -> float:
        return 0.5 * self.base * self.height

@dataclass(frozen=True)
class Hexagon(Shape):
    side: float

    def __post_init__(self):
        if self.side <= 0:
            raise ValueError("side must be greater than 0")

    def area(self) -> float:
        return (3 * sqrt(3) / 2) * self.side * self.side
