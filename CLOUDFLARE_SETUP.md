# Cloudflare Pages Setup Guide

## Overview
This guide explains how to deploy the Base44 app to Cloudflare Pages with the domain `www2.metaconsultas.com.br`.

## Prerequisites
- Cloudflare account with access to metaconsultas.com.br domain
- GitHub repository connected to Cloudflare
- Base44 app deployed and accessible

## Setup Steps

### 1. Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Connect to Git**
4. Select the `metaconsultaseexames` organization
5. Select `novosite_metaconsultas` repository
6. Click **Connect**

### 2. Configure Build Settings

When prompted, set the following:

- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**:
  ```
  VITE_BASE44_APP_ID = <your-app-id>
  VITE_BASE44_APP_BASE_URL = https://<your-app>.base44.app
  ```

### 3. Add Custom Domain

1. After deployment, go to your Pages project settings
2. Click **Custom domains**
3. Click **Add custom domain**
4. Enter: `www2.metaconsultas.com.br`
5. Follow the verification steps
6. Update DNS records if needed (Cloudflare will provide instructions)

### 4. DNS Configuration

If you manage the domain via Cloudflare:

1. Go to your domain's DNS settings
2. Add a CNAME record:
   - **Name**: `www2`
   - **Content**: `novosite-metaconsultas.pages.dev`
   - **Proxy status**: Proxied (orange cloud)
   - **TTL**: Auto

### 5. SSL/TLS

Cloudflare automatically provides an SSL certificate. No additional configuration needed.

### 6. Base44 Environment Variables

Set these in Cloudflare Pages project environment variables:

**Production:**
```
VITE_BASE44_APP_ID = <production-app-id>
VITE_BASE44_APP_BASE_URL = https://<production-app>.base44.app
VITE_ENVIRONMENT = production
```

**Preview/Staging:**
```
VITE_BASE44_APP_ID = <staging-app-id>
VITE_BASE44_APP_BASE_URL = https://<staging-app>.base44.app
VITE_ENVIRONMENT = staging
```

## Deployment

### Manual Deployment
- Any push to `main` branch automatically triggers a new deployment
- Deployments are visible in the **Deployments** tab

### Preview Deployments
- Pull requests generate preview deployments
- URLs are automatically generated for testing

## Troubleshooting

### Build Fails
- Check build logs in Cloudflare Pages dashboard
- Ensure `npm run build` works locally: `npm run build`
- Verify all environment variables are set

### Site Not Loading
- Check DNS propagation (can take up to 48 hours)
- Verify custom domain is added to Pages project
- Check SSL certificate status

### Base44 API Not Working
- Verify `VITE_BASE44_APP_BASE_URL` is correct
- Check CORS settings in Base44
- Ensure Base44 app is deployed and accessible

## Rollback

To revert to a previous deployment:

1. Go to **Deployments** tab
2. Find the previous working deployment
3. Click the three-dot menu
4. Select **Rollback to this deployment**

## Performance

Cloudflare Pages provides:
- Global CDN caching
- Automatic minification
- Gzip compression
- HTTP/2 Server Push

All enabled by default.

## References

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Base44 Deployment Guide](https://docs.base44.com/Integrations/Using-GitHub)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
