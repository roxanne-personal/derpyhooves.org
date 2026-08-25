document.addEventListener("DOMContentLoaded", () => {
  // 1. Derp Mode Toggle
  const derpToggle = document.getElementById("derp-toggle");
  
  if (localStorage.getItem("derpMode") === "enabled") {
    document.body.classList.add("derp-mode");
  }

  if (derpToggle) {
    derpToggle.addEventListener("click", () => {
      document.body.classList.toggle("derp-mode");
      const isEnabled = document.body.classList.contains("derp-mode");
      localStorage.setItem("derpMode", isEnabled ? "enabled" : "disabled");
    });
  }

  // 2. EPS Package Tracker
  const trackerForm = document.getElementById("tracker-form");
  if (trackerForm) {
    const statusPool = [
      "Parcel scanned at Cloudsdale Sorting Facility.",
      "Misrouted to a local Minecraft Bedrock realm.",
      "Package intercepted by an overly enthusiastic pegasus.",
      "Stuck behind a secureblue firewall.",
      "Temporarily misplaced in a cloud factory.",
      "Currently orbiting the moon. Re-entry scheduled shortly.",
      "Slightly squished, but delivered with care to porch."
    ];

    trackerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const trackingInput = document.getElementById("tracking-number").value.trim();
      const outputDiv = document.getElementById("tracker-output");
      const displayId = document.getElementById("display-id");
      const statusLogs = document.getElementById("status-logs");

      displayId.textContent = trackingInput.toUpperCase();
      statusLogs.innerHTML = "";

      const shuffled = [...statusPool].sort(() => 0.5 - Math.random());
      const selectedStatuses = shuffled.slice(0, 3);

      selectedStatuses.forEach((status, index) => {
        const li = document.createElement("li");
        li.textContent = `[Step ${index + 1}]: ${status}`;
        statusLogs.appendChild(li);
      });

      outputDiv.classList.remove("hidden");
    });
  }

  // 3. Recipe Search / Filter
  const recipeSearch = document.getElementById("recipe-search");
  if (recipeSearch) {
    recipeSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".recipe-card");

      cards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const text = card.querySelector("p").textContent.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();

        if (title.includes(query) || text.includes(query) || tags.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 4. Recipe Submission Modal Logic
  const submitModal = document.getElementById("submit-modal");
  const openModalBtn = document.getElementById("open-submit-modal");
  const closeModalBtn = document.getElementById("close-modal");

  if (submitModal && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener("click", () => submitModal.classList.remove("hidden"));
    closeModalBtn.addEventListener("click", () => submitModal.classList.add("hidden"));
    
    window.addEventListener("click", (e) => {
      if (e.target === submitModal) submitModal.classList.add("hidden");
    });
  }

  // 5. Interactive Recipe Voting (Local State Storage)
  const voteButtons = document.querySelectorAll(".vote-btn");

  voteButtons.forEach((btn) => {
    const recipeId = btn.dataset.id;
    const countSpan = btn.querySelector(".vote-count");
    
    const hasVoted = localStorage.getItem(`voted_${recipeId}`);
    if (hasVoted) {
      btn.classList.add("voted");
    }

    btn.addEventListener("click", () => {
      let currentVotes = parseInt(countSpan.textContent, 10);

      if (btn.classList.contains("voted")) {
        currentVotes--;
        btn.classList.remove("voted");
        localStorage.removeItem(`voted_${recipeId}`);
      } else {
        currentVotes++;
        btn.classList.add("voted");
        localStorage.setItem(`voted_${recipeId}`, "true");
      }

      countSpan.textContent = currentVotes;
    });
  });

  // 6. 404 Bubble Pop Minigame
  const bubbleArea = document.getElementById("bubble-area");
  if (bubbleArea) {
    let poppedCount = 0;
    const targetPops = 5;

    for (let i = 0; i < targetPops; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      
      const top = Math.random() * 120 + 10;
      const left = Math.random() * 80 + 10;
      bubble.style.top = `${top}px`;
      bubble.style.left = `${left}%`;

      bubble.addEventListener("click", () => {
        bubble.remove();
        poppedCount++;
        if (poppedCount >= targetPops) {
          document.getElementById("return-home").classList.remove("hidden");
        }
      });

      bubbleArea.appendChild(bubble);
    }
  }
});
