window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let aboutheading = document.getElementById("#about-head");
    let elements = document.getElementsByClassName("feature-con");
    console.log(elements)
    let about_split = new SplitText("#about-head", {
        type: 'chars'
    })

    let about_heading_timeline = gsap.timeline({
        scrollTrigger:{
            trigger: "#about",
            start: "bottom top",
            end: "+=300",
            // scrub: true,
            markers: true,
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
        markers: true,
    }
})

feature_timeline.fromTo(
    elements,{
        y: -200,
        opacity: 0
    },{
        y: 0,
        opacity: 1,
    }
    )

})



// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
