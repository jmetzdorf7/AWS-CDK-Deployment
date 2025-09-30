import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface Ec2ConstructProps {
  envName: string;
  vpc: ec2.Vpc;
}

export class Ec2Construct extends Construct {
  public readonly instance: ec2.Instance;

  constructor(scope: Construct, id: string, props: Ec2ConstructProps) {
    super(scope, id);

    const securityGroup = new ec2.SecurityGroup(this, `EC2SG-${props.envName}`, {
      vpc: props.vpc,
      description: `Security group for EC2 in ${props.envName}`,
      allowAllOutbound: true,
    });

    this.instance = new ec2.Instance(this, `EC2Instance-${props.envName}`, {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup,
    });
  }
}