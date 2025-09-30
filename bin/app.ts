#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MainStack } from '../lib/main-stack';

const app = new cdk.App();

// Get environment name from context or default to 'dev'
const envName = app.node.tryGetContext('env') || 'dev';

// Define AWS environment
const awsEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// Deploy main stack
new MainStack(app, `MainStack-${envName}`, {
  envName,
  env: awsEnv,
  stackName: `MainStack-${envName}`,
  description: `Main infrastructure stack for ${envName} environment`,

  export interface MainStackProps extends cdk.StackProps {
  envName: string;
  stackName: string;
  description?: string;
}
});



