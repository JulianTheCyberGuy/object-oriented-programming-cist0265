<div align="center">

# Data-Driven OOP + Data Structures Mini-Project

<p>
  A layered JavaScript project that uses live World Bank data to analyze the relationship between internet access and GDP per capita.
</p>

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black">
  <img alt="Node.js" src="https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white">
  <img alt="Architecture" src="https://img.shields.io/badge/Architecture-Layered-blue">
  <img alt="Interface" src="https://img.shields.io/badge/UI-CLI%20%2B%20Web-8A2BE2">
</p>

</div>

---

## Overview

This project is a data-driven application built with object-oriented programming and layered design principles. It pulls live data from the World Bank Indicators API, merges two datasets, cleans and filters the results, and analyzes whether countries with higher internet access tend to have higher GDP per capita in the most recent shared reporting year.

The project supports both a command-line interface and a browser-based interface, which makes it easy to demonstrate both the backend logic and the user-facing presentation of the analysis.

---

## Thesis

**Countries with higher internet access tend to have higher GDP per capita in the most recent shared reporting year.**

---

## Features

* Fetches live data from the World Bank Indicators API
* Collects:

  * Internet users as a percentage of population
  * GDP per capita in current US dollars
* Merges datasets by country code and year
* Cleans invalid and incomplete records
* Filters analysis to the most recent shared reporting year
* Optionally removes outliers
* Groups countries by internet access level:

  * Low: under 50%
  * Medium: 50% to 80%
  * High: above 80%
* Calculates average GDP per capita for each group
* Calculates correlation between internet access and GDP per capita
* Displays the top 10 countries by GDP per capita
* Provides both CLI and web output

---

## Technologies Used

* **JavaScript (ES Modules)**
* **Node.js**
* **HTML**
* **CSS**
* **World Bank Indicators API**

---

## Project Structure

```text
A10-data-structures-oop-project/
├── app.js
├── index.html
├── styles.css
├── package.json
├── thesis_concept.txt
├── data/
│   └── cache.json
└── src/
    ├── main.js
    ├── domain/
    │   ├── AnalysisResult.js
    │   ├── Record.js
    │   └── Thesis.js
    ├── persistence/
    │   ├── ApiClient.js
    │   └── Repository.js
    ├── services/
    │   ├── Analyzer.js
    │   └── Cleaner.js
    └── ui/
        └── cli.js
```

---

## Architecture

This project follows a layered architecture to keep responsibilities separate and make the code easier to maintain.

### Domain Layer

Defines the core objects used throughout the program:

* `Thesis`
* `Record`
* `AnalysisResult`

### Persistence Layer

Handles data retrieval and storage:

* `ApiClient` fetches live data from the World Bank API
* `Repository` stores the cleaned records in memory

### Service Layer

Processes and analyzes the data:

* `Cleaner` validates, converts, and merges the datasets
* `Analyzer` filters records, removes outliers, groups countries, computes averages, and calculates correlation

### UI Layer

Displays the results:

* `cli.js` formats analysis output in the terminal
* `index.html`, `styles.css`, and `app.js` provide a web-based interface

---

## Data Source

This project uses the **World Bank Indicators API**.

### Indicators Used

* **Internet access:** `IT.NET.USER.ZS`
* **GDP per capita:** `NY.GDP.PCAP.CD`

### Example Endpoints

* Internet access data
  `https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=400`

* GDP per capita data
  `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=400`

* API documentation
  `https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation`

---

## How It Works

1. The app fetches internet access data from the World Bank API.
2. It fetches GDP per capita data from the World Bank API.
3. The datasets are merged using country code and year.
4. Invalid or incomplete records are removed.
5. The records are filtered to the most recent shared reporting year.
6. Outliers can be removed from the analysis.
7. Countries are grouped by internet access level.
8. The app calculates:

   * Total valid records
   * Correlation between internet access and GDP per capita
   * Average GDP per capita for each access group
   * Top 10 countries by GDP per capita
9. The final result is displayed in either the CLI or the browser.

---

## Running the Project

### Option 1: Run in the Terminal

Install dependencies:

```bash
npm install
```

Start the CLI version:

```bash
npm start
```

Or run directly:

```bash
node src/main.js
```

### CLI Option: Keep Outliers

By default, the CLI excludes outliers. To include them, run:

```bash
node src/main.js --no-outliers
```

---

### Option 2: Run in the Browser

Open `index.html` in your browser.

Then:

1. Click **Run Analysis**
2. Choose whether to keep **Exclude outliers** checked
3. Review the generated results on the page

---

## Example Output

The project reports:

* Thesis statement
* Dataset used
* Most recent year analyzed
* Methods used
* Total valid records
* Correlation value
* Average GDP per capita by internet access group
* Top 10 countries by GDP per capita
* Final conclusion:

  * `Supported`
  * `Not Supported`
  * `Inconclusive`

---

## OOP and Data Structures Concepts Demonstrated

### Object-Oriented Programming

* Encapsulation through classes
* Clear modeling of data using domain objects
* Separation of responsibilities across layers

### Data Structures

* Arrays for record collections and analysis workflows
* `Map` for efficient merging of datasets by key
* `Set` for finding the most recent shared year

### Software Design

* Layered architecture
* Modular organization
* Reusable services
* Clear data flow from retrieval to presentation

---

## Why This Project Matters

This project shows how programming concepts can be applied to a real dataset instead of a small hard-coded example. It demonstrates how object-oriented design and data structures can be used together to solve a practical problem, organize code cleanly, and produce meaningful analysis from live data.

It also shows growth beyond a simple terminal program by extending the same backend logic into a web interface.

---

## Possible Future Improvements

* Add charts and visualizations for the analysis
* Cache API responses locally for faster repeat runs
* Let users choose different World Bank indicators
* Add country filters by region or income group
* Export results to JSON or CSV
* Add unit tests for cleaner and analyzer logic

---

## Author

**Julian Florez**
University of Pittsburgh at Bradford
Computer Information Systems and Technologies

---

## License

This project is for educational use.
