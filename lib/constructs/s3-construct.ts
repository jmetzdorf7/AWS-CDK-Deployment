import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export interface S3ConstructProps {
  envName: string;
}

export class S3Construct extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3ConstructProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, `Bucket-${props.envName}`, {
      bucketName: `cdk-${props.envName}-bucket-${this.node.addr}`,
      versioned: true,
      removalPolicy: props.envName === 'prod' ? undefined : s3.RemovalPolicy.DESTROY,
      autoDeleteObjects: props.envName !== 'prod',
    });
  }
}