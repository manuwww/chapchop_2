// Audio Drama Data
const audioDramas = [
    {
        id: 1,
        title: "The Algorithm That Forgot Me",
        chapter: "Chapter 1: Digital Void",
        description: "A young woman wakes up to discover every trace of her digital life has vanished, only to find her 'deleted self' is alive online.",
        duration: "42:15",
        genres: ["Sci-Fi", "Psychological Thriller", "Mystery"],
        poster: "story1-poster.png",
        audio: "story1-chapter1.mp3"
    },
    {
        id: 2,
        title: "Passengers on the Frozen Highway",
        chapter: "Chapter 1: Stranded",
        description: "A freak snowstorm traps hundreds of cars on an endless highway, revealing the secrets and tensions of those stranded inside.",
        duration: "48:33",
        genres: ["Drama", "Thriller", "Survival"],
        poster: "story2-poster.png",
        audio: "story2-chapter1.mp3"
    },
    {
        id: 3,
        title: "Game Night Gone Wrong",
        chapter: "Chapter 1: The First Move",
        description: "A casual board game night turns terrifying when the pieces move on their own, reenacting a real crime in the town.",
        duration: "39:27",
        genres: ["Horror", "Mystery", "Supernatural"],
        poster: "story3-poster.png",
        audio: "story3-chapter1.mp3"
    },
    {
        id: 4,
        title: "The Apartment Across the Hall",
        chapter: "Chapter 1: Strange Sounds",
        description: "A woman begins hearing laughter and conversations from a supposedly empty apartment, confronting a reality she doesn't understand.",
        duration: "44:18",
        genres: ["Horror", "Mystery", "Psychological Thriller"],
        poster: "story4-poster.png",
        audio: "story4-chapter1.mp3"
    },
    {
        id: 5,
        title: "The Last Shift at the 24-Hour Diner",
        chapter: "Chapter 1: Final Service",
        description: "On the diner's final night, staff and patrons from past and present gather for one last meal—some who shouldn't exist at all.",
        duration: "51:42",
        genres: ["Supernatural", "Drama", "Mystery"],
        poster: "story5-poster.png",
        audio: "story5-chapter1.mp3"
    },
    {
        id: 6,
        title: "Voicemail from 1999",
        chapter: "Chapter 1: Old Messages",
        description: "A man discovers his old flip phone still receives voicemails from his teenage self, forcing him to confront forgotten dreams.",
        duration: "37:55",
        genres: ["Sci-Fi", "Mystery", "Drama"],
        poster: "story6-poster.png",
        audio: "story6-chapter1.mp3"
    },
    {
        id: 7,
        title: "Deleted Scenes from Our Lives",
        chapter: "Chapter 1: Cut Moments",
        description: "Two ex-lovers uncover an archive of 'cut moments' from their relationship, confronting memories they chose to erase.",
        duration: "46:12",
        genres: ["Drama", "Romance", "Mystery"],
        poster: "story7-poster.png",
        audio: "story7-chapter1.mp3"
    },
    {
        id: 8,
        title: "Fragments of a Marriage That Never Happened",
        chapter: "Chapter 1: Shared Memories",
        description: "Strangers begin experiencing vivid, shared memories of a marriage that never existed, pulling them together to unravel why it feels so real.",
        duration: "43:38",
        genres: ["Mystery", "Psychological Drama", "Supernatural"],
        poster: "story8-poster.png",
        audio: "story8-chapter1.mp3"
    },
    {
        id: 9,
        title: "The Cinema of Forgotten Lives",
        chapter: "Chapter 1: Lost Memories",
        description: "A reopened movie theater screens lost memories and secret histories, forcing patrons to face forgotten truths.",
        duration: "49:24",
        genres: ["Supernatural", "Mystery", "Drama"],
        poster: "story9-poster.png",
        audio: "story9-chapter1.mp3"
    },
    {
        id: 10,
        title: "The Last Postcard on Earth",
        chapter: "Chapter 1: Final Delivery",
        description: "A retired postman attempts to deliver the final postcard to a town that no longer exists, uncovering what was erased.",
        duration: "41:07",
        genres: ["Sci-Fi", "Adventure", "Mystery"],
        poster: "story10-poster.png",
        audio: "story10-chapter1.mp3"
    },
    {
        id: 11,
        title: "The Infinite Scroll Motel",
        chapter: "Chapter 1: Check-In",
        description: "Guests become trapped in a motel whose hallways stretch endlessly, scrolling through half-remembered rooms and regrets.",
        duration: "52:19",
        genres: ["Surreal", "Horror", "Psychological Thriller"],
        poster: "story11-poster.png",
        audio: "story11-chapter1.mp3"
    }
];

