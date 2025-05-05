 // Устанавливаем дату окончания - 1 января 2026 года
 const endDate = new Date('January 1, 2026 00:00:00').getTime();
 const countdownKey = 'modalTimerEndDate';
 const timerStateKey = 'modalTimerState';
 
 // Проверяем, есть ли сохраненное время
 if (!localStorage.getItem(countdownKey)) {
     localStorage.setItem(countdownKey, endDate);
 }
 
 const savedEndDate = parseInt(localStorage.getItem(countdownKey));
 
 // Функция обновления таймера
 function updateTimer() {
     const now = new Date().getTime();
     const distance = savedEndDate - now;
     
     // Расчет дней, часов, минут и секунд
     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
     
     // Форматируем время
     const timeString = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     
     // Обновляем оба таймера
     document.getElementById('modalTimerCount').textContent = timeString;
     document.getElementById('modalTimerMiniCount').textContent = timeString;
     
     // Если время истекло
     if (distance < 0) {
         clearInterval(timerInterval);
         document.getElementById('modalTimerCount').textContent = "00:00:00:00";
         document.getElementById('modalTimerMiniCount').textContent = "00:00:00:00";
     }
 }
 
 // Запускаем таймер сразу
 updateTimer();
 const timerInterval = setInterval(updateTimer, 1000);
 
 // Показываем модальное окно через 10 секунд
 setTimeout(function() {
     document.getElementById('modalTimer').style.display = 'block';
     document.getElementById('modalTimerOverlay').style.display = 'block';
 }, 10000);

 // Закрытие по крестику
 document.getElementById('modalTimerClose').addEventListener('click', function() {
     document.getElementById('modalTimer').style.display = 'none';
     document.getElementById('modalTimerOverlay').style.display = 'none';
     document.getElementById('modalTimerMini').style.display = 'block';
     localStorage.setItem(timerStateKey, 'mini');
 });

 // Закрытие по клику вне окна
 document.getElementById('modalTimerOverlay').addEventListener('click', function() {
     document.getElementById('modalTimer').style.display = 'none';
     this.style.display = 'none';
     document.getElementById('modalTimerMini').style.display = 'block';
     localStorage.setItem(timerStateKey, 'mini');
 });
 
 // Открытие модального окна по клику на мини-таймер
 document.getElementById('modalTimerMini').addEventListener('click', function(e) {
     if (e.target !== this.querySelector('.modal-timer-minimize')) {
         document.getElementById('modalTimer').style.display = 'block';
         document.getElementById('modalTimerOverlay').style.display = 'block';
         this.style.display = 'none';
         localStorage.setItem(timerStateKey, 'modal');
     }
 });
 
 // Сворачивание мини-таймера
 document.getElementById('modalTimerMinimize').addEventListener('click', function(e) {
     e.stopPropagation();
     document.getElementById('modalTimerMini').style.display = 'none';
     document.getElementById('modalTimerRestore').style.display = 'block';
     localStorage.setItem(timerStateKey, 'hidden');
 });
 
 // Восстановление таймера
 document.getElementById('modalTimerRestore').addEventListener('click', function() {
     document.getElementById('modalTimerMini').style.display = 'block';
     this.style.display = 'none';
     localStorage.setItem(timerStateKey, 'mini');
 });
 
 // Восстановление состояния при загрузке
 document.addEventListener('DOMContentLoaded', function() {
     const savedState = localStorage.getItem(timerStateKey);
     
     if (savedState === 'mini') {
         document.getElementById('modalTimerMini').style.display = 'block';
     } else if (savedState === 'hidden') {
         document.getElementById('modalTimerRestore').style.display = 'block';
     } else if (savedState === 'modal') {
         document.getElementById('modalTimer').style.display = 'block';
         document.getElementById('modalTimerOverlay').style.display = 'block';
     }
 });