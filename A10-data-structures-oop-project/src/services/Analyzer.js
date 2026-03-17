import AnalysisResult from "../domain/AnalysisResult.js";

export default class Analyzer {
  getMostRecentYear(records) {
    const years = new Set(records.map((r) => r.year));
    return Math.max(...years);
  }

  filterToYear(records, year) {
    return records.filter((r) => r.year === year);
  }

  removeOutliers(records) {
    if (records.length === 0) return records;

    const gdpValues = records.map((r) => r.gdpPerCapita);
    const avg =
      gdpValues.reduce((sum, val) => sum + val, 0) / gdpValues.length;

    const threshold = avg * 3; // simple outlier rule

    return records.filter((r) => r.gdpPerCapita <= threshold);
  }

  groupByInternetAccess(records) {
    const groups = {
      low: [],
      medium: [],
      high: []
    };

    for (const record of records) {
      const value = record.internetUsersPercent;

      if (value < 50) groups.low.push(record);
      else if (value <= 80) groups.medium.push(record);
      else groups.high.push(record);
    }

    return groups;
  }

  averageGdp(records) {
    if (records.length === 0) return 0;

    const total = records.reduce((sum, r) => sum + r.gdpPerCapita, 0);
    return total / records.length;
  }

  getTopCountries(records, limit = 10) {
    return [...records]
      .sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)
      .slice(0, limit);
  }

  analyze({ thesis, records, datasetName, datasetEndpoint }) {
    // STEP 1: find most recent year
    const mostRecentYear = this.getMostRecentYear(records);

    // STEP 2: filter to that year
    let filtered = this.filterToYear(records, mostRecentYear);

    // STEP 3: what-if filter (remove outliers)
    const withoutOutliers = this.removeOutliers(filtered);

    // STEP 4: grouping
    const groups = this.groupByInternetAccess(withoutOutliers);

    const groupedResults = {
      low: this.averageGdp(groups.low),
      medium: this.averageGdp(groups.medium),
      high: this.averageGdp(groups.high)
    };

    // STEP 5: top countries
    const topCountries = this.getTopCountries(withoutOutliers);

    // STEP 6: conclusion logic
    let conclusion = "Inconclusive";

    if (
      groupedResults.high >= groupedResults.medium &&
      groupedResults.medium >= groupedResults.low
    ) {
      conclusion = "Supported";
    } else {
      conclusion = "Not Supported";
    }

    return new AnalysisResult({
      thesis: thesis.statement,
      datasetName,
      datasetEndpoint,
      methods:
        "Filtered to most recent shared year, removed outliers, grouped by internet access, computed average GDP per capita.",
      totalRecords: withoutOutliers.length,
      groupedResults,
      topCountries,
      conclusion,
      mostRecentYear
    });
  }
}