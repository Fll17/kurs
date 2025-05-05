// Константы для правил бронирования
const WORKING_HOURS = {
    start: 10,
    end: 20
};
const MIN_TIME_BETWEEN_BOOKINGS = 90; // 1.5 часа в минутах
const MAX_BOOKINGS_PER_DAY = 3;

const availableCorpses = ['k3', 'k4'];
// Данные о квартирах для каждого корпуса





document.addEventListener('DOMContentLoaded', function() {
    // Обработка кликов на кликабельные корпуса
    const clickableBuildings = document.querySelectorAll('.building.clickable');
    
    clickableBuildings.forEach(building => {
        building.addEventListener('click', function() {
            const corpusId = this.dataset.corpus;
            openFullscreen(corpusId);
        });
    });

    // Улучшенная обработка hover
    const interactiveElements = document.querySelectorAll('.building, [class^="marker-"]');
    
    interactiveElements.forEach(el => {
        // Убираем mouseleave обработчик полностью
        // Теперь вся логика в CSS
    });
});

const apartmentsData = {
    k3: {
        "1k": {
            title: "1-комн. квартира",
            size: "46.1 м² • 2/18 этаж",
            section: "Корпус 2",
            delivery: "Сдача в 1 кв. 2028",
            price: " 7 717 140 ₽",
            discountPrice: "8 298 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "1-комнатная квартира с видом на парк. Идеально для одного человека или пары.",
            photo: "img/квартиры/k2/k2-1.2.png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k2/k2-1.2.png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "46.1 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        },
        "2k": {
            title: "2-комн. квартира",
            size: "48.4 м² • 2/18 этаж",
            section: "Корпус 2",
            delivery: "Сдача в 1 кв. 2028",
            price: "8 102 160 ₽",
            discountPrice: "8 712 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "2-комнатная квартира с просторной гостиной. Подходит для небольшой семьи.",
            photo: "img/квартиры/k2/k2-2.2.png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k2/k2-2.2.png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "48.4 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        },
        "3k": {
            title: "3-комн. квартира",
            size: "84.9 м² • 3/18 этаж",
            section: "Корпус 2",
            delivery: "Сдача в 1 кв. 2028",
            price: "14 212 260 ₽",
            discountPrice: "15 282 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "3-комнатная квартира с большой кухней и двумя спальнями. Идеально для семьи.",
            photo: "img/квартиры/k2/k2-3.2.png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k2/k2-3.2.png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "84.9 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
    
        },
        "4k": {
            title: "4-комн. квартира",
            size: "110.5 м² • 17/18 этаж",
            section: "Корпус 2",
            delivery: "Сдача в 1 кв. 2028",
            price: "18 497 700 ₽",
            discountPrice: "19 890 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "4-комнатная квартира с просторными комнатами и видом на город.",
            photo: "img/квартиры/k2/k2-4.2.png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k2/k2-4.2.png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "110.5 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        }
    },
    k4: {
        "1k": {
            title: "1-комн. квартира",
            size: "45.1 м² • 2/18 этаж",
            section: "Корпус 4",
            delivery: "Сдача в 2 кв. 2028",
            price: "7 549 740 ₽",
            discountPrice: "8 118 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "1-комнатная квартира с современной отделкой.",
            photo: "img/квартиры/k4/k4-1.2 (1).png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k4/k4-1.2 (1).png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "45.1 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        },
        "2k": {
            title: "2-комн. квартира",
            size: "47.4 м² • 13/18 этаж",
            section: "Корпус 4",
            delivery: "Сдача в 2 кв. 2028",
            price: "7 934 760 ₽",
            discountPrice: "8 532 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "2-комнатная квартира с балконом и видом на парк.",
            photo: "img/квартиры/k4/k4-1.2 (2).png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k4/k4-1.2 (2).png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "47.4 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        },
        "3k": {
            title: "3-комн. квартира",
            size: "85.5 м² • 6/18 этаж",
            section: "Корпус 4",
            delivery: "Сдача в 2 кв. 2028",
            price: "14 312 700 ₽",
            discountPrice: "15 390 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "3-комнатная квартира с большой гостиной и двумя спальнями.",
            photo: "img/квартиры/k4/k4-1.2 (3).png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k4/k4-1.2 (3).png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "85.5 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        },
        "4k": {
            title: "4-комн. квартира",
            size: "132.9 м² • 14/18 этаж",
            section: "Корпус 4",
            delivery: "Сдача в 2 кв. 2028",
            price: "22 247 460 ₽",
            discountPrice: "23 922 000 ₽",
            pricePerMeter: "180 000 ₽/м²",
            description: "4-комнатная квартира с просторными комнатами и современной кухней.",
            photo: "img/квартиры/k4/k4-1.2 (4).png",
            developerLogo: "img/иконки/photo_2025-03-09_22-19-18.jpg",
            photos: ["img/квартиры/k4/k4-1.2 (4).png", "img/квартиры/genplan.jpg", "img/modal/1.jpg", "img/modal/2.jpg", "img/modal/3.jpg", "img/modal/4.jpg", "img/modal/5.jpg", "img/modal/6.jpg", "img/modal/7.jpg", "img/modal/8.jpg", "img/modal/9.jpg", "img/modal/10.jpg"],
            finishingPhotos: ["img/galery/otdelca/hallway.webp", "img/galery/otdelca/bedroom.webp", "img/galery/otdelca/kitcheb.webp", "img/galery/otdelca/balcony.webp", "img/galery/otdelca/bathroom.webp", "img/galery/otdelca/living room.webp", "img/galery/otdelca/storeroom.webp", "img/galery/otdelca/wardrobe.webp"],
            details: {
                type: "Новостройка",
                area: "132.9 м²",
                ceilingHeight: "3.65 м",
                view: "На улицу",
                houseInfo: {
                    elevators: "2 пассажирских, 1 грузовой",
                    houseType: "Монолитно-кирпичный",
                    parking: "Наземная и подземная"
                }
            }
        }
    }
};
// Состояние приложения
const genplanState = {
    currentCorpus: null,
    currentApartmentType: "1k",
    currentSlideIndex: 0,
    currentFinishingSlideIndex: 0
};

