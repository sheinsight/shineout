/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */

const { execSync } = require('child_process')
const fs = require('fs-extra')

const REPORTS_FOLDER = 'reports'
const FINAL_OUTPUT_FOLDER = 'coverage'

// Create the reports folder and move the reports from cypress and jest inside it
fs.emptyDirSync(REPORTS_FOLDER)
fs.copyFileSync('cypress-coverage/coverage-final.json', `${REPORTS_FOLDER}/from-cypress.json`)
fs.copyFileSync('jest-coverage/coverage-final.json', `${REPORTS_FOLDER}/from-jest.json`)

fs.emptyDirSync('.nyc_output')
fs.emptyDirSync(FINAL_OUTPUT_FOLDER)

// Run "nyc merge" inside the reports folder, merging the two coverage files into one,
// then generate the final report on the coverage folder

execSync(`nyc merge ${REPORTS_FOLDER} && mv coverage.json .nyc_output/out.json`, { stdio: 'inherit' })
execSync(`nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER} --temp-dir ./.nyc_output`, {
  stdio: 'inherit',
})
