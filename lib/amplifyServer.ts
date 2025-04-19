import { Amplify } from "aws-amplify";

export function configureAmplifyServer() {
  Amplify.configure({
    API: {
      Events: {
        endpoint: process.env.APPSYNC_ENDPOINT as string,
        region: process.env.AWS_REGION,
        defaultAuthMode: "apiKey",
        apiKey: process.env.APPSYNC_API_KEY,
      },
    },
  });
}