// Кэширование DOM элементов
const elements = {
    fullscreenOverlay: document.getElementById('fullscreenOverlay'),
    detailsOverlay: document.getElementById('detailsOverlay'),
    bookingOverlay: document.getElementById('bookingOverlay'),
    authModal: document.getElementById('auth-modal'),
    apartmentPhoto: document.getElementById('apartmentPhoto'),
    reserveButton: document.querySelector('.reserve'),
    apartmentSwitcher: document.querySelector('.apartment-switcher'),
    apartmentDetails: {
        type: document.querySelector('[data-detail="type"]'),
        area: document.querySelector('[data-detail="area"]'),
        ceiling: document.querySelector('[data-detail="ceiling"]'),
        view: document.querySelector('[data-detail="view"]'),
        elevators: document.querySelector('[data-detail="elevators"]'),
        houseType: document.querySelector('[data-detail="houseType"]'),
        parking: document.querySelector('[data-detail="parking"]')
    }
};

// Инициализация слайдеров
function initSliders(photos, finishingPhotos) {
    // Основной слайдер с фотографиями ЖК
    const mainSlider = document.querySelector('.slider-container .slider');
    if (mainSlider && photos) {
        mainSlider.innerHTML = photos.map(photo => 
            `<img src="${photo}" alt="Фото ЖК" class="slider-image">`
        ).join('');
    }

    // Слайдер с фотографиями отделки
    const finishingSlider = document.querySelector('.finishing-slider .slider');
    if (finishingSlider && finishingPhotos) {
        finishingSlider.innerHTML = finishingPhotos.map(photo => 
            `<img src="${photo}" alt="Отделка квартиры" class="slider-image">`
        ).join('');
    }

    // Инициализация показа первого слайда
    showSlide(0, '.slider-container .slider');
    showSlide(0, '.finishing-slider .slider');
}

// Инициализация кнопок переключения квартир
function initApartmentSwitchers() {
    const buttons = elements.apartmentSwitcher.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            switchApartment(type);
        });
    });
}

// Обновление информации о квартире
function updateApartmentInfo() {
    const apt = apartmentsData[genplanState.currentCorpus]?.[genplanState.currentApartmentType];
    if (!apt) return;

    document.getElementById('apartmentTitle').textContent = apt.title;
    document.getElementById('apartmentSize').textContent = apt.size;
    document.getElementById('apartmentSection').textContent = apt.section;
    document.getElementById('apartmentDelivery').textContent = apt.delivery;
    document.getElementById('apartmentPrice').textContent = apt.price;
    document.getElementById('apartmentDiscountPrice').textContent = apt.discountPrice;
    document.getElementById('apartmentPricePerMeter').textContent = apt.pricePerMeter;
    document.getElementById('apartmentDescription').textContent = apt.description;
    elements.apartmentPhoto.src = apt.photos[0];

    if (apt.details) {
        updateApartmentDetails(apt.details);
    }
}

