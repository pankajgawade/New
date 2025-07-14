// --- Heart Canvas (More sophisticated animation) ---
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
let w, h, hearts = [];
const heartImage = new Image(); // Using an image for better heart shape
heartImage.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQ+CiAgPHBhdGggZmlsbD0iI2ZmMTQ5MyIgZD0iTTEyIDIxLjM1Yy0uNDctLjQ3LTEyLjAxLTEwLjk5LTEyLTEzLjM1QzAgNC43NyA0LjQ3IDB0Ljk1LS4wMXMyLjUyIDAgNC42NyAxLjUyIDYuNTEgNC4wMWMxLjg4LTIuNDkgNC4xMy00LjAxIDYuNS00LjAxbTQuNjUgNC40OGMwIDIuNzItMi4xOSAzLjMzLTMuNTQgNC44NS0xLjI0IDEuMjktMi4xOSAyLjc2LTMuNjcgNC4yNEwxMiAyMS4zNWwxLjA3LTEuMjdjMS40OC0xLjQ4IDIuNDMtMi45NiAzLjY3LTQuMjQgMS4zNS0xLjUyIDMuNTQtMi4xMyAzLjU0LTQuODVzLTQuMDUtNC41NS02LjE3LTQuNTUtNi4xNyAxLjgyLTYuMTcgNC41NXM0LjA1IDQuNTUgNi4xNyA0LjU1czYuMTctMS44MiA2LjE3LTQuNTVTMTguNTcgNi44MiAxMiA2LjgybTAgLjA4Yy0yLjU5IDAtNC40NyAxLjczLTQuNDcgNC40N3MyLjI2IDQuNDcgNC40NyA0LjQ3czQuNDctMi4yMiA0LjQ3LTQuNDdzLTIuMjYtNC40Ny00LjQ3LTQuNDciLz4KPC9zdmc+'; // A simple SVG heart

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    hearts = []; // Clear hearts on resize to prevent weird scaling issues
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 50; // Start slightly below screen
        this.size = Math.random() * 20 + 15; // Larger hearts for more presence
        this.speed = Math.random() * 0.8 + 0.4; // Slower, gentler ascent
        this.alpha = 1;
        this.rotation = Math.random() * Math.PI * 2; // Initial random rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.01; // Slower rotation
        this.sway = Math.random() * 2 - 1; // Initial sway direction
        this.swaySpeed = Math.random() * 0.02 + 0.005; // Speed of sway oscillation
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        // Draw heart image if loaded, otherwise fallback to simple shape
        if (heartImage.complete && heartImage.naturalWidth !== 0) {
            ctx.drawImage(heartImage, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            // Fallback: simple circle heart (like your original, but centered)
            ctx.fillStyle = "rgba(255, 105, 180, 0.8)";
            ctx.beginPath();
            ctx.arc(-this.size / 4, 0, this.size / 2, 0, Math.PI * 2);
            ctx.arc(this.size / 4, 0, this.size / 2, 0, Math.PI * 2);
            ctx.lineTo(0, this.size * 0.7);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y * this.swaySpeed) * this.sway; // Gentle sine wave sway
        this.rotation += this.rotationSpeed;
        this.alpha -= 0.002; // Slower fade out

        if (this.y < -this.size || this.alpha <= 0) {
            this.reset();
        }
    }

    reset() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 50;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 0.8 + 0.4;
        this.alpha = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.sway = Math.random() * 2 - 1;
        this.swaySpeed = Math.random() * 0.02 + 0.005;
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, w, h);
    // Control heart generation rate
    if (Math.random() < 0.03 && hearts.length < 30) { // Slower rate, cap max hearts
        hearts.push(new Heart());
    }
    hearts.forEach((heart, i) => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animateHearts);
}

// --- Typewriter Effect ---
const typewriterText = `Hi Myyy Nikkuuuu babyyy 💖💌

This page is not just a surprise...
it's our forever space, designed just for us.
Even though miles separate us, our love grows stronger every day.
From your beautiful smile to your sweet voice, from your infectious laugh to your thoughtful mind,
I love every single thing about you.
You're my peace, my home, my babygirl.
Just want to say... I LOVE YOU, BABYY 💖🥰
Forever. Always. Till the stars fade ✨ And until we finally meet.`;

const typewriterElement = document.getElementById("typewriter");
let typeIndex = 0;
let typeInterval;

