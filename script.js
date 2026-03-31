// 1. Carousel & Variations Sync
function initCarouselSync() {
    const carousel = document.querySelector('#mainCarousel');
    const pills = document.querySelectorAll('.pill');
    const varItems = document.querySelectorAll('.variation-item');
    let isMoving = false;

    const updatePills = (index) => {
        pills.forEach((p, i) => p.classList.toggle('active', i === index));
    };

    const scrollToImage = (index) => {
        if (isMoving) return;
        isMoving = true;
        const imgWidth = carousel.querySelector('img').offsetWidth;
        carousel.scrollTo({
            left: index * imgWidth,
            behavior: 'smooth'
        });
        updatePills(index);
        setTimeout(() => isMoving = false, 500);
    };

    // Variation click
    varItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            varItems.forEach(v => v.classList.remove('active'));
            item.classList.add('active');
            scrollToImage(index);
        });
    });

    // Carousel scroll listener to update pills
    carousel.addEventListener('scroll', () => {
        const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        updatePills(index);
        // Highlight corresponding variation
        varItems.forEach((v, i) => v.classList.toggle('active', i === index));
    });
}

// 2. FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
}

// 3. Countdown Timer (Rolling 5 hours)
function startCountdown(duration) {
    let timer = duration;
    const display = document.querySelector('#timer');
    
    setInterval(() => {
        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = timer % 60;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) display.textContent = `${hours}:${minutes}:${seconds}`;

        if (--timer < 0) timer = duration;
    }, 1000);
}

// 4. CTA Redirection (with UTM & Parameter Persistence)
const CHECKOUT_URL = '[SUA_URL_DE_CHECKOUT]'; // Substitua pelo seu link atualizado

function initCTA() {
    const buyBtn = document.querySelector('#buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            // Persist UTMs and other search params
            const currentParams = new URLSearchParams(window.location.search);
            const checkoutUrlObj = new URL(CHECKOUT_URL);
            
            // Append each param from current page to checkout URL
            currentParams.forEach((value, key) => {
                checkoutUrlObj.searchParams.set(key, value);
            });

            window.location.href = checkoutUrlObj.toString();
        });
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initCarouselSync();
    initFAQ();
    initCTA();
    startCountdown(5400 + 4813); // Fixed for demo, usually dynamic
});
