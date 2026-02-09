# Deployment Configuration Guide

## Issue: Contact Form Not Submitting After Deployment

The contact form requires email credentials to work. When deploying, `.env.local` file is NOT used in production. You must configure environment variables on your deployment platform.

---

## Solution: Set Environment Variables on Your Deployment Platform

### If deploying to **Vercel**: ✅ RECOMMENDED

1. Go to your project dashboard on **vercel.com**
2. Click **Settings** → **Environment Variables**
3. Add these three variables for **Production** environment:
   - `EMAIL_USER` = `m.shammas2k6@gmail.com`
   - `EMAIL_PASSWORD` = `arvj oeqe prxv bjhj` (your Gmail app password)
   - `OWNER_EMAIL` = `m.shammas2k6@gmail.com`
4. Click "Save"
5. **Redeploy your application** (Go to Deployments → Click the three-dot menu → Redeploy)

**Note:** Environment variables must be set BEFORE deployment for them to take effect. If you forgot this step, you must redeploy after setting them.

### If deploying to **Netlify**:

1. Go to your site settings on **netlify.com**
2. Click **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add the three variables listed above
5. Redeploy

### If deploying to **AWS Amplify**:

1. In the Amplify console, go to **App settings** → **Environment variables**
2. Add the three variables
3. Redeploy

### If deploying to **Railway, Heroku, or Other Platforms**:

Follow their documentation for setting environment variables. The variable names must be:
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `OWNER_EMAIL`

---

## Getting Gmail App Password

If you don't have the app password yet:

1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password
4. Use that password as `EMAIL_PASSWORD`

**Note**: This requires 2FA to be enabled on your Gmail account.

---

## Testing Locally

To test locally before deploying:

1. Ensure `.env.local` is in the `Frontend` folder with:
   ```
   EMAIL_USER=m.shammas2k6@gmail.com
   EMAIL_PASSWORD=arvj oeqe prxv bjhj
   OWNER_EMAIL=m.shammas2k6@gmail.com
   ```

2. Run: `pnpm install && pnpm run build && pnpm run start`
3. Test the form at `http://localhost:3000`

---

## Troubleshooting

### Form submits but no email received:
- Check email credentials are correct
- Verify Gmail 2FA is enabled
- Check spam folder for test emails
- Ensure the app password is correct (not your regular password)

### Form shows "Email service not configured":
- **Environment variables are NOT set on deployment platform**
- Follow the platform-specific steps above
- **IMPORTANT**: You must REDEPLOY after setting environment variables

### "Failed to send email" error:
- Check the Vercel deployment logs for the specific error
- Go to Vercel Dashboard → Deployments → Click on your deployment → Functions tab
- Check the runtime logs for email-related errors
- Verify all three environment variables are correctly set

### Deployment fails during build:
- Make sure dependencies are installed: `pnpm install`
- Check that `route.ts` exists in `Frontend/app/api/contact/` (should be `.ts`, not `.js`)
- Ensure `@types/nodemailer` is in devDependencies

### Port or runtime errors on Vercel:
- Check that `next.config.mjs` doesn't have conflicting settings
- Verify the build output in Vercel logs
