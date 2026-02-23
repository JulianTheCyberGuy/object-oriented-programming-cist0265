using System;
using System.Collections.Generic;

namespace Assignment2_InteractingClasses
{
    // Interacting class: a Course enrolls Students (works with the Student type).
    public class Course
    {
        private readonly List<Student> _students = new();

        public string CourseCode { get; }
        public string Title { get; private set; }

        public Course(string courseCode, string title)
        {
            if (string.IsNullOrWhiteSpace(courseCode))
                throw new ArgumentException("CourseCode cannot be blank.", nameof(courseCode));

            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be blank.", nameof(title));

            CourseCode = courseCode;
            Title = title;
        }

        public void RenameCourse(string newTitle)
        {
            if (string.IsNullOrWhiteSpace(newTitle))
                throw new ArgumentException("New course title cannot be blank.", nameof(newTitle));

            Title = newTitle;
        }

        public void Enroll(Student student)
        {
            if (student is null)
                throw new ArgumentException("Student cannot be null.", nameof(student));

            // Reject duplicates by student Id
            foreach (var s in _students)
            {
                if (s.Id == student.Id)
                    throw new InvalidOperationException($"Student with Id {student.Id} is already enrolled.");
            }

            _students.Add(student);
        }

        public void PrintRoster()
        {
            Console.WriteLine($"Course: {CourseCode} - {Title}");
            Console.WriteLine("Roster:");

            if (_students.Count == 0)
            {
                Console.WriteLine("  (no students enrolled)");
                return;
            }

            foreach (var s in _students)
            {
                Console.WriteLine($"  - {s.GetSummary()}");
            }
        }
    }
}
