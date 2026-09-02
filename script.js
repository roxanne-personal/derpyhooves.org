document.addEventListener("DOMContentLoaded", () => {
  // 1. Derpy Mode Toggle
  const derpyToggle = document.getElementById("derpy-toggle");
  
  if (localStorage.getItem("derpyMode") === "enabled") {
    document.body.classList.add("derpy-mode");
  }

  if (derpyToggle) {
    derpyToggle.addEventListener("click", () => {
      document.body.classList.toggle("derpy-mode");
      const isEnabled = document.body.classList.contains("derpy-mode");
      localStorage.setItem("derpyMode", isEnabled ? "enabled" : "disabled");
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
      "Slightly squished, but delivered with care to... somebody's porch.",
      "Held at Canterlot Customs pending Princess Celestia's personal approval.",
      "Accidentally sorted into an apple barrel at Sweet Apple Acres.",
      "Currently serving as a pillow for a sleeping dragon in the Badlands.",
      "Frozen in a block of enchanted ice at the Crystal Empire sorting hub.",
      "Courier took a wrong turn in the Everfree Forest. Search party dispatched.",
      "Rerouted due to severe atmospheric turbulence from a Sonic Rainboom.",
      "Temporarily trapped inside a lightning cloud manufactured at the Weather Factory.",
      "Stuck in a storm cloud. A pegasus is currently kicking it loose.",
      "Delivery pony got distracted by a flock of cute butterflies.",
      "Package temporarily transformed into a teacup. Waiting for Discord's magic to wear off.",
      "Delivered three days ago thanks to an unauthorized chronal portal.",
      "Trampled by a migrating herd of Yaks. Box flattened, contents fine!",
      "Accidentally dropped into Tartarus. Cerberus is currently sniffing it.",
      "Package marked 'Fragile'. Pinkie Pie is currently bouncing it across Equestria.",
      "Delayed in Manehattan traffic behind an overly dramatic carriage.",
      "Intercepted by Parasprites. Package density reduced by 40%.",
      "Rerouted: Courier pony got lost in the underground Crystal Catacombs.",
      "Stationed at Fillydelphia Distribution Center due to an unannounced parade.",
      "Held at Canterlot Castle for mandatory royal glitter inspection.",
      "Mistaken for library inventory; Twilight Sparkle is currently cross-referencing it.",
      "Princess Luna redirected the flight path to avoid a drifting night terror.",
      "Dispatched via dragon fire. Mind the minor singe marks.",
      "Package caught in a localized spell loop. Scheduled to arrive yesterday.",
      "Courier accidentally ate the shipping label thinking it was a dried apple slice.",
      "Parcel clipped through the floor of the Cloudsdale post office. Re-spawning momentarily.",
      "Temporarily impounded by the Wonderbolts for breaking the aerial speed limit.",
    ];

    // Define hidden secret codes
    const secretCodes = {
      "DRP-12345": "about.html",
      "DRP-99999": "derpy.html"
    };

    trackerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const trackingInput = document.getElementById("tracking-number").value.trim().toUpperCase();
      const errorDiv = document.getElementById("tracker-error");
      
      console.log("Tracking input:", trackingInput); // Debug
      console.log("Is secret code?", secretCodes[trackingInput]); // Debug
      
      // Check if it's a secret code
      if (secretCodes[trackingInput]) {
        console.log("Redirecting to:", secretCodes[trackingInput]); // Debug
        window.location.href = secretCodes[trackingInput];
        return;
      }
      
      // Validate format: XXX-12345 (3 letters, hyphen, 5 digits)
      const validFormat = /^[A-Z]{3}-\d{5}$/;
      
      if (!validFormat.test(trackingInput)) {
        errorDiv.textContent = "Invalid format! Use EPS-12345 (3 letters, hyphen, 5 digits).";
        errorDiv.classList.remove("hidden");
        return;
      }
      
      errorDiv.classList.add("hidden");
      
      const outputDiv = document.getElementById("tracker-output");
      const displayId = document.getElementById("display-id");
      const statusLogs = document.getElementById("status-logs");

      displayId.textContent = trackingInput;
      statusLogs.innerHTML = "";

      const shuffled = [...statusPool].sort(() => 0.5 - Math.random());
      const selectedStatuses = shuffled.slice(0, 3);

      selectedStatuses.forEach((status, index) => {
        const li = document.createElement("li");
        li.textContent = `[Update ${index + 1}]: ${status}`;
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
