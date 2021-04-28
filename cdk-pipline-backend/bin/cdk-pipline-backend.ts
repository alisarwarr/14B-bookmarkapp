#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkPiplineBackendStack } from '../lib/cdk-pipline-backend-stack';

const app = new cdk.App();
new CdkPiplineBackendStack(app, 'CdkPiplineBackendStack');
