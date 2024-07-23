document.addEventListener("DOMContentLoaded", () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');
    const toggleele = document.querySelector('#toggleele');
    const togglebtn = document.querySelector('#togglebtn')
   

  
    let currentIndex = 0;
    let autoSlideInterval;
  
    function updateSwiper() {
      const offset = -currentIndex * 100;
      swiperWrapper.style.transform = `translateX(${offset}%)`;
    }
  
    function goToNextSlide() {
      if (currentIndex < swiperSlides.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSwiper();
    }
  
    function goToPrevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = swiperSlides.length - 1;
      }
      updateSwiper();
    }
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(goToNextSlide, 4000); // Change slide every 3 seconds
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    prevButton.addEventListener('click', () => {
      stopAutoSlide();
      goToPrevSlide();
      startAutoSlide();
    });
  
    nextButton.addEventListener('click', () => {
      stopAutoSlide();
      goToNextSlide();
      startAutoSlide();
    });
  
    // Initial update
    updateSwiper();
    startAutoSlide();


    togglebtn.addEventListener('click',()=>{
      toggleele.classList.toggle('hidden');
      toggleele.classList.toggle('visible');
    })

    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        document.title = 'Hey Come back :( ';
      } else {
        document.title = 'Vighnesh';
      }
    });
  });
  
