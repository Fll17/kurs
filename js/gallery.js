let currentImages = [];
        let currentIndex = 0;

        function openModal(category, images, title, descriptions) {
            currentImages = images;
            currentIndex = 0;
            document.getElementById("modal-image-gallery").src = currentImages[currentIndex];
            document.getElementById("modal-title-gallery").textContent = title;
            document.getElementById("modal-description1-gallery").textContent = descriptions[0] || "";
            document.getElementById("modal-description2-gallery").textContent = descriptions[1] || "";
            document.getElementById("modal-description3-gallery").textContent = descriptions[2] || "";
            document.getElementById("modal-gallery").style.display = "flex";
        }

        function closeModal(event) {
            if (!event || event.target.id === "modal-gallery" || event.target.classList.contains("close-button")) {
                document.getElementById("modal-gallery").style.display = "none";
            }
        }

        function nextImage(event) {
            event.stopPropagation();
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                document.getElementById("modal-image-gallery").src = currentImages[currentIndex];
            }
        }

        function prevImage(event) {
            event.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                document.getElementById("modal-image-gallery").src = currentImages[currentIndex];
            }
        }

        