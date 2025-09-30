import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { VpcConstruct } from './constructs/vpc-construct';
import { TransitGatewayConstruct } from './constructs/transit-gateway-construct';
import { TgwAttachmentConstruct } from './constructs/tgw-attachment-construct';
import { LoggingConstruct } from './constructs/logging-construct';
import { ApiGatewayConstruct } from './constructs/api-gateway-construct';
import { IamConstruct } from './constructs/iam-construct';
import { S3Construct } from './constructs/s3-construct';
import { Ec2Construct } from './constructs/ec2-construct';

export interface MainStackProps extends cdk.StackProps {
  envName: string;
}

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
   super(scope, id, {
  ...props,
  description: props.description,
});


    // Logging
    const logging = new LoggingConstruct(this, 'LoggingConstruct', {
      envName: props.envName,
    });

    // VPC
    const vpcConstruct = new VpcConstruct(this, 'VpcConstruct', {
      envName: props.envName,
    });

    // Transit Gateway
    const tgwConstruct = new TransitGatewayConstruct(this, 'TgwConstruct');

    // TGW Attachment
    new TgwAttachmentConstruct(this, 'TgwAttachmentConstruct', {
      vpc: vpcConstruct.vpc,
      transitGatewayId: tgwConstruct.transitGateway.ref,
    });

    // API Gateway
    new ApiGatewayConstruct(this, 'ApiGatewayConstruct', {
      envName: props.envName,
    });

    // IAM
    new IamConstruct(this, 'IamConstruct', {
      envName: props.envName,
    });

    // S3
    new S3Construct(this, 'S3Construct', {
      envName: props.envName,
    });

    // EC2
    new Ec2Construct(this, 'Ec2Construct', {
      envName: props.envName,
      vpc: vpcConstruct.vpc,
    });

    // Logging
    cdk.Tags.of(this).add('LogGroup', logging.logGroup.logGroupName);

    // Tags
    cdk.Tags.of(this).add('Environment', props.envName);
    cdk.Tags.of(this).add('LogGroup', logging.logGroup.logGroupName);
  }

}



