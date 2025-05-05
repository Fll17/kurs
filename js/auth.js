// Глобальные переменные для управления состоянием
const state = {
    currentUser: null,
    isAdmin: false
  };

  window.authState = state;

  // 1. Сначала объявляем все вспомогательные функции
async function checkUserBookings() {
    if (!state.currentUser) return false;
    
    try {
        const response = await fetch('get-bookings.php');
        const data = await response.json();
        return data.success && data.bookings && data.bookings.length > 0;
    } catch (error) {
        console.error('Error checking bookings:', error);
        return false;
    }
}

async function checkAndUpdateBookingsButton() {
    if (state.currentUser && !state.isAdmin) {
        const hasBookings = await checkUserBookings();
        if (hasBookings) {
            createBookingsButton();
        } else {
            removeBookingsButton();
        }
    } else {
        removeBookingsButton();
    }
}

function createBookingsButton() {
    removeBookingsButton();
    
    const bookingsButton = document.createElement('button');
    bookingsButton.id = 'bookingsButton';
    bookingsButton.className = 'BookingsButton';
    bookingsButton.textContent = 'Мои брони';
    
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(bookingsButton);
    }
    
    bookingsButton.style.cssText = `
        width: 200px;
        height: 40px;
        border-radius: 25px;
        border: 1px solid white;
        font-size: 24px;
        background-color: transparent;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-left: 15px;
        box-sizing: border-box;
        line-height: 38px;
        padding: 0;
    `;
    
    bookingsButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    });
    
    bookingsButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'white';
    });
    
    bookingsButton.addEventListener('click', showUserBookingsModal);
}
// Обработчик для обновления кнопки после создания брони
document.addEventListener('booking-created', async () => {
    await checkAndUpdateBookingsButton();
});

