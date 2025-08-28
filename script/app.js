window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // --- Detect desktop ---
    function isDesktop() {
        return window.matchMedia("(min-width: 1024px)").matches;
    }

    // FIX: Call the function with parentheses
    if (isDesktop()) {
        // ===============================
        // DESKTOP ONLY: GSAP Animations
        // ===============================

        console.log("Desktop detected – GSAP animations enabled.");

        let about_split = new SplitText("#about-head", { type: 'chars' });
        let vision_split = new SplitText("#vision-head", { type: 'chars' });
        let vision_con = document.querySelector(".vision-con");
        let elements = document.getElementsByClassName("feature-con");

        // About heading animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "bottom top",
                end: "+=300",
            }
        }).fromTo(
            about_split.chars,
            { y: 200, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.inOut", stagger: 0.05 }
        );

        // About sub-div animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "bottom top",
                end: "+=300",
            }
        }).fromTo(".sub-div",
            { y: 200, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.inOut", duration: 1 }
        );

        // Features animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#features",
                start: "75% top",
                end: "+=800",
            }
        }).fromTo(elements,
            { y: -200, opacity: 0 },
            { y: 0, opacity: 1 }
        );

        // Vision animation
        let visiontl = gsap.timeline({
            scrollTrigger: {
                trigger: ".holder",
                start: "-5% top",
                end: "+=500",
                toggleActions: "play none none none",
            }
        });

        visiontl
            .fromTo(".holder", { yPercent: 100 }, { duration: 0.5, yPercent: 0 })
            .fromTo(".holder img", { yPercent: 100 }, { duration: 0.5, yPercent: 0 }, "<")
            .fromTo(vision_split.chars, { y: 200, opacity: 0 },
                                   { y: 0, opacity: 1, ease: "power1.inOut", stagger: 0.05 })
            .fromTo(vision_con, { y: 200, opacity: 0 },
                                 { y: 0, opacity: 1, ease: "power1.inOut", stagger: 0.05 });

    }

    // =========================
    // SVG LOADING: Works on both mobile & desktop
    // =========================
    function loadSVG() {
        fetch("./assets/city.svg")
            .then((response) => response.text())
            .then((svg) => {
                document.getElementById('bg_city').innerHTML = svg;
                document.querySelector('#bg_city svg')
                    .setAttribute("preserveAspectRatio", "xMidYMid slice");

                // Only run animations on desktop
                if (isDesktop()) {
                    setAnimationScroll();
                }
            });
    }

    // Desktop-only animation function
    function setAnimationScroll() {
        let runAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#bg_city",
                start: "top top",
                end: "+=1000",
                scrub: true,
                pin: true
            }
        });

        runAnimation.add([
            gsap.to("#bg_city svg", { duration: 2, scale: 1.5 }),
            gsap.to("#full_city", { duration: 2, opacity: 0 })
        ])
        .add([
            gsap.to("#building_top", { duration: 2, y: -200, opacity: 0 }),
            gsap.to("#wall_side", { duration: 2, x: -200, opacity: 0 }),
            gsap.to("#wall_front", { duration: 2, x: 200, y: 200, opacity: 0 })
        ])
        .add([
            gsap.to("#interior_wall_side", { duration: 2, x: -200, opacity: 0 }),
            gsap.to("#interior_wall_top", { duration: 2, y: -200, opacity: 0 }),
            gsap.to("#interior_wall_side_2", { duration: 2, opacity: 0 }),
            gsap.to("#interior_wall_front", { duration: 2, opacity: 0 })
        ]);
    }

    // Load SVG for both mobile and desktop
    loadSVG();

    // =========================
    // SLIDER: Works on both mobile & desktop
    // =========================
    const track = document.querySelector('.slider-track');
    if (!track) return;

    const slideInterval = 3000;
    let slides = Array.from(track.children);
    const originalSlideCount = slides.length;
    let currentIndex = 0;
    let intervalId = null;

    const cloneCount = 2;
    for (let i = 0; i < cloneCount; i++) {
        const clone = slides[originalSlideCount - 1 - i].cloneNode(true);
        track.insertBefore(clone, slides[0]);
    }
    for (let i = 0; i < cloneCount; i++) {
        const clone = slides[i].cloneNode(true);
        track.appendChild(clone);
    }

    slides = Array.from(track.children);
    currentIndex = cloneCount;

    function updateSlider(instant = false) {
        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        const container = document.querySelector('.slider-container');
        const currentSlideElement = slides[currentIndex];
        const containerCenter = container.offsetWidth / 2;
        const slideCenter = currentSlideElement.offsetLeft + currentSlideElement.offsetWidth / 2;
        const offset = containerCenter - slideCenter;

        track.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        if (instant) {
            setTimeout(() => {
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
    }

    function moveToNext() {
        currentIndex++;
        updateSlider();
        track.addEventListener('transitionend', checkLoop, { once: true });
    }

    function checkLoop() {
        if (currentIndex >= originalSlideCount + cloneCount) {
            currentIndex = cloneCount;
            updateSlider(true);
        }
        if (currentIndex < cloneCount) {
            currentIndex = originalSlideCount + cloneCount - 1;
            updateSlider(true);
        }
    }

    function startAutoplay() {
        stopAutoplay();
        intervalId = setInterval(moveToNext, slideInterval);
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    updateSlider(true);
    startAutoplay();

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => updateSlider(true));
});

// Initialize Lenis (Note: This should probably be inside the desktop check above)
const lenis = new Lenis({
  autoRaf: true,
});
