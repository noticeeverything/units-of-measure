import { header } from './shell-functions';
import { Inquirer } from './inquirer';
import { exec } from 'shelljs';

(async function release() {
    // Get the current branch name and exit with error if we're not on master
    const inquirer = new Inquirer();
    const versionType = await inquirer.getVersionType();

    header(`Releasing new ${versionType} version of units-of-measure to production`);

    exec(`yarn version --${versionType}`);
    exec(`git push --tags -f`);
})();
