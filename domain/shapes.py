from dataclasses import dataclass
from math import pi


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
