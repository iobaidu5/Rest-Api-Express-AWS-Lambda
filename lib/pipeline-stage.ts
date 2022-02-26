import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { SprintFiveStack } from './sprint_five-stack';

export class MyPipelineAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const ObaidSprintFiveStack = new SprintFiveStack(this, 'ObaidSprintFiveStack');      
    }
}