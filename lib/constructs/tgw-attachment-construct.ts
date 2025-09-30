import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface TgwAttachmentConstructProps {
  vpc: ec2.Vpc;
  transitGatewayId: string;
}

export class TgwAttachmentConstruct extends Construct {
  constructor(scope: Construct, id: string, props: TgwAttachmentConstructProps) {
    super(scope, id);

    new ec2.CfnTransitGatewayAttachment(this, 'TgwAttachment', {
      transitGatewayId: props.transitGatewayId,
      vpcId: props.vpc.vpcId,
      subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId),
    });

    // Tagging
    tags: [
    {
    key: 'Name',
    value: `TgwAttachment-${id}`,
    },
],
  }

