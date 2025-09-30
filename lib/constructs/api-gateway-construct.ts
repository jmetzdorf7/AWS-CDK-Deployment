import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface ApiGatewayConstructProps {
  envName: string;
}

export class ApiGatewayConstruct extends Construct {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayConstructProps) {
    super(scope, id);

    const helloLambda = new lambda.Function(this, `HelloLambda-${props.envName}`, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello from ${props.envName}!" })
          };
        };
      `),
    });

    this.api = new apigateway.RestApi(this, `ApiGateway-${props.envName}`, {
      restApiName: `ServiceApi-${props.envName}`,
      description: `API Gateway for ${props.envName} environment`,
      deployOptions: {
        stageName: props.envName,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    const helloResource = this.api.root.addResource('hello');
    helloResource.addMethod('GET', new apigateway.LambdaIntegration(helloLambda));
  }
  
// After defining helloLambda
helloLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: [
    's3:ListBucket',
    's3:GetObject',
  ],
  resources: ['*'], // Replace with specific ARNs for tighter security
}));


}

