export interface Arguments {
  awsProfile?: string;
  awsRegion?: string;
  env: Environment;
  errors: string[];
  tag: string;
}

export type Environment = 'stage' | 'prod';

export type VersionType = 'major' | 'minor' | 'patch';

export interface DeployFunctionArgs {
  awsProfile?: null;
  awsRegion?: null;
  env: string;
  tag: string;
}

export type DeployFunction = (args: DeployFunctionArgs) => string;

export interface Command {
  cmd?: string;
  fn?: DeployFunction;
  type: 'string' | 'fn';
}

export interface DeployStep {
  commands: Command[];
  description: string;
  name: string;
}