function startTypewriter() {
    typewriterElement.innerHTML = ''; // Clear existing content before typing
    typeInterval = setInterval(() => {
        if (typeIndex < typewriterText.length) {
            typewriterElement.innerHTML += typewriterText.charAt(typeIndex) === "\n" ? "<br>" : typewriterText.charAt(typeIndex);
            typeIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50); // Typing speed
}

// --- Popup Functions (for 'Will you be mine forever?') ---
const popup = document.getElementById("popup");
const secretButton = document.getElementById("secretBtn"); // This is the proposal button

function revealSurprise() {
    popup.classList.add("show");
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function closePopup() {
    popup.classList.remove("show");
}


// --- "Miss You" Alert Functions ---
const missYouBtn = document.getElementById("missYouBtn");
const missYouAlertPopup = document.getElementById("missYouAlertPopup");
const missYouSound = document.getElementById("missYouSound");

function triggerMissYouAlert() {
    missYouAlertPopup.classList.add("show");
    missYouSound.play(); // Play the sound
    // Optional: Add haptic feedback for mobile
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); // Vibrate pattern
    }
    console.log("Miss You Alert Triggered! (Simulated - will prompt for call/SMS)");
}

function closeMissYouAlert() {
    missYouAlertPopup.classList.remove("show");
    missYouSound.pause();
    missYouSound.currentTime = 0; // Rewind sound
}

// --- Image Lightbox Functionality ---
const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentImageIndex = 0;
let currentGalleryImages = [];

document.querySelectorAll('.photos img').forEach((img, index) => {
    img.addEventListener('click', (e) => {
        const parentGallery = e.target.closest('.photos');
        currentGalleryImages = Array.from(parentGallery.querySelectorAll('img'));
        currentImageIndex = currentGalleryImages.indexOf(e.target);

        openLightbox(e.target.src, e.target.alt, e.target.dataset.caption);
    });
});

function openLightbox(src, alt, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = caption || alt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = currentGalleryImages.length - 1;
    } else if (currentImageIndex >= currentGalleryImages.length) {
        currentImageIndex = 0;
    }

    const nextImage = currentGalleryImages[currentImageIndex];
    openLightbox(nextImage.src, nextImage.alt, nextImage.dataset.caption);
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
    }
});

// --- LDR Counter ---
function updateDaysApart() {
    // Replace with your actual start date of relationship/LDR
    const startDate = new Date('2025-04-16T00:00:00'); // Changed to set days as 90
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysApart').textContent = diffDays;
}

// --- Playlist Dropdown Toggle ---
const playlistToggle = document.getElementById('playlistToggle');
const playlistContent = document.getElementById('playlistContent');

playlistToggle.addEventListener('click', () => {
    playlistContent.classList.toggle('expanded');
    playlistToggle.classList.toggle('collapsed'); // Add/remove collapsed class to rotate icon
});

// Initialize playlist to be collapsed by default
if (playlistContent && playlistToggle) {
    playlistContent.classList.remove('expanded'); // Ensure it starts collapsed
    playlistToggle.classList.add('collapsed'); // Set icon to point down
}


// --- Sweet Notes Management ---
const messagesGrid = document.getElementById('messagesGrid');
const newSweetNoteInput = document.getElementById('newSweetNoteInput');
const addSweetNoteBtn = document.getElementById('addSweetNoteBtn');

const SWEET_NOTES_STORAGE_KEY = 'sweetNotes';
let sweetNotes = [];

const defaultSweetNotes = [
    { id: Date.now() + 1, content: "Every day with you is a new adventure, even from afar. Thank you for being you, my love.", date: "July 10, 2025" },
    { id: Date.now() + 2, content: "Just thinking about you makes my day. You're my sunshine, always brightening my world!", date: "July 11, 2025" },
    { id: Date.now() + 3, content: "Missing our late-night talks more than ever. Can't wait for our next video call!", date: "July 12, 2025" },
    { id: Date.now() + 4, content: "You're the best thing that ever happened to me. Forever grateful for your love and patience.", date: "July 13, 2025" },
    { id: Date.now() + 5, content: "Even miles apart, our hearts are always connected. You're my favorite thought.", date: "July 14, 2025" },
    { id: Date.now() + 6, content: "Sending you a virtual hug and a thousand kisses. Wish you were here!", date: "July 15, 2025" }
];

function saveSweetNotes() {
    localStorage.setItem(SWEET_NOTES_STORAGE_KEY, JSON.stringify(sweetNotes));
}

function loadSweetNotes() {
    const storedNotes = localStorage.getItem(SWEET_NOTES_STORAGE_KEY);
    sweetNotes = storedNotes ? JSON.parse(storedNotes) : defaultSweetNotes;
    renderSweetNotes();
}

