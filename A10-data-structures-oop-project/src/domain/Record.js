export default class Record {
    constructor({
      countryName,
      countryCode,
      year,
      internetUsersPercent,
      gdpPerCapita
    }) {
      this.countryName = countryName;
      this.countryCode = countryCode;
      this.year = year;
      this.internetUsersPercent = internetUsersPercent;
      this.gdpPerCapita = gdpPerCapita;
    }
  }