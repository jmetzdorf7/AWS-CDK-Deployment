import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface IamConstructProps {
  envName: string;
}

export class IamConstruct extends Construct {
  public readonly user: iam.User;
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props: IamConstructProps) {
    super(scope, id);

    const group = new iam.Group(this, `Group-${props.envName}`, {
      groupName: `Developers-${props.envName}`,
    });

    group.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ReadOnlyAccess')
    );

    this.user = new iam.User(this, `User-${props.envName}`, {
      userName: `developer-${props.envName}`,
    });

    group.addUser(this.user);

    this.role = new iam.Role(this, `Role-${props.envName}`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: `EC2AccessRole-${props.envName}`,
    });

    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess')
    );
  }
}