// Удаление кнопки броней из шапки
function removeBookingsButton() {
    const btn = document.getElementById('bookingsButton');
    if (btn) btn.remove();
}

  
  // DOM элементы
  const authButton = document.getElementById("authButton");
  const logoutButton = document.getElementById("logoutButton");
  const authModal = document.getElementById("auth-modal");
  const authRegisterModal = document.getElementById("auth-register-modal");
  const authShowRegisterForm = document.getElementById("auth-show-register-form");
  const authShowLoginForm = document.getElementById("auth-show-login-form");
  const authCloseButtons = document.querySelectorAll(".auth-modal-close");
  const adminPanelButton = document.getElementById("adminPanelButton");
  
  // Инициализация при загрузке
  document.addEventListener("DOMContentLoaded", function() {
    // Защита кнопки админ-панели
    protectAdminButton();
    
    // Проверка авторизации
    checkAuth().then(updateUIAfterAuthCheck);
    
    // Настройка обработчиков событий
    setupEventListeners();
  });
  
  // Функция защиты кнопки админ-панели
  function protectAdminButton() {
    if (!adminPanelButton) return;
    
    // Скрываем кнопку от обнаружения через консоль
    adminPanelButton.classList.add('protected-admin-btn');
    
    // Мониторим изменения стилей
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style') {
                if (!state.isAdmin && adminPanelButton.style.display === 'inline-block') {
                    adminPanelButton.style.display = 'none';
                }
            }
        });
    });
    
    observer.observe(adminPanelButton, {
        attributes: true,
        attributeFilter: ['style']
    });
  }
  
  // Настройка обработчиков событий (существующий код)
  function setupEventListeners() {
    authButton.addEventListener("click", openAuthModal);
    logoutButton.addEventListener("click", handleLogout);
    
    authShowRegisterForm.addEventListener("click", () => {
        authModal.style.display = "none";
        openAuthRegisterModal();
    });
    
    authShowLoginForm.addEventListener("click", () => {
        authRegisterModal.style.display = "none";
        openAuthModal();
    });
    
    authCloseButtons.forEach((button) => {
        button.addEventListener("click", closeAuthModal);
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === authModal || event.target === authRegisterModal) {
            closeAuthModal();
        }
    });
    
    // Обработчик формы входа
    document.getElementById("auth-login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        handleLogin(new FormData(this));
    });
    
    // Обработчик формы регистрации
    document.getElementById("auth-register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        handleRegister(new FormData(this));
    });
    
    // Переключение видимости пароля
    document.getElementById("toggle-password").addEventListener("click", function() {
        const passwordInput = document.getElementById("auth-register-password");
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        this.textContent = passwordInput.type === "password" ? "Показать" : "Скрыть";
    });
  }
  
  // Функции аутентификации (существующий код)
  async function checkAuth() {
    try {
        const response = await fetch('check-auth.php');
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        if (data.success) {
            state.currentUser = {
                id: data.userId,
                name: data.userName,
                phone: data.userPhone
            };
            state.isAdmin = data.isAdmin || false;
            window.authState = state;
            
            // Добавляем эту строку
            await checkAndUpdateBookingsButton();
            
            return true;
        }
        return false;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}
  
  // Обновленная функция для UI
  function updateUIAfterAuthCheck(isAuthenticated) {
    if (isAuthenticated && state.currentUser) {
        authButton.textContent = state.currentUser.name;
        logoutButton.style.display = "inline-block";
        
        // Удаляем старую кнопку админ-панели, если она существует
        const existingAdminBtn = document.getElementById('adminPanelButton');
        if (existingAdminBtn) {
            existingAdminBtn.remove();
        }

        

        // Создаем кнопку админ-панели только для администратора
        if (state.isAdmin) {
            const adminPanelButton = document.createElement('button');
            adminPanelButton.id = 'adminPanelButton';
            adminPanelButton.className = 'AdminPanel';
            adminPanelButton.textContent = 'Админ-панель';
            
            // Добавляем кнопку в header
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(adminPanelButton);
            }
            
            // Стилизация кнопки
            adminPanelButton.style.cssText = `
                width: 200px;
                height: 40px;
                border-radius: 25px;
                border: 1px solid white !important;
                font-size: 24px !important;
                background-color: transparent !important;
                color: white !important;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                margin-left: 15px;
                box-sizing: border-box;
                line-height: 38px;
                padding: 0;
            `;
            
            // Обработчики hover эффектов
            adminPanelButton.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'white';
                this.style.color = 'black';
            });
            
            adminPanelButton.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.color = 'white';
            });
            
            // Обработчик клика
            adminPanelButton.addEventListener('click', function() {
                window.adminPanel.open();
            });
        }
        
       // Создаем кнопку админ-панели только для администратора
       if (state.isAdmin) {
        createAdminPanelButton();
    } else {
        removeAdminPanelButton();
    }
    
    createAddReviewButton();
    } else {
        authButton.textContent = "Авторизация";
        logoutButton.style.display = "none";
        
        // Удаляем кнопку админ-панели при выходе
        const adminPanelButton = document.getElementById('adminPanelButton');
        if (adminPanelButton) {
            adminPanelButton.remove();
        }
        
        removeAdminPanelButton();
        removeAddReviewButton();
    }
}

function createAdminPanelButton() {
    // Удаляем старую кнопку, если есть
    removeAdminPanelButton();
    
    const adminPanelButton = document.createElement('button');
    adminPanelButton.id = 'adminPanelButton';
    adminPanelButton.className = 'AdminPanel';
    adminPanelButton.textContent = 'Админ-панель';
    
    // Добавляем кнопку в header
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(adminPanelButton);
    }
    
    // Стилизация и обработчики
    adminPanelButton.style.cssText = `
        width: 200px;
        height: 40px;
        border-radius: 25px;
        border: 1px solid white !important;
        font-size: 24px !important;
        background-color: transparent !important;
        color: white !important;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        margin-left: 15px;
        box-sizing: border-box;
        line-height: 38px;
        padding: 0;
    `;
    
    adminPanelButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    });
    
    adminPanelButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'white';
    });
    
    adminPanelButton.addEventListener('click', function() {
        if (window.adminPanel && window.adminPanel.open) {
            window.adminPanel.open();
        }
    });
}

function removeAdminPanelButton() {
    const adminPanelButton = document.getElementById('adminPanelButton');
    if (adminPanelButton) {
        adminPanelButton.remove();
    }
}

