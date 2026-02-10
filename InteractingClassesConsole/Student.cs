using System;

namespace Assignment2_InteractingClasses
{
    // Derived class (IS-A Person).
    public class Student : Person
    {
        public string Major { get; private set; }

        public Student(string id, string name, string major) : base(id, name)
        {
            SetMajor(major);
        }

        public void SetMajor(string major)
        {
            if (string.IsNullOrWhiteSpace(major))
                throw new ArgumentException("Major cannot be blank.", nameof(major));

            Major = major;
        }

        public override string GetSummary()
        {
            return $"Student: {Name} (Id={Id}), Major={Major}";
        }
    }
}
