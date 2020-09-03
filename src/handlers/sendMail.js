import AWS from "aws-sdk";

const ses = new AWS.SES({
  region: process.env.EMAIL_REGION,
});

const sendMail = async (event, context) => {
  const record = event.Records[0];
  console.log("record processing", record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: "Harry Manchanda <harry@kibanu.com>",
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
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
