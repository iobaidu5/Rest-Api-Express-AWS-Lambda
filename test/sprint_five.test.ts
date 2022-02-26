import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as SprintFive from '../lib/sprint_five-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/sprint_five-stack.ts
// test('SQS Queue Created', () => {
// //   const app = new cdk.App();
// //     // WHEN
// //   const stack = new SprintFive.SprintFiveStack(app, 'MyTestStack');
// //     // THEN
// //   const template = Template.fromStack(stack);

// //   template.hasResourceProperties('AWS::SQS::Queue', {
// //     VisibilityTimeout: 300
// //   });
// });

test('S3 Bucket Created', () => {
    const app = new cdk.App();
        // WHEN
    const stack = new SprintFive.SprintFiveStack(app, 'MyTestStack');
        // THEN
    const template = Template.fromStack(stack);
    
    template.resourceCountIs("AWS::S3::Bucket",1)
});

test('Alarms Created', () => {
    const app = new cdk.App();
        // WHEN
    const stack = new SprintFive.SprintFiveStack(app, 'MyTestStack');
        // THEN
    const template = Template.fromStack(stack);
    
    template.resourceCountIs("AWS::CloudWatch::Alarm",5)
});

test('Email Subscription Created', () => {
    const app = new cdk.App();
        // WHEN
    const stack = new SprintFive.SprintFiveStack(app, 'MyTestStack');
        // THEN
    const template = Template.fromStack(stack);
    
    template.hasResourceProperties("AWS::SNS::Subscription",{
        "Endpoint": "obaid.ullah.skipq@gmail.com"
    })
});

// test('Lambda env Created', () => {
//     const app = new cdk.App();
//         // WHEN
//     const stack = new SprintFive.SprintFiveStack(app, 'MyTestStack');
//         // THEN
//     const template = Template.fromStack(stack);
    
//     template.hasResourceProperties("AWS::Lambda::Function",{
//         "Environment": {
//           "Variables": {
//             "stackname": "sprintfivestack",
//             "namespace": "obaidnamespace",
//           }
//         }
//     })
// });