async function showUserBookingsModal() {
    try {
        // Создаем элементы модального окна
        const modal = document.createElement('div');
        const modalContent = document.createElement('div');
        const closeBtn = document.createElement('button');
        const title = document.createElement('h2');
        const bookingsContainer = document.createElement('div');
        const loadingIndicator = document.createElement('div');
        
        // Настраиваем стили
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        modalContent.style.cssText = `
            background: white;
            border-radius: 10px;
            padding: 30px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            border: 1px solid #333;
        `;
        
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: black;
            font-size: 24px;
            cursor: pointer;
            transition: color 0.3s;
        `;
        
        title.style.cssText = `
            color: black;
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
            font-size: 24px;
        `;
        
        bookingsContainer.style.cssText = `
            display: grid;
            gap: 15px;
        `;
        
        loadingIndicator.style.cssText = `
            text-align: center;
            color: #aaa;
            padding: 20px;
        `;
        
        // Наполняем содержимое
        closeBtn.innerHTML = '&times;';
        title.textContent = 'Мои брони';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
        
        // Собираем структуру
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(loadingIndicator);
        modalContent.appendChild(bookingsContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Показываем окно с анимацией
        setTimeout(() => modal.style.opacity = '1', 10);
        document.body.style.overflow = 'hidden';
        
        // Функция закрытия модального окна
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        // Обработчики закрытия
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => e.target === modal && closeModal());
        
        // Загружаем бронирования
        const response = await fetch('get-bookings.php');
        const data = await response.json();
        
        // Убираем индикатор загрузки
        loadingIndicator.remove();
        
        if (!data.success || !data.bookings || data.bookings.length === 0) {
            bookingsContainer.innerHTML = `
                <div style="text-align: center; color: white; padding: 20px;">
                    Нет активных бронирований
                </div>
            `;
            return;
        }
        
        // Отображаем бронирования
        data.bookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.style.cssText = `
                background: white;
                margin-top: 10px;
                padding: 20px;
                border-radius: 25px;
                border: 2px solid black;
            `;
            
            bookingItem.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                    <div><strong>Корпус:</strong> ${booking.corpus || '—'}</div>
                    <div><strong>Тип:</strong> ${booking.apartment_type || '—'}</div>
                    <div><strong>Дата:</strong> ${formatDate(booking.booking_date)}</div>
                    <div><strong>Время:</strong> ${booking.booking_time || '—'}</div>
                </div>
                <button class="cancel-booking-btn" 
                        data-id="${booking.id_booking}"
                        style="background: #ff4444; color: white; border: none; padding: 10px 15px;
                               border-radius: 25px; cursor: pointer; width: 100%; display: flex;
                               align-items: center; justify-content: center; gap: 8px;
                               transition: background 0.3s;">
                    <i class="fas fa-trash-alt"></i> Отменить бронь
                </button>
            `;
            
            bookingsContainer.appendChild(bookingItem);
        });
        
        // Обработчики для кнопок отмены
        document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                if (!confirm('Вы уверены, что хотите отменить бронь?')) return;
                
                const bookingId = this.dataset.id;
                const bookingItem = this.closest('div');
                const originalContent = this.innerHTML;
                
                // Показываем индикатор загрузки
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отмена...';
                this.disabled = true;
                
                try {
                    const response = await fetch('cancel-booking.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: bookingId })
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Анимация удаления
                        bookingItem.style.transition = 'all 0.3s ease';
                        bookingItem.style.opacity = '0';
                        bookingItem.style.height = bookingItem.offsetHeight + 'px';
                        setTimeout(() => {
                            bookingItem.style.height = '0';
                            bookingItem.style.padding = '0';
                            bookingItem.style.margin = '0';
                            bookingItem.style.border = 'none';
                            bookingItem.style.overflow = 'hidden';
                            
                            setTimeout(() => {
                                bookingItem.remove();
                                
                                // Если броней не осталось, закрываем окно
                                if (bookingsContainer.children.length === 0) {
                                    closeModal();
                                    removeBookingsButton();
                                }
                            }, 300);
                        }, 50);
                    } else {
                        alert(result.message || 'Ошибка при отмене брони');
                        this.innerHTML = originalContent;
                        this.disabled = false;
                    }
                } catch (error) {
                    console.error('Ошибка:', error);
                    alert('Ошибка соединения');
                    this.innerHTML = originalContent;
                    this.disabled = false;
                }
            });
        });
        
    } catch (error) {
        console.error('Ошибка загрузки бронирований:', error);
        alert('Не удалось загрузить бронирования. Пожалуйста, попробуйте позже.');
    }
}

