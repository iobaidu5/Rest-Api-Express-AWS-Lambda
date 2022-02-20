//import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import {
  Stack,
  aws_lambda as lambda,
  aws_iam as iam,
  Duration,
  StackProps,
  aws_events as events,
  // aws_events_targets as targets,
  // aws_s3 as s3,
  RemovalPolicy,
  // aws_s3_deployment as s3deploy,
  aws_cloudwatch as cloudwatch,
  aws_sns as sns,
  aws_sns_subscriptions as subscriptions,
  aws_cloudwatch_actions as actions,
  // aws_dynamodb as dynamodb,
  // aws_logs as logs,
  aws_codedeploy as codedeploy,
} from "aws-cdk-lib";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class SprintFiveStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //const layers = createLayer("obaid-layer", `layers/nodejs.zip`);
    const role = new iam.Role(this, 'customRole', {
      roleName: 'customRole',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"),
          iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
          iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess")
      ]
  })

    const apiLambda = new lambda.Function(this, "ObaidAPILambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "apiLambda.handler",
      role: role
    });

    const obaidapi = new apigateway.LambdaRestApi(this, 'ObaidApiGateway', { handler: apiLambda });

    // const webHealthLambda = new lambda.Function(this, "ObaidWebHealthLambda", {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   code: lambda.Code.fromAsset("resources"),
    //   handler: "webHealthLambda.lambdaHandler",
    //   role: role
    // });

  //   const myTopic = new sns.Topic(this,"WebHealthTopic")
    
  //   myTopic.addSubscription(new subscriptions.EmailSubscription("obaid.ullah.skipq@gmail.com"));

  //   let avaliaility_metric = new cloudwatch.Metric({
  //     namespace: "obaid2022",
  //     metricName: "avaliability",
  //     dimensionsMap: {'Web_Site': "https://www.facebook.com"},
  //     label: "Avalibility Alarm ",
  //   });
    
  //   let alarm = new cloudwatch.Alarm(this, "Obaid-2022-Avaliability-Alarm-ts", {
  //     metric: avaliaility_metric,
  //     threshold: 0.5,
  //     comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
  //     evaluationPeriods: 1,
  //     datapointsToAlarm: 1,
  //   });
    
  //  alarm.addAlarmAction(new actions.SnsAction(myTopic));
    
  //     const latency_metric = new cloudwatch.Metric({
  //     namespace: "obaid2022",
  //     metricName: "latency",
  //     dimensionsMap: {'Web_Site': "https://www.facebook.com"},
  //     label: "Latency Alarm ",
  //   });
    
  //   const latency_alarm = new cloudwatch.Alarm(this, "Obaid-2022-latency-Alarm-ts", {
  //     metric: latency_metric,
  //     threshold: 1.0,
  //     comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
  //     evaluationPeriods: 1,
  //     datapointsToAlarm: 1,
  //   });
    
  //  latency_alarm.addAlarmAction(new actions.SnsAction(myTopic));



  //  const durationWH_failure_metric = new cloudwatch.Metric({
  //   namespace: "ObaidNameSpace",
  //   metricName: "Duration",
  //   dimensionsMap: { "FunctionName": webHealthLambda.functionName },
  //   period: Duration.seconds(30),
  //   label: 'labelto' + webHealthLambda.functionName
  // });

  // const durationWH_failure_alarm = new cloudwatch.Alarm(this, "WebHealthDurationAlarm",
  //   {
  //     metric: durationWH_failure_metric,
  //     threshold: 7000,
  //     evaluationPeriods: 1
  //   });

  //   const memoryWH_failure_metric = new cloudwatch.Metric({
  //     namespace: "ObaidNameSpace",
  //     metricName: "Invocations",
  //     dimensionsMap: { "FunctionName": webHealthLambda.functionName },
  //     period: Duration.seconds(60),
  //     label: 'Invocations' + webHealthLambda.functionName
  //   });

  //   const memoryWH_failure_alarm = new cloudwatch.Alarm(this, "webHealthLambdaInvocationAlarm",
  //     {
  //       metric: memoryWH_failure_metric,
  //       threshold: 1,
  //       comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
  //       evaluationPeriods: 1
  //     });

  //  const wh_alias = new lambda.Alias(this, 'ObaidwebHealthLambdaAlias', { aliasName: 'Current', version: webHealthLambda.currentVersion })

  //  //using default config : CANARY_10PERCENT_5MINUTES 
  //  const whdeployment_group = new codedeploy.LambdaDeploymentGroup(this, "ObaidwebHealthLambdaDeloyment",
  //    {
  //      alias: wh_alias,
  //      alarms: [durationWH_failure_alarm, memoryWH_failure_alarm]
  //    }
  //  );








    // function createLayer(id: string, path: string) {
    //   return new lambda.LayerVersion(this, id, {
    //     code: lambda.Code.fromAsset(path),
    //     compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    //   });
    // }

  }
}
