// Get references to pages and elements
const bellGif = document.getElementById("bellGif");
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const finalPage = document.getElementById("finalPage");
const pickAnotherBtn = document.getElementById("pickAnotherBtn");
const messageElement = document.getElementById("message");
const chosenRose = document.getElementById("chosenRose");
const rosesContainer = document.getElementById("rosesContainer");

// New messages for 7 roses (tailored for a guy)
const messages = [
  "I hope this rose makes your day a little brighter! 🌹",
  "Who knew a rose could look so good in your hands? 🌹😉",
  "You deserve a rose... but I'm keeping the best for myself. 😏🌹",
  "This rose is for someone who knows how to make me smile. 🌷",
  "I thought this rose might be the perfect match for you. 🌸",
  "I was going to keep this one for myself, but I guess you deserve it... for now. 😉🌹",
  "Here's a rose... Just don’t forget who gave it to you. 🌹"
];

// Counter for "Pick another rose" clicks
let pickAnotherCount = 0;

// Create 7 rose elements and position them uniformly in a circle
function arrangeRoses() {
  const totalRoses = 7;
  const containerWidth = rosesContainer.clientWidth;
  const containerHeight = rosesContainer.clientHeight;
  // Set the center of the container
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  // Radius for the circle (adjust as needed)
  const radius = Math.min(containerWidth, containerHeight) / 2 - 60;
  
  // Clear container (in case it's re-arranged)
  rosesContainer.innerHTML = "";
  
  for (let i = 0; i < totalRoses; i++) {
    const angle = (2 * Math.PI / totalRoses) * i; // equal spacing
    const x = centerX + radius * Math.cos(angle) - 25; // 25 = half the rose width (50/2)
    const y = centerY + radius * Math.sin(angle) - 25;
    
    // Create an img element for the rose
    const rose = document.createElement("img");
    rose.src = `images/rose${i + 1}.gif`;
    rose.alt = `Rose ${i + 1}`;
    rose.className = "rose";
    // Set position
    rose.style.left = x + "px";
    rose.style.top = y + "px";
    
    // Add event listeners for click and hover
    rose.addEventListener("click", function () {
      // Show message and chosen rose on third page
      messageElement.textContent = messages[i];
      chosenRose.src = rose.src;
      // Send email notification
      sendEmailNotification(i);
      // Transition to third page
      secondPage.classList.add("hidden");
      thirdPage.classList.remove("hidden");
    });
    rose.addEventListener("mouseenter", () => {
      rose.style.transform = "scale(1.2)";
    });
    rose.addEventListener("mouseleave", () => {
      rose.style.transform = "scale(1)";
    });
    
    // Append rose to container
    rosesContainer.appendChild(rose);
  }
}

// Transition from first page to second page on bell click
bellGif.addEventListener("click", function () {
  firstPage.classList.add("hidden");
  secondPage.classList.remove("hidden");
  arrangeRoses(); // arrange the roses uniformly in the container
});

// Handle "Pick another rose?" button click
pickAnotherBtn.addEventListener("click", function () {
  pickAnotherCount++;
  // If the button has been clicked 3 times, show final page
  if (pickAnotherCount >= 3) {
    thirdPage.classList.add("hidden");
    finalPage.classList.remove("hidden");
  } else {
    // Otherwise, go back to second page for another selection
    thirdPage.classList.add("hidden");
    secondPage.classList.remove("hidden");
    // Re-arrange roses in case layout needs to be refreshed
    arrangeRoses();
  }
});

// Function to send email notification using AJAX (FormSubmit)
function sendEmailNotification(index) {
  const formData = new FormData();
  formData.append("rosePicked", messages[index]);

  fetch("https://formsubmit.co/ajax/aarshasraj@gmail.com", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Email sent:", data);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
  }