class Message {
  sentEmail(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string
  ) {
    return "Email send";
  }
}

class MessageEmailSMS extends Message {
  sentSMS(senderPhoneNumber: string, receiptPhoneNumber: string, text: string) {
    return "SMS send";
  }
}

class MessageEmailSMSWhatsapp extends MessageEmailSMS {
  sentWhatsapp(
    senderPhoneNumber: string,
    receiptPhoneNumber: string,
    text: string
  ) {
    return "Whatsapp send";
  }
}

const message = new MessageEmailSMSWhatsapp();
console.log(
  message.sentEmail(
    "sender@email.com",
    "receipt@domain.com",
    "Welcome to register",
    "Welcome to the future"
  )
);