// App State
let currentDrama = null;
let isPlaying = false;
let currentTime = 0;
let duration = 0;
let volume = 0.7;
let isDragging = false;
let bookmarkedDramas = new Set();
let currentFilter = 'all';
let selectedGenre = 'all';

// Get all unique genres from the dramas
const allGenres = [...new Set(audioDramas.flatMap(drama => drama.genres))].sort();

// DOM Elements
const audioElement = document.getElementById('audioElement');
const dramaGrid = document.getElementById('dramaGrid');
const themeToggle = document.getElementById('themeToggle');

// Bookmark Elements
const allFilter = document.getElementById('allFilter');
const bookmarksFilter = document.getElementById('bookmarksFilter');
const bookmarkCount = document.getElementById('bookmarkCount');
const emptyBookmarks = document.getElementById('emptyBookmarks');

// Persistent Player Elements
const persistentPlayer = document.getElementById('persistentPlayer');
const toggleBtn = document.getElementById('toggleBtn');
const miniPlayer = document.getElementById('miniPlayer');
const expandedPlayer = document.getElementById('expandedPlayer');

// Mini Player Elements
const miniArtwork = document.getElementById('miniArtwork');
const miniTitle = document.getElementById('miniTitle');
const miniChapter = document.getElementById('miniChapter');
const miniPlayBtn = document.getElementById('miniPlayBtn');
const miniPrevBtn = document.getElementById('miniPrevBtn');
const miniNextBtn = document.getElementById('miniNextBtn');

