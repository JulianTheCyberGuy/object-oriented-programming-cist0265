import Thesis from "./domain/Thesis.js";
import ApiClient from "./persistence/ApiClient.js";
import Repository from "./persistence/Repository.js";
import Cleaner from "./services/Cleaner.js";
import Analyzer from "./services/Analyzer.js";
import { printResult } from "./ui/cli.js";

async function main() {
  const thesis = new Thesis({
    statement:
      "Countries with higher internet access tend to have higher GDP per capita in the most recent shared reporting year.",
    independentVariable: "Internet access percentage",
    dependentVariable: "GDP per capita (current US$)",
    scope: "Countries with valid values in the same reporting year",
    filters: {
      excludeNulls: true
    }
  });

  const apiClient = new ApiClient();
  const repository = new Repository();
  const cleaner = new Cleaner();
  const analyzer = new Analyzer();

  const internetRows = await apiClient.fetchInternetData();
  const gdpRows = await apiClient.fetchGdpData();

  const mergedRecords = cleaner.mergeDatasets(internetRows, gdpRows);
  repository.saveRecords(mergedRecords);

  const result = analyzer.analyze({
    thesis,
    records: repository.getAllRecords(),
    datasetName: "World Bank Indicators API",
    datasetEndpoint:
      "https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=400 | https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=400"
  });

  printResult(result);
}

main().catch((error) => {
  console.error("Application error:", error.message);
});