document.addEventListener('DOMContentLoaded', function() {
  // Состояние админ-панели
  const adminState = {
      currentTab: 'users',
      currentReviews: [],
      currentBookings: [],
      sort: {
          field: 'id_user',
          direction: 'asc'
      },
      pagination: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 0
      },
      searchQuery: ''
  };

  // DOM элементы
  let elements = {
      adminModal: null,
      adminTabs: null,
      tabContents: null,
      usersList: null,
      reviewsList: null,
      bookingsList: null,
      userSearch: null,
      searchBtn: null,
      resetSearchBtn: null,
      prevPageBtn: null,
      nextPageBtn: null,
      pageInfo: null,
      closeBtn: null
  };

  // Инициализация
  initAdminPanel();

  function initAdminPanel() {
      if (window.authState && window.authState.isAdmin) {
          createAdminModal();
          setupEventListeners();
          loadCurrentTab();
      }
  }

  function createAdminModal() {
    if (elements.adminModal) return;

    const modal = document.createElement('div');
    modal.id = 'admin-modal-dynamic';
    modal.className = 'admin-modal';
    modal.style.display = 'none';

    modal.innerHTML = `
    <div class="admin-modal-content">
        <span class="admin-modal-close">&times;</span>
        <h2>Административная панель</h2>
        
        <div class="admin-tabs">
            <button class="admin-tab active" data-tab="users">Пользователи</button>
            <button class="admin-tab" data-tab="reviews">Отзывы</button>
            <button class="admin-tab" data-tab="bookings">Бронирования</button>
        </div>
        
        <div id="users-tab" class="admin-tab-content active">
            <div class="admin-search">
                <input type="text" id="admin-user-search" placeholder="Поиск по имени, фамилии или номеру">
                <button id="admin-search-btn">Найти</button>
                <button id="reset-search-btn">Сбросить</button>
            </div>
            
            <div class="admin-table-container">
                <div class="admin-users-list"></div>
            </div>
        </div>
        
        <div id="reviews-tab" class="admin-tab-content">
            <div class="admin-table-container">
                <div class="admin-reviews-list"></div>
            </div>
        </div>
        
        <div id="bookings-tab" class="admin-tab-content">
            <div class="admin-table-container">
                <div class="admin-bookings-list"></div>
            </div>
        </div>
        
        <div class="admin-pagination">
            <button id="prev-page" disabled>← Назад</button>
            <span id="page-info">Страница 1 из 1</span>
            <button id="next-page" disabled>Вперед →</button>
        </div>
    </div>
    `;

    document.body.appendChild(modal);
    
    // Инициализация элементов после создания DOM
    elements = {
        adminModal: modal,
        adminTabs: modal.querySelectorAll('.admin-tab'),
        tabContents: modal.querySelectorAll('.admin-tab-content'),
        usersList: modal.querySelector('.admin-users-list'),
        reviewsList: modal.querySelector('.admin-reviews-list'),
        bookingsList: modal.querySelector('.admin-bookings-list'),
        userSearch: modal.querySelector('#admin-user-search'),
        searchBtn: modal.querySelector('#admin-search-btn'),
        resetSearchBtn: modal.querySelector('#reset-search-btn'),
        prevPageBtn: modal.querySelector('#prev-page'),
        nextPageBtn: modal.querySelector('#next-page'),
        pageInfo: modal.querySelector('#page-info'),
        closeBtn: modal.querySelector('.admin-modal-close')
    };

    // Настройка обработчиков событий после создания элементов
    setupEventListeners();
}

function setupEventListeners() {
    console.log('Setting up listeners for tabs:', elements.adminTabs);
    // Обработчики для вкладок
    elements.adminTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем класс active у всех вкладок
            elements.adminTabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем класс active текущей вкладке
            this.classList.add('active');
            
            // Устанавливаем текущую вкладку
            adminState.currentTab = this.dataset.tab;
            
            // Скрываем все содержимое вкладок
            elements.tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем содержимое текущей вкладки
            const activeContent = document.getElementById(`${adminState.currentTab}-tab`);
            if (activeContent) {
                activeContent.classList.add('active');
                loadCurrentTab();
            }
        });
    });

    // Обработчик для кнопки закрытия
    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', closeAdminModal);
    }

    // Обработчик для кнопки закрытия
    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', closeAdminModal);
    }
}

  function loadCurrentTab() {
    // Сброс пагинации при переключении вкладок
    adminState.pagination.currentPage = 1;
    
    switch (adminState.currentTab) {
        case 'users':
            loadUsers();
            break;
        case 'reviews':
            loadReviews();
            break;
        case 'bookings':
            loadBookings();
            break;
    }
}

  function updateActiveTab() {
      elements.adminTabs.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.tab === adminState.currentTab);
      });
      elements.tabContents.forEach(content => {
          content.classList.toggle('active', content.id === `${adminState.currentTab}-tab`);
      });
  }

  function updatePaginationUI() {
      const totalPages = Math.ceil(adminState.pagination.totalItems / adminState.pagination.itemsPerPage);
      elements.prevPageBtn.disabled = adminState.pagination.currentPage <= 1;
      elements.nextPageBtn.disabled = adminState.pagination.currentPage >= totalPages;
      elements.pageInfo.textContent = `Страница ${adminState.pagination.currentPage} из ${totalPages}`;
  }

  async function loadUsers() {
      try {
          const response = await fetch(`get-users.php?search=${encodeURIComponent(adminState.searchQuery)}&sort=${adminState.sort.field}&dir=${adminState.sort.direction}&page=${adminState.pagination.currentPage}&per_page=${adminState.pagination.itemsPerPage}`);
          
          if (!response.ok) throw new Error('Ошибка загрузки данных');
          
          const data = await response.json();
          
          if (data.success) {
              adminState.pagination.totalItems = data.total || data.users.length;
              renderUsersTable(data.users);
          } else {
              throw new Error(data.message || 'Неизвестная ошибка');
          }
      } catch (error) {
          console.error('Ошибка загрузки пользователей:', error);
          elements.usersList.innerHTML = `<div class="error-message">${error.message}</div>`;
      }
  }

  async function loadReviews() {
      try {
          elements.reviewsList.innerHTML = '<div class="loading">Загрузка отзывов...</div>';
          
          const response = await fetch(`get-all-reviews.php?sort=${adminState.sort.field}&dir=${adminState.sort.direction}&page=${adminState.pagination.currentPage}&per_page=${adminState.pagination.itemsPerPage}`);
          
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          
          const data = await response.json();
          
          if (!data.success) {
              throw new Error(data.message || 'Ошибка сервера');
          }
          
          adminState.currentReviews = data.reviews;
          adminState.pagination.totalItems = data.total || data.reviews.length;
          renderReviewsTable(data.reviews);
          
      } catch (error) {
          console.error('Ошибка загрузки отзывов:', error);
          elements.reviewsList.innerHTML = `
              <div class="error-message">
                  Ошибка: ${error.message}
                  <button onclick="loadReviews()">Повторить</button>
              </div>
          `;
      }
  }

  async function loadBookings() {
      try {
          const response = await fetch(`get-all-bookings.php?sort=${adminState.sort.field}&dir=${adminState.sort.direction}&page=${adminState.pagination.currentPage}&per_page=${adminState.pagination.itemsPerPage}`);
          
          if (!response.ok) throw new Error('Ошибка загрузки данных');
          
          const data = await response.json();
          
          if (data.success) {
              adminState.pagination.totalItems = data.total || data.bookings.length;
              adminState.currentBookings = data.bookings;
              renderBookingsTable(data.bookings);
          } else {
              throw new Error(data.message || 'Неизвестная ошибка');
          }
      } catch (error) {
          console.error('Ошибка загрузки бронирований:', error);
          elements.bookingsList.innerHTML = `<div class="error-message">${error.message}</div>`;
      }
  }

  function renderUsersTable(users) {
      const table = `
      <table class="admin-table">
          <thead>
              <tr>
                  ${createSortableHeader('id_user', 'ID')}
                  ${createSortableHeader('surname_user', 'Фамилия')}
                  ${createSortableHeader('name_user', 'Имя')}
                  ${createSortableHeader('number_user', 'Телефон')}
                  ${createSortableHeader('registration_date', 'Дата регистрации')}
                  ${createSortableHeader('reviews_count', 'Отзывы')}
                  ${createSortableHeader('bookings_count', 'Брони')}
                  <th>Действия</th>
              </tr>
          </thead>
          <tbody>
              ${users.map(user => `
                  <tr data-id="${user.id_user}">
                      <td>${user.id_user}</td>
                      <td class="editable" data-field="surname_user">${user.surname_user}</td>
                      <td class="editable" data-field="name_user">${user.name_user}</td>
                      <td class="editable" data-field="number_user">${user.number_user}</td>
                      <td>${new Date(user.registration_date).toLocaleString()}</td>
                      <td>${user.reviews_count}</td>
                      <td>${user.bookings_count}</td>
                      <td class="actions">
                          <button class="save-btn" style="display:none">Сохранить</button>
                          <button class="cancel-btn" style="display:none">Отмена</button>
                          <button class="edit-btn">✏️</button>
                          <button class="delete-btn">🗑️</button>
                      </td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      `;
      
      elements.usersList.innerHTML = table;
      setupSortableHeaders();
      setupEditDeleteHandlers();
  }

  function renderReviewsTable(reviews) {
      const table = `
      <table class="admin-table">
          <thead>
              <tr>
                  ${createSortableHeader('id', 'ID')}
                  ${createSortableHeader('user_name', 'Пользователь')}
                  ${createSortableHeader('date', 'Дата')}
                  <th>Текст</th>
                  <th>Действия</th>
              </tr>
          </thead>
          <tbody>
              ${reviews.map(review => `
                  <tr data-id="${review.id}">
                      <td>${review.id}</td>
                      <td>${review.user_name || 'Неизвестно'}</td>
                      <td>${review.formatted_date || review.date}</td>
                      <td class="review-text-cell">
                          <div class="review-text-container">
                              <div class="review-text-preview">${review.short_text}</div>
                              ${review.text.length > 100 ? `
                                  <button class="show-full-review" data-id="${review.id}">
                                      Показать полностью
                                  </button>
                                  <div class="review-text-full" id="full-review-${review.id}" style="display:none">
                                      ${review.text}
                                  </div>
                              ` : ''}
                          </div>
                      </td>
                      <td class="actions">
                          <button class="save-btn" style="display:none">Сохранить</button>
                          <button class="cancel-btn" style="display:none">Отмена</button>
                          <button class="edit-btn">✏️</button>
                          <button class="delete-btn">🗑️</button>
                      </td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      `;
      
      elements.reviewsList.innerHTML = table;
      setupSortableHeaders();
      setupEditDeleteHandlers();
      
      document.querySelectorAll('.show-full-review').forEach(button => {
          button.addEventListener('click', function(e) {
              e.stopPropagation();
              const reviewId = this.dataset.id;
              const fullText = document.getElementById(`full-review-${reviewId}`);
              
              if (fullText.style.display === 'none') {
                  fullText.style.display = 'block';
                  this.textContent = 'Свернуть';
              } else {
                  fullText.style.display = 'none';
                  this.textContent = 'Показать полностью';
              }
          });
      });
  }

  function renderBookingsTable(bookings) {
      const table = `
      <table class="admin-table">
          <thead>
              <tr>
                  ${createSortableHeader('id_booking', 'ID')}
                  ${createSortableHeader('full_name', 'Пользователь')}
                  ${createSortableHeader('corpus', 'Корпус')}
                  ${createSortableHeader('apartment_type', 'Тип квартиры')}
                  ${createSortableHeader('booking_date', 'Дата брони')}
                  ${createSortableHeader('created_at', 'Дата создания')}
                  <th>Действия</th>
              </tr>
          </thead>
          <tbody>
              ${bookings.map(booking => `
                  <tr data-id="${booking.id_booking}">
                      <td>${booking.id_booking}</td>
                      <td>${booking.full_name} (${booking.phone})</td>
                      <td class="editable" data-field="corpus">${booking.corpus}</td>
                      <td class="editable" data-field="apartment_type">${getApartmentTypeName(booking.apartment_type)}</td>
                      <td class="editable" data-field="booking_date">${formatDateTime(booking.booking_date + ' ' + booking.booking_time)}</td>
                      <td>${formatDateTime(booking.created_at)}</td>
                      <td class="actions">
                          <button class="save-btn" style="display:none">Сохранить</button>
                          <button class="cancel-btn" style="display:none">Отмена</button>
                          <button class="edit-btn">✏️</button>
                          <button class="delete-btn">🗑️</button>
                      </td>
                  </tr>
              `).join('')}
          </tbody>
      </table>
      `;
      
      elements.bookingsList.innerHTML = table;
      setupSortableHeaders();
      setupEditDeleteHandlers();
  }

  function setupEditDeleteHandlers() {
      document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
              e.stopPropagation();
              const row = this.closest('tr');
              const isReview = adminState.currentTab === 'reviews';
              
              row.classList.add('editing');
              
              row.querySelectorAll('.editable').forEach(cell => {
                  const originalValue = cell.textContent.trim();
                  const field = cell.dataset.field;
                  cell.innerHTML = `<input type="text" value="${originalValue}" data-original="${originalValue}">`;
              });
              
              if (isReview) {
                  const textContainer = row.querySelector('.review-text-container');
                  const fullText = textContainer.querySelector('.review-text-full')?.textContent || 
                                   textContainer.querySelector('.review-text-preview').textContent;
                  textContainer.innerHTML = `<textarea class="full-text-edit">${fullText}</textarea>`;
              }
              
              this.style.display = 'none';
              row.querySelector('.delete-btn').style.display = 'none';
              row.querySelector('.save-btn').style.display = 'inline-block';
              row.querySelector('.cancel-btn').style.display = 'inline-block';
          });
      });

      document.querySelectorAll('.cancel-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
              e.stopPropagation();
              const row = this.closest('tr');
              const isReview = adminState.currentTab === 'reviews';
              
              row.classList.remove('editing');
              
              if (isReview) {
                  const review = adminState.currentReviews.find(r => r.id == row.dataset.id);
                  if (review) {
                      const textContainer = row.querySelector('.review-text-container');
                      textContainer.innerHTML = `
                          <div class="review-text-preview">${review.short_text}</div>
                          ${review.text.length > 100 ? `
                              <button class="show-full-review" data-id="${review.id}">
                                  Показать полностью
                              </button>
                              <div class="review-text-full" id="full-review-${review.id}" style="display:none">
                                  ${review.text}
                              </div>
                          ` : ''}
                      `;
                  }
              } else {
                  row.querySelectorAll('.editable').forEach(cell => {
                      const input = cell.querySelector('input');
                      cell.textContent = input.dataset.original;
                  });
              }
              
              this.style.display = 'none';
              row.querySelector('.save-btn').style.display = 'none';
              row.querySelector('.edit-btn').style.display = 'inline-block';
              row.querySelector('.delete-btn').style.display = 'inline-block';
          });
      });

      document.querySelectorAll('.save-btn').forEach(btn => {
          btn.addEventListener('click', async function(e) {
              e.stopPropagation();
              const row = this.closest('tr');
              const id = row.dataset.id;
              const tableType = adminState.currentTab;
              const changes = {};
              
              if (tableType === 'reviews') {
                  const textarea = row.querySelector('.full-text-edit');
                  if (textarea) {
                      changes['text'] = textarea.value;
                  }
              } else {
                  row.querySelectorAll('.editable').forEach(cell => {
                      const field = cell.dataset.field;
                      const value = cell.querySelector('input').value;
                      changes[field] = value;
                  });
              }
              
              try {
                  const response = await fetch(`update-${tableType}.php`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ id, changes })
                  });

                  const result = await response.json();
                  if (result.success) {
                      loadCurrentTab();
                      showNotification('Изменения сохранены', 'success');
                  } else {
                      showNotification(result.message || 'Ошибка при сохранении', 'error');
                  }
              } catch (error) {
                  console.error('Ошибка:', error);
                  showNotification('Ошибка соединения', 'error');
              }
          });
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', async function(e) {
              e.stopPropagation();
              if (!confirm('Вы уверены, что хотите удалить эту запись?')) return;
              
              const row = this.closest('tr');
              const id = row.dataset.id;
              const tableType = adminState.currentTab;
              
              try {
                  const response = await fetch(`delete-${tableType}.php`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ id })
                  });

                  const result = await response.json();
                  if (result.success) {
                      row.remove();
                      showNotification('Запись удалена', 'success');
                  } else {
                      showNotification(result.message || 'Ошибка при удалении', 'error');
                  }
              } catch (error) {
                  console.error('Ошибка:', error);
                  showNotification('Ошибка соединения', 'error');
              }
          });
      });
  }

  function createSortableHeader(field, title) {
      const isActive = adminState.sort.field === field;
      const direction = isActive ? adminState.sort.direction : '';
      const iconClass = isActive ? `sort-icon ${direction}` : 'sort-icon';
      
      return `
          <th class="sortable" data-field="${field}">
              ${title}
              <span class="${iconClass}"></span>
          </th>
      `;
  }

  function setupSortableHeaders() {
      document.querySelectorAll('.sortable').forEach(header => {
          header.addEventListener('click', () => {
              const field = header.dataset.field;
              
              if (adminState.sort.field === field) {
                  adminState.sort.direction = adminState.sort.direction === 'asc' ? 'desc' : 'asc';
              } else {
                  adminState.sort.field = field;
                  adminState.sort.direction = 'asc';
              }
              
              adminState.pagination.currentPage = 1;
              loadCurrentTab();
          });
      });
  }

  function formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
  }

  function formatDateTime(dateTimeString) {
      if (!dateTimeString) return '';
      const date = new Date(dateTimeString);
      return date.toLocaleString('ru-RU');
  }

  function getApartmentTypeName(type) {
      const types = {
          '1k': '1-комн.',
          '2k': '2-комн.',
          '3k': '3-комн.',
          '4k': '4-комн.'
      };
      return types[type] || type;
  }

  function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `admin-notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
          notification.classList.add('fade-out');
          setTimeout(() => notification.remove(), 500);
      }, 3000);
  }

  function openAdminModal() {
    if (!window.authState || !window.authState.isAdmin) {
        console.error('Доступ запрещен: недостаточно прав');
        return;
    }

    if (!elements.adminModal) {
        createAdminModal();
    }
    
    elements.adminModal.style.display = 'block';
    document.body.classList.add('no-scroll');
    loadCurrentTab();
}

  function closeAdminModal() {
      if (elements.adminModal) {
          elements.adminModal.style.display = 'none';
          document.body.classList.remove('no-scroll');
      }
  }

  window.adminPanel = {
      open: openAdminModal,
      close: closeAdminModal
  };
});