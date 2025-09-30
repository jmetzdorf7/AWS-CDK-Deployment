import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';

export interface Ec2ConstructProps {
  envName: string;
  vpc: ec2.Vpc;
}

export class Ec2Construct extends Construct {
  public readonly instance: ec2.Instance;
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: Ec2ConstructProps) {
    super(scope, id);

    // Create security group
    this.securityGroup = new ec2.SecurityGroup(this, `EC2SG-${props.envName}`, {
      vpc: props.vpc,
      description: `Security group for EC2 in ${props.envName}`,
      allowAllOutbound: true,
    });

    // Add inbound SSH rule (port 22)
    this.securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access from anywhere'
    );

    // Create EC2 instance
    this.instance = new ec2.Instance(this, `EC2Instance-${props.envName}`, {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: this.securityGroup,
    });

    // Add tags
    cdk.Tags.of(this.instance).add('Environment', props.envName);
    cdk.Tags.of(this.securityGroup).add('Environment', props.envName);
    cdk.Tags.of(this.instance).add('Name', `EC2Instance-${props.envName}`);
    cdk.Tags.of(this.securityGroup).add('Name', `EC2SG-${props.envName}`);
  }
}
