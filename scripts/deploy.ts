import { cd, pwd } from 'shelljs';
import { annotate, header, logError } from './shell-functions';
import { Arguments, Environment } from './deploy.interfaces';
import { Inquirer } from './inquirer';
import { deploySteps } from './steps';

/**
 * Interactive - simply run `yarn deploy` and follow the prompts
 * Manual - e.g., `yarn deploy --env=stage`
 *
 * Arguments for manual deployment
 * @param env:Environment (required)
 * @param awsProfile?:string (optional - defaults to 'default')
 * @param tag?:string (optional - defaults to datetime))
 */
(async function deploy() {
    const args = process.argv.filter((a) => /--(?:env|awsProfile|awsRegion|tag)/.test(a));
    const rootDir = pwd().stdout;
    let env;
    let awsProfile;
    let awsRegion;
    let tag;

    // Deploy a single project - requires env, project, passphrase arguments
    // Non-interactive for later CI/CD purposes
    if (args.length) {
        const parsed = parseArguments(args);
        if (parsed.errors.length) {
            return parsed.errors.map((e) => logError(e));
        }
        env = parsed.env;
        awsProfile = parsed.awsProfile;
        awsRegion = parsed.awsRegion;
        tag = parsed.tag;
        // Interactive deployment - choose project(s), environment, etc.
    } else {
        const inquirer = new Inquirer();
        env = await inquirer.getEnvironment();
        awsProfile = await inquirer.getAwsProfile();
        tag = await inquirer.getTag();
    }

    // Some Projects will cd into their own root directory
    // Make sure we're at the project root when we start each one
    cd(rootDir);

    header(`Deploying units-of-measure`);

    for (const step of deploySteps) {
        header(step.description);

        for (const command of step.commands) {
            if (command.type === 'string') {
                await annotate(command.cmd);
            } else {
                const cmd = await command.fn({ env, awsProfile, awsRegion, tag });
                annotate(cmd);
            }
        }
    }
})();

function parseArguments(args: string[]): Arguments {
    const errors = [];
    let env;
    let awsProfile;
    let awsRegion;
    let tag;

    const hasEnv = args.find((a) => a.indexOf('--env=') > -1);
    if (!hasEnv) {
        errors.push('The --env argument is required');
    } else {
        env = args.find((a) => a.indexOf('--env=') > -1).replace('--env=', '') as Environment;
        if (!Inquirer.isEnvironment(env)) {
            errors.push(`"${env}" is not a recognized environment`);
        }
    }

    const hasAwsProfile = args.find((a) => a.indexOf('--awsProfile=') > -1);
    if (hasAwsProfile) {
        awsProfile = args.find((a) => a.indexOf('--awsProfile=') > -1).replace('--awsProfile=', '');
    }

    const hasAwsRegion = args.find((a) => a.indexOf('--awsRegion=') > -1);
    if (hasAwsRegion) {
        awsRegion = args.find((a) => a.indexOf('--awsRegion=') > -1).replace('--awsRegion=', '');
    }

    const hasTag = args.find((a) => a.indexOf('--tag=') > -1);
    if (!hasTag) {
        tag = Inquirer.tag;
    } else {
        tag = args.find((a) => a.indexOf('--tag=') > -1).replace('--tag=', '');
    }

    return { env, awsProfile, awsRegion, tag, errors };
}