// Вспомогательная функция для удаления кнопки из шапки
function removeBookingsButton() {
    const btn = document.getElementById('bookingsButton');
    if (btn) {
        btn.style.transition = 'opacity 0.3s';
        btn.style.opacity = '0';
        setTimeout(() => btn.remove(), 300);
    }
}

// В конце файла добавляем защиту Proxy
if (typeof window.adminPanel === 'undefined') {
    window.adminPanel = new Proxy({}, {
        get(target, prop) {
            // Проверяем глобальное состояние auth
            if (!window.authState || !window.authState.isAdmin) {
                return function() { 
                    console.log('Доступ запрещен: недостаточно прав'); 
                };
            }
            
            if (prop === 'open') {
                return function() {
                    if (window.adminPanelReal) {
                        window.adminPanelReal.open();
                    }
                };
            }
            
            if (prop === 'close') {
                return function() {
                    if (window.adminPanelReal) {
                        window.adminPanelReal.close();
                    }
                };
            }
            
            return function() { console.log('Неизвестная команда админ-панели'); };
        }
    });
}

// Вспомогательные функции
function getApartmentTypeName(type) {
    const types = {
        '1k': '1-комн.',
        '2k': '2-комн.',
        '3k': '3-комн.',
        '4k': '4-комн.'
    };
    return types[type] || type;
}

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return '—';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
}
  
  // Остальные существующие функции без изменений
  async function handleLogin(formData) {
    try {
        const response = await fetch("login.php", {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        if (data.success) {
            state.currentUser = {
                name: data.userName,
                phone: data.userPhone
            };
            state.isAdmin = data.isAdmin || false;
            
            closeAuthModal();
            updateUIAfterAuthCheck(true);
            await checkAndUpdateBookingsButton(); // Теперь функция доступна
        } else {
            alert(data.message || "Ошибка авторизации");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Ошибка соединения");
    }
}
  
  async function handleRegister(formData) {
    try {
        const response = await fetch("register.php", {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        if (data.success) {
            alert("Регистрация успешна");
            closeAuthModal();
        } else {
            alert(data.message || "Ошибка регистрации");
        }
    } catch (error) {
        console.error("Register error:", error);
    }
  }
  
  async function handleLogout() {
    try {
        const response = await fetch("logout.php", { method: "POST" });
        if (!response.ok) throw new Error('Logout failed');
        
        const data = await response.json();
        if (data.success) {
            state.currentUser = null;
            state.isAdmin = false;
            updateUIAfterAuthCheck(false);
            
            // Добавляем эту строку
            removeBookingsButton();
        }
    } catch (error) {
        console.error('Logout error:', error);
        state.currentUser = null;
        state.isAdmin = false;
        updateUIAfterAuthCheck(false);
        removeBookingsButton();
    }
}
  
  function createAddReviewButton() {
    const buttonsContainer = document.querySelector(".buttons-container");
    if (buttonsContainer && !document.getElementById("add-review-btn")) {
        const addReviewBtn = document.createElement("button");
        addReviewBtn.id = "add-review-btn";
        addReviewBtn.className = "add-review-btn";
        addReviewBtn.innerHTML = '<i class="fas fa-pen"></i> Написать отзыв';
        buttonsContainer.prepend(addReviewBtn);
  
        addReviewBtn.addEventListener("click", () => {
            const reviewForm = document.getElementById("review-form");
            reviewForm.style.display = reviewForm.style.display === "block" ? "none" : "block";
        });
    }
  }
  
  function removeAddReviewButton() {
    const addReviewBtn = document.getElementById("add-review-btn");
    if (addReviewBtn) addReviewBtn.remove();
  }
  
  function openAuthModal() {
    authModal.style.display = "block";
    document.body.classList.add("no-scroll");
  }
  
  function openAuthRegisterModal() {
    authRegisterModal.style.display = "block";
    document.body.classList.add("no-scroll");
  }
  
  function closeAuthModal() {
    authModal.style.display = "none";
    authRegisterModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
  
  // Защита админ-панели от вызова через консоль
  if (typeof window.adminPanel === 'undefined') {
    window.adminPanel = new Proxy({}, {
        get(target, prop) {
            if (prop === 'open' && state.isAdmin) {
                return function() {
                    document.getElementById('admin-modal').style.display = 'block';
                    document.body.classList.add('no-scroll');
                };
            }
            return function() { console.log('Доступ запрещен'); };
        }
    });
  }