interface IEmail {
  sendEmail(
    sender: string,
    receiver: string,
    subject: string,
    body: string
  ): string;
}

class GMail implements IEmail {
  sendEmail(
    sender: string,
    receiver: string,
    subject: string,
    body: string
  ): string {
    return this.sentMessage(sender, receiver, subject, body);
  }
  sentMessage(sender: string, receiver: string, subject: string, body: string) {
    return "message send by gmail";
  }
}

class YahooMail implements IEmail {
  sendEmail(
    sender: string,
    receiver: string,
    subject: string,
    body: string
  ): string {
    this.configuration(sender);
    this.settingMessage(subject, body);
    return this.sent(receiver);
  }

  configuration(sender: string) {}

  settingMessage(subject: string, body: string) {}

  sent(receiver: string) {
    return "message send by yahoomail";
  }
}

class Office365 implements IEmail {
  sendEmail(
    sender: string,
    receiver: string,
    subject: string,
    body: string
  ): string {
    this.config({ sender, subject, body });
    return this.sentCommunication(receiver);
  }

  config(props: { sender: string; subject: string; body: string }) {}

  sentCommunication(receiver: string) {
    return "message send by office365";
  }
}

class User {
  private readonly userId: number;
  private name: string;
  private lastname: string;
  private email: string;

  constructor(name: string, lastname: string, email: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.userId = new Date().getTime();
  }

  save() {
    const provider: IEmail = new Office365();
    console.log(
      provider.sendEmail(
        "no-reply@email.com",
        this.email,
        "Welcome",
        "Welcome to our community"
      )
    );
    //const gmail = new GMail()
    //console.log(gmail.sentMessage("no-reply@email.com", this.email, "Welcome", "Welcome to our community"))
    //const yahoomail = new YahooMail()
    //yahoomail.configuration("no-reply@email.com")
    //yahoomail.settingMessage("Welcome", "Welcome to our community")
    //console.log(yahoomail.sent(this.email))
    //const office365 = new Office365()
    //office365.config({sender: "no-reply@email.com", subject: "Welcome", body: "Welcome to our community" })
    //console.log(office365.sentCommunication(this.email))
  }
}

const user = new User("Fabiola", "Suárez", "fabiola.suarez@correo.cm");
user.save();
