import { execSync } from 'child_process';
import { echo, exec } from 'shelljs';

const CLEAR = '\x1B[39m';
const RED = '\x1B[31m';
const GREEN = '\x1B[32m';
const YELLOW = '\x1B[33m';

export function logError(msg: string) {
    return echo(`${RED}${msg}${CLEAR}`);
}

export function logWarning(msg: string) {
    return echo(`${YELLOW}${msg}${CLEAR}`);
}

export function header(msg: string) {
    echo('');
    echo('*******************************************************');
    echo(`* ${GREEN}${msg}${CLEAR}`);
    echo('*******************************************************');
    echo('');
}

export function annotate(cmd: string) {
    logWarning(`EXEC: ${cmd}`);
    const res = exec(cmd);
    if (res.code !== 0) {
        logError(`FAIL (CODE ${res.code})`);
        process.exit(res.code);
    }

    return res.code;
}

export function log(msg: string) {
    echo('');
    echo('******************************************************');
    echo(`                      ${msg}                         `);
    echo('******************************************************');
    echo('');
}

export function getDocker() {
    const docker = exec(`which docker || which docker.exe`).stdout;
    if (!docker && docker.length) {
        logError('No docker found. Make sure docker or docker.exe is available on PATH');
        process.exit(1);
    }
    logWarning(`Using ${docker}`);
}

export async function awsLogin(profile?: string, region?: string) {
    header('Logging into AWS');
    try {
        const profileArg = profile ? '--profile ' + profile : '';
        const regionArg = region ? '--region ' + region : '';
        const args = `${profileArg}${profile ? ' ' + regionArg : regionArg}`;
        const stdoutBuffer: Buffer = await execSync(`aws ecr get-login ${args} --no-include-email`);
        await execSync(stdoutBuffer.toString('utf-8'), { stdio: 'inherit' });
    } catch (e) {
        process.exit(1);
    }
}
