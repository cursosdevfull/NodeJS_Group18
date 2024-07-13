interface IEmail {
  sentEmail(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string,
    isHtml: boolean
  ): string;
}

class GMail implements IEmail {
  sentEmail(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string,
    isHtml: boolean
  ): string {
    return this.sentMessage(senderEmail, receiptEmail, subject, body, isHtml);
  }

  sentMessage(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string,
    isHtml: boolean
  ) {
    return "GMail, message send";
  }
}

class Office365 {
  constructor(senderEmail: string, isHtml: boolean) {}

  sentEmail(receiptEmail: string, subject: string, body: string) {
    return "Office365, message send";
  }
}

class Office365Adapter implements IEmail {
  sentEmail(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string,
    isHtml: boolean
  ): string {
    const office365 = new Office365(senderEmail, isHtml);
    return office365.sentEmail(
      receiptEmail,
      "Welcome",
      "Welcome to our community"
    );
  }
}

class YahooMail implements IEmail {
  sentEmail(
    senderEmail: string,
    receiptEmail: string,
    subject: string,
    body: string,
    isHtml: boolean
  ): string {
    this.configuration({ isHtml, senderEmail });
    this.validateEmail(receiptEmail);
    return this.sentMail(subject, body);
  }

  configuration(options: { isHtml: boolean; senderEmail: string }) {}

  validateEmail(receiptEmail: string) {}

  sentMail(subject: string, body: string) {
    return "YahooMail, message send";
  }
}

class User {
  register(userEmail: string) {
    const provider: IEmail = new YahooMail(); //new Office365Adapter() //new GMail()
    return provider.sentEmail(
      "info@email.com",
      userEmail,
      "Welcome",
      "Welcome to our community",
      true
    );

    /*const gmail = new GMail()
        return gmail.sentMessage("info@email.com", userEmail, "Welcome", "Welcome to our community", true)*/
    /*const office365 = */

    /*const yahoo = new YahooMail()
        yahoo.configuration({isHtml: true, senderEmail: "info@email.com"})
        yahoo.validateEmail(userEmail)
        yahoo.sentMail("Welcome", "Welcome to our community")*/
  }
}

const user = new User();
console.log(user.register("user@domain.com"));
