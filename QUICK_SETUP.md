# ✅ EmailJS Setup Checklist

## 🎯 Quick Setup (5 minutes)

### [ ] 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up and verify email

### [ ] 2. Connect Gmail Service  
- Dashboard → Email Services → Add New Service
- Choose Gmail → Connect account
- **Copy Service ID**: `service_________`

### [ ] 3. Create Email Template
- Dashboard → Email Templates → Create New Template
- **Subject**: `New Contact Form Message: {{subject}}`
- **Content**: 
```
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Reply to: {{reply_to}}
```
- **Copy Template ID**: `template_________`

### [ ] 4. Get Public Key
- Dashboard → Account → Public Key
- **Copy Public Key**: `user_________`

### [ ] 5. Update Configuration
- Open `emailjs-config.js`
- Replace placeholders with actual values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "user_________",      // Step 4
    SERVICE_ID: "service_________",   // Step 2  
    TEMPLATE_ID: "template_________"  // Step 3
};
```

### [ ] 6. Test Contact Form
- Open http://localhost:8000
- Fill out contact form
- Submit and check email inbox

### [ ] 7. Security Settings (Optional)
- Dashboard → Account → Security
- Add your domain for protection

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| No email received | Check spam folder, verify Gmail connection |
| "Service not configured" | Check Service ID in emailjs-config.js |
| "Template not found" | Check Template ID in emailjs-config.js |
| Console errors | Check Public Key in emailjs-config.js |
| Rate limit message | Wait 1 minute, this is normal protection |

---

## 📋 Files to Remember

- **`emailjs-config.js`** - Your credentials (update this!)
- **`Implementation_Summary.md`** - Complete documentation
- **`EmailJS_Complete_Setup.md`** - Detailed setup guide
- **`test-form.html`** - Test validation features

---

## 🎉 You're Done!

After updating `emailjs-config.js`, your contact form will send real emails!

**Free Plan**: 200 emails/month (perfect for personal sites)
