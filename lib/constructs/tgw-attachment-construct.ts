import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface TgwAttachmentConstructProps {
  vpc: ec2.Vpc;
  transitGatewayId: string;
  envName: string;
}

export class TgwAttachmentConstruct extends Construct {
  constructor(scope: Construct, id: string, props: TgwAttachmentConstructProps) {
    super(scope, id);

    new ec2.CfnTransitGatewayAttachment(this, 'TgwAttachment', {
      transitGatewayId: props.transitGatewayId,
      vpcId: props.vpc.vpcId,
      subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId),
      public readonly attachment: ec2.CfnTransitGatewayAttachment;
      this.attachment = new ec2.CfnTransitGatewayAttachment(...); 
    });

    // Tagging
    tags: [
    {
    key: 'Name',
    value: `TgwAttachment-${id}`,
    },
    
    // Outputs
    new cdk.CfnOutput(this, 'TgwAttachmentId', {
    value: this.attachment.ref,
    });  
],
  }



