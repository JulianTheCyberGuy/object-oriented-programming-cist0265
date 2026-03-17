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

  const excludeOutliers = process.argv.includes("--no-outliers") ? false : true;

  const apiClient = new ApiClient();
  const repository = new Repository();
  const cleaner = new Cleaner();
  const analyzer = new Analyzer();

  console.log("Fetching internet usage data...");
  const internetRows = await apiClient.fetchInternetData();

  console.log("Fetching GDP per capita data...");
  const gdpRows = await apiClient.fetchGdpData();

  console.log("Merging and cleaning records...");
  const mergedRecords = cleaner.mergeDatasets(internetRows, gdpRows);

  repository.saveRecords(mergedRecords);

  const result = analyzer.analyze({
    thesis,
    records: repository.getAllRecords(),
    datasetName: "World Bank Indicators API",
    datasetEndpoint:
      "IT.NET.USER.ZS and NY.GDP.PCAP.CD via World Bank v2 indicator endpoints",
    excludeOutliers
  });

  printResult(result);
}

main().catch((error) => {
  console.error("Application error:", error.message);
});