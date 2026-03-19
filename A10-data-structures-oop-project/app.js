import Thesis from "./src/domain/Thesis.js";
import ApiClient from "./src/persistence/ApiClient.js";
import Repository from "./src/persistence/Repository.js";
import Cleaner from "./src/services/Cleaner.js";
import Analyzer from "./src/services/Analyzer.js";

function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function setStatus(message) {
  document.getElementById("status").textContent = message;
}

function renderResult(result) {
  document.getElementById("results").classList.remove("hidden");

  document.getElementById("thesisText").textContent = result.thesis;
  document.getElementById("datasetText").textContent = result.datasetName;
  document.getElementById("yearText").textContent = result.mostRecentYear;
  document.getElementById("methodsText").textContent = result.methods;
  document.getElementById("totalRecordsText").textContent = result.totalRecords;
  document.getElementById("correlationText").textContent = result.correlation.toFixed(3);

  document.getElementById("lowGroupText").textContent = formatCurrency(result.groupedResults.low);
  document.getElementById("mediumGroupText").textContent = formatCurrency(result.groupedResults.medium);
  document.getElementById("highGroupText").textContent = formatCurrency(result.groupedResults.high);

  document.getElementById("conclusionText").textContent = result.conclusion;

  const topCountriesList = document.getElementById("topCountriesList");
  topCountriesList.innerHTML = "";

  result.topCountries.forEach((country) => {
    const item = document.createElement("li");
    item.textContent = `${country.countryName} - ${formatCurrency(country.gdpPerCapita)}`;
    topCountriesList.appendChild(item);
  });
}

async function runAnalysis() {
  const button = document.getElementById("runAnalysisBtn");
  const excludeOutliers = document.getElementById("excludeOutliers").checked;

  button.disabled = true;

  try {
    setStatus("Fetching internet usage data...");

    const thesis = new Thesis({
      statement:
        "Countries with higher internet access tend to have higher GDP per capita in the most recent shared reporting year.",
      independentVariable: "Internet access percentage",
      dependentVariable: "GDP per capita (current US$)",
      scope: "Countries with valid values in the same reporting year",
      filters: {
        excludeNulls: true,
        excludeOutliers
      }
    });

    const apiClient = new ApiClient();
    const repository = new Repository();
    const cleaner = new Cleaner();
    const analyzer = new Analyzer();

    const internetRows = await apiClient.fetchInternetData();

    setStatus("Fetching GDP per capita data...");
    const gdpRows = await apiClient.fetchGdpData();

    setStatus("Merging and cleaning records...");
    const mergedRecords = cleaner.mergeDatasets(internetRows, gdpRows);
    repository.saveRecords(mergedRecords);

    setStatus("Running analysis...");
    const result = analyzer.analyze({
      thesis,
      records: repository.getAllRecords(),
      datasetName: "World Bank Indicators API",
      datasetEndpoint:
        "IT.NET.USER.ZS and NY.GDP.PCAP.CD via World Bank v2 indicator endpoints",
      excludeOutliers
    });

    renderResult(result);
    setStatus("Analysis complete.");
  } catch (error) {
    setStatus(`Application error: ${error.message}`);
  } finally {
    button.disabled = false;
  }
}

document.getElementById("runAnalysisBtn").addEventListener("click", runAnalysis);