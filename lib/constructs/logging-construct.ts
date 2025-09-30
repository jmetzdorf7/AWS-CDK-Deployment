import { Construct } from 'constructs';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface LoggingConstructProps {
  envName: string;
  retentionDays?: logs.RetentionDays;
}

export class LoggingConstruct extends Construct {
  public readonly logGroup: logs.LogGroup;

  constructor(scope: Construct, id: string, props: LoggingConstructProps) {
    super(scope, id);

    this.logGroup = new logs.LogGroup(this, `LogGroup-${props.envName}`, {
      logGroupName: `/cdk/${props.envName}/network`,
      retention: props.retentionDays ?? logs.RetentionDays.ONE_WEEK,
      removalPolicy: props.envName === 'prod' ? undefined : logs.RemovalPolicy.DESTROY,
    });

  // Tagging
  cdk.Tags.of(this.logGroup).add('Environment', props.envName);
  cdk.Tags.of(this.logGroup).add('Name', `LogGroup-${props.envName}`);

  // Validation
  if (!props.envName) {
  throw new Error('envName is required for LoggingConstruct'});

  // Outputs
  new cdk.CfnOutput(this, 'LogGroupName', {
  value: this.logGroup.logGroupName,});   
  }

}
