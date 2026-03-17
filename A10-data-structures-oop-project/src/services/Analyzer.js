import AnalysisResult from "../domain/AnalysisResult.js";

export default class Analyzer {
  groupByInternetAccess(records) {
    const groups = {
      low: [],
      medium: [],
      high: []
    };

    for (const record of records) {
      const value = record.internetUsersPercent;

      if (value === null || value === undefined) {
        continue;
      }

      if (value < 50) {
        groups.low.push(record);
      } else if (value <= 80) {
        groups.medium.push(record);
      } else {
        groups.high.push(record);
      }
    }

    return groups;
  }

  averageGdp(records) {
    if (records.length === 0) {
      return 0;
    }

    const valid = records.filter(
      (record) => typeof record.gdpPerCapita === "number"
    );

    if (valid.length === 0) {
      return 0;
    }

    const total = valid.reduce((sum, record) => sum + record.gdpPerCapita, 0);
    return total / valid.length;
  }

  analyze({ thesis, records, datasetName, datasetEndpoint }) {
    const groups = this.groupByInternetAccess(records);

    const groupedResults = {
      low: this.averageGdp(groups.low),
      medium: this.averageGdp(groups.medium),
      high: this.averageGdp(groups.high)
    };

    let conclusion = "Inconclusive";
    if (
      groupedResults.high >= groupedResults.medium &&
      groupedResults.medium >= groupedResults.low
    ) {
      conclusion = "Supported";
    }

    return new AnalysisResult({
      thesis: thesis.statement,
      datasetName,
      datasetEndpoint,
      methods:
        "Grouped countries by internet access level and compared average GDP per capita.",
      totalRecords: records.length,
      groupedResults,
      topCountries: [],
      conclusion
    });
  }
}