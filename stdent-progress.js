document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#accessTable tbody");
    const modal = document.getElementById("detailsModal");
    const closeBtn = document.querySelector(".close-btn");

    // Example dynamic data including Matric Number
    const studentProgress = [
        { matric: "12345", name: "Jane Doe", type: "Book", title: "CSS Basics", duration: "30 minutes", date: "2024-12-21" },
        { matric: "67890", name: "Mark Smith", type: "Audio", title: "JavaScript Essentials", duration: "45 minutes", date: "2024-12-20" },
        { matric: "11223", name: "Lucy Lee", type: "Video", title: "Python for Beginners", duration: "20 minutes", date: "2024-12-22" },
    ];

    // Populate table with data
    studentProgress.forEach((progress) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${progress.matric}</td>
            <td>${progress.name}</td>
            <td>${progress.type}</td>
            <td>${progress.title}</td>
            <td>${progress.duration}</td>
            <td>${progress.date}</td>
        `;

        row.addEventListener("click", () => {
            // Show the modal and populate it with detailed info
            document.getElementById("matricDetail").textContent = progress.matric;
            document.getElementById("nameDetail").textContent = progress.name;
            document.getElementById("typeDetail").textContent = progress.type;
            document.getElementById("titleDetail").textContent = progress.title;
            document.getElementById("durationDetail").textContent = progress.duration;
            document.getElementById("dateDetail").textContent = progress.date;

            // Open the modal
            modal.style.display = "block";
        });

        tableBody.appendChild(row);
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
