/**
 * @author DuyTM
 * @type {*|Gulp}
 * @version 2020
 * @description Upgrade gulp V4 is compatibility version node >= 12
 */

const gulp = require('gulp');
const shell = require('gulp-shell');
const argv = require('yargs')['argv'];

const config = {
  paths: {
    document: {
      src: 'src/api',
      dest: 'dist/public',
      includeFilters: [".*\\.controller\\.js|ts$"],
      dirWatch: ['src/api/**/*.controller.ts']
    }
  },
  environment: {
    local: 'local',
    staging: 'staging',
    production: 'production'
  }
}

//#region Pre-build (Document/ Another)
function copyNoneTS() {
  return gulp.src(['src/**/*', '!src/**/*.ts', '!src/types'])
    .pipe(gulp.dest('dist/'));
}

function genDocument(done) {
  shell.task([
    `mkdir -p dist/document && cd document && ../node_modules/.bin/multi-file-swagger -o json index.yaml > ../dist/document/swagger.json`
  ])(done);
}

function documentWatch() {
  return gulp.watch(config.paths.document.dirWatch, genDocument);
}

//#endregion

//#region Testing
function executeTest(done) {
  const reports = argv['reports'] !== undefined;
  const windows = argv['windows'];
  let files = argv['files'];
  files = files ? 'test/scripts/pre.spec.{ts,js} ' + files.trim().replace(',', ' ') : 'test/scripts/*.spec.{ts,js}';
  shell.task([
    `${windows ? 'set NODE_ENV=test &&' : 'NODE_ENV=test'} TS_NODE_FILES=true ${reports ? 'nyc' : ''} mocha `
    + `--require ts-node/register tsconfig.json ${reports ? '--opts ./mocha.cfg' : ''} ${files} ${!reports ? '--timeout=50000' : ''} --exit`,
  ])(done);
}

function cleanTest(done) {
  shell.task([
    `rm -rf .nyc_output`
  ])(done);
}

const test = gulp.series(cleanTest, executeTest);
//#endregion

//#region build
function compileTS(done) {
  shell.task(['rm -rf dist', 'tsc', 'tslint -c tslint.json -p tsconfig.json'])(done);
}

const buildBase = gulp.series(compileTS, copyNoneTS);

function buildEnvironment(done, env = config.environment.local) {
  return shell.task([`gulp buildBase`, `gulp genDocument --env=${env}`])(done);
}

function buildLocal(done) {
  return buildEnvironment(done);
}

function buildStaging(done) {
  return buildEnvironment(done, config.environment.staging);
}

function buildProduction(done) {
  return buildEnvironment(done, config.environment.production);
}

//#endregion

// pre-build
exports.copyNoneTS = copyNoneTS;
exports.genDocument = genDocument;
exports.documentWatch = documentWatch;
// test
exports.test = test;
// build
exports.compileTS = compileTS;
exports.buildBase = buildBase;
exports.buildLocal = buildLocal;
exports.buildStaging = buildStaging;
exports.buildProduction = buildProduction;
