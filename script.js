document.addEventListener('DOMContentLoaded', () => {
    // Generate floating hearts
    const heartContainer = document.getElementById('heart-container');
    const heartSymbols = ['❤️', '💖', '💕', '✨'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
        
        heartContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(createHeart, 800);

    // Proposal Reveal Logic
    const revealBtn = document.getElementById('revealBtn');
    const secretMessage = document.getElementById('secretMessage');
    const preQuestion = document.querySelector('.question-pre');

    revealBtn.addEventListener('click', () => {
        // Hide button and pre-text smoothly
        revealBtn.style.display = 'none';
        preQuestion.style.display = 'none';
        
        // Show the message
        secretMessage.classList.remove('hidden');
        secretMessage.classList.add('reveal');
        
        // Trigger confetti
        fireConfetti();
    });

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            window.location.href = 'next.html';
        });
    }

    if (noBtn) {
        const moveButton = () => {
            if (noBtn.parentNode !== document.body) {
                document.body.appendChild(noBtn);
            }
            noBtn.style.position = 'fixed';
            
            // Calculate random coordinates keeping the button within the screen
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;
            
            const randomX = Math.max(20, Math.random() * maxX);
            const randomY = Math.max(20, Math.random() * maxY);
            
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
        };

        noBtn.addEventListener('mouseover', moveButton);
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent accidental click on touch devices
            moveButton();
        });
    }

    function fireConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Fire from multiple origins for a romantic burst
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff0000', '#ff69b4', '#ffffff']
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff0000', '#ff69b4', '#ffffff']
            }));
        }, 250);
    }
});
