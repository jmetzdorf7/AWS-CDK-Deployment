export interface VpcConstructProps {
  envName: string;
  maxAzs?: number;
}

export class VpcConstruct extends Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: VpcConstructProps) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, `Vpc-${props.envName}`, {
      maxAzs: props.maxAzs ?? 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: `${props.envName}-Public`,
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: `${props.envName}-Private`,
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        // Tagging
        cdk.Tags.of(this.vpc).add('Environment', props.envName);
        // Validation
        if (!props.envName) {
        throw new Error('envName is required for VpcConstruct');
        }
      ],
    });
  }
}