// Expanded Player Elements
const currentArtwork = document.getElementById('currentArtwork');
const currentTitle = document.getElementById('currentTitle');
const currentChapter = document.getElementById('currentChapter');
const playBtn = document.getElementById('playBtn');
const mainPlayBtn = document.getElementById('mainPlayBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Player State
let isPlayerExpanded = false;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadBookmarks();
    populateGenreSelect();
    renderDramaGrid();
    setupEventListeners();
    setupAudioEventListeners();
    setupBookmarkEventListeners();
    setupGenreEventListeners();
    setupPersistentPlayerEventListeners();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('chapchop-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('chapchop-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Render Drama Grid
function renderDramaGrid() {
    dramaGrid.innerHTML = '';
    
    let filteredDramas = audioDramas;
    
    // Apply bookmark filter
    if (currentFilter === 'bookmarks') {
        filteredDramas = filteredDramas.filter(drama => bookmarkedDramas.has(drama.id));
    }
    
    // Apply genre filter
    if (selectedGenre !== 'all') {
        filteredDramas = filteredDramas.filter(drama => drama.genres.includes(selectedGenre));
    }
    
    if (currentFilter === 'bookmarks' && filteredDramas.length === 0) {
        dramaGrid.style.display = 'none';
        emptyBookmarks.style.display = 'block';
    } else {
        dramaGrid.style.display = 'grid';
        emptyBookmarks.style.display = 'none';
        
        filteredDramas.forEach(drama => {
            const dramaCard = createDramaCard(drama);
            dramaGrid.appendChild(dramaCard);
        });
    }
    
    updateBookmarkCount();
}

function createDramaCard(drama) {
    const card = document.createElement('div');
    card.className = 'drama-card';
    card.dataset.dramaId = drama.id;
    
    const isBookmarked = bookmarkedDramas.has(drama.id);
    
    // Create genre tags HTML
    const genreTags = drama.genres.map(genre => 
        `<span class="genre-tag" data-genre="${genre}">${genre}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="drama-poster">
            <img src="${drama.poster}" alt="${drama.title}" loading="lazy">
            <div class="drama-overlay">
                <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-drama-id="${drama.id}">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="drama-play-btn">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="drama-info">
            <h3>${drama.title}</h3>
            <p>${drama.description}</p>
            <div class="genre-tags">
                ${genreTags}
            </div>
            <div class="drama-meta">
                <span>${drama.chapter}</span>
                <span>${drama.duration}</span>
            </div>
        </div>
    `;
    
    // Add click event listener for the card (but not for buttons)
    card.addEventListener('click', (event) => {
        // Don't trigger if clicking on bookmark, play buttons, or genre tags
        if (!event.target.closest('.bookmark-btn') && 
            !event.target.closest('.drama-play-btn') && 
            !event.target.closest('.genre-tag')) {
            selectDrama(drama);
        }
    });
    
    // Add bookmark button event listener
    const bookmarkBtn = card.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleBookmark(drama.id);
    });
    
    // Add play button event listener
    const playBtn = card.querySelector('.drama-play-btn');
    playBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        selectDrama(drama);
        if (isPlaying && currentDrama && currentDrama.id === drama.id) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
    
    // Add genre tag click listeners
    const genreTagElements = card.querySelectorAll('.genre-tag');
    genreTagElements.forEach(tag => {
        tag.addEventListener('click', (event) => {
            event.stopPropagation();
            const genre = tag.dataset.genre;
            setGenreFilter(genre);
        });
    });
    
    return card;
}

// Drama Selection and Playback
function selectDrama(drama) {
    currentDrama = drama;
    updatePlayerUI();
    updateDramaCardStates();
    showPersistentPlayer();
    loadAudio();
}

function updatePlayerUI() {
    if (!currentDrama) return;
    
    // Update both mini and expanded player
    miniArtwork.src = currentDrama.poster;
    miniArtwork.alt = currentDrama.title;
    miniTitle.textContent = currentDrama.title;
    miniChapter.textContent = currentDrama.chapter;
    
    currentArtwork.src = currentDrama.poster;
    currentArtwork.alt = currentDrama.title;
    currentTitle.textContent = currentDrama.title;
    currentChapter.textContent = currentDrama.chapter;
}

function updateDramaCardStates() {
    // Remove playing state from all cards
    document.querySelectorAll('.drama-card').forEach(card => {
        card.classList.remove('playing');
        const meta = card.querySelector('.drama-meta');
        const playingIndicator = meta.querySelector('.playing-indicator');
        if (playingIndicator) {
            playingIndicator.remove();
        }
    });
    
    // Add playing state to current card
    if (currentDrama) {
        const currentCard = document.querySelector(`[data-drama-id="${currentDrama.id}"]`);
        if (currentCard) {
            currentCard.classList.add('playing');
            const meta = currentCard.querySelector('.drama-meta');
            const indicator = document.createElement('div');
            indicator.className = 'playing-indicator';
            indicator.innerHTML = '<i class="fas fa-volume-up"></i> Now Playing';
            meta.appendChild(indicator);
        }
    }
}

function showPersistentPlayer() {
    persistentPlayer.style.display = 'block';
    // Start in collapsed state
    persistentPlayer.classList.add('collapsed');
    isPlayerExpanded = false;
    updateToggleButton();
}

function loadAudio() {
    if (!currentDrama) return;
    
    audioElement.src = currentDrama.audio;
    audioElement.load();
}

// Audio Controls
function togglePlayPause() {
    if (!currentDrama) return;
    
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    if (!currentDrama) return;
    
    audioElement.play().then(() => {
        isPlaying = true;
        updatePlayButtons();
    }).catch(error => {
        console.error('Error playing audio:', error);
    });
}

function pauseAudio() {
    audioElement.pause();
    isPlaying = false;
    updatePlayButtons();
}

function updatePlayButtons() {
    const playIcon = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    
    // Update mini player button
    miniPlayBtn.querySelector('i').className = playIcon;
    
    // Update expanded player buttons
    playBtn.querySelector('i').className = playIcon;
    mainPlayBtn.querySelector('i').className = playIcon;
    
    // Update drama card play buttons
    document.querySelectorAll('.drama-play-btn i').forEach(icon => {
        const card = icon.closest('.drama-card');
        const dramaId = parseInt(card.dataset.dramaId);
        
        if (currentDrama && dramaId === currentDrama.id) {
            icon.className = playIcon;
        } else {
            icon.className = 'fas fa-play';
        }
    });
}

function previousDrama() {
    if (!currentDrama) return;
    
    const currentIndex = audioDramas.findIndex(drama => drama.id === currentDrama.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : audioDramas.length - 1;
    
    selectDrama(audioDramas[prevIndex]);
    if (isPlaying) {
        playAudio();
    }
}

function nextDrama() {
    if (!currentDrama) return;
    
    const currentIndex = audioDramas.findIndex(drama => drama.id === currentDrama.id);
    const nextIndex = currentIndex < audioDramas.length - 1 ? currentIndex + 1 : 0;
    
    selectDrama(audioDramas[nextIndex]);
    if (isPlaying) {
        playAudio();
    }
}

// Progress Bar
function updateProgress() {
    if (!audioElement.duration) return;
    
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressFill.style.width = `${progress}%`;
    progressHandle.style.left = `${progress}%`;
    
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    durationDisplay.textContent = formatTime(audioElement.duration);
}

function seekAudio(event) {
    if (!audioElement.duration) return;
    
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progress = clickX / rect.width;
    const newTime = progress * audioElement.duration;
    
    audioElement.currentTime = newTime;
}

// Volume Control
function updateVolume() {
    const volumeValue = volumeSlider.value / 100;
    audioElement.volume = volumeValue;
    volume = volumeValue;
    
    // Update volume icon
    const volumeIcon = volumeBtn.querySelector('i');
    if (volumeValue === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volumeValue < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

function toggleMute() {
    if (audioElement.volume > 0) {
        audioElement.volume = 0;
        volumeSlider.value = 0;
    } else {
        audioElement.volume = volume;
        volumeSlider.value = volume * 100;
    }
    updateVolume();
}

// Utility Functions
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Player controls
    playBtn.addEventListener('click', togglePlayPause);
    mainPlayBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', previousDrama);
    nextBtn.addEventListener('click', nextDrama);
    
    // Progress bar
    progressBar.addEventListener('click', seekAudio);
    
    // Volume controls
    volumeSlider.addEventListener('input', updateVolume);
    volumeBtn.addEventListener('click', toggleMute);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function setupAudioEventListeners() {
    audioElement.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audioElement.duration);
    });
    
    audioElement.addEventListener('timeupdate', updateProgress);
    
    audioElement.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtons();
        nextDrama(); // Auto-play next drama
    });
    
    audioElement.addEventListener('error', (error) => {
        console.error('Audio error:', error);
        isPlaying = false;
        updatePlayButtons();
    });
    
    // Set initial volume
    volumeSlider.value = volume * 100;
    audioElement.volume = volume;
}