function renderSweetNotes() {
    messagesGrid.innerHTML = ''; // Clear existing content
    sweetNotes.forEach(note => {
        const card = document.createElement('div');
        card.classList.add('message-card', 'reveal-card'); // Keep reveal animation
        card.dataset.id = note.id; // Store ID on the DOM element

        card.innerHTML = `
            <p class="message-content" data-id="${note.id}">${note.content}</p>
            <span class="message-date">${note.date}</span>
            <div class="action-buttons">
                <button class="edit-btn" data-id="${note.id}">Edit</button>
                <button class="delete-btn" data-id="${note.id}">Delete</button>
            </div>
        `;
        messagesGrid.appendChild(card);
    });

    // Add event listeners for new buttons
    messagesGrid.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => editSweetNote(e.target.dataset.id));
    });
    messagesGrid.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteSweetNote(e.target.dataset.id));
    });
}

function addSweetNote() {
    const content = newSweetNoteInput.value.trim();
    if (content) {
        const newNote = {
            id: Date.now(), // Unique ID
            content: content,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) // Current date
        };
        sweetNotes.push(newNote);
        saveSweetNotes();
        renderSweetNotes(); // Re-render all to show new note
        newSweetNoteInput.value = '';
        newSweetNoteInput.focus();
    } else {
        alert('Please write a sweet note!');
    }
}

function deleteSweetNote(id) {
    if (confirm('Are you sure you want to delete this sweet note?')) {
        sweetNotes = sweetNotes.filter(note => note.id != id); // Filter by ID
        saveSweetNotes();
        renderSweetNotes(); // Re-render all
    }
}

function editSweetNote(id) {
    const noteToEdit = sweetNotes.find(note => note.id == id);
    if (!noteToEdit) return;

    const card = messagesGrid.querySelector(`.message-card[data-id="${id}"]`);
    const contentP = card.querySelector('.message-content');
    const actionButtonsDiv = card.querySelector('.action-buttons');

    // Create a textarea for editing
    const textarea = document.createElement('textarea');
    textarea.classList.add('editable-textarea');
    textarea.value = noteToEdit.content;

    // Create Save and Cancel buttons
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('save-btn');
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancel-btn');

    // Replace content with textarea and new buttons
    contentP.style.display = 'none'; // Hide paragraph
    actionButtonsDiv.innerHTML = ''; // Clear existing buttons
    card.insertBefore(textarea, actionButtonsDiv); // Insert textarea before buttons
    actionButtonsDiv.appendChild(saveBtn);
    actionButtonsDiv.appendChild(cancelBtn);

    textarea.focus(); // Focus on the textarea

    saveBtn.addEventListener('click', () => {
        noteToEdit.content = textarea.value.trim();
        noteToEdit.date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); // Update date on edit
        saveSweetNotes();
        renderSweetNotes(); // Re-render all notes
    });

    cancelBtn.addEventListener('click', () => {
        renderSweetNotes(); // Simply re-render to revert changes
    });
}

addSweetNoteBtn.addEventListener('click', addSweetNote);


// --- Virtual Date Ideas Management ---
const dateIdeasGrid = document.getElementById('dateIdeasGrid');
const newDateIdeaInput = document.getElementById('newDateIdeaInput');
const addDateIdeaBtn = document.getElementById('addDateIdeaBtn');

const DATE_IDEAS_STORAGE_KEY = 'userDateIdeas';
let dateIdeas = [];

const defaultDateIdeas = [
    { id: Date.now() + 10, title: "Virtual Movie Night 🍿", content: "Watching our favorite movie together on a video call, synced up perfectly." },
    { id: Date.now() + 11, title: "Cooking Challenge 🍳", content: "Cooking the same recipe at the same time, sharing laughs and results." },
    { id: Date.now() + 12, title: "Game Night Online 🎮", content: "Playing our favorite online games, from Ludo to Pictionary." },
    { id: Date.now() + 13, title: "Future Real Date: Beach Walk 🏖️", content: "Walking hand-in-hand along a beautiful beach at sunset." },
    { id: Date.now() + 14, title: "Future Real Date: Stargazing ✨", content: "Lying under the same sky, pointing out constellations to each other." }
];

function saveDateIdeas() {
    localStorage.setItem(DATE_IDEAS_STORAGE_KEY, JSON.stringify(dateIdeas));
}

function loadDateIdeas() {
    const storedIdeas = localStorage.getItem(DATE_IDEAS_STORAGE_KEY);
    dateIdeas = storedIdeas ? JSON.parse(storedIdeas) : defaultDateIdeas;
    renderDateIdeas();
}

