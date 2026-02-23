using System;

namespace Assignment2_InteractingClasses
{
    // Base class to demonstrate inheritance.
    public class Person
    {
        public string Id { get; }
        public string Name { get; private set; }

        public Person(string id, string name)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Id cannot be blank.", nameof(id));

            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name cannot be blank.", nameof(name));

            Id = id;
            Name = name;
        }

        public void Rename(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
                throw new ArgumentException("New name cannot be blank.", nameof(newName));

            Name = newName;
        }

        public virtual string GetSummary()
        {
            return $"Person: {Name} (Id={Id})";
        }
    }
}