// Обновление детальной информации
function updateApartmentDetails(details) {
    elements.apartmentDetails.type.textContent = details.type;
    elements.apartmentDetails.area.textContent = details.area;
    elements.apartmentDetails.ceiling.textContent = details.ceilingHeight;
    elements.apartmentDetails.view.textContent = details.view;
    
    if (details.houseInfo) {
        elements.apartmentDetails.elevators.textContent = details.houseInfo.elevators;
        elements.apartmentDetails.houseType.textContent = details.houseInfo.houseType;
        elements.apartmentDetails.parking.textContent = details.houseInfo.parking;
    }
}

// Переключение типа квартиры
function switchApartment(type) {
    if (!apartmentsData[genplanState.currentCorpus]?.[type]) return;
    genplanState.currentApartmentType = type;
    updateApartmentInfo();
    updateActiveSwitcherButton();
    updatePriceInfo();
    
    // Обновление слайдеров при переключении типа квартиры
    const apt = apartmentsData[genplanState.currentCorpus][genplanState.currentApartmentType];
    initSliders(apt.photos, apt.finishingPhotos);
}

// Обновление активной кнопки
function updateActiveSwitcherButton() {
    const buttons = elements.apartmentSwitcher.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle('active', button.dataset.type === genplanState.currentApartmentType);
    });
}

// Работа с модальными окнами
function openFullscreen(corpusId) {
    if (!availableCorpses.includes(corpusId)) {
        alert('Этот корпус временно недоступен для бронирования');
        return;
    }
    
    genplanState.currentCorpus = corpusId;
    genplanState.currentApartmentType = "1k";
    updateApartmentInfo();
    updateActiveSwitcherButton();
    updatePriceInfo();
    elements.fullscreenOverlay.style.display = 'flex';
    document.body.classList.add('no-scroll');
    
    // Инициализация слайдеров
    const apt = apartmentsData[genplanState.currentCorpus][genplanState.currentApartmentType];
    initSliders(apt.photos, apt.finishingPhotos);
}

function openDetails() {
    const apt = apartmentsData[genplanState.currentCorpus][genplanState.currentApartmentType];
    document.getElementById('detailsTitle').textContent = apt.title;
    elements.detailsOverlay.style.display = 'flex';
    updateSliders(apt.photos, apt.finishingPhotos);
}

function closeDetails() {
    elements.detailsOverlay.style.display = 'none';
}

// Функции слайдеров
function updateSliders(photos, finishingPhotos) {
    const mainSlider = document.querySelector('.slider-container .slider');
    const finishingSlider = document.querySelector('.finishing-slider .slider');
    
    mainSlider.innerHTML = photos.map(photo => `<img src="${photo}" alt="Фото">`).join('');
    finishingSlider.innerHTML = finishingPhotos.map(photo => `<img src="${photo}" alt="Отделка">`).join('');
    
    genplanState.currentSlideIndex = 0;
    genplanState.currentFinishingSlideIndex = 0;
    showSlide(genplanState.currentSlideIndex, '.slider-container .slider');
    showSlide(genplanState.currentFinishingSlideIndex, '.finishing-slider .slider');
}

function showSlide(index, sliderClass) {
    const slider = document.querySelector(sliderClass);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('img');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slider-container .slider img');
    if (slides.length === 0) return;
    genplanState.currentSlideIndex = (genplanState.currentSlideIndex + 1) % slides.length;
    showSlide(genplanState.currentSlideIndex, '.slider-container .slider');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slider-container .slider img');
    if (slides.length === 0) return;
    genplanState.currentSlideIndex = (genplanState.currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(genplanState.currentSlideIndex, '.slider-container .slider');
}

function nextFinishingSlide() {
    const slides = document.querySelectorAll('.finishing-slider .slider img');
    if (slides.length === 0) return;
    genplanState.currentFinishingSlideIndex = (genplanState.currentFinishingSlideIndex + 1) % slides.length;
    showSlide(genplanState.currentFinishingSlideIndex, '.finishing-slider .slider');
}

function prevFinishingSlide() {
    const slides = document.querySelectorAll('.finishing-slider .slider img');
    if (slides.length === 0) return;
    genplanState.currentFinishingSlideIndex = (genplanState.currentFinishingSlideIndex - 1 + slides.length) % slides.length;
    showSlide(genplanState.currentFinishingSlideIndex, '.finishing-slider .slider');
}

// Проверка авторизации
function checkAuth() {
    return fetch('check-auth.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return true;
            }
            return false;
        });
}

