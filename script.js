// 1. FAQ Accordion
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

// 2. Countdown Timer (Rolling 5 hours)
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

// 3. CTA Redirection (Fixed Black Variation URL)
const CHECKOUT_URL = 'https://pagamento.cleostore-paymants.space/pay/97fa24d0-2da0-46f7-9121-e0f9c63ba95d';

function initCTA() {
    const buyBtn = document.querySelector('#buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            // Persist UTMs and other search params from current page
            try {
                const currentParams = new URLSearchParams(window.location.search);
                const checkoutUrlObj = new URL(CHECKOUT_URL);
                
                currentParams.forEach((value, key) => {
                    checkoutUrlObj.searchParams.set(key, value);
                });

                window.location.href = checkoutUrlObj.toString();
            } catch (e) {
                // Fail-safe redirect
                window.location.href = CHECKOUT_URL;
            }
        });
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initCTA();
    startCountdown(5400 + 4813); 
});
