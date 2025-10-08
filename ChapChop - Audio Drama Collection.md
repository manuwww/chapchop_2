# ChapChop - Audio Drama Collection

A modern, responsive audio drama app featuring 11 immersive audio dramas with sleek design and comprehensive playback controls.

## Features

### 🎧 Audio Playback
- **11 Audio Dramas** - Each with unique storylines and 1 chapter
- **Persistent Player** - A sleek, collapsible audio player is always accessible at the bottom of the screen once a drama is selected.
- **Full Audio Controls** - Play, pause, skip, volume control, and progress tracking in both mini and expanded modes.
- **Keyboard Shortcuts** - Space (play/pause), Arrow keys (seek/volume).
- **Auto-play** - Automatically continues to next drama when current one ends.

### ⭐ Bookmarking
- **Save Favorites** - Bookmark any drama to easily find it later.
- **Persistent Storage** - Bookmarks are saved locally and persist across sessions.
- **Filter View** - View only bookmarked dramas with a dedicated filter.
- **Bookmark Count** - See the number of bookmarked dramas at a glance.

### 🏷️ Genre Filtering
- **Filter by Genre** - Select a genre from the dropdown to view dramas of that type.
- **Interactive Tags** - Click on genre tags within drama cards to filter the collection.
- **Combined Filters** - Use genre filters in conjunction with bookmark filters.

### 🎨 Modern Design
- **Light & Dark Mode** - Toggle between themes with persistent preference.
- **Responsive Layout** - Optimized for mobile, tablet, and desktop.
- **Smooth Animations** - Hover effects, transitions, and micro-interactions.
- **Professional UI** - Clean typography using Inter font family.

### 📱 Mobile Optimized
- **Touch Gestures** - Swipe left/right to navigate between dramas.
- **PWA Support** - Install as a Progressive Web App.
- **Mobile Controls** - Touch-friendly interface with optimized layouts.
- **Offline Ready** - Service worker for basic offline functionality.

### 🎵 Audio Drama Collection

1. **The Algorithm That Forgot Me** - A young woman wakes up to discover every trace of her digital life has vanished, only to find her “deleted self” is alive online. (Sci-Fi, Psychological Thriller, Mystery)
2. **Passengers on the Frozen Highway** - A freak snowstorm traps hundreds of cars on an endless highway, revealing the secrets and tensions of those stranded inside. (Drama, Thriller, Survival)
3. **Game Night Gone Wrong** - A casual board game night turns terrifying when the pieces move on their own, reenacting a real crime in the town. (Horror, Mystery, Supernatural)
4. **The Apartment Across the Hall** - A woman begins hearing laughter and conversations from a supposedly empty apartment, confronting a reality she doesn’t understand. (Horror, Mystery, Psychological Thriller)
5. **The Last Shift at the 24-Hour Diner** - On the diner’s final night, staff and patrons from past and present gather for one last meal—some who shouldn’t exist at all. (Supernatural, Drama, Mystery)
6. **Voicemail from 1999** - A man discovers his old flip phone still receives voicemails from his teenage self, forcing him to confront forgotten dreams. (Sci-Fi, Mystery, Drama)
7. **Deleted Scenes from Our Lives** - Two ex-lovers uncover an archive of “cut moments” from their relationship, confronting memories they chose to erase. (Drama, Romance, Mystery)
8. **Fragments of a Marriage That Never Happened** - Strangers begin experiencing vivid, shared memories of a marriage that never existed, pulling them together to unravel why it feels so real. (Mystery, Psychological Drama, Supernatural)
9. **The Cinema of Forgotten Lives** - A reopened movie theater screens lost memories and secret histories, forcing patrons to face forgotten truths. (Supernatural, Mystery, Drama)
10. **The Last Postcard on Earth** - A retired postman attempts to deliver the final postcard to a town that no longer exists, uncovering what was erased. (Sci-Fi, Adventure, Mystery)
11. **The Infinite Scroll Motel** - Guests become trapped in a motel whose hallways stretch endlessly, scrolling through half-remembered rooms and regrets. (Surreal, Horror, Psychological Thriller)

## Usage Instructions

### Getting Started
1. Open `chapchop.html` in any modern web browser.
2. Click on any drama card to select and load it. The persistent player will appear at the bottom of the screen.

### Controls
- **Play/Pause**: Click the play/pause button in either the mini or expanded player, or press Space.
- **Previous/Next**: Use the arrow buttons in the player, or swipe left/right on mobile.
- **Volume**: Adjust with the slider in the expanded player, or click the volume icon to mute/unmute.
- **Progress**: Click anywhere on the progress bar to seek.
- **Player Expansion**: Click the toggle button (chevron icon) to expand or collapse the player. Clicking anywhere on the mini-player (not on a control button) will also expand it.
- **Theme**: Toggle light/dark mode with the moon/sun icon in the header.
- **Bookmark**: Click the bookmark icon on a drama card to add/remove from favorites.
- **Filter**: Use "All Dramas" or "Bookmarks" buttons to filter the collection.
- **Genre Filter**: Select a genre from the "Filter by Genre" dropdown or click on a genre tag on a drama card to filter the displayed dramas.

### Keyboard Shortcuts
- `Space` - Play/Pause
- `←` - Seek backward 10 seconds
- `→` - Seek forward 10 seconds
- `↑` - Increase volume
- `↓` - Decrease volume

### Mobile Gestures
- **Swipe Right** - Previous drama
- **Swipe Left** - Next drama
- **Tap Drama Card** - Select and play
- **Tap Player Art** - Play/Pause

## Technical Details

### Files Structure
```
chapchop/
├── chapchop.html      # Main application file
├── styles.css         # Comprehensive styling with themes
├── script.js          # JavaScript functionality
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── README.md         # This documentation
```

### Browser Compatibility
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: HTML5 Audio, CSS Grid, Flexbox, Service Workers

### Customization

#### Adding Your Own Audio Dramas
1. Replace placeholder poster URLs in `script.js` with your vertical poster images
2. Replace placeholder audio URLs with your MP3 files
3. Update drama titles, descriptions, and metadata
4. Modify the `audioDramas` array with your content, ensuring to include a `genres` array for each drama.

#### Styling Customization
- Edit CSS variables in `:root` and `[data-theme="dark"]` for colors
- Modify responsive breakpoints in media queries
- Customize animations and transitions

### PWA Installation
The app can be installed as a Progressive Web App:
1. Open in Chrome/Edge on desktop or mobile
2. Look for "Install" prompt or use browser menu
3. App will be available offline with basic functionality

## Development Notes

### Performance Optimizations
- Lazy loading for drama poster images
- Efficient audio element management
- CSS transitions for smooth interactions
- Service worker caching for offline support

### Accessibility Features
- Keyboard navigation support
- Focus indicators for interactive elements
- Semantic HTML structure
- ARIA labels where appropriate

### Future Enhancements
- Playlist creation and management
- Social sharing capabilities
- Advanced audio effects and equalizer
- Multi-chapter support per drama
- User accounts and preferences sync

## License

This project is open source and available under the MIT License.

## Support

For issues or questions about the ChapChop audio drama app, please refer to the code comments or create an issue in the project repository.
