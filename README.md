# AWS-CDK-Deployment

This repository provides a set of AWS CDK (Cloud Development Kit) stacks and constructs for standard and repeatable AWS infrastructure deployments. It is designed for modularity and extensibility, supporting a variety of AWS components such as VPC, EC2, S3, IAM, Logging, API Gateway, Transit Gateway, and more.

## What's New (October 2025)

- **Comprehensive Refactoring:** All core constructs (VPC, EC2, S3, IAM, Logging, API Gateway, Transit Gateway, TGW Attachment) have been reviewed and refactored for improved reliability and maintainability.
- **Pipeline Stack Added:** A new `pipeline-stacks.ts` supports CI/CD workflows, allowing automated deployment pipelines.
- **Outputs & Tagging:** Output variables and resource tagging have been added across multiple constructs for better resource management and integration.
- **Validation Logic:** Key constructs (such as the main stack and VPC) now include validation logic to prevent misconfiguration.
- **IAM & Import Path Optimizations:** Import paths, IAM role assignments, and tagging have been streamlined and improved.
- **Active Maintenance:** The repository is actively maintained and all constructs have recently been updated for code consistency and best practices.

## Repository Structure

- `app.ts` – Entry point for the CDK application.
- `main-stack.ts` – Main stack that brings core infrastructure together.
- `pipeline-stacks.ts` – Pipeline/CD stack for CI/CD.
- `vpc-construct.ts` – Modular VPC construct with support for public/private/isolated subnets, tagging, validation, and outputs.
- `ec2-construct.ts` – EC2 instance construct with tagging and output support.
- `s3-construct.ts` – S3 bucket construct with tagging and outputs.
- `iam-construct.ts` – IAM roles and policies construct.
- `logging-construct.ts` – Logging construct with tags, outputs, and validation.
- `api-gateway-construct.ts` – API Gateway construct with improved imports, tagging, IAM roles, and outputs.
- `transit-gateway-construct.ts` – Transit Gateway construct with outputs and tagging.
- `tgw-attachment-construct.ts` – TGW VPC Attachment construct with env string, tags, and outputs.

## Usage

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Bootstrap your AWS environment**
   ```bash
   cdk bootstrap
   ```
3. **Deploy the main stack**
   ```bash
   cdk deploy MainStack
   ```
4. **Deploy the pipeline stack** (optional, for CI/CD)
   ```bash
   cdk deploy PipelineStack
   ```

## Customization

Each construct is designed to be modular and reusable. You can import and compose them in your own stacks as needed, and customize their properties via CDK props.

## Contribution

Contributions are welcome! Please open issues or pull requests for features, fixes, or improvements.

## Recent Activity

For a detailed view of recent updates and history, see the [commit history](https://github.com/jmetzdorf7/AWS-CDK-Deployment/commits?sort=updated).

---

© 2025 jmetzdorf7