// Открытие формы бронирования
function openBooking() {
    const now = new Date();
    document.getElementById('bookingDate').valueAsDate = now;
    document.getElementById('bookingDate').min = now.toISOString().split('T')[0];
    
    elements.bookingOverlay.style.display = 'flex';
    document.getElementById('confirmationMessage').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'block';
}

// Закрытие формы бронирования
function closeBooking() {
    elements.bookingOverlay.style.display = 'none';
}

// Обработка клика на кнопку бронирования
function handleReserveClick() {
    return checkAuth()
        .then(isAuthenticated => {
            if (isAuthenticated) {
                openBooking();
                return true;
            } else {
                elements.authModal.style.display = 'block';
                document.body.classList.add('no-scroll');
                return false;
            }
        })
        .catch(error => {
            console.error('Error in handleReserveClick:', error);
            return false;
        });
}

// Функция для обработки отправки формы бронирования
async function handleBookingSubmit(bookingData) {
    const bookingTime = new Date(`${bookingData.bookingDate}T${bookingData.bookingTime}`);
    const hours = bookingTime.getHours();
    
    if (hours < WORKING_HOURS.start || hours >= WORKING_HOURS.end) {
        return {
            success: false,
            message: `Бронирование возможно только с ${WORKING_HOURS.start}:00 до ${WORKING_HOURS.end}:00`
        };
    }

    try {
        const response = await fetch('booking.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        return {
            success: false,
            message: 'Ошибка при бронировании'
        };
    }
}

function updatePriceInfo() {
    const apt = apartmentsData[genplanState.currentCorpus]?.[genplanState.currentApartmentType];
    if (!apt) return;

    const priceInfo = document.querySelector('.price-info');
    if (!priceInfo) return;

    // Рассчитываем процент скидки
    const originalPrice = parseInt(apt.price.replace(/\D/g, ''));
    const discountPrice = parseInt(apt.discountPrice.replace(/\D/g, ''));
    const discountPercent = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

    // Обновляем содержимое контейнера
    priceInfo.innerHTML = `
        <h2>${apt.price}</h2>
        ${apt.discountPrice ? `<p class="discount">Скидка ${discountPercent}%</p>` : ''}
        ${apt.discountPrice ? `<p class="discount-price">${apt.discountPrice}</p>` : ''}
        <p class="price-per-meter">${apt.pricePerMeter}</p>
        <button class="contact-developer">Заказать звонок</button>
        <button class="reserve">Забронировать</button>
    `;

    // Добавляем обработчики событий для новых кнопок
    priceInfo.querySelector('.contact-developer').addEventListener('click', function(e) {
        e.preventDefault();
        // Используем существующее модальное окно заказа звонка
        if (typeof CallbackModal !== 'undefined') {
            CallbackModal.open();
        }
    });

    priceInfo.querySelector('.reserve').addEventListener('click', handleReserveClick);
}


// Функция для обновления информации о брони в шапке
function updateBookingInfoInHeader() {
    fetch('get-bookings.php')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.success && data.bookings && data.bookings.length > 0) {
                createBookingInfoButton(data.bookings);
            }
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