function renderDateIdeas() {
    dateIdeasGrid.innerHTML = ''; // Clear existing content
    dateIdeas.forEach(idea => {
        const card = document.createElement('div');
        card.classList.add('date-idea-card');
        card.dataset.id = idea.id; // Store ID on the DOM element

        card.innerHTML = `
            <h4 class="idea-title" data-id="${idea.id}">${idea.title}</h4>
            <p class="idea-content" data-id="${idea.id}">${idea.content}</p>
            <div class="action-buttons">
                <button class="edit-btn" data-id="${idea.id}">Edit</button>
                <button class="delete-btn" data-id="${idea.id}">Delete</button>
            </div>
        `;
        dateIdeasGrid.appendChild(card);
    });

    // Add event listeners for new buttons
    dateIdeasGrid.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => editDateIdea(e.target.dataset.id));
    });
    dateIdeasGrid.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteDateIdea(e.target.dataset.id));
    });
}

function addDateIdea() {
    const content = newDateIdeaInput.value.trim();
    if (content) {
        const newIdea = {
            id: Date.now(), // Unique ID
            title: "My Dream Date! 💖", // Default title for user-added ideas
            content: content
        };
        dateIdeas.push(newIdea);
        saveDateIdeas();
        renderDateIdeas(); // Re-render all
        newDateIdeaInput.value = '';
        newDateIdeaInput.focus();
    } else {
        alert('Please describe your dream date!');
    }
}

function deleteDateIdea(id) {
    if (confirm('Are you sure you want to delete this date idea?')) {
        dateIdeas = dateIdeas.filter(idea => idea.id != id);
        saveDateIdeas();
        renderDateIdeas();
    }
}

function editDateIdea(id) {
    const ideaToEdit = dateIdeas.find(idea => idea.id == id);
    if (!ideaToEdit) return;

    const card = dateIdeasGrid.querySelector(`.date-idea-card[data-id="${id}"]`);
    const titleH4 = card.querySelector('.idea-title');
    const contentP = card.querySelector('.idea-content');
    const actionButtonsDiv = card.querySelector('.action-buttons');

    // Create input for title and textarea for content
    const titleInput = document.createElement('input');
    titleInput.classList.add('editable-textarea'); // Re-using style, though it's an input
    titleInput.value = ideaToEdit.title;
    titleInput.placeholder = "Enter new title";

    const contentTextarea = document.createElement('textarea');
    contentTextarea.classList.add('editable-textarea');
    contentTextarea.value = ideaToEdit.content;
    contentTextarea.placeholder = "Enter new description";

    // Create Save and Cancel buttons
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('save-btn');
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancel-btn');

    // Hide original content and replace with edit fields/buttons
    titleH4.style.display = 'none';
    contentP.style.display = 'none';
    actionButtonsDiv.innerHTML = ''; // Clear existing buttons

    card.insertBefore(contentTextarea, actionButtonsDiv);
    card.insertBefore(titleInput, contentTextarea);
    actionButtonsDiv.appendChild(saveBtn);
    actionButtonsDiv.appendChild(cancelBtn);

    titleInput.focus();

    saveBtn.addEventListener('click', () => {
        ideaToEdit.title = titleInput.value.trim();
        ideaToEdit.content = contentTextarea.value.trim();
        saveDateIdeas();
        renderDateIdeas();
    });

    cancelBtn.addEventListener('click', () => {
        renderDateIdeas();
    });
}

addDateIdeaBtn.addEventListener('click', addDateIdea);


// --- Initialize on Page Load ---
document.addEventListener("DOMContentLoaded", () => {
    // Initial setup for hearts
    for (let k = 0; k < 15; k++) {
        hearts.push(new Heart());
    }
    animateHearts(); // Start heart animation

    // Start typewriter after a short delay for visual coherence
    setTimeout(startTypewriter, 500);

    // Update LDR counter
    updateDaysApart();
    setInterval(updateDaysApart, 1000 * 60 * 60 * 24); // Update daily

    // Load dynamic content from localStorage or defaults
    loadSweetNotes();
    loadDateIdeas();

    // Trigger reveal for general cards (after initial page load)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 0.1 + 0.2}s`;
                    entry.target.classList.add('fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(card);
    });

    // For message cards specifically, they have their own reveal-card animation, triggered after rendering
    // This is handled by renderSweetNotes() and its subsequent appending.

    // Make secret button visible after some delay
    setTimeout(() => {
        secretButton.classList.add('show-btn');
    }, 4000); // Adjust delay as needed (e.g., after typewriter finishes)
});

// Event listener for image loading to ensure heart drawing works correctly
heartImage.onload = () => {
    // No specific action needed here other than knowing it's loaded for draw method
};
heartImage.onerror = () => {
    console.warn('Heart SVG image failed to load. Falling back to default heart shape.');
};
