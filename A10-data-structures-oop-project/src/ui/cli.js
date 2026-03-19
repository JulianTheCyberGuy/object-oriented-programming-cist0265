function formatCurrency(value) {
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

export function printHeader(title) {
    console.log("\n==================================================");
    console.log(title);
    console.log("==================================================");
  }
  
  export function printResult(result) {
    printHeader("Data-Driven OOP + Data Structures Mini-Project");
  
    console.log("\nThesis:");
    console.log(result.thesis);
  
    console.log("\nDataset:");
    console.log(result.datasetName);
  
    console.log("\nYear Used:");
    console.log(result.mostRecentYear);
  
    console.log("\nMethods:");
    console.log(result.methods);
  
    console.log("\nResults:");
    console.log(`Total valid records: ${result.totalRecords}`);
  
    console.log("\nCorrelation (Internet vs GDP):");
     console.log(result.correlation.toFixed(3));

    console.log("\nAverage GDP per Group:");
    console.log(`Low (<50%):    ${formatCurrency(result.groupedResults.low)}`);
    console.log(`Medium (50-80%): ${formatCurrency(result.groupedResults.medium)}`);
    console.log(`High (>80%):   ${formatCurrency(result.groupedResults.high)}`);
  
    console.log("\nTop 10 Countries by GDP per capita:");
    result.topCountries.forEach((c, i) => {
        console.log(`${i + 1}. ${c.countryName} - ${formatCurrency(c.gdpPerCapita)}`);
    });
  
    console.log("\nConclusion:");
    console.log(result.conclusion);
  }


