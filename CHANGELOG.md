# Changelog

All notable changes to the DAVPoker Android app will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial React Native mobile application
- Hand analyzer with AI recommendations
- Opponent database and tracking
- Session analytics with charts
- Bankroll management tools
- Hand range visualization
- GitHub Actions automated build workflow
- Google Play Store integration

### Changed
- N/A

### Fixed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Security
- HTTPS-only API communication
- Secure token storage

## [1.0.0] - 2026-05-01

### Added
- Initial release of DAVPoker Android app
- Real-time hand analysis with AI recommendations
- Opponent statistics tracking (VPIP, PFR, 3-bet)
- Session performance analytics
- Bankroll management and risk assessment
- Hand range visualization by position
- Bottom tab navigation (Home, Analytics, Opponents, Settings)
- Dark theme UI
- Offline capability with cloud sync
- Camera integration for card detection
- Automated GitHub Actions build workflow
- APK and AAB build support
- Google Play Store integration
- Comprehensive documentation

### Features
- **Hand Analyzer**: Get instant AI recommendations for poker decisions
- **Opponent Tracking**: Build database of opponent statistics
- **Analytics**: Track session performance with charts
- **Bankroll Manager**: Monitor bankroll and get risk recommendations
- **Hand Ranges**: View position-specific hand ranges and equity
- **Settings**: App preferences and data management

### Technical Details
- Built with React Native and Expo
- TypeScript support
- Axios for API communication
- Recharts for data visualization
- React Navigation for routing
- EAS Build for cloud compilation

---

## Release Guidelines

### Version Numbering

- **MAJOR** (X.0.0): Breaking changes, major features
- **MINOR** (1.X.0): New features, backward compatible
- **PATCH** (1.0.X): Bug fixes, minor improvements

### Release Process

1. Update version in `app.json`
2. Update `CHANGELOG.md`
3. Commit changes: `git commit -m "Release v1.0.0"`
4. Create tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
5. Push tag: `git push origin v1.0.0`
6. GitHub Actions automatically builds and deploys

### Changelog Format

```markdown
## [1.0.0] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Changed feature description

### Fixed
- Bug fix description

### Security
- Security fix description
```

---

## Future Roadmap

### v1.1.0 (Planned)
- Live game integration (PokerStars, GGPoker)
- Push notifications
- Hand history import/export
- Advanced opponent modeling

### v1.2.0 (Planned)
- Multi-table tournament support
- Cloud backup and sync
- Custom ranges editor
- Video tutorials

### v2.0.0 (Planned)
- iOS version
- Web app integration
- Real-time multiplayer features
- Advanced ML models

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/cptleftnut/DAVPoker/issues
- Email: support@davpoker.com
- Documentation: See README.md and DEPLOYMENT_GUIDE.md