// Функция для создания кнопки с информацией о брони
function createBookingInfoButton(bookings) {
    const oldButton = document.getElementById('bookingInfoButton');
    if (oldButton) oldButton.remove();
    
    const bookingInfoButton = document.createElement('button');
    bookingInfoButton.id = 'bookingInfoButton';
    bookingInfoButton.className = 'booking-info-button';
    bookingInfoButton.textContent = `Мои брони (${bookings.length})`;
    
    const bookingDetailsModal = document.createElement('div');
    bookingDetailsModal.className = 'booking-details-modal';
    bookingDetailsModal.style.cssText = `
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    let modalContent = `<h3>Мои бронирования</h3><div class="bookings-list">`;
    
    bookings.forEach((booking, index) => {
        const bookingDateTime = new Date(`${booking.booking_date}T${booking.booking_time}`);
        const formattedDate = bookingDateTime.toLocaleDateString('ru-RU');
        const formattedTime = bookingDateTime.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
        
        modalContent += `
            <div class="booking-item">
                <h4>Бронь #${index + 1}</h4>
                <div class="booking-meta">
                    <span>Корпус: ${booking.corpus}</span>
                    <span>Тип: ${getApartmentTypeName(booking.apartment_type)}</span>
                </div>
                <div class="booking-details">
                    <p><strong>Дата:</strong> ${formattedDate}</p>
                    <p><strong>Время:</strong> ${formattedTime}</p>
                    <p><strong>Контактные данные:</strong></p>
                    <p>${booking.full_name}, ${booking.phone}</p>
                </div>
            </div>
        `;
    });
    
    modalContent += `</div>
        <button class="close-booking-details">Закрыть</button>
    `;
    
    bookingDetailsModal.innerHTML = modalContent;
    document.body.appendChild(bookingDetailsModal);
    
    const header = document.querySelector('header');
    const logoutButton = document.getElementById('logoutButton');
    header.insertBefore(bookingInfoButton, logoutButton.nextSibling);
    
    bookingInfoButton.style.cssText = `
        width: 200px;
        height: 40px;
        border-radius: 25px;
        border: 1px solid white;
        font-size: 24px;
        background-color: transparent;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        margin-left: 15px;
    `;
    
    bookingInfoButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    });
    
    bookingInfoButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'white';
    });
    
    bookingInfoButton.addEventListener('click', () => {
        bookingDetailsModal.style.display = 'block';
        document.body.classList.add('no-scroll');
        
        const overlay = document.createElement('div');
        overlay.className = 'booking-details-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
        `;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            bookingDetailsModal.style.display = 'none';
            overlay.remove();
            document.body.classList.remove('no-scroll');
        });
        
        const closeButton = bookingDetailsModal.querySelector('.close-booking-details');
        closeButton.addEventListener('click', () => {
            bookingDetailsModal.style.display = 'none';
            overlay.remove();
            document.body.classList.remove('no-scroll');
        });
    });
}

// Вспомогательная функция для получения названия типа квартиры
function getApartmentTypeName(type) {
    const types = {
        '1k': '1-комн.',
        '2k': '2-комн.',
        '3k': '3-комн.',
        '4k': '4-комн.'
    };
    return types[type] || type;
}

// Обработчик формы бронирования
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const bookingData = {
        corpus: genplanState.currentCorpus,
        apartmentType: genplanState.currentApartmentType,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        bookingDate: document.getElementById('bookingDate').value,
        bookingTime: document.getElementById('bookingTime').value
    };

    const hours = parseInt(bookingData.bookingTime.split(':')[0]);
    if (hours < 10 || hours >= 20) {
        alert('Бронирование возможно только с 10:00 до 20:00');
        return;
    }

    try {
        const response = await fetch('booking.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('bookingForm').style.display = 'none';
            document.getElementById('confirmationMessage').style.display = 'block';
            setTimeout(closeBooking, 2000);
            updateBookingInfoInHeader();
        } else {
            if (result.alternativeTime) {
                const confirmAlternative = confirm(
                    `${result.message}\n\nХотите забронировать на ${result.alternativeTime}?`
                );
                if (confirmAlternative) {
                    document.getElementById('bookingTime').value = result.alternativeTime;
                    this.dispatchEvent(new Event('submit'));
                }
            } else {
                alert(result.message || 'Ошибка при бронировании');
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных');
    }
});

// Закрытие полноэкранного режима
function closeFullscreen() {
    if (elements.fullscreenOverlay) {
        elements.fullscreenOverlay.style.display = 'none';
    }
    document.body.classList.remove('no-scroll');
    genplanState.currentCorpus = null;
    genplanState.currentApartmentType = "1k";
}

// Обработчик для кнопки закрытия
function setupCloseButtons() {
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeFullscreen);
    });
    
    if (elements.fullscreenOverlay) {
        elements.fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === elements.fullscreenOverlay) {
                closeFullscreen();
            }
        });
    }
}

// Инициализация приложения
function init() {
    initSliders();
    initApartmentSwitchers();
    setupCloseButtons();

    document.querySelectorAll('.marker').forEach(marker => {
        const corpusId = marker.classList[1];
        if (availableCorpses.includes(corpusId)) {
            marker.style.cursor = 'pointer';
            marker.addEventListener('click', () => {
                openFullscreen(corpusId);
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeFullscreen();
                });
            });
        }
    });
    
    elements.apartmentPhoto.addEventListener('click', openDetails);
    elements.reserveButton.addEventListener('click', handleReserveClick);
}

