# DAVPoker Android App - Deployment Guide

Complete guide for deploying DAVPoker Android app to Google Play Store with automated GitHub Actions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Expo/EAS Configuration](#exposeas-configuration)
4. [Google Play Store Setup](#google-play-store-setup)
5. [Automated Release Workflow](#automated-release-workflow)
6. [Manual Deployment](#manual-deployment)
7. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

## Prerequisites

### Required Accounts

- GitHub account with repository access
- Expo account (free tier sufficient)
- Google Play Developer account ($25 one-time fee)
- Android signing certificate

### Required Tools

- Node.js 18+
- Git
- Java Development Kit (JDK) 11+
- Android SDK (optional for local builds)

## GitHub Setup

### 1. Create GitHub Secrets

Navigate to: **Repository Settings → Secrets and variables → Actions**

Add the following secrets:

#### EAS_TOKEN (Required)

```bash
# Generate at https://expo.dev/settings/tokens
# Create new token with 'eas' scope
```

#### GOOGLE_PLAY_JSON_KEY (Optional, for auto-submission)

```bash
# Create Service Account in Google Cloud Console
# Download JSON key file
# Base64 encode the file:
cat service-account-key.json | base64 | pbcopy
```

#### SLACK_WEBHOOK (Optional, for notifications)

```bash
# Create incoming webhook in Slack workspace
# Copy webhook URL
```

### 2. Enable Workflow Permissions

**Settings → Actions → General → Workflow permissions**

Select: "Read and write permissions"

## Expo/EAS Configuration

### 1. Authenticate with Expo

```bash
npm install -g eas-cli
eas login
# Enter your Expo credentials
```

### 2. Initialize EAS Build

```bash
cd davpoker-mobile
eas build:configure
```

This creates/updates `eas.json` with build profiles.

### 3. Update app.json

Ensure your `app.json` includes:

```json
{
  "expo": {
    "name": "DAVPoker",
    "slug": "davpoker",
    "version": "1.0.0",
    "android": {
      "package": "com.davpoker.mobile",
      "versionCode": 1,
      "permissions": ["CAMERA", "INTERNET"]
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

## Google Play Store Setup

### 1. Create Google Play Developer Account

1. Visit [Google Play Console](https://play.google.com/console)
2. Pay $25 registration fee
3. Complete account setup

### 2. Create Application

1. Click "Create app"
2. Enter app name: "DAVPoker"
3. Select category: Games → Card
4. Fill in required information

### 3. Generate Signing Certificate

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore davpoker.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias davpoker-key \
  -keypass "YOUR_KEY_PASSWORD" \
  -storepass "YOUR_STORE_PASSWORD"

# Verify keystore
keytool -list -v -keystore davpoker.keystore
```

### 4. Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable "Google Play Android Developer API"
4. Create Service Account:
   - Go to Service Accounts
   - Create new service account
   - Grant role: "Editor"
   - Create JSON key
5. In Google Play Console:
   - Settings → API access
   - Add service account
   - Grant "Admin" role

### 5. Upload Signing Certificate

1. In Google Play Console → Your app → Release → Setup
2. Upload the keystore file
3. Save credentials securely

## Automated Release Workflow

### Workflow Trigger Events

The GitHub Actions workflow (`android-release.yml`) is triggered by:

1. **Push to main/master** → Creates preview APK
2. **Git tag push (v*)** → Creates production AAB + submits to Play Store
3. **Manual trigger** → Choose release type (alpha, beta, production)

### Release Process

#### Step 1: Prepare Release

```bash
# Update version in app.json
# Update CHANGELOG.md
# Commit changes
git add .
git commit -m "Release v1.0.0"
```

#### Step 2: Create Git Tag

```bash
# Create annotated tag
git tag -a v1.0.0 -m "DAVPoker Android v1.0.0"

# Push tag to GitHub
git push origin v1.0.0
```

#### Step 3: Monitor Build

1. Go to GitHub → Actions
2. Watch "Android Release Build" workflow
3. Workflow will:
   - Build APK and AAB via EAS Build
   - Create GitHub Release
   - Upload artifacts
   - Submit to Google Play Store (if configured)

#### Step 4: Verify Release

1. **GitHub Release**: Check [Releases page](https://github.com/cptleftnut/DAVPoker/releases)
2. **Google Play Store**: Check [Play Console](https://play.google.com/console)
3. **Test Build**: Download APK and test on device

### Workflow Configuration

The workflow is defined in `.github/workflows/android-release.yml`:

```yaml
on:
  push:
    branches: [main, master]
    tags: ['v*']
  workflow_dispatch:
    inputs:
      release_type: [alpha, beta, production]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Setup Java
      - Install dependencies
      - Build APK/AAB via EAS
      - Create GitHub Release
      - Submit to Play Store
      - Notify Slack
```

## Manual Deployment

### Local APK Build

```bash
# Install dependencies
npm install

# Build APK
npm run build:android

# Install on device
adb install -r build-artifacts/davpoker.apk
```

### Local AAB Build

```bash
# Build AAB for Play Store
npm run build:android:release

# Manual submission to Play Store:
# 1. Go to Play Console
# 2. Release → Production
# 3. Upload AAB file
# 4. Review and publish
```

### Manual Play Store Submission

1. **Go to Play Console**
   - Select your app
   - Release → Production

2. **Upload Build**
   - Click "Create new release"
   - Upload AAB file
   - Add release notes

3. **Review**
   - Check app details
   - Review content rating
   - Verify pricing

4. **Publish**
   - Click "Review release"
   - Click "Start rollout to Production"

## Monitoring & Troubleshooting

### GitHub Actions Logs

1. Go to **Actions** tab
2. Select "Android Release Build"
3. Click on workflow run
4. View logs for each step

### Common Issues

#### Build Fails: "Out of Memory"

```bash
export _JAVA_OPTIONS="-Xmx4096m"
npm run build:android
```

#### EAS Login Fails

```bash
eas logout
eas login
# Re-enter credentials
```

#### Play Store Submission Fails

1. Check Service Account has correct permissions
2. Verify signing certificate is valid
3. Check app version code is incremented

### Monitoring Builds

#### EAS Build Dashboard

- Visit: https://expo.dev/builds
- View all builds
- Download artifacts
- Check build logs

#### GitHub Actions

- Repository → Actions tab
- View workflow runs
- Check build status
- Download artifacts

### Slack Notifications

If webhook configured, receive notifications:

- Build started
- Build completed (success/failure)
- Deployment status
- Play Store submission status

## Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features
- **PATCH** (1.0.1): Bug fixes

### Update Version

1. **app.json**
   ```json
   {
     "expo": {
       "version": "1.0.0",
       "android": {
         "versionCode": 1
       }
     }
   }
   ```

2. **Increment versionCode** for each release
   - versionCode must always increase
   - Used by Play Store for updates

3. **Create git tag**
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

## Release Checklist

Before releasing, verify:

- [ ] All tests passing
- [ ] Version updated in app.json
- [ ] CHANGELOG.md updated
- [ ] Git tag created (v*.*.*)
- [ ] GitHub secrets configured
- [ ] EAS token valid
- [ ] Google Play credentials valid
- [ ] Release notes prepared
- [ ] Screenshots/preview images ready

## Post-Release

### Monitor Analytics

1. **Google Play Console**
   - Check install numbers
   - Monitor crash reports
   - Review user ratings

2. **Expo Dashboard**
   - Check build success rate
   - Monitor performance

### Respond to Reviews

1. Reply to user reviews on Play Store
2. Fix reported issues
3. Release patch updates if needed

### Update Documentation

1. Update README with new features
2. Update CHANGELOG
3. Create release notes

## Support & Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## FAQ

**Q: How often can I release?**
A: As often as needed. No restrictions on release frequency.

**Q: Can I rollback a release?**
A: Yes, on Play Store you can rollback to previous version.

**Q: How long does review take?**
A: Usually 2-4 hours, sometimes up to 24 hours.

**Q: Can I test before publishing?**
A: Yes, use Internal Testing or Beta tracks first.

**Q: What if build fails?**
A: Check logs, fix issues, push new tag to retry.