function handleKeyboardShortcuts(event) {
    if (!currentDrama) return;
    
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
            break;
        case 'ArrowRight':
            event.preventDefault();
            audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
            break;
        case 'ArrowUp':
            event.preventDefault();
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
            updateVolume();
            break;
        case 'ArrowDown':
            event.preventDefault();
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
            updateVolume();
            break;
    }
}

// Touch and Mobile Optimizations
function setupTouchEvents() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Swipe gestures for mobile
    document.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (event) => {
        if (!currentDrama) return;
        
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Horizontal swipe (minimum 50px)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                previousDrama(); // Swipe right = previous
            } else {
                nextDrama(); // Swipe left = next
            }
        }
    });
}

// Initialize touch events
setupTouchEvents();

// Bookmark Management Functions
function loadBookmarks() {
    const saved = localStorage.getItem('chapchop-bookmarks');
    if (saved) {
        bookmarkedDramas = new Set(JSON.parse(saved));
    }
    updateBookmarkCount();
}

function saveBookmarks() {
    localStorage.setItem('chapchop-bookmarks', JSON.stringify([...bookmarkedDramas]));
}

function toggleBookmark(dramaId) {
    if (bookmarkedDramas.has(dramaId)) {
        bookmarkedDramas.delete(dramaId);
    } else {
        bookmarkedDramas.add(dramaId);
    }
    
    saveBookmarks();
    updateBookmarkButton(dramaId);
    updateBookmarkCount();
    
    // If we're viewing bookmarks and this drama was unbookmarked, refresh the grid
    if (currentFilter === 'bookmarks' && !bookmarkedDramas.has(dramaId)) {
        renderDramaGrid();
    }
}

