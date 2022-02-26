import { Stack,
    StackProps,
    pipelines,
    SecretValue,
    aws_codepipeline_actions as cpactions,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { MyPipelineAppStage } from './pipeline-stage';

export class JibranSprint4Pipeline extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
   // creating the source for pipeline
    const source = pipelines.CodePipelineSource.gitHub('obaid2022skipq/Triangulum', "main", {
        authentication: SecretValue.secretsManager("obaid_github_token"),
        trigger:cpactions.GitHubTrigger.POLL,
    })
    
    //creating shell commands for pipeline
    const synth = new pipelines.ShellStep("ObaidSynth",{
        input : source,
        commands : ["cd Obaid/SprintFive/",'npm ci',
      'npx cdk synth',],
      primaryOutputDirectory : "Obaid/SprintFive/cdk.out",
    })
    
    
    // unit testing the stack using CI/CD pipeline
    
    const unitTest = new pipelines.ShellStep("ObaidBetaTest",{
                                        commands : [
                                            "cd Obaid/SprintFive/",
                                            "npm --save install jest",
                                            "npm test"
                                            ]}
            )
    const pipeline = new pipelines.CodePipeline(this, "ObaifCodePipeline", {synth:synth})
    
    
    // beta stage
    const beta = new MyPipelineAppStage(this, "obaidsprint4stackbeta")
    
    const prod = new MyPipelineAppStage(this, "obaidsprint4stackProd")
    
    // adding stage in tthe pipeline with pre unit testing
    pipeline.addStage(beta,{pre:[unitTest]})
    
    // prod stage with manual approval
    pipeline.addStage(prod,{pre : [new pipelines.ManualApprovalStep("ApproveProd")]})
  }
}