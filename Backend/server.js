import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify()
  .then(() => console.log('SMTP connection verified'))
  .catch((err) => console.error('SMTP connection failed:', err.message));

function buildEmailHtml(role, form) {
  const roleTitles = {
    beta: 'Beta Tester Application',
    investor: 'Investor Inquiry',
    product: 'Product Inquiry',
    other: 'General Inquiry',
  };

  const title = roleTitles[role] || 'Contact Form Submission';

  const fieldLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    roleTitle: 'Role/Title',
    facilityName: 'Facility Name',
    facilityType: 'Facility Type',
    city: 'City',
    country: 'Country',
    memberRange: 'Member Count',
    trainingTracking: 'Training Tracking',
    painPoint: 'Pain Point',
    startTimeline: 'Start Timeline',
    betaNotes: 'Additional Notes',
    firmName: 'Firm/Fund Name',
    investorType: 'Investor Type',
    checkSize: 'Check Size',
    thesisAlignment: 'Thesis Alignment',
    investorInterest: 'Interest',
    investorNotes: 'Investor Notes',
    ndaAccepted: 'NDA Accepted',
    company: 'Company/Organisation',
    inquiryType: 'Inquiry Type',
    deploymentScale: 'Deployment Scale',
    integrations: 'Integrations',
    decisionTimeline: 'Decision Timeline',
    productQuestion: 'Product Question/Requirements',
    otherOrg: 'Organisation',
    otherTopic: 'Topic',
    otherMessage: 'Message',
  };

  const relevantFields = {
    beta: ['firstName', 'lastName', 'email', 'roleTitle', 'facilityName', 'facilityType', 'city', 'country', 'memberRange', 'trainingTracking', 'painPoint', 'startTimeline', 'betaNotes'],
    investor: ['firstName', 'lastName', 'email', 'firmName', 'investorType', 'checkSize', 'thesisAlignment', 'investorInterest', 'investorNotes', 'ndaAccepted'],
    product: ['firstName', 'lastName', 'email', 'company', 'inquiryType', 'deploymentScale', 'integrations', 'decisionTimeline', 'productQuestion'],
    other: ['firstName', 'lastName', 'email', 'otherOrg', 'otherTopic', 'otherMessage'],
  };

  const fields = relevantFields[role] || Object.keys(form);

  const rows = fields
    .filter((key) => form[key] !== undefined && form[key] !== '' && form[key] !== null)
    .map((key) => {
      let value = form[key];
      if (Array.isArray(value)) value = value.join(', ');
      if (typeof value === 'boolean') value = value ? 'Yes' : 'No';
      const label = fieldLabels[key] || key;
      return `<tr><td style="padding:10px 14px;font-weight:600;color:#333;border-bottom:1px solid #eee;width:200px;">${label}</td><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;">${value}</td></tr>`;
    })
    .join('');

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a0a0a;padding:28px 32px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;color:#4dffef;font-size:22px;font-weight:600;">${title}</h1>
        <p style="margin:6px 0 0;color:#888;font-size:13px;">New submission from genyxfitness.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e5e5;border-top:none;">
        ${rows}
      </table>
      <div style="background:#f8f8f8;padding:16px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
        <p style="margin:0;color:#999;font-size:11px;">This email was sent automatically from the Genyx contact form.</p>
      </div>
    </div>
  `;
}

app.post('/api/contact', async (req, res) => {
  const { role, form } = req.body;

  if (!role || !form || !form.email || !form.firstName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const roleTitles = {
    beta: 'Beta Tester Application',
    investor: 'Investor Inquiry',
    product: 'Product Inquiry',
    other: 'General Inquiry',
  };

  try {
    await transporter.sendMail({
      from: `"Genyx Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: form.email,
      subject: `${roleTitles[role] || 'Contact'} — ${form.firstName} ${form.lastName || ''}`.trim(),
      html: buildEmailHtml(role, form),
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Genyx backend running on http://localhost:${PORT}`);
});
