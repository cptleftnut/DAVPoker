# DAVPoker Mobile - Android Application

AI-Powered Poker Decision Engine for Android devices.

## Features

- **Real-Time Hand Analysis**: Get instant AI recommendations for poker decisions
- **Opponent Tracking**: Build and maintain a database of opponent statistics (VPIP, PFR, 3-bet frequency)
- **Session Analytics**: Track your performance with detailed charts and statistics
- **Bankroll Management**: Monitor your bankroll and get risk management recommendations
- **Hand Range Visualization**: View position-specific hand ranges and equity percentages
- **Offline Support**: Core features work offline with cloud sync when available

## Screenshots

- Hand Analyzer: Real-time AI decision recommendations
- Analytics: Session performance tracking and charts
- Opponent Database: Track opponent statistics and tendencies
- Settings: App preferences and data management

## Installation

### From Google Play Store

Download directly from [Google Play Store](https://play.google.com/store/apps/details?id=com.davpoker.mobile)

### From APK (Manual Installation)

1. Download APK from [GitHub Releases](https://github.com/cptleftnut/DAVPoker/releases)
2. Enable "Install from Unknown Sources" in Android Settings
3. Open APK file and install

### From Source

```bash
# Clone repository
git clone https://github.com/cptleftnut/DAVPoker.git
cd davpoker-mobile

# Install dependencies
npm install

# Build APK
npm run build:android

# Install on device
adb install -r build-artifacts/davpoker.apk
```

## Requirements

- **Android**: 8.0 (API level 26) or higher
- **RAM**: 2GB minimum
- **Storage**: 100MB free space
- **Internet**: Required for AI recommendations and cloud sync

## Configuration

### API Endpoint

The app connects to the DAVPoker backend API. Configure the endpoint in `src/screens/HomeScreen.tsx`:

```typescript
const API_URL = 'https://your-api-endpoint.com';
```

### Backend Setup

Ensure the backend API is running:

```bash
cd ../DAVPoker
pip install -r requirements.txt
python main.py
```

Backend will be available at `http://localhost:8000`

## Development

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

### Setup

```bash
npm install
eas login
```

### Development Server

```bash
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on physical device

### Build

```bash
# Development APK
npm run build:android

# Production AAB
npm run build:android:release
```

See [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) for detailed build instructions.

## Architecture

### Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **UI Components**: Expo Vector Icons, React Native built-ins

### Project Structure

```
davpoker-mobile/
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   ├── OpponentScreen.tsx
│   │   └── SettingsScreen.tsx
│   └── types/             # TypeScript types
├── .github/
│   └── workflows/
│       └── android-release.yml  # CI/CD workflow
└── package.json
```

## API Integration

### Endpoints

The app connects to the DAVPoker backend API:

- `POST /api/v1/scraper/ingest` - Get AI decision for a hand
- `POST /api/v1/scraper/outcome` - Report hand outcome

### Example Request

```typescript
const response = await axios.post(`${API_URL}/api/v1/scraper/ingest`, {
  player_id: 'player_1',
  hand: ['A', 'K'],
  pot_size: 100,
});
```

## Continuous Integration

### GitHub Actions

Automated builds are triggered on:
- Push to `main`/`master` (creates preview APK)
- Push of git tags `v*` (creates production AAB and submits to Play Store)

### Workflow

1. Code pushed to GitHub
2. GitHub Actions runs build job
3. APK/AAB generated via EAS Build
4. Release created on GitHub
5. Auto-submitted to Google Play Store (if tagged)

See [.github/workflows/android-release.yml](./.github/workflows/android-release.yml)

## Secrets & Configuration

### GitHub Secrets Required

- `EAS_TOKEN`: Expo EAS authentication token
- `GOOGLE_PLAY_JSON_KEY`: Google Play Service Account key (for auto-submission)
- `SLACK_WEBHOOK`: Slack webhook for notifications (optional)

### Environment Variables

Create `.env` file:

```
EXPO_PUBLIC_API_URL=https://your-api-endpoint.com
EXPO_PUBLIC_APP_VERSION=1.0.0
```

## Performance

- **APK Size**: ~50-70 MB
- **Memory Usage**: 150-200 MB
- **Startup Time**: 2-3 seconds
- **API Response Time**: 500-1000ms (depends on backend)

## Security

- HTTPS-only API communication
- No sensitive data stored locally
- Secure token storage in device keychain
- Permissions: Camera (for card detection), Internet, Network access

## Permissions

The app requests:
- **CAMERA**: For card detection feature
- **INTERNET**: For API communication
- **ACCESS_NETWORK_STATE**: For connection status

## Troubleshooting

### App Crashes on Startup

1. Clear app cache: Settings → Apps → DAVPoker → Storage → Clear Cache
2. Reinstall app
3. Check backend API is running

### Cannot Connect to API

1. Verify API endpoint is correct in code
2. Check internet connection
3. Verify backend is running and accessible
4. Check firewall/proxy settings

### Build Fails

1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`
4. See [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) for more

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## License

MIT License - see LICENSE file

## Support

- **Documentation**: [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/cptleftnut/DAVPoker/issues)
- **Email**: support@davpoker.com
- **Website**: https://davpoker.com

## Changelog

### v1.0.0 (Initial Release)

- Hand analyzer with AI recommendations
- Opponent database and tracking
- Session analytics and charts
- Bankroll management tools
- Hand range visualization
- Automated Android builds via GitHub Actions
- Google Play Store integration

## Roadmap

- [ ] Live game integration (PokerStars, GGPoker)
- [ ] Advanced opponent modeling with ML
- [ ] Push notifications for game alerts
- [ ] Multi-table tournament support
- [ ] Hand history import/export
- [ ] Cloud backup and sync
- [ ] iOS version

## Credits

Built with:
- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Navigation](https://reactnavigation.org)

## Related Projects

- [DAVPoker Backend](https://github.com/cptleftnut/DAVPoker) - FastAPI backend
- [DAVPoker Web](https://github.com/cptleftnut/DAVPoker) - React web dashboard
