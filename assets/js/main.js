

$(function () {

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * ArsaLan type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Button Click Event


  class list {
    constructor(name, description, amount) {
      this.name = name;
      this.description = description;
      this.amount = amount;
    }
  }

  function jankari(naam, pata, kimat) {
    const itemlist = new list(naam, pata, kimat);
    carktlist.push(itemlist);
    console.log(carktlist);
  }


  var carktlist = [];
  // carktlist.length = 3;

  cartlength = () => $('.count').text(carktlist.length);

  $('.bcd').on('click', function () {

    let bcd = $(this).siblings(' :nth-child(1)').text()
    let abc = $(this).siblings(' :nth-child(2)').text()
    let amount = $(this).siblings(' :nth-child(3)').text()
    jankari(bcd, abc, amount);
  })

  var carticon = $('.crt').offset();

  $(document).ready(function () {
    // Function to handle box animation
    function animateBox(boxSelector) {
      addtocart();
      cartlength();
      $(boxSelector).show(500).css({ transform: "skewY(20deg)" }).animate({
        top: -carticon.top + 'px',
        left: carticon.left + 'px',
        width: 0,
        height: 0,
      }, 800, function () {
        // Additional callback logic, if needed
      }).hide(1000, function () {
        $('#cartbtn i').addClass('fa-shake');
        $('#cartbtn').on('click', function () {
          $('#cartbtn i').removeClass('fa-shake');
        })
      });
    }

    // Click event handlers for each box
    $('#1box').on('click', function () {
      animateBox('.box1');
    });

    $('#2box').on('click', function () {
      animateBox('.box2');
    });

    $('#3box').on('click', function () {
      animateBox('.box3');
    });
  });

  $('.table').on('click', '.remove', function () {

    let i = $(this).attr("data-id")
    carktlist.splice(i, 1);
    $(this).parent().parent().css("transform", "translateX(5000px)").hide(1000, function () {

      addtocart();
      cartlength();
    })
  })

  function addtocart() {

    var data = carktlist.map((course, i) => `<tr>'><td>${course.name}</td> <td>${course.description}</td> <td>${course.amount}</td> <td><button type="button" class="btn btn-danger remove" data-id='${i}'>Remove</button></td></tr>`)

    naam(data);
    empty();
  }

  function naam(data) {
    $('#kart tbody').html(data)
  }

  function empty(){
    $('.emty').hide();
    $('.table').show(); 
  }

  var outerwidth =  $('.main-box2').width();
  $('.box2').width(outerwidth);
 
  var outerwidth =  $('.main-box3').width();
  $('.box3').width(outerwidth);
})

