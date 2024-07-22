class NotificationV1 {
  sendMail(sender: string, receiver: string, subject: string, body: string) {
    return "email send";
  }
}

class NotificationV2 extends NotificationV1 {
  sendSMS(phoneNumber: string, message: string) {
    return "sms send";
  }
}

class NotificationV3 extends NotificationV2 {
  sendWhatsApp(phoneNumber: string, message: string) {
    return "message send";
  }
}

function SendMessage(
  sender: string,
  receiver: string,
  subject: string,
  body: string
) {
  const notifier = new NotificationV3();
  console.log(notifier.sendMail(sender, receiver, subject, body));
}

SendMessage(
  "sender@email.com",
  "receiver@correo.com",
  "Welcome",
  "Welcome to our community"
);
