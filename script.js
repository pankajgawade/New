document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const body = document.body;

    // --- Heart Canvas Animation (Enhanced) ---
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];
    const numHearts = 80; // More hearts for a denser effect

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 200; // Start further below
            this.size = Math.random() * 20 + 15; // Larger hearts
            this.speedY = Math.random() * 0.7 + 0.3; // Faster vertical speed
            this.speedX = (Math.random() - 0.5) * 1; // More horizontal drift
            this.opacity = Math.random() * 0.6 + 0.4; // Stronger opacity
            this.color = `rgba(100, 13, 20, ${this.opacity})`; // Rosewood with opacity
            this.shadowColor = `rgba(128, 14, 19, ${this.opacity * 0.7})`; // Falu Red with opacity for shadow
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05; // Faster spin
            this.flutterOffset = Math.random() * Math.PI * 2; // For subtle fluttering
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.shadowColor;

            ctx.beginPath();
            ctx.moveTo(0, this.size / 2);
            ctx.bezierCurveTo(this.size / 2, this.size / 2, this.size / 2, -this.size / 2, 0, -this.size);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, this.size / 2, 0, this.size / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.flutterOffset) * 0.5; // Add subtle flutter
            this.angle += this.rotationSpeed;
            this.flutterOffset += 0.02; // Increment flutter

            if (this.y < -this.size) {
                this.y = canvas.height + Math.random() * 100;
                this.x = Math.random() * canvas.width;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.color = `rgba(100, 13, 20, ${this.opacity})`; // Reset to Rosewood with new opacity
                this.shadowColor = `rgba(128, 14, 19, ${this.opacity * 0.7})`; // Reset shadow to Falu Red with new opacity
                this.size = Math.random() * 20 + 15;
                this.speedY = Math.random() * 0.7 + 0.3;
                this.speedX = (Math.random() - 0.5) * 1;
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            }
        }
    }

    function initHearts() {
        hearts = [];
        for (let i = 0; i < numHearts; i++) {
            hearts.push(new Heart());
        }
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animateHearts);
    }

    resizeCanvas();
    initHearts();
    animateHearts();
    window.addEventListener('resize', resizeCanvas);


    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        "Every mile is a memory in the making.",
        "Our love knows no distance, only connection.",
        "Building our forever, one virtual date at a time.",
        "You're my favorite notification.",
        "In every heartbeat, you are there."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2500; // Pause longer at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 120; // Speed up for next text
        } else {
            typingSpeed = isDeleting ? 60 : 90; // Faster deleting, slightly faster typing
        }
        setTimeout(typeWriter, typingSpeed);
    }
    typeWriter();

    // --- LDR Status - Days Apart Counter ---
    const daysApartElement = document.getElementById('daysApart');
    const startDate = new Date('2025-05-31'); // **REMEMBER TO SET YOUR ACTUAL START DATE HERE!**

    function updateDaysApart() {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysApartElement.textContent = diffDays;
    }
    updateDaysApart();
    setInterval(updateDaysApart, 1000 * 60 * 60 * 24); // Update daily


    // --- Photo Gallery Lightbox ---
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    let currentImageIndex = 0;
    let currentGalleryImages = [];

    document.querySelectorAll('.photo-gallery img').forEach(img => {
        img.addEventListener('click', (event) => {
            const parentGallery = event.target.closest('.gallery-category');
            currentGalleryImages = Array.from(parentGallery.querySelectorAll('img'));
            currentImageIndex = currentGalleryImages.indexOf(event.target);

            openLightbox(event.target.src, event.target.getAttribute('data-caption'));
        });
    });

    function openLightbox(src, caption) {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        imageLightbox.classList.add('active'); // Use active class for transitions
        body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        imageLightbox.classList.remove('active');
        body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = currentGalleryImages.length - 1;
        } else if (currentImageIndex >= currentGalleryImages.length) {
            currentImageIndex = 0;
        }
        const nextImage = currentGalleryImages[currentImageIndex];
        openLightbox(nextImage.src, nextImage.getAttribute('data-caption'));
    }

    // Assign functions to global scope for onclick attributes (best practice is event listeners)
    window.closeLightbox = closeLightbox;
    window.navigateLightbox = navigateLightbox;


    // --- Sweet Notes / Message Board (Enhanced with IDs and more defaults) ---
    const messagesGrid = document.getElementById('messagesGrid');
    const newSweetNoteInput = document.getElementById('newSweetNoteInput');
    const addSweetNoteBtn = document.getElementById('addSweetNoteBtn');
    const SWEET_NOTES_STORAGE_KEY = 'coupleSweetNotes';

    let sweetNotes = JSON.parse(localStorage.getItem(SWEET_NOTES_STORAGE_KEY)) || [
        { id: Date.now(), text: "You brighten my day even from afar! ✨" },
        { id: Date.now() + 1, text: "Missing you like crazy, my love! ❤️" },
        { id: Date.now() + 2, text: "Just thinking of you makes me smile. 😊" },
        { id: Date.now() + 3, text: "Every moment with you is a treasure." },
        { id: Date.now() + 4, text: "Your voice is my favorite sound." }
    ];

    function renderSweetNotes() {
        messagesGrid.innerHTML = '';
        sweetNotes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.classList.add('message-card');
            noteCard.innerHTML = `<p>${note.text}</p><button class="delete-btn" data-id="${note.id}">x</button>`;
            messagesGrid.appendChild(noteCard);
        });
        addDeleteListenersSweetNotes();
    }

    function saveSweetNotes() {
        localStorage.setItem(SWEET_NOTES_STORAGE_KEY, JSON.stringify(sweetNotes));
    }

    function addSweetNote() {
        const text = newSweetNoteInput.value.trim();
        if (text) {
            sweetNotes.push({ id: Date.now(), text: text });
            saveSweetNotes();
            renderSweetNotes();
            newSweetNoteInput.value = '';
            // Optional: Scroll to new note if list is long
            messagesGrid.scrollTop = messagesGrid.scrollHeight;
        }
    }

    function deleteSweetNote(idToDelete) {
        if (confirm("Are you sure you want to delete this sweet note?")) {
            sweetNotes = sweetNotes.filter(note => note.id !== idToDelete);
            saveSweetNotes();
            renderSweetNotes();
        }
    }

    function addDeleteListenersSweetNotes() {
        messagesGrid.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = () => deleteSweetNote(parseInt(btn.dataset.id));
        });
    }

    addSweetNoteBtn.addEventListener('click', addSweetNote);
    newSweetNoteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addSweetNote();
    });
    renderSweetNotes();


    // --- Daily Dose of Love (Compliment Generator - as provided, just ensure smooth integration) ---
    const currentComplimentDisplay = document.getElementById('currentCompliment');
    const newComplimentBtn = document.getElementById('newComplimentBtn');
    const addComplimentInput = document.getElementById('addComplimentInput');
    const submitComplimentBtn = document.getElementById('submitComplimentBtn');
    const viewAllComplimentsBtn = document.getElementById('viewAllComplimentsBtn');
    const allComplimentsList = document.getElementById('allComplimentsList');

    const COMPLIMENTS_STORAGE_KEY = 'coupleCompliments';

    let compliments = JSON.parse(localStorage.getItem(COMPLIMENTS_STORAGE_KEY)) || [
        "You make my heart smile every day.",
        "Your kindness is a light in my life.",
        "I love your laugh.",
        "You inspire me to be a better person.",
        "Every moment with you is a gift.",
        "You're truly one of a kind.",
        "Your hugs are the best medicine.",
        "I'm so grateful for you.",
        "You're incredibly beautiful/handsome inside and out.",
        "You're my favorite adventure.",
        "I love how you make me feel."
    ];

    function displayRandomCompliment() {
        if (compliments.length === 0) {
            currentComplimentDisplay.textContent = "Add some compliments to get started!";
            return;
        }
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const compliment = compliments[randomIndex];

        currentComplimentDisplay.style.opacity = 0;
        currentComplimentDisplay.style.transform = 'scale(0.9) translateY(20px)'; // Prepare for animation

        setTimeout(() => {
            currentComplimentDisplay.textContent = compliment;
            currentComplimentDisplay.style.opacity = 1;
            currentComplimentDisplay.style.transform = 'scale(1) translateY(0)'; // Animate in
        }, 300);
    }

    function saveCompliments() {
        localStorage.setItem(COMPLIMENTS_STORAGE_KEY, JSON.stringify(compliments));
    }

    function addNewCompliment() {
        const newCompliment = addComplimentInput.value.trim();
        if (newCompliment) {
            compliments.push(newCompliment);
            saveCompliments();
            addComplimentInput.value = '';
            renderAllCompliments();
            displayRandomCompliment();
        }
    }

    function renderAllCompliments() {
        allComplimentsList.innerHTML = '';
        compliments.forEach((compliment, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = compliment;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'x';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteCompliment(index));

            listItem.appendChild(deleteBtn);
            allComplimentsList.appendChild(listItem);
        });
    }

    function deleteCompliment(index) {
        if (confirm("Are you sure you want to delete this compliment?")) {
            compliments.splice(index, 1);
            saveCompliments();
            renderAllCompliments();
            // If the deleted compliment was the one currently displayed, show a new one
            if (currentComplimentDisplay.textContent === compliments[index] || compliments.length === 0) {
                displayRandomCompliment();
            }
        }
    }

    newComplimentBtn.addEventListener('click', displayRandomCompliment);
    submitComplimentBtn.addEventListener('click', addNewCompliment);
    addComplimentInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addNewCompliment();
        }
    });

    viewAllComplimentsBtn.addEventListener('click', () => {
        if (allComplimentsList.style.display === 'none' || allComplimentsList.style.display === '') {
            allComplimentsList.style.display = 'block';
            viewAllComplimentsBtn.textContent = 'Hide All Compliments';
            renderAllCompliments();
        } else {
            allComplimentsList.style.display = 'none';
            viewAllComplimentsBtn.textContent = 'View/Manage All';
        }
    });
    displayRandomCompliment();


    // --- Playlist Toggle ---
    const playlistToggle = document.getElementById('playlistToggle');
    const playlistContent = document.getElementById('playlistContent');

    playlistToggle.addEventListener('click', () => {
        const isOpen = playlistContent.classList.toggle('open');
        const icon = playlistToggle.querySelector('.toggle-icon');
        if (isOpen) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });


    // --- Virtual Dates Section (Enhanced with IDs and more defaults) ---
    const dateIdeasGrid = document.getElementById('dateIdeasGrid');
    const newDateIdeaInput = document.getElementById('newDateIdeaInput');
    const addDateIdeaBtn = document.getElementById('addDateIdeaBtn');
    const DATE_IDEAS_STORAGE_KEY = 'coupleDateIdeas';

    let dateIdeas = JSON.parse(localStorage.getItem(DATE_IDEAS_STORAGE_KEY)) || [
        { id: Date.now(), text: "A cozy movie night with homemade popcorn." },
        { id: Date.now() + 1, text: "Exploring a new city hand-in-hand." },
        { id: Date.now() + 2, text: "Cooking our favorite meal together from scratch." },
        { id: Date.now() + 3, text: "A picnic under the stars, just us." },
        { id: Date.now() + 4, text: "Visiting a charming bookstore and reading together." }
    ];

    function renderDateIdeas() {
        dateIdeasGrid.innerHTML = '';
        dateIdeas.forEach(idea => {
            const ideaCard = document.createElement('div');
            ideaCard.classList.add('date-idea-card');
            ideaCard.innerHTML = `<p>${idea.text}</p><button class="delete-btn" data-id="${idea.id}">x</button>`;
            dateIdeasGrid.appendChild(ideaCard);
        });
        addDeleteListenersDateIdeas();
    }

    function saveDateIdeas() {
        localStorage.setItem(DATE_IDEAS_STORAGE_KEY, JSON.stringify(dateIdeas));
    }

    function addDateIdea() {
        const text = newDateIdeaInput.value.trim();
        if (text) {
            dateIdeas.push({ id: Date.now(), text: text });
            saveDateIdeas();
            renderDateIdeas();
            newDateIdeaInput.value = '';
        }
    }

    function deleteDateIdea(idToDelete) {
        if (confirm("Are you sure you want to delete this date idea?")) {
            dateIdeas = dateIdeas.filter(idea => idea.id !== idToDelete);
            saveDateIdeas();
            renderDateIdeas();
        }
    }

    function addDeleteListenersDateIdeas() {
        dateIdeasGrid.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = () => deleteDateIdea(parseInt(btn.dataset.id));
        });
    }

    addDateIdeaBtn.addEventListener('click', addDateIdea);
    newDateIdeaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addDateIdea();
    });
    renderDateIdeas();


    // --- Secret Button & Popup (Enhanced with active class and ripple) ---
    const popup = document.getElementById('popup');
    const secretBtn = document.getElementById('secretBtn');

    window.revealSurprise = function() {
        popup.classList.add('active'); // Add active class to trigger CSS animations
        body.style.overflow = 'hidden'; // Prevent scrolling
    }

    window.closePopup = function() {
        popup.classList.remove('active'); // Remove active class to trigger CSS animations
        body.style.overflow = ''; // Re-enable scrolling
    }

    // Ripple effect for secret button
    secretBtn.addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.target.style.setProperty('--x', `${x}px`);
        e.target.style.setProperty('--y', `${y}px`);
    });

    // --- Birthday Wish Section (New Functionality) ---
    const birthdayWishesSection = document.getElementById('birthday-wishes-section');

    // **IMPORTANT: Set your partner's birthday here (Month is 0-indexed, so 0 for Jan, 1 for Feb, etc.)**
    const BIRTHDAY_MONTH = 6; // July (0-indexed: January = 0, February = 1, ..., July = 6)
    const BIRTHDAY_DAY = 16;  // 16th of July

    function checkBirthday() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        if (currentMonth === BIRTHDAY_MONTH && currentDay === BIRTHDAY_DAY) {
            birthdayWishesSection.style.display = 'block'; // Show the section
            triggerConfetti(); // Trigger confetti effect
        } else {
            birthdayWishesSection.style.display = 'none'; // Hide the section
        }
    }

    // Initial check on page load
    checkBirthday();
    // You might want to run this check once a day, or on refresh, not continuously.
    // For a real-world app, a server-side check might be more robust to prevent client-side tampering.

    // --- Confetti Effect (New Feature) ---
    // This is a basic confetti effect. For more advanced options, consider a library like 'confetti-js'.
    function triggerConfetti() {
        const confettiCount = 100;
        const colors = ['#800E13', '#640D14', '#FFD700', '#FF4500', '#ADD8E6']; // Falu Red, Rosewood, Gold, OrangeRed, LightBlue

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * -100 + 'px'; // Start above viewport
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = Math.random() * 15 + 7 + 'px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Randomize animation properties for varied fall
            const animationDuration = Math.random() * 3 + 5; // 5 to 8 seconds
            const animationDelay = Math.random() * 0.5; // 0 to 0.5 seconds delay
            const translateX = (Math.random() - 0.5) * 200; // -100 to 100px horizontal drift
            const rotateZ = (Math.random() - 0.5) * 720; // up to 720 degrees rotation

            confetti.style.animation = `fall ${animationDuration}s linear ${animationDelay}s forwards,
                                        sway ${Math.random() * 2 + 3}s ease-in-out infinite alternate`; // Add sway

            // Set custom properties for animation in CSS
            confetti.style.setProperty('--translateX', `${translateX}px`);
            confetti.style.setProperty('--rotateZ', `${rotateZ}deg`);

            document.body.appendChild(confetti);

            // Remove confetti after it falls to prevent DOM clutter
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});    


// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', () => {
    // ... existing JavaScript code ...

    // --- Scroll Card Animations ---
    const faders = document.querySelectorAll('.card, .ldr-status .status-item, .photo-gallery img, .message-card, .date-idea-card, .playlist li');

    // Add a class to all elements you want to animate on scroll
    faders.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const appearOptions = {
        threshold: 0.2, // When 20% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Start animating 50px before it fully enters viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Not in view yet
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
