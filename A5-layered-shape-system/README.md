<h1>A5 Layered Shape System</h1>

<h2>Overview</h2>
<p>
This project refactors a poorly designed “everything-at-once” shape system into a clean,
scalable layered architecture. The goal was to eliminate low cohesion, tight coupling,
and fragile type-switch chains by applying object-oriented design principles.
</p>

<hr>

<h2>Project Structure</h2>

<pre>
A5-layered-shape-system/
├── domain/
│   └── shapes.py
├── application/
│   └── shape_service.py
├── infrastructure/
│   └── loggers.py
└── main.py
</pre>

<hr>

<h2>Architecture</h2>

<h3>Domain Layer (Business Logic)</h3>
<p><strong>Location:</strong> domain/shapes.py</p>
<ul>
  <li>Defines the base <code>Shape</code> class.</li>
  <li>Each shape (Circle, Rectangle, Triangle, Hexagon) is its own class.</li>
  <li>Each class implements its own <code>area()</code> method.</li>
  <li>Validates input to prevent invalid shapes (e.g., negative dimensions).</li>
  <li>Contains no logging, file writing, or UI code.</li>
</ul>

<h3>Application Layer (Service)</h3>
<p><strong>Location:</strong> application/shape_service.py</p>
<ul>
  <li>Coordinates processing of shapes.</li>
  <li>Calls the shape’s <code>area()</code> method.</li>
  <li>Builds a report string.</li>
  <li>Sends output to a logger.</li>
  <li>Maintains internal history.</li>
</ul>

<h3>Infrastructure Layer (Logging)</h3>
<p><strong>Location:</strong> infrastructure/loggers.py</p>
<ul>
  <li>Handles console and file output.</li>
  <li>Implements a logger abstraction.</li>
  <li>Separates side effects from business logic.</li>
</ul>

<hr>

<h2>OOP Principles Applied</h2>

<h3>Polymorphism</h3>
<ul>
  <li>The service processes shapes through the base <code>Shape</code> type.</li>
  <li>No switch statements or type strings are used.</li>
</ul>

<h3>Encapsulation</h3>
<ul>
  <li>Shapes validate dimensions in constructors.</li>
  <li>Invalid objects cannot be created.</li>
</ul>

<h3>Open/Closed Principle</h3>
<ul>
  <li>New shapes can be added by creating a new class.</li>
  <li>The service layer does not need to be modified.</li>
</ul>

<hr>

<h2>How to Run</h2>

<pre><code>git clone https://github.com/JulianTheCyberGuy/A5-layered-shape-system.git</code></pre>

<pre><code>cd A5-layered-shape-system</code></pre>

<pre><code>python main.py</code></pre>

<hr>

<h2>Why This Design Is Better</h2>

<table border="1" cellpadding="6" cellspacing="0">
  <tr>
    <th>Before</th>
    <th>After</th>
  </tr>
  <tr>
    <td>Switch/if chains for shape types</td>
    <td>Polymorphic design</td>
  </tr>
  <tr>
    <td>Logging mixed with math</td>
    <td>Layered separation of concerns</td>
  </tr>
  <tr>
    <td>Hardcoded file/UI dependencies</td>
    <td>Logger abstraction</td>
  </tr>
  <tr>
    <td>Fragile when adding shapes</td>
    <td>Open/Closed compliant</td>
  </tr>
</table>

<hr>

<p>
This project demonstrates how proper layering and object-oriented design
lead to maintainable and scalable systems.
</p>