# DAVPoker Android Build Guide

## Prerequisites

1. **Node.js & npm** - v18 or higher
2. **Java Development Kit (JDK)** - v11 or higher
3. **Android SDK** - API level 31+
4. **Expo CLI** - `npm install -g expo-cli`
5. **EAS CLI** - `npm install -g eas-cli`

## Local Development Setup

### 1. Install Dependencies

```bash
cd davpoker-mobile
npm install
```

### 2. Configure EAS

```bash
eas login
```

Enter your Expo credentials when prompted.

### 3. Initialize EAS Project

```bash
eas build:configure
```

This creates the EAS configuration for your project.

## Building for Android

### Development Build (APK)

For testing and development:

```bash
npm run build:android
```

This creates an APK that can be installed on Android devices for testing.

### Release Build (AAB)

For Google Play Store submission:

```bash
npm run build:android:release
```

This creates an Android App Bundle (AAB) optimized for Play Store distribution.

## GitHub Actions Setup

### 1. Create EAS Token

1. Go to [Expo Dashboard](https://expo.dev)
2. Navigate to Account Settings → Tokens
3. Create a new token with `eas` scope
4. Copy the token

### 2. Add GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- **EAS_TOKEN**: Your Expo EAS token
- **GOOGLE_PLAY_JSON_KEY**: JSON key for Google Play Service Account (optional, for auto-submission)
- **SLACK_WEBHOOK**: Slack webhook URL for notifications (optional)

### 3. Trigger Builds

#### Automatic Builds

Builds are triggered automatically on:
- Push to `main` or `master` branch (creates preview APK)
- Push of git tags starting with `v` (creates production AAB)

#### Manual Builds

1. Go to GitHub Actions tab
2. Select "Android Release Build" workflow
3. Click "Run workflow"
4. Select release type: alpha, beta, or production

## Release Process

### 1. Prepare Release

```bash
# Update version in app.json
# Update CHANGELOG.md
# Commit changes
git add .
git commit -m "Release v1.0.0"
```

### 2. Create Git Tag

```bash
git tag -a v1.0.0 -m "DAVPoker Android v1.0.0"
git push origin v1.0.0
```

### 3. Monitor Build

1. Go to GitHub Actions
2. Watch the "Android Release Build" workflow
3. Build will automatically:
   - Compile APK and AAB
   - Create GitHub Release
   - Submit to Google Play Store (if configured)

### 4. Verify Release

1. Check GitHub Releases page
2. Download APK for manual testing
3. Verify Google Play Store listing (if auto-submitted)

## Signing Configuration

### Keystore Setup

For production builds, you need a signing keystore:

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore davpoker.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias davpoker-key

# Store keystore securely in GitHub Secrets
# Base64 encode the keystore:
base64 davpoker.keystore | pbcopy
```

### Configure in eas.json

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "aab",
        "gradleCommand": ":app:bundleRelease",
        "env": {
          "KEYSTORE_PATH": "davpoker.keystore",
          "KEYSTORE_PASSWORD": "$KEYSTORE_PASSWORD",
          "KEY_ALIAS": "davpoker-key",
          "KEY_PASSWORD": "$KEY_PASSWORD"
        }
      }
    }
  }
}
```

## Troubleshooting

### Build Fails with "Out of Memory"

Increase Java heap size:

```bash
export _JAVA_OPTIONS="-Xmx4096m"
npm run build:android
```

### EAS Login Issues

Clear cache and re-authenticate:

```bash
eas logout
eas login
```

### Gradle Build Errors

Clear Gradle cache:

```bash
cd android
./gradlew clean
cd ..
npm run build:android
```

## Testing the APK

### Install on Device

```bash
adb install -r build-artifacts/davpoker.apk
```

### Run on Emulator

```bash
adb install -r build-artifacts/davpoker.apk
adb shell am start -n com.davpoker.mobile/.MainActivity
```

## Google Play Store Submission

### Prerequisites

1. Google Play Developer Account ($25 one-time fee)
2. Service Account JSON key
3. App signing certificate

### Automatic Submission

Set `GOOGLE_PLAY_JSON_KEY` secret in GitHub and builds tagged with `v*` will auto-submit.

### Manual Submission

1. Download AAB from GitHub Release
2. Go to [Google Play Console](https://play.google.com/console)
3. Create new app or update existing
4. Upload AAB to Internal Testing track
5. Promote to Beta, then Production

## Monitoring & Analytics

### EAS Build Dashboard

Monitor builds at: https://expo.dev/builds

### GitHub Actions

Monitor CI/CD at: GitHub repository → Actions tab

### Slack Notifications

Receive build status updates in Slack (if webhook configured)

## Version Management

Version is managed in `app.json`:

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

Increment for each release:
- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features
- **Major** (2.0.0): Breaking changes

## Support

For issues or questions:
1. Check [Expo Documentation](https://docs.expo.dev)
2. Review [EAS Build Docs](https://docs.expo.dev/build/introduction/)
3. Check GitHub Issues
4. Contact support@davpoker.com
