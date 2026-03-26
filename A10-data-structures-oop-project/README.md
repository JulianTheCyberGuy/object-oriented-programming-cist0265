# Data Structures OOP Project

## Overview

This project is a data-driven application built using Object-Oriented Programming principles and core data structures. It analyzes structured data, processes it through multiple layers, and presents meaningful results to the user.

The system was originally designed as a CLI application and later adapted into a web-based interface for improved usability and visualization.

## Purpose

The goal of this project is to demonstrate:

* Strong understanding of OOP design
* Practical use of data structures
* Separation of concerns using layered architecture
* Data processing and analysis
* Transition from backend logic to a user interface

## Features

* Data ingestion from local cache or API
* Data cleaning and preprocessing
* Analysis engine for generating results
* Modular architecture with clear responsibilities
* CLI-based interaction (initial version)
* Web interface for displaying results

## Project Structure

src/
├── domain/         Core models (Thesis, Record, AnalysisResult)
├── services/       Business logic (Analyzer, Cleaner)
├── persistence/    Data access layer (Repository, ApiClient)
├── ui/             CLI interface
└── main.js         Entry point

data/
└── cache.json      Cached dataset

index.html           Web UI
styles.css           Frontend styling
app.js               Frontend logic

## Architecture

This project follows a layered architecture:

Domain Layer
Defines the core objects such as Thesis, Record, and AnalysisResult.

Service Layer
Handles logic like cleaning data and analyzing results.

Persistence Layer
Responsible for retrieving and storing data using APIs or local cache.

UI Layer
Provides interaction through CLI or browser-based interface.

## Technologies Used

* JavaScript (ES6+)
* HTML/CSS
* Node.js
* JSON

## How to Run

Web Interface
Open index.html in your browser and interact with the UI.

Node CLI
Run the following commands:

npm install
node src/main.js

## Key Concepts Demonstrated

* Object-Oriented Programming
* Encapsulation and modular design
* Data structures for organizing and processing data
* Separation of concerns
* Transition from CLI to web UI

## Future Improvements

* Full API integration instead of local cache
* Improved UI/UX design
* Authentication and user-specific data
* Performance optimization

## Author

Julian Florez
University of Pittsburgh at Bradford
Computer Information Systems and Technologies