// Модальное окно заказа звонка
const CallbackModal = {
    init() {
        this.createModal();
        this.bindEvents();
    },
    
    createModal() {
        const modalHTML = `
        <div id="callbackOverlay" class="callback-overlay" style="display:none">
            <div class="callback-content">
                <span class="callback-close">&times;</span>
                <h2>Заказать звонок</h2>
                <p>Оставьте свои контактные данные и мы свяжемся с вами</p>
                <form id="callbackForm">
                    <div class="form-group">
                        <label for="callbackName">ФИО*</label>
                        <input type="text" id="callbackName" placeholder="Иванов Иван Иванович" required>
                    </div>
                    <div class="form-group">
                        <label for="callbackContact">Телефон или Email*</label>
                        <input type="text" id="callbackContact" placeholder="+7 (XXX) XXX-XX-XX или email@example.com" required>
                    </div>
                    <button type="submit">Отправить</button>
                </form>
                <div id="callbackSuccess" style="display:none">
                    <i class="fas fa-check-circle"></i>
                    <h3>Спасибо!</h3>
                    <p>Мы свяжемся с вами в ближайшее время</p>
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },
    
    bindEvents() {
        // Обработчик для кнопки "Заказать звонок"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('contact-developer')) {
                e.preventDefault();
                this.open();
            }
        });
        
        document.getElementById('callbackForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
        
        document.querySelector('.callback-close')?.addEventListener('click', () => {
            this.close();
        });
    },
    
    open() {
        document.getElementById('callbackOverlay').style.display = 'flex';
        document.body.classList.add('no-scroll');
    },
    
    close() {
        document.getElementById('callbackOverlay').style.display = 'none';
        document.body.classList.remove('no-scroll');
        this.resetForm();
    },
    
    submitForm() {
        const name = document.getElementById('callbackName').value;
        const contact = document.getElementById('callbackContact').value;
        
        // Собираем данные о текущей квартире
        const apartmentData = {
            name: name,
            contact: contact,
            apartmentType: genplanState.currentApartmentType,
            corpus: genplanState.currentCorpus,
            isEmail: contact.includes('@')
        };
        
        // Показываем индикатор загрузки
        const form = document.getElementById('callbackForm');
        form.style.display = 'none';
        const loading = document.createElement('div');
        loading.className = 'callback-loading';
        loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        form.parentNode.insertBefore(loading, form.nextSibling);
        
        // Отправляем данные на сервер (замените на ваш endpoint)
        fetch('save_callback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apartmentData)
        })
        .then(response => response.json())
        .then(data => {
            loading.remove();
            if (data.success) {
                // Показываем сообщение об успехе
                document.getElementById('callbackSuccess').style.display = 'block';
                setTimeout(() => {
                    this.close();
                }, 2000);
            } else {
                alert('Ошибка: ' + (data.message || 'Не удалось отправить заявку'));
                form.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loading.remove();
            form.style.display = 'block';
            alert('Произошла ошибка при отправке формы');
        });
    },
    
    resetForm() {
        document.getElementById('callbackForm').reset();
        document.getElementById('callbackForm').style.display = 'block';
        document.getElementById('callbackSuccess').style.display = 'none';
    }
};

// Инициализируем модальное окно при загрузке страницы
CallbackModal.init();

// Добавляем стили для модального окна
const callbackStyles = `
.callback-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.callback-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
    position: relative;
}

.callback-close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

.callback-content h2 {
    margin-top: 0;
    color: #333;
}

.callback-content p {
    margin-bottom: 20px;
    color: #666;
}

.callback-content .form-group {
    margin-bottom: 15px;
}

.callback-content label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.callback-content input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.callback-content button[type="submit"] {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}

#callbackSuccess {
    text-align: center;
    color: #4CAF50;
}

#callbackSuccess i {
    font-size: 50px;
    margin-bottom: 15px;
}

.callback-loading {
    text-align: center;
    padding: 20px;
}

.callback-loading i {
    font-size: 30px;
    color: #4CAF50;
    animation: fa-spin 1s infinite linear;
}
`;

// Добавляем стили в документ
const styleElement = document.createElement('style');
styleElement.innerHTML = callbackStyles;
document.head.appendChild(styleElement);

document.addEventListener('DOMContentLoaded', init);