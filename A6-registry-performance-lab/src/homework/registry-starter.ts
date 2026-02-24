import { performance } from 'node:perf_hooks';

/**
 * University of Pittsburgh Bradford - CIST 0265
 * Homework: Real-World Performance Analysis
 */

// TASK 1: Define Student interface
interface Student {
    id: number;
    name: string;
}

class StudentRegistry {

    // TASK 2: Private array of Students
    private students: Student[] = [];

    addStudent(s: Student): void {
        // TASK 3: Push student to array
        this.students.push(s);
    }

    /**
     * TASK 4: Linear Search O(n)
     * Single loop
     */
    findStudentLinear(id: number): Student | undefined {
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].id === id) {
                return this.students[i];
            }
        }
        return undefined;
    }

    /**
     * TASK 5: Quadratic Duplicate Check O(n^2)
     * Nested loops
     */
    hasDuplicateNames(): boolean {
        for (let i = 0; i < this.students.length; i++) {
            for (let j = i + 1; j < this.students.length; j++) {
                if (this.students[i].name === this.students[j].name) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * TASK 6: Performance Measurement
     */
    runPerformanceTest(): void {
        const testSizes = [10, 100, 1000, 5000];

        const results = testSizes.map(n => {
            this.students = [];

            for (let i = 0; i < n; i++) {
                this.addStudent({ id: i, name: `Student ${i}` });
            }

            // --- Linear O(n) ---
            const startLinear = performance.now();
            this.findStudentLinear(-1);
            const endLinear = performance.now();
            const linearTime = endLinear - startLinear;

            // --- Quadratic O(n^2) ---
            const startQuadratic = performance.now();
            this.hasDuplicateNames();
            const endQuadratic = performance.now();
            const quadraticTime = endQuadratic - startQuadratic;

            return {
                "Input Size (n)": n.toLocaleString(),
                "Linear (ms)": linearTime.toFixed(4),
                "Quadratic (ms)": quadraticTime.toFixed(4)
            };
        });

        console.log("\n--- Lab Results: Algorithmic Growth ---");
        console.table(results);
    }
}

const registry = new StudentRegistry();
registry.runPerformanceTest();