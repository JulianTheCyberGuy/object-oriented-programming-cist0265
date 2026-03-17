# A10 Data Structures + OOP Project

## Thesis
Countries with higher internet access tend to have higher GDP per capita in the most recent shared reporting year.

## Data Source
World Bank Indicators API

Internet users:
https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=400

GDP per capita:
https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=400

## Project Structure
- `src/domain` for core objects
- `src/persistence` for API access and storage
- `src/services` for cleaning and analysis
- `src/ui` for CLI output
- `src/main.js` as the application entry point

## How to Run
```bash
npm start