# A4-MiniSmartHome

Mini Smart Home project built in C# demonstrating core object-oriented programming concepts, specifically **inheritance**, **composition**, **encapsulation**, and **polymorphism**.

This project was completed for Assignment 4 and follows all rubric requirements, including validation and exception handling.

---

## Project Structure

- **MiniSmartHomeLib**  
  Class Library containing the smart home domain logic.
  - `PowerModule` (composition / HAS-A)
  - `SmartDevice` (abstract base class)
  - `SmartLight` (derived class)
  - `DeviceGroup` (polymorphic controller)

- **MiniSmartHomeConsole**  
  Console application demonstrating usage of the library.

---

## Key Concepts Demonstrated

- **Inheritance (IS-A)**  
  `SmartLight` inherits from `SmartDevice`

- **Composition (HAS-A)**  
  `SmartDevice` owns a `PowerModule` to manage online and power state

- **Encapsulation**
  - No public fields
  - Private/internal state
  - Controlled access through methods

- **Validation & Exceptions**
  - `ArgumentException` for invalid input (blank names, invalid ranges, nulls)
  - `InvalidOperationException` for invalid actions (turning on while offline, setting brightness while powered off)

- **Polymorphism**
  - `DeviceGroup` operates on `SmartDevice` base types

---

## How to Run

From the repository root:

```bash
dotnet build
dotnet run --project MiniSmartHomeConsole
