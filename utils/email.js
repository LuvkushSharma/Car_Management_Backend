const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email ? user.email : "luvkush.sharma8941@gmail.com";
    this.firstName = user.name ? user.name.split(" ")[0] : "User";
    this.otp = user?.otp ? user.otp : "No OTP provided";
    this.url = url;
    this.from = `Luvkush Sharma <${process.env.EMAIL_FROM}>`;
    this.message = user?.message ? user.message : "No message provided";
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASSWORD,
      },
    });
  }

  async sendWelcomeHTML() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Welcome to Car Management Application!",
      text: `Hi ${this.firstName},\n\nWelcome to the Car Management Application! Click here to get started: ${this.url}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Car Management Application, ${this.firstName}!</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f0f0f0;
          }
          h1, h2, h3 {
            font-family: serif;
            margin: 10px 0;
          }
          p {
            margin: 5px 0;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .hero {
            text-align: center;
            margin-bottom: 20px;
          }
          .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .feature {
            text-align: center;
            padding: 10px;
            margin: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
          @media (max-width: 600px) {
            .features {
              flex-direction: column;
            }
            .feature {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo">
              <center><img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1731595108/rtywdq0act2buwp1cxyd.jpg" alt="Car Management Logo" width="200"></center>
            </div>
          </header>
          <main>
            <div class="hero">
              <h1>Welcome to Car Management Application, ${this.firstName}!</h1>
              <p>We're thrilled to have you on board! Start managing your car collection effortlessly with our app.</p>
            </div>
            <div class="features">
              <div class="feature">
                <h3>Add Your Cars</h3>
                <p>Upload details and photos of your cars to keep them organized.</p>
              </div>
              <div class="feature">
                <h3>Manage and Edit</h3>
                <p>Update car information, images, and tags whenever you need.</p>
              </div>
              <div class="feature">
                <h3>Search and Explore</h3>
                <p>Easily search through your car listings using tags and keywords.</p>
              </div>
            </div>
            <p>Ready to get started? Click the button below to complete your profile and start managing your cars.</p>
            <center>
              <a href="${
                this.url
              }" class="button" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px;">Complete Profile</a>
            </center>
          </main>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Car Management Application</p>
          </footer>
        </div>
      </body>
      </html>
      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordResetHTML() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Reset Your Password for Car Management App",
      text: `Hi ${this.firstName},\n\nWe received a request to reset your password for your account on the Car Management App. Click here to reset your password: ${this.url}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password for Car Management App</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
          }
          .text {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .button:hover {
            background-color: #0056b3;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
          }
          .note {
            font-size: 14px;
            color: #555;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <img src="https://luvkush8941.github.io/Groffers/Reset.jpg" alt="Car Management App Logo" class="logo" width="300">
          </header>
          <main class="text">
            <p>Hi ${this.firstName},</p>
            <p>We received a request to reset your password for your Car Management App account. If you did not request this, please ignore this email, and your password will remain the same.</p>
            <p>To reset your password, click the button below:</p>
            <center>
              <a href="${this.url}" class="button">Reset Password</a>
            </center>
            <p class="note">This link will expire in 10 minutes for your security. If you don’t reset your password within this time, you will need to request a new link.</p>
          </main>
          <br>
          <center>
            <img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1731595108/rtywdq0act2buwp1cxyd.jpg" alt="Car Management Security" width="500" height="300"/>
          </center>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Car Management Application</p>
          </footer>
        </div>
      </body>
      </html>
      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendIssuesHTML() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Car Management App: Issue Report",
      text: `Hi Moderators,\n\nWe are currently experiencing some issues. Our team is already working on resolving them. Thank you for your patience, and we apologize for any inconvenience caused.\n\nIssue Details:\n${this.message}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Car Management App: Issue Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
          }
          .text {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #333;
          }
          .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #dc3545;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .button:hover {
            background-color: #c82333;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 30px;
          }
          .issue-details {
            background-color: #f8d7da;
            padding: 15px;
            border-radius: 5px;
            color: #721c24;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <center>
              <img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1731595108/rtywdq0act2buwp1cxyd.jpg" alt="Car Management Logo" class="logo" width="400">
            </center>
          </header>
          <main class="text">
            <p>Dear Moderators,</p>
            <p>We are currently experiencing some issues in the Car Management Application. Our team is actively working to resolve this as soon as possible. Thank you for your understanding.</p>
            <div class="issue-details">
              <p><strong>Issue Details:</strong></p>
              <p>${this.message}</p>
            </div>
            <p>If you have any questions or need further assistance, please reach out to the support team.</p>
            <center>
              <a href="mailto:support@car-management.com" class="button">Contact Support</a>
            </center>
          </main>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Car Management Application</p>
          </footer>
        </div>
      </body>
      </html>
      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendOtpHTML() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Your OTP Code for Car Management App",
      text: `Hi ${this.firstName},\n\nYour OTP code for accessing your account is ${this.otp}. This code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code for Car Management App</title>
        <style>
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            animation: fadeIn 1s ease-in-out;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            width: 150px;
            height: 150px;
            background-image: url('https://res.cloudinary.com/dx2vel6vy/image/upload/v1721925945/car_logo.jpg');
            background-size: cover;
            background-position: center;
            display: inline-block;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          .text {
            font-size: 18px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 30px;
          }
          .otp {
            font-size: 32px;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(45deg, #3498db, #2ecc71);
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            margin: 30px 0;
            letter-spacing: 2px;
            animation: popIn 2s ease-in-out;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 30px;
          }
          .cta {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 0;
            background-color: #3498db;
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s, transform 0.3s;
          }
          .cta:hover {
            background-color: #297cb8;
            transform: scale(1.05);
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          ul li {
            background: #f3f4f6;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <div class="logo"></div>
          </header>
          <main class="text">
            <p>Hi ${this.firstName},</p>
            <p>Your OTP code for accessing your Car Management App account is:</p>
            <div class="otp">${this.otp}</div>
            <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
            <p>Here are some things you can do on our platform:</p>
            <ul>
              <li>Manage your vehicle's service records</li>
              <li>Track upcoming maintenance schedules</li>
              <li>Get alerts for car part replacements</li>
            </ul>
            <a href="https://carmanagementapp.vercel.app/" class="cta">Go to Car Management App</a>
          </main>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Car Management App. All rights reserved.</p>
          </footer>
        </div>
      </body>
      </html>
      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.sendWelcomeHTML();
  }

  async sendPasswordReset() {
    await this.sendPasswordResetHTML();
  }

  async sendIssues() {
    await this.sendIssuesHTML();
  }

  async sendOtp() {
    await this.sendOtpHTML();
  }
};
