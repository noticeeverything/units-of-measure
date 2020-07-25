import {readFileSync, writeFileSync} from 'fs';
import {annotate, header} from './shell-functions';
import {Inquirer} from './inquirer';

(async function release() {

  // Get the current branch name and exit with error if we're not on master
  const inquirer = new Inquirer();
  const versionType = await inquirer.getVersionType();

  header(`Releasing new ${versionType} version of units-of-measure to production`);

  // Get project package.json content
  const packageFileBuffer = readFileSync(`package.json`);
  const packageJson = JSON.parse(packageFileBuffer.toString('utf-8'));

  // Bump version
  const versionParts = packageJson.version.split('.');
  const partIndex = versionType === 'major' ? 0 : versionType === 'minor' ? 1 : 2;
  versionParts[partIndex]++;
  const version = `${versionParts[0]}.${versionParts[1]}.${versionParts[2]}`;
  packageJson.version = version;

  // Create new version tag
  const tag = `@${version}`;

  // Write package.json with updated version
  writeFileSync(`package.json`, JSON.stringify(packageJson));

  // Run git-tag (push new version to remote, triggering deployment)
  annotate(`yarn git-tag ${tag}`);
})();
