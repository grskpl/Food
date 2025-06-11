window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });

      //timer

    

    const deadline = '2025-05-15';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }   else {

        
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60 ) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
            }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) {
         if (num >= 0 &&  num <10) {
            return '0' + num; 
         } else {
            return num;
         }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours =  timer.querySelector('#hours'),
              minutes =  timer.querySelector('#minutes'),
              seconds =  timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    
    
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const current = document.getElementById('current');
    const total = document.getElementById('total');

    let slideIndex = 0;


    total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });

        current.textContent = (index + 1 < 10) ? `0${index + 1}` : index + 1;
    }


    showSlide(slideIndex);

    next.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    });

    prev.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    });

    //Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClooseBtn = document.querySelector('[data-close]');



     function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';  
    }

    modalClooseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });


    const modalTimeId = setTimeout(openModal, 5000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= this.document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    window.addEventListener('scroll', showModalByScroll );
});



  








