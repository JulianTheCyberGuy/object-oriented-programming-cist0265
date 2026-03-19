import AnalysisResult from "../domain/AnalysisResult.js";

export default class Analyzer {
  getMostRecentYear(records) {
    const years = new Set(records.map((record) => record.year));
    return Math.max(...years);
  }

  filterToYear(records, year) {
    return records.filter((record) => record.year === year);
  }

  removeOutliers(records) {
    if (records.length === 0) {
      return records;
    }

    const gdpValues = records.map((record) => record.gdpPerCapita);
    const average =
      gdpValues.reduce((sum, value) => sum + value, 0) / gdpValues.length;

    const threshold = average * 3;

    return records.filter((record) => record.gdpPerCapita <= threshold);
  }

  groupByInternetAccess(records) {
    const groups = {
      low: [],
      medium: [],
      high: []
    };

    for (const record of records) {
      const value = record.internetUsersPercent;

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

    const total = records.reduce((sum, record) => sum + record.gdpPerCapita, 0);
    return total / records.length;
  }

  getTopCountries(records, limit = 10) {
    return [...records]
      .sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)
      .slice(0, limit);
  }

  calculateCorrelation(records) {
    const validRecords = records.filter(
      (record) =>
        typeof record.internetUsersPercent === "number" &&
        typeof record.gdpPerCapita === "number"
    );

    const n = validRecords.length;

    if (n === 0) {
      return 0;
    }

    const sumX = validRecords.reduce(
      (sum, record) => sum + record.internetUsersPercent,
      0
    );

    const sumY = validRecords.reduce(
      (sum, record) => sum + record.gdpPerCapita,
      0
    );

    const sumXY = validRecords.reduce(
      (sum, record) =>
        sum + record.internetUsersPercent * record.gdpPerCapita,
      0
    );

    const sumX2 = validRecords.reduce(
      (sum, record) => sum + record.internetUsersPercent ** 2,
      0
    );

    const sumY2 = validRecords.reduce(
      (sum, record) => sum + record.gdpPerCapita ** 2,
      0
    );

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
    );

    if (denominator === 0) {
      return 0;
    }

    return numerator / denominator;
  }

  analyze({
    thesis,
    records,
    datasetName,
    datasetEndpoint,
    excludeOutliers = true
  }) {
    const mostRecentYear = this.getMostRecentYear(records);

    const filtered = this.filterToYear(records, mostRecentYear);

    const withoutOutliers = excludeOutliers
      ? this.removeOutliers(filtered)
      : filtered;

    const groups = this.groupByInternetAccess(withoutOutliers);

    const groupedResults = {
      low: this.averageGdp(groups.low),
      medium: this.averageGdp(groups.medium),
      high: this.averageGdp(groups.high)
    };

    const topCountries = this.getTopCountries(withoutOutliers);
    const correlation = this.calculateCorrelation(withoutOutliers);

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
      methods:"Filtered to the most recent shared year, removed outliers, grouped countries by internet access level, computed average GDP per capita, and calculated correlation.",
      totalRecords: withoutOutliers.length,
      groupedResults,
      topCountries,
      conclusion,
      mostRecentYear,
      correlation
    });
  }
}