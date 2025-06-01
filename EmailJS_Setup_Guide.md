# 📧 Setup EmailJS - Panduan Lengkap

## 🚀 Langkah 1: Daftar di EmailJS

1. **Kunjungi website EmailJS**: https://www.emailjs.com/
2. **Daftar akun gratis** dengan email Anda
3. **Verifikasi email** yang dikirim ke inbox Anda

## ⚙️ Langkah 2: Setup Email Service

1. **Masuk ke Dashboard EmailJS**
2. **Pilih "Email Services"** di sidebar
3. **Klik "Add New Service"**
4. **Pilih Gmail** (atau provider email lain yang Anda gunakan)
5. **Klik "Connect Account"** dan login dengan Gmail Anda
6. **Salin "Service ID"** yang muncul (contoh: `service_abc123`)

## 📝 Langkah 3: Buat Email Template

1. **Pilih "Email Templates"** di sidebar
2. **Klik "Create New Template"**
3. **Isi template seperti ini**:

```
Subject: Pesan Baru dari Website Portfolio - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Pesan:
{{message}}

---
Dikirim melalui form kontak website portfolio Moch Yunus
```

4. **Klik "Save"** dan **salin "Template ID"** (contoh: `template_xyz789`)

## 🔑 Langkah 4: Dapatkan Public Key

1. **Masuk ke "Account"** > **"General"**
2. **Salin "Public Key"** (contoh: `user_abcdef123456`)

## 🛠️ Langkah 5: Update Kode Website

Buka file `script.js` dan ganti nilai berikut:

```javascript
// Ganti di bagian initContactForm()
emailjs.init("user_abcdef123456"); // Ganti dengan Public Key Anda

// Ganti di bagian emailjs.send()
const response = await emailjs.send(
    'service_abc123',    // Ganti dengan Service ID Anda
    'template_xyz789',   // Ganti dengan Template ID Anda
    templateParams
);
```

## 🎯 Langkah 6: Test Form

1. **Buka website** Anda di browser
2. **Isi form contact** dengan data test
3. **Klik "Send Message"**
4. **Cek email** `moch.yunus.am@gmail.com` untuk menerima pesan

## ✅ Fitur yang Sudah Tersedia

- ✅ **Loading animation** saat mengirim
- ✅ **Success message** saat berhasil
- ✅ **Error handling** jika gagal
- ✅ **Form validation** otomatis
- ✅ **Rate limiting** protection
- ✅ **Responsive design**

## 🆓 Batasan Free Plan EmailJS

- **200 email per bulan** gratis
- **Upgrade ke paid plan** jika butuh lebih banyak
- **No branding** di email (paid plan)

## 🛡️ Tips Keamanan

1. **Jangan share** Service ID dan Template ID di public
2. **Gunakan domain restriction** di EmailJS dashboard
3. **Monitor usage** di dashboard EmailJS
4. **Setup reCAPTCHA** jika diperlukan (optional)

## 🚨 Troubleshooting

### Error 429 (Too Many Requests)
- **Tunggu beberapa menit** sebelum coba lagi
- **Upgrade plan** jika sering terjadi

### Error 400 (Bad Request)
- **Periksa Template ID** dan **Service ID**
- **Pastikan email template** sudah benar

### Email tidak masuk
- **Cek folder Spam/Junk**
- **Verifikasi email service** di EmailJS
- **Test dengan email lain**

---

## 🎉 Selamat!

Form contact Anda sekarang sudah bisa mengirim email sungguhan! 
Pengunjung website bisa langsung menghubungi Anda melalui form contact.

### 📞 Kontak Tambahan
Jika ada masalah, hubungi:
- **Email**: moch.yunus.am@gmail.com
- **Instagram**: @mchynss
- **Telegram**: @wleooowleoooooo
