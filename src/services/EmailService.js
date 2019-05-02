class EmailService {
  sendEmail = async req => new Promise((resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject(err);
    }
  });
}

export default new EmailService();
