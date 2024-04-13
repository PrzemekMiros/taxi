function animationMain() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
  // duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  lerp: 0.12,
  smooth: 2,
  smoothTouch: false,
  touchMultiplier: 2,
  wheelMultiplier: 1,
  infinite: false,
  autoResize: true
  });
  

  lenis.on('scroll', ScrollTrigger.update)
  
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  });
  

  // Paragraph --------------------------------------------------------------
  if (document.querySelector(".split-lines")) {
    let splitTextLines = [...document.querySelectorAll(".split-lines")];
    splitTextLines.forEach((element) => {
      let mySplitText = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      new SplitText(element, {
        type: "lines",
        linesClass: "line-parent",
      });
      gsap.from(mySplitText.lines, {
        duration: 1,
        stagger: 0.05,
        yPercent: 110,
        ease: Power2.easeInOut,
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          //toggleActions: 'restart pause reverse pause',
        },
      });
    });
  };


  const textHighlights = document.querySelectorAll(".text-highlight");

  textHighlights.forEach((textHighlight) => {
    const splitText = new SplitText(textHighlight, {
      type: "lines, chars",
      charsClass: "char-highlight"
    });
  
    const tlh = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlight, 
        scrub: 1,
        start: "top 70%", 
        end: "bottom 80%" 
      }
    });
  
    tlh.from(".char-highlight", {
      opacity: 0.2,
      stagger: 0.3
    });
  });
  

  /*
  
  const textHighlights = document.querySelectorAll(".text-highlight");
  textHighlights.forEach((textHighlight) => {
    const splitText = new SplitText(textHighlight, {
      type: "lines, chars",
      charsClass: "char-highlight"
    });
  
    const tlh = gsap.timeline({
      scrollTrigger: {
        trigger: textHighlight,
        scrub: 1,
        start: "top 90%",
        end: "bottom 55%"
      }
    });
  
    tlh.to(".char-highlight", {
      "--highlight-offset": "100%",
      stagger: 0.3
    });
  });
  */

  
  // Fade in
  const fadeIn = gsap.utils.toArray(".fade-in");
  fadeIn.forEach((fadeInItem) => {
    gsap.from(fadeInItem, {
      autoAlpha: 0,
      opacity: 0,
      duration: 1,
      delay: .1,
      scrollTrigger: {
        trigger: fadeInItem,
        start: "top 90%",
      },
    });
  });

  // Line animation
  const lineX = gsap.utils.toArray(".line-x");
  lineX.forEach((lineXItem) => {
    gsap.from(lineXItem, {
      width: "0",
      duration: 1,
      ease: Power2.easeInOut,
      scrollTrigger: {
        trigger: '.line-x',
        start: "top 90%",
      },
    });
  });

  // Footer parallax
  if (window.matchMedia("(min-width: 767px)").matches) {
    gsap.from(".footer-parallax", {
      opacity: 0,
      y: "-25%",
      scrollTrigger: {
        trigger: ".footer-parallax",
        start: "top 90%",
        end: "bottom 85%",
        scrub: true,
      },
    });
  };

  
     // Nav menu
     const menuToggle = document.getElementById("menuToggle");
     const menuBar = gsap.timeline();
     var tl = gsap.timeline({ paused: true});
     tl.to('.fullpage-menu', {
         duration: 0,
         display: "block",
         ease: 'Expo.easeInOut',
     });
     tl.from('.menu-bg', {
         duration: .8,
         opacity: 0,
         ease: 'Expo.easeInOut'
     });
     tl.from('.main-menu li a', {
         duration: 1.3,
         y:"110%",
         stagger: 0.1,
         ease: 'Expo.easeInOut'
     }, "-=0.6");
     tl.from('.line-xh', {
      duration: 1,
      stagger: .1,
      width: "0",
      ease: 'Expo.easeInOut'
     }, "-=1.3");
     tl.reverse();
     menuToggle.addEventListener('click', function(){
         menuBar.reversed(!menuBar.reversed());
         tl.reversed(!tl.reversed());
       // menuWrap.classList.toggle("active");
     });


  // Magnetic
  var magnets = document.querySelectorAll('.magnetic');
  var magnetText = document.querySelectorAll("xt");
  var strength = 100;

  if(window.innerWidth > 767){
    // Mouse Reset
    magnets.forEach( (magnet) => {
      magnet.addEventListener('mousemove', moveMagnet );
      // $(this.parentNode).removeClass('not-active');
      magnet.addEventListener('mouseleave', function(event) {
        gsap.to( event.currentTarget, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
        gsap.to( magnetText, 1.5, {
          x: 0, 
          y: 0, 
          ease: 'Elastic.easeOut'
        });
      });
    });

    // Mouse move
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      var magnetsStrength = magnetButton.getAttribute("data-strength");
      var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
      var magnetText = magnetButton.querySelector(".btn-text");

      gsap.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrength,
        rotate: '0.005deg',
        ease: 'Power4.easeOut'
      });
      gsap.to( magnetText, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
        rotate: '0.001deg',
        ease: 'Power4.easeOut'
      });
    }
  }; 


     // Scroll progress
     if (window.matchMedia("(min-width: 767px)").matches) {
      gsap.to(".scrollprogress", {
       height: "100vh",
       ease: 'none',
       scrollTrigger: { 

         trigger: ".scrollContainer",
         start: "top 0%",
         end: "bottom 99%",
         scrub: true,
       }
     });
     };

     if (document.querySelector('.send-icon-big')) {
     gsap.from('.send-icon-big', {
      yPercent: 120,
      xPercent: -100,
      duration: .7,
      delay: .45
     });
    };


    function filter() {

      var projects = document.querySelectorAll('.project');
      var startHeight = gsap.getProperty(".projects-inner", "height");
      var state = Flip.getState('.project, .empty');
      var filters = document.querySelectorAll('.option.is_active');
    
      if(filters.length) {
        projects.forEach(function(project) {
          gsap.set(project, { display: 'block' });
          project.classList.remove('filtered');
        });
        filters.forEach(function(filter) {
          var type = filter.dataset.filter.split(':')[0];
          var value = filter.dataset.filter.split(':')[1];
          projects.forEach(function(project) {
            if(project.getAttribute('data-' + type) != value) {
              gsap.set(project, { display: 'none' });
              project.classList.add('filtered');
            }
          });
        });
      }
      else {
        projects.forEach(function(project) {
          gsap.set(project, { display: 'block' });
          project.classList.remove('filtered');
        });
      }
    
      if(document.querySelectorAll('.project:not(.filtered)').length) {
        gsap.set('.empty', { display: 'none' });
      }
      else {
        gsap.set('.empty', { display: 'block' });
      }
      
      var endHeight = gsap.getProperty(".projects-inner", "height");
    
      var flip = Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.08,
        absolute: true,
        onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: .6}),
        onLeave: elements => gsap.fromTo(elements, {opacity: 1, scale: 1}, {opacity: 0, scale: 0, duration: .6})
      })
      flip.fromTo(".projects-inner", {
        height: startHeight
      }, {
        height: endHeight,
        clearProps: "height",
        duration: flip.duration()
      }, 0);

        // Scroll to ".portfolio" after filtering
  var portfolioElement = document.querySelector('.portfolio');
  if (portfolioElement) {
    portfolioElement.scrollIntoView({ behavior: 'smooth' });
  }
    
    }
    
    document.querySelectorAll('.filter-buttons').forEach(function(button) {
      button.querySelectorAll('.option').forEach(function(option) {
        option.addEventListener('click', function(event) {
          is_active = false;
          button.querySelectorAll('.option').forEach(function(option2) {
            if(option2.classList.contains('is_active')) {
              option2.classList.remove('is_active');
              if(option2 == option) {
                is_active = true;
              }
            }
          });
          if(!is_active) {
            event.currentTarget.classList.add('is_active');
          }
          filter();
          event.preventDefault();
        });
      });
    });


  // End animation
}

function addMenuClass() {
  MenuClass = document.querySelector("body");
  MenuToggle = document.querySelector(".menu-toggle");
  MenuToggle.addEventListener('click', () => {
    MenuClass.classList.toggle("menu-open");
  });
}
addMenuClass();
function removeMenuClass() {
  document.querySelector("body").classList.remove("menu-open");
}
