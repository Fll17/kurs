document.addEventListener("DOMContentLoaded", () => {
  // Элементы формы отзыва
  const reviewForm = document.getElementById("review-form");
  const reviewTextarea = document.getElementById("review-textarea");
  const submitReviewBtn = document.getElementById("submit-review-btn");
  
  // Элементы для модального окна
  const viewAllReviewsBtn = document.getElementById("view-all-reviews-btn");
  const allReviewsModal = document.getElementById("all-reviews-modal");
  const allReviewsList = document.getElementById("all-reviews-list");
  const closeModal = allReviewsModal.querySelector(".close");

  // Статические отзывы
  const staticReviews = [
    {
      id: 1,
      username: "Иван Иванов",
      text: "ЖК просто супер! Рядом парк, школа, магазины – всё в шаговой доступности. Добираться до центра удобно, а во дворе зелёная зона и детские площадки. Идеальное место для семьи!",
      date: "10 октября 2023",
    },
    {
      id: 2,
      username: "Мария Петрова",
      text: "Недавно получили ключи – квартира полностью соответствует описанию! Качественная чистовая отделка, всё продумано до мелочей. Заселялись без проблем, дефектов не нашли. Очень довольны!",
      date: "5 октября 2023",
    },
    {
      id: 3,
      username: "Алексей Смирнов",
      text: "Бронировала квартиру онлайн – удобно, прозрачно, без скрытых платежей. Отдельное спасибо за гибкие условия и приятные бонусы! ЖК EARTH & SKY – отличный выбор для жизни!",
      date: "1 октября 2023",
    },
    {
      id: 4,
      username: "Елена Кузнецова",
      text: "Очень доволен процессом бронирования! Менеджеры ЖК EARTH & SKY подробно ответили на все вопросы, помогли подобрать оптимальный вариант. Все прошло быстро и без лишних хлопот. Рекомендую!",
      date: "25 сентября 2023",
    },
  ];

  // Показать все отзывы в модальном окне
  function showAllReviews(reviews) {
    allReviewsList.innerHTML = "";
    
    reviews.forEach(review => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review");
      
      const isStatic = staticReviews.some(s => s.text === review.text);
      
      reviewDiv.innerHTML = `
        <div class="user-info">
          <img src="img/иконки/100x100.gif" class="avatar">
          <div>
            <span class="username">${review.username}</span>
            <span class="date">${review.date}</span>
            ${isStatic ? '<div class="static-badge">Рекомендуем</div>' : ''}
          </div>
        </div>
        <p class="review-text">${review.text}</p>
      `;
      
      allReviewsList.appendChild(reviewDiv);
    });
  }

  // Отправка нового отзыва
  submitReviewBtn.addEventListener("click", async () => {
    const newReviewText = reviewTextarea.value.trim();

    if (newReviewText.length > 2500) {
      alert("Максимальная длина отзыва - 2500 символов");
      return;
    }

    try {
      const response = await fetch("save_review.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newReviewText }),
      });

      const result = await response.json();
      if (result.success) {
        loadReviews();
        reviewTextarea.value = "";
        reviewForm.style.display = "none";
      } else {
        alert(result.message || "Ошибка сохранения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения");
    }
  });

  // Загрузка отзывов с сервера
  async function loadReviews() {
    try {
      const response = await fetch('get_reviews.php');
      const data = await response.json();
      
      if (data.success) {
        // Объединяем статические и динамические отзывы
        const allReviews = [...staticReviews, ...data.reviews];
        showAllReviews(allReviews);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      // Если ошибка, показываем только статические отзывы
      showAllReviews(staticReviews);
    }
  }

  

  // Открытие модального окна
  viewAllReviewsBtn.addEventListener("click", () => {
    allReviewsModal.style.display = "flex";
    setTimeout(() => {
      allReviewsModal.classList.add("active");
    }, 10);
    document.body.style.overflow = "hidden";
    loadReviews();
  });

  // Закрытие модального окна
  closeModal.addEventListener("click", () => {
    allReviewsModal.classList.remove("active");
    setTimeout(() => {
      allReviewsModal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  });

  // Закрытие по клику вне модального окна
  window.addEventListener("click", (event) => {
    if (event.target === allReviewsModal) {
      allReviewsModal.classList.remove("active");
      setTimeout(() => {
        allReviewsModal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    }
  });

  // Загружаем отзывы при старте
  loadReviews();
});


