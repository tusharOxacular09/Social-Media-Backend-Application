export const forgotPassword = (otp, name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Your One-Time Password (OTP)</h2>
        </div>
        <p>Dear ${name || "user"},</p>
        <p>To ensure the security of your account, please use the One-Time Password (OTP) below to reset your password. This OTP is valid for the next 2 minutes.</p>
        <div class="otp-code">${otp}</div>
        <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        <p>Thank you for prioritizing your account's security.</p>
        <div class="footer">
            Best regards,<br>
            SocialMedia.io<br>
            social.media@gmail.com
        </div>
    </div>
</body>
</html>
`;
