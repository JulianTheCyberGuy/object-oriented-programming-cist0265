using System;

namespace Assignment2_InteractingClasses
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Assignment 2 Demo: Interacting Classes ===");

            // Create a Course (constructor demo)
            var course = new Course("CIST-201", "Object Oriented Programming");

            // Create Students (inheritance: Student : Person)
            var s1 = new Student("S1001", "Julian Florez", "CIST");
            var s2 = new Student("S1002", "Alex Rivera", "Cybersecurity");

            // Interactions: course enrolls students
            course.Enroll(s1);
            course.Enroll(s2);

            // Show inherited behavior + overriding
            Console.WriteLine(s1.GetSummary());
            Console.WriteLine(s2.GetSummary());

            // Print course roster (interaction between Course and Student)
            course.PrintRoster();

            // Intentional error: duplicate enrollment
            try
            {
                Console.WriteLine("Trying to enroll the same student again (intentional error)...");
                course.Enroll(s1);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Caught error: {ex.Message}");
            }

            Console.WriteLine("=== End Demo ===");
        }
    }
}
