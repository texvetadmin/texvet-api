import NodeMailer from 'nodemailer';

class EmailService {
  constructor(smtpHost, smtpUsername, smtpPassword, smtpPort, smtpTls) {
    this.smtpHost = smtpHost;
    this.smtpUsername = smtpUsername;
    this.smtpPassword = smtpPassword;
    this.smtpPort = smtpPort;
    this.smtpTls = smtpTls;
  }

  _smtpConnect = () => new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    try {
      resolve(NodeMailer.createTransport({
        host: this.smtpHost,
        port: this.smtpPort,
        secure: this.smtpTls,
        auth: {
          user: this.smtpUsername,
          pass: this.smtpPassword,
        },
      }));
    } catch (err) {
      reject(err);
    }
  });

  sendEmail = async req => this._smtpConnect()
    .then(transporter => new Promise((resolve, reject) => {
      transporter.sendMail({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        html: req.body.body,
      }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    }));
}

export default new EmailService(
  process.env.EMAIL_SMTP_HOST,
  process.env.EMAIL_SMTP_USERNAME,
  process.env.EMAIL_SMTP_PASSWORD,
  process.env.EMAIL_SMTP_PORT,
  process.env.EMAIL_SMTP_TLS === 'true',
);
