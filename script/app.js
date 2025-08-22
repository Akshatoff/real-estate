window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let aboutheading = document.getElementById("#about-head");
    let elements = document.getElementsByClassName("feature-con");
    console.log(elements)
    let about_split = new SplitText("#about-head", {
        type: 'chars'
    })
    let vision_split = new SplitText("#vision-head", {
        type: 'chars'
    })

    let vision_con = document.querySelector(".vision-con")

    let about_heading_timeline = gsap.timeline({
        scrollTrigger:{
            trigger: "#about",
            start: "bottom top",
            end: "+=300",
            // scrub: true,
        }
    })

    about_heading_timeline.fromTo(
        about_split.chars, {
            y: 200,
            opacity: 0,

        }, {
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.05,
        });

    function loadSVG () {
    fetch("./assets/city.svg")
    .then((response) => { return response.text();})
    .then((svg) => {
        document.getElementById('bg_city').innerHTML = svg;
        document.querySelector('#bg_city svg').setAttribute("preserveAspectRatio", "xMidYMid slice");
        setAnimationScroll();
    })
}
loadSVG();
function setAnimationScroll () {

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
        gsap.to("#bg_city svg", 2, {
            scale: 1.5
        }),
        gsap.to("#full_city", 2, {
            opacity: 0
        })
    ])
    .add([
        gsap.to("#building_top", 2, {
            y: -200,
            opacity: 0
        }),
        gsap.to("#wall_side", 2, {
            x: -200,
            opacity: 0
        }),
        gsap.to("#wall_front", 2, {
            x: 200, y: 200,
            opacity: 0
        })
    ])
    .add([
        gsap.to("#interior_wall_side", 2, {
            x: -200,
            opacity: 0
        }),
        gsap.to("#interior_wall_top", 2, {
            y: -200,
            opacity: 0
        }),
        gsap.to("#interior_wall_side_2", 2, {
            opacity: 0
        }),
        gsap.to("#interior_wall_front", 2, {
            opacity: 0
        })
    ]);
}

let feature_timeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#features",
        start: "bottom top",
        end: "+=800",

    }
})

feature_timeline.fromTo(
    elements,{
        y: -200,
        opacity: 0
    },{
        y: 0,
        opacity: 1,
    })

const track = document.querySelector('.slider-track');
            if (!track) return;

            // --- Configuration ---
            const slideInterval = 3000; // Time in ms for auto-sliding

            // --- State ---
            let slides = Array.from(track.children);
            const originalSlideCount = slides.length;
            let currentIndex = 0;
            let intervalId = null;

            // --- Setup for Infinite Loop ---
            // To create a seamless loop, we clone the first and last slides
            // and add them to the beginning and end of the track.
            const cloneCount = 2; // Number of slides to clone on each side for smooth looping

            // Clone last slides and prepend them
            for (let i = 0; i < cloneCount; i++) {
                const clone = slides[originalSlideCount - 1 - i].cloneNode(true);
                track.insertBefore(clone, slides[0]);
            }
            // Clone first slides and append them
            for (let i = 0; i < cloneCount; i++) {
                const clone = slides[i].cloneNode(true);
                track.appendChild(clone);
            }

            // Update slides array and set the initial position to the first "real" slide
            slides = Array.from(track.children);
            currentIndex = cloneCount;

            /**
             * Updates the slider's position and active slide styles.
             * @param {boolean} instant - If true, the transition is immediate (no animation).
             */
            function updateSlider(instant = false) {
                // Temporarily disable transition for instant updates
                if (instant) {
                    track.style.transition = 'none';
                } else {
                    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }

                // Calculate the offset needed to center the current slide
                const container = document.querySelector('.slider-container');
                const currentSlideElement = slides[currentIndex];
                const containerCenter = container.offsetWidth / 2;
                const slideCenter = currentSlideElement.offsetLeft + currentSlideElement.offsetWidth / 2;
                const offset = containerCenter - slideCenter;

                // Apply the transform to move the track
                track.style.transform = `translateX(${offset}px)`;

                // Update the 'active' class on slides
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentIndex);
                });

                // Re-enable transition after an instant update
                if (instant) {
                    // A tiny delay is needed for the browser to apply the 'none' transition
                    // before re-enabling it.
                    setTimeout(() => {
                        track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
            }

            /**
             * Moves to the next slide in the sequence.
             */
            function moveToNext() {
                currentIndex++;
                updateSlider();

                // Listen for the end of the transition to handle the loop "jump"
                track.addEventListener('transitionend', checkLoop, { once: true });
            }

            /**
             * Checks if the slider is on a cloned slide and jumps to the
             * corresponding real slide without animation.
             */
            function checkLoop() {
                 // Jump to the start if we've hit the cloned slides at the end
                if (currentIndex >= originalSlideCount + cloneCount) {
                    currentIndex = cloneCount;
                    updateSlider(true); // Instant jump
                }
                // Jump to the end if we've hit the cloned slides at the beginning (not used in auto-next, but useful for prev buttons)
                if (currentIndex < cloneCount) {
                    currentIndex = originalSlideCount + cloneCount -1;
                    updateSlider(true); // Instant jump
                }
            }

            /**
             * Starts the automatic sliding.
             */
            function startAutoplay() {
                stopAutoplay(); // Ensure no multiple intervals are running
                intervalId = setInterval(moveToNext, slideInterval);
            }

            /**
             * Stops the automatic sliding.
             */
            function stopAutoplay() {
                clearInterval(intervalId);
            }

            // Initial setup
            updateSlider(true);
            startAutoplay();

            // Optional: Pause on hover
            track.addEventListener('mouseenter', stopAutoplay);
            track.addEventListener('mouseleave', startAutoplay);

            // Recalculate on window resize to keep it centered
            window.addEventListener('resize', () => updateSlider(true));

            var visiontl =gsap.timeline({
                scrollTrigger: {
                    trigger: ".holder",
                    start: "20% top",
                    end: "+=500",
                    toggleActions: "play none none none",
                    // markers: true,
                }
            })

            visiontl
            .fromTo(".holder", {
                yPercent: 100
            }, {
                duration: 0.5,
                yPercent: 0,
            })
            .fromTo(".holder img", {
                yPercent: 100
            },
            {
                duration: 0.5,
                yPercent: 0,
            }, "<");

            visiontl.fromTo(
        vision_split.chars, {
            y: 200,
            opacity: 0,

        }, {
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.05,
        });

            visiontl.fromTo(
        vision_con, {
            y: 200,
            opacity: 0,

        }, {
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.05,
        });


})



// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
