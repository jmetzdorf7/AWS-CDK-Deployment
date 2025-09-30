import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';

export interface IamConstructProps {
  envName: string;
}

export class IamConstruct extends Construct {
  public readonly role: iam.Role;
  public readonly user: iam.User;

  constructor(scope: Construct, id: string, props: IamConstructProps) {
    super(scope, id);

    // IAM Role
    this.role = new iam.Role(this, `IamRole-${props.envName}`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: `Lambda execution role for ${props.envName}`,
    });

    // IAM User
    this.user = new iam.User(this, `IamUser-${props.envName}`, {
      userName: `user-${props.envName}`,
    });

    // Tagging
    cdk.Tags.of(this.role).add('Environment', props.envName);
    cdk.Tags.of(this.user).add('Environment', props.envName);

    // Outputs
    new cdk.CfnOutput(this, 'IamRoleName', {
      value: this.role.roleName,
    });

    new cdk.CfnOutput(this, 'IamUserName', {
      value: this.user.userName,
    });
  }
}
