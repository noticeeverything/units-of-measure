import { prompt } from 'inquirer';
import * as moment from 'moment-timezone';
import { Environment, VersionType } from './deploy.interfaces';

export class Inquirer {
    static get tag(): string {
        return moment().format('MM_DD_YYYY_HH_mm_ss');
    }

    static isEnvironment(env: Environment): env is Environment {
        return /(?:stage|prod)/.test(env);
    }

    async getAwsProfile(): Promise<string> {
        return (
            await prompt<any>([
                {
                    type: 'input',
                    name: 'awsProfile',
                    message: 'what AWS profile should be used (leave empty for default)?',
                    default: 'default',
                },
            ])
        ).awsProfile;
    }

    async getEnvironment(): Promise<Environment> {
        return (
            await prompt<any>([
                {
                    type: 'list',
                    name: 'environment',
                    message: 'what environment are you deploying to?',
                    choices: [{ value: 'stage' }, { value: 'prod' }],
                },
            ])
        ).environment;
    }

    async getTag(): Promise<string> {
        return (
            await prompt<any>([
                {
                    type: 'input',
                    name: 'tag',
                    message:
                        'what tag do you want to use for the Docker images (defaults to datetime)?',
                    default: Inquirer.tag,
                },
            ])
        ).tag;
    }

    async getVersionType(): Promise<VersionType> {
        return (
            await prompt<any>([
                {
                    type: 'list',
                    name: 'versionType',
                    message: 'select a version type',
                    choices: [{ value: 'major' }, { value: 'minor' }, { value: 'patch' }],
                },
            ])
        ).versionType;
    }
}