function updateBookmarkButton(dramaId) {
    const bookmarkBtn = document.querySelector(`[data-drama-id="${dramaId}"].bookmark-btn`);
    if (bookmarkBtn) {
        const isBookmarked = bookmarkedDramas.has(dramaId);
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
    }
}

function updateBookmarkCount() {
    const count = bookmarkedDramas.size;
    bookmarkCount.textContent = count;
    
    // Update filter button state
    if (count === 0 && currentFilter === 'bookmarks') {
        setFilter('all');
    }
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update filter button states
    allFilter.classList.toggle('active', filter === 'all');
    bookmarksFilter.classList.toggle('active', filter === 'bookmarks');
    
    // Re-render the grid with the new filter
    renderDramaGrid();
}

function setGenreFilter(genre) {
    selectedGenre = genre;
    
    // Update genre filter UI if it exists
    const genreButtons = document.querySelectorAll('.genre-filter-btn');
    genreButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.genre === genre);
    });
    
    // Re-render the grid with the new filter
    renderDramaGrid();
    
    // Scroll to top to show filtered results
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateGenreSelect() {
    const genreSelect = document.getElementById('genreSelect');
    
    // Add all unique genres as options
    allGenres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

function setupGenreEventListeners() {
    const genreSelect = document.getElementById('genreSelect');
    genreSelect.addEventListener('change', (event) => {
        setGenreFilter(event.target.value);
    });
}

function setupBookmarkEventListeners() {
    allFilter.addEventListener('click', () => setFilter('all'));
    bookmarksFilter.addEventListener('click', () => setFilter('bookmarks'));
}

// Persistent Player Functions
function setupPersistentPlayerEventListeners() {
    // Toggle button
    toggleBtn.addEventListener('click', togglePlayerExpansion);
    
    // Mini player controls
    miniPlayBtn.addEventListener('click', togglePlayPause);
    miniPrevBtn.addEventListener('click', previousDrama);
    miniNextBtn.addEventListener('click', nextDrama);
    
    // Click on mini player to expand
    miniPlayer.addEventListener('click', (event) => {
        if (!event.target.closest('.mini-btn')) {
            expandPlayer();
        }
    });
}

function togglePlayerExpansion() {
    if (isPlayerExpanded) {
        collapsePlayer();
    } else {
        expandPlayer();
    }
}

function expandPlayer() {
    persistentPlayer.classList.remove('collapsed');
    miniPlayer.style.display = 'none';
    expandedPlayer.style.display = 'block';
    isPlayerExpanded = true;
    updateToggleButton();
}

function collapsePlayer() {
    persistentPlayer.classList.add('collapsed');
    miniPlayer.style.display = 'flex';
    expandedPlayer.style.display = 'none';
    isPlayerExpanded = false;
    updateToggleButton();
}

function updateToggleButton() {
    const icon = toggleBtn.querySelector('i');
    icon.className = isPlayerExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
}

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
