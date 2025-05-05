import fs from "fs";
import Papa from "papaparse";

/*
 * This script appends the ebird URL for each species in the summary.csv file
 * to the file itself. You must first get a listing of all the species in the
 * latest taxonomy from the ebird API by running:
 *
 * curl 'https://api.ebird.org/v2/ref/taxonomy/ebird?' -H 'x-ebirdapitoken: TOKEN'
 *
 * Next, run `npm run fetch-data` to cross compare the files and append the URL.
 */

const buildURL = (speciesCode) => {
  return `https://ebird.org/species/${speciesCode}`;
};

// Open taxonomy file
const taxonomyFile = "public/data/taxonomy.csv";
const taxonomy = Papa.parse(fs.readFileSync(taxonomyFile, "utf8"), {
  header: true,
  skipEmptyLines: true,
});

// Open the raw summary file
const summaryFile = "public/data/SummedData_SiteYearSpecies.csv";
const data = Papa.parse(fs.readFileSync(summaryFile, "utf8"), {
  header: true,
  skipEmptyLines: true,
});

// Open a new file to write the updated data
const outputFile = "public/data/summary.csv";
const outputData = [];

const codeCache = {};
data.data.forEach(async (row) => {
  const outRow = row;

  if (codeCache[row.commonName]) {
    outRow.ebirdURL = buildURL(codeCache[row.commonName]);
    outputData.push(outRow);
    return;
  }

  const match = taxonomy.data.find((taxon) => {
    return taxon.COMMON_NAME == row.commonName;
  });

  if (match) {
    const code = match.SPECIES_CODE;
    codeCache[row.commonName] = code;

    outRow.ebirdURL = buildURL(code);
    outputData.push(outRow);
    return;
  }

  console.log(`No match for ${row.commonName}`);
  outRow.ebirdURL = "";
  outputData.push(outRow);
});

// Write the updated data to the new file
const csv = Papa.unparse(outputData);
fs.writeFileSync(outputFile, csv, "utf8");
