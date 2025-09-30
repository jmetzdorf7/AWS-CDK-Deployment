import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class TransitGatewayConstruct extends Construct {
  public readonly transitGateway: ec2.CfnTransitGateway;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.transitGateway = new ec2.CfnTransitGateway(this, 'TransitGateway', {
      description: 'Transit Gateway for VPC connectivity',
      amazonSideAsn: 64512,
      autoAcceptSharedAttachments: 'enable',
      defaultRouteTableAssociation: 'enable',
      defaultRouteTablePropagation: 'enable',
    });

    // Environment naming
    export interface TransitGatewayConstructProps {
    envName: string;
    }
    
    // Tagging
    tags: [
    {
    key: 'Name',
    value: 'TransitGateway',
    },
    {
    key: 'Environment',
    value: 'dev',
    },
    ],
  }
}



