import Record from "../domain/Record.js";

export default class Cleaner {
  toNumber(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  toYear(value) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  isValidCountryCode(countryCode) {
    return typeof countryCode === "string" && /^[A-Z]{3}$/.test(countryCode);
  }

  buildKey(countryCode, year) {
    return `${countryCode}-${year}`;
  }

  mergeDatasets(internetRows, gdpRows) {
    const mergedMap = new Map();

    for (const row of internetRows) {
      const countryCode = row.countryiso3code;
      const countryName = row.country?.value ?? null;
      const year = this.toYear(row.date);
      const internetUsersPercent = this.toNumber(row.value);

      if (!this.isValidCountryCode(countryCode) || year === null || internetUsersPercent === null) {
        continue;
      }

      const key = this.buildKey(countryCode, year);

      mergedMap.set(key, {
        countryName,
        countryCode,
        year,
        internetUsersPercent,
        gdpPerCapita: null
      });
    }

    for (const row of gdpRows) {
      const countryCode = row.countryiso3code;
      const countryName = row.country?.value ?? null;
      const year = this.toYear(row.date);
      const gdpPerCapita = this.toNumber(row.value);

      if (!this.isValidCountryCode(countryCode) || year === null || gdpPerCapita === null) {
        continue;
      }

      const key = this.buildKey(countryCode, year);

      if (mergedMap.has(key)) {
        mergedMap.get(key).gdpPerCapita = gdpPerCapita;
      } else {
        mergedMap.set(key, {
          countryName,
          countryCode,
          year,
          internetUsersPercent: null,
          gdpPerCapita
        });
      }
    }

    const mergedRecords = [];

    for (const value of mergedMap.values()) {
      if (
        value.internetUsersPercent === null ||
        value.gdpPerCapita === null ||
        value.year === null ||
        !value.countryName
      ) {
        continue;
      }

      mergedRecords.push(
        new Record({
          countryName: value.countryName,
          countryCode: value.countryCode,
          year: value.year,
          internetUsersPercent: value.internetUsersPercent,
          gdpPerCapita: value.gdpPerCapita
        })
      );
    }

    return mergedRecords;
  }
}