# A2-InteractingClasses

C# console mini-project demonstrating **three interacting classes**, **constructors**, and **inheritance** as required for Assignment 2.

The project focuses on core object-oriented programming concepts using a simple academic-style domain model.

---

## Project Structure

- **Person**  
  Base class representing a generic person. Demonstrates shared properties and behavior.

- **Student : Person**  
  Derived class demonstrating **inheritance** and extending base class behavior.

- **Course**  
  Interacting class that works with `Student` objects to demonstrate interaction between classes.

- **Program.cs**  
  Console demo that creates objects, shows inheritance, demonstrates class interaction, and includes basic error handling.

---

## Key Concepts Demonstrated

- **Inheritance**
  - `Student` inherits from `Person`
  - Shared behavior defined in a base class
  - Derived class extends and overrides behavior

- **Constructors**
  - All classes use constructors to initialize required state
  - Constructors are explicitly exercised in the demo

- **Interacting Classes**
  - `Course` interacts with `Student` objects
  - Objects are passed between classes and used together

- **Encapsulation**
  - No public fields
  - Controlled access through properties and methods

- **Exception Handling**
  - Invalid input handled with exceptions
  - Intentional error demonstrated and caught in the console output

---

## How to Run

From the repository root:

```bash
dotnet build
dotnet run --project InteractingClassesConsole
