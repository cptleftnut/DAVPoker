# GitHub Setup Guide - DAVPoker Android App

Complete instructions for setting up GitHub Actions workflows and deploying to Google Play Store.

## Overview

This guide covers:
1. Repository configuration
2. GitHub Secrets setup
3. Workflow activation
4. First release process

## Step 1: Repository Settings

### Enable GitHub Actions

1. Go to your repository: https://github.com/cptleftnut/DAVPoker
2. Navigate to **Settings → Actions → General**
3. Under "Actions permissions", select:
   - **Allow all actions and reusable workflows**
4. Under "Workflow permissions", select:
   - **Read and write permissions**
   - Check "Allow GitHub Actions to create and approve pull requests"
5. Click **Save**

## Step 2: Add GitHub Secrets

### Required Secrets

Navigate to **Settings → Secrets and variables → Actions** and add:

#### 1. EAS_TOKEN (Required)

This token authenticates with Expo's build service.

**How to get it:**
1. Go to https://expo.dev/settings/tokens
2. Click "Create Token"
3. Name: `github-actions`
4. Scope: Select all scopes (or at minimum `eas`)
5. Copy the token

**Add to GitHub:**
1. Click "New repository secret"
2. Name: `EAS_TOKEN`
3. Value: Paste the token
4. Click "Add secret"

#### 2. GOOGLE_PLAY_JSON_KEY (Optional, for auto-submission)

This enables automatic submission to Google Play Store.

**How to get it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project (or select existing)
3. Enable "Google Play Android Developer API"
4. Go to **Service Accounts**
5. Create new service account:
   - Name: `github-actions`
   - Grant role: `Editor`
6. Create JSON key:
   - Click on service account
   - Go to **Keys** tab
   - Click "Add Key" → "Create new key"
   - Select **JSON**
   - Download the key file
7. Base64 encode the key:
   ```bash
   cat ~/Downloads/service-account-key.json | base64
   ```
8. Copy the encoded output

**Add to GitHub:**
1. Click "New repository secret"
2. Name: `GOOGLE_PLAY_JSON_KEY`
3. Value: Paste the base64-encoded key
4. Click "Add secret"

**In Google Play Console:**
1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Go to **Settings → API access**
4. Click "Link a Google Cloud project"
5. Add the service account with **Admin** role

#### 3. SLACK_WEBHOOK (Optional, for notifications)

Get build status notifications in Slack.

**How to get it:**
1. Go to your Slack workspace
2. Create incoming webhook:
   - Go to https://api.slack.com/apps
   - Create New App → From scratch
   - Name: `DAVPoker`
   - Workspace: Select your workspace
   - Go to **Incoming Webhooks**
   - Click "Add New Webhook to Workspace"
   - Select channel: `#deployments` (or create new)
   - Copy the webhook URL

**Add to GitHub:**
1. Click "New repository secret"
2. Name: `SLACK_WEBHOOK`
3. Value: Paste the webhook URL
4. Click "Add secret"

## Step 3: Verify Workflows

After pushing to repository, verify workflows are present:

1. Go to repository
2. Navigate to **.github/workflows**
3. You should see:
   - `android-release.yml` - Main build workflow
   - `test.yml` - Testing workflow
   - `code-quality.yml` - Code quality checks

### Enable Workflows

1. Go to **Actions** tab
2. You should see workflows listed:
   - Android Release Build
   - Test & Lint
   - Code Quality
3. If disabled, click "Enable" on each

## Step 4: First Release

### Create First Release Tag

```bash
# Clone if you haven't already
git clone https://github.com/cptleftnut/DAVPoker.git
cd DAVPoker

# Make sure you're on main/master
git checkout main

# Create annotated tag
git tag -a v1.0.0 -m "DAVPoker Android v1.0.0 - Initial Release"

# Push tag to GitHub
git push origin v1.0.0
```

### Monitor Build

1. Go to **Actions** tab
2. You should see "Android Release Build" workflow running
3. Click on it to view logs
4. Workflow will:
   - Build APK via EAS Build
   - Build AAB via EAS Build
   - Create GitHub Release
   - Submit to Google Play Store (if configured)
   - Send Slack notification

### Check Results

**GitHub Release:**
- Go to **Releases**
- You should see v1.0.0 with APK/AAB artifacts

**Google Play Store:**
- Go to [Play Console](https://play.google.com/console)
- Select DAVPoker app
- Check **Release → Production** for new build

**Slack:**
- Check your Slack channel for build notification

## Troubleshooting

### Workflow Not Running

**Problem:** Pushed tag but workflow didn't start

**Solution:**
1. Check **Settings → Actions → General** - permissions are set
2. Verify tag was pushed: `git push origin v1.0.0`
3. Check **Actions** tab for any errors
4. Try manual trigger: Go to **Actions** → **Android Release Build** → **Run workflow**

### Build Fails: "EAS_TOKEN not found"

**Problem:** Workflow can't authenticate with Expo

**Solution:**
1. Verify `EAS_TOKEN` secret is added
2. Check token is valid: `eas whoami` (locally)
3. Create new token if expired
4. Update secret in GitHub

### Build Fails: "Out of Memory"

**Problem:** Java heap runs out of memory

**Solution:**
- This is a known issue with large builds
- EAS Build should handle this automatically
- If persists, contact Expo support

### Play Store Submission Fails

**Problem:** Workflow completes but doesn't submit to Play Store

**Solution:**
1. Verify `GOOGLE_PLAY_JSON_KEY` is set (if auto-submission desired)
2. Check service account has correct permissions
3. Verify app exists in Play Console
4. Check app version code is incremented

### Slack Notification Not Received

**Problem:** Build completes but no Slack message

**Solution:**
1. Verify `SLACK_WEBHOOK` is set correctly
2. Check webhook URL is valid
3. Verify bot has permission to post in channel
4. Check Slack workspace settings

## Workflow Triggers

The workflows are triggered by:

### Android Release Build

- **Push to main/master/mobile** → Creates preview APK
- **Git tag push (v*)** → Creates production AAB + submits to Play Store
- **Manual trigger** → Choose release type (alpha, beta, production)

### Test & Lint

- **Push to main/master/mobile/develop**
- **Pull requests** to main/master/mobile

### Code Quality

- **Push to main/master/mobile**
- **Pull requests** to main/master/mobile

## Release Process Summary

1. **Update version** in `app.json`
2. **Update CHANGELOG.md**
3. **Commit changes**: `git commit -m "Release v1.0.0"`
4. **Create tag**: `git tag -a v1.0.0 -m "Release v1.0.0"`
5. **Push tag**: `git push origin v1.0.0`
6. **Monitor**: Go to Actions tab and watch build
7. **Verify**: Check GitHub Releases and Play Store

## Next Steps

After setup is complete:

1. ✅ Create first release tag
2. ✅ Monitor build in Actions
3. ✅ Verify APK/AAB artifacts
4. ✅ Check Google Play Store submission
5. ✅ Test app on device
6. ✅ Monitor analytics and reviews

## Support

For issues:
- Check [Expo Documentation](https://docs.expo.dev)
- Check [GitHub Actions Docs](https://docs.github.com/en/actions)
- Review workflow logs in Actions tab
- Check [Google Play Console Help](https://support.google.com/googleplay/android-developer)

## Security Notes

- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate tokens regularly
- Review workflow permissions
- Monitor Actions logs for suspicious activity
- Keep dependencies updated

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Semantic Versioning](https://semver.org/)
