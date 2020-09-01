import AWS from "aws-sdk";

const ses = new AWS.SES({
  region: process.env.EMAIL_REGION,
});

const sendMail = async (event, context) => {
  const params = {
    Source: "Harry Manchanda <harry@kibanu.com>",
    Destination: {
      ToAddresses: ["harmanmanchanda182@gmail.com"],
    },
    Message: {
      Subject: {
        Data: "Hello from this Notification Service",
      },
      Body: {
        Text: {
          Data:
            "Test Mail, Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ea. Dicta dolorum, reiciendis ab totam eos itaque ducimus facilis possimus fugit, repellat nulla, amet quibusdam labore beatae temporibus sint ratione.",
        },
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const handler = sendMail;
