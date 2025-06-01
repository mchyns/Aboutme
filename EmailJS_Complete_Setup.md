# 📧 Complete EmailJS Setup Guide - Real Email Sending

This guide will help you set up EmailJS to make your contact form send real emails.

## 🚀 Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** 
3. Create account with your email
4. Verify your email address

## 📧 Step 2: Connect Your Email Service

1. **Login to EmailJS Dashboard**
2. Go to **"Email Services"** tab
3. Click **"Add New Service"**
4. Choose **"Gmail"** (recommended)
5. Click **"Connect Account"**
6. Login with your Gmail account
7. Allow EmailJS permissions
8. **Copy the Service ID** (something like `service_abc123`)

## 📝 Step 3: Create Email Template

1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. Use this template content:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Content:**
```
You have a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent via your website contact form.
Reply directly to: {{reply_to}}
```

4. **Save the template**
5. **Copy the Template ID** (something like `template_xyz789`)

## 🔑 Step 4: Get Your Public Key

1. Go to **"Account"** tab in EmailJS dashboard
2. Find **"Public Key"** section
3. **Copy your Public Key** (something like `user_abcdef123456`)

## ⚙️ Step 5: Update Your Website Code

Replace the placeholder values in `script.js`:

1. **Find this line:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```
**Replace with:**
```javascript
emailjs.init("user_abcdef123456"); // Your actual public key
```

2. **Find these lines:**
```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID_HERE',  // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID_HERE', // Replace with your EmailJS template ID
    templateParams
);
```
**Replace with:**
```javascript
const response = await emailjs.send(
    'service_abc123',  // Your actual service ID
    'template_xyz789', // Your actual template ID
    templateParams
);
```

## 🧪 Step 6: Test Your Contact Form

1. **Open your website** in a browser
2. **Fill out the contact form** with test data
3. **Submit the form**
4. **Check your email** for the message
5. **Check browser console** for any errors

## 🔒 Step 7: Security Setup (Important!)

1. **Domain Restrictions** (Recommended):
   - In EmailJS dashboard → Account → Security
   - Add your domain (e.g., `yourdomain.com`, `localhost`)
   - This prevents unauthorized use

2. **Rate Limiting**:
   - Already implemented in the code
   - Prevents spam submissions

## 📊 Free Plan Limits

- **200 emails/month** free
- **No credit card required**
- **Perfect for personal websites**

## 🆘 Troubleshooting

### ❌ "Service not configured properly"
- Check your Service ID is correct
- Make sure Gmail service is connected

### ❌ "Template not found"
- Check your Template ID is correct
- Make sure template is saved in EmailJS

### ❌ "Invalid public key"
- Check your Public Key is correct
- Make sure account is verified

### ❌ No email received
- Check spam folder
- Verify email address in EmailJS
- Check browser console for errors

### ❌ CORS errors
- Add your domain to EmailJS whitelist
- Use HTTPS if possible

## 🎯 Quick Configuration Checklist

- [ ] EmailJS account created and verified
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Public key copied
- [ ] Service ID copied  
- [ ] Template ID copied
- [ ] script.js updated with actual IDs
- [ ] Domain added to security settings
- [ ] Test email sent successfully

## 📞 Need Help?

If you encounter issues:

1. **Check EmailJS Dashboard** for service status
2. **Browser Console** for JavaScript errors  
3. **Network Tab** for API call failures
4. **EmailJS Documentation**: https://www.emailjs.com/docs/

---

**🎉 Once configured, your contact form will send real emails directly to your inbox!**
