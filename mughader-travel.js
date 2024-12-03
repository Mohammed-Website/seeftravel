function toggleSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
}











/* Switching words functionality */
document.addEventListener("DOMContentLoaded", function () {
    const words = [
        "إندونيسيا",
        "تايلاند",
        "المالديف",
        "موريشيوس",
        "عروض سياحية",
        "جورجيا",
        "تركيا",
        "اذربيجان",
        "البوسنة",
        "سيريلانكا",
        "ماليزيا",
        "دبي",
        "مصر",
        "الجبل الأسود"
    ];

    let currentIndex = 1;
    const dynamicWordElement = document.getElementById("mughader_dynamic_word_switch");
    const lineTimerElement = document.getElementById("mughader_line_timer");

    // Ensure the initial word is visible
    dynamicWordElement.classList.add("visible");

    function updateTimerWidth() {
        const wordWidth = dynamicWordElement.offsetWidth; // Get the width of the current word
        const scaledWidth = wordWidth * 1; // Adjust width to 40% of the word's width (smaller)
        lineTimerElement.style.width = `${scaledWidth}px`; // Set timer line width
        lineTimerElement.style.margin = "0 auto"; // Center the timer under the text
    }

    function resetTimer() {
        lineTimerElement.style.transition = "none"; // Disable transition to reset instantly
        lineTimerElement.style.width = "0"; // Reset width to 0
        setTimeout(() => {
            lineTimerElement.style.transition = "width 1.8s linear"; // Reapply transition
            lineTimerElement.style.width = `${dynamicWordElement.offsetWidth * 1}px`; // Start animation
        }, 50); // Small delay to ensure transition is reapplied
    }

    function changeWord() {
        // Fade out by removing 'visible' class
        dynamicWordElement.classList.remove("visible");

        setTimeout(() => {
            // Change word
            dynamicWordElement.innerText = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;

            // Fade in by adding 'visible' class
            dynamicWordElement.classList.add("visible");

            // Update timer width
            updateTimerWidth();
        }, 300); // Match CSS fade duration

        // Reset and start the timer line animation
        resetTimer();
    }

    // Start the loop
    setInterval(changeWord, 1800); // Match the timer line animation duration

    // Adjust the timer width for the initial word
    updateTimerWidth();
    resetTimer(); // Start timer animation for the first word
});



















/* Function for all elements when scrolling */
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".mughader_animate_on_scroll");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Check if the element is intersecting and hasn't been animated before
            if (entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.add("intro_animation", "animation_done");
                entry.target.classList.remove("outro_animation");
            } else if (!entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.remove("intro_animation");
                entry.target.classList.add("outro_animation");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});








/* Ai bot chat functionality */
document.addEventListener("DOMContentLoaded", () => {
    let chatbotIcon = document.getElementById("mughader_chatbot_icon");
    let chatSidebar = document.getElementById("mughader_chat_sidebar");
    let closeChat = document.getElementById("mughader_close_chat");
    let sendBtn = document.getElementById("mughader_send_btn");
    let messageBar = document.getElementById("mughader_message_bar");
    let messageBox = document.querySelector(".mughader_message_box");
    let chatOverlay = document.getElementById("mughader_chat_overlay");

    let API_URL = "https://api.openai.com/v1/chat/completions";
    let API_KEY = "sk-***76cA";

    /* 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 */

    // Check if the user is on a mobile device
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    // Open Slider if ai bot icon is clicked
    chatbotIcon.addEventListener("click", () => {
        chatSidebar.classList.add("active");
        chatOverlay.classList.add("active");
    });

    // Close Sidebar if close slider button is clicked
    closeChat.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
    });

    // Close Sidebar if Overlay is Clicked
    chatOverlay.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
    });

    // Send Message Function
    sendBtn.onclick = function () {
        if (messageBar.value.trim() !== "") {
            let UserTypedMessage = messageBar.value.trim();
            messageBar.value = "";

            let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

            let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي-حائل.jpg">
                    <span class="new">...</span>
                </div>
            `;

            messageBox.insertAdjacentHTML("beforeend", userMessage);

            setTimeout(() => {
                messageBox.insertAdjacentHTML("beforeend", botResponse);

                let requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: UserTypedMessage }]
                    })
                };

                fetch(API_URL, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = data.choices[0].message.content;
                        ChatBotResponse.classList.remove("new");
                    })
                    .catch(() => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                    });
            }, 100);



            document.getElementById("mughader_message_bar").style.height = "40px"; // Reset to default height;
        }
    };

    // Attach Send Message Function to Enter Key (for Desktop)
    if (!isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevent default behavior
                sendBtn.click();
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault(); // Allow Shift+Enter to insert a new line
                const cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Enable Enter for New Line Only (for Mobile)
    if (isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent sending the message
                const cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Adjust Textarea Height Dynamically
    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });

    // Handle Dynamic Text Direction
    document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
        input.addEventListener('input', function () {
            let firstChar = this.value.trim().charAt(0);

            if (firstChar) {
                // Check if the first character is Arabic
                if (firstChar.match(/[\u0600-\u06FF]/)) {
                    this.style.direction = 'rtl';
                } else {
                    this.style.direction = 'ltr';
                }
            }
        });
    });
});

/* Auto resize textarea element */
document.addEventListener("DOMContentLoaded", function () {
    const messageBar = document.getElementById("mughader_message_bar");

    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });
});


















let mughader_commentsArray = [
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-1.png",
        personName: "م.ثامر الغنيمي",
        comment: "شكراً لكم على خدمتكم الجميلة وتعاملكم الاحترافي وبرامجكم المرنة.. 👍🏻",
        stars: 5
    },
    {
        profileLetter: "H",
        personName: "Hh Oo",
        comment: "شركة محترمة وصادقة ومرضية للعميل وتقدم خدمات مميزة واسعار مناسبة وخدمات مختلفة.",
        stars: 5
    },
    {
        profileLetter: "E",
        personName: "Emanoo Emee",
        comment: "والله الخدمه جدا رائعه و موفره جميع سبل الراحه و الرفاهيه من خدمة حجوزات الفنادق و السائق الخاص خلال الرحله و تنظيم جداول يوميه للرحلات و توفير خدمة مترجم و المطاعم و جميع الاماكن السياحيه عمل جدا عظيم و جبار و السعر كان جدا مناسب شكرا جزيلا 🙏🏻🌹.",
        stars: 5
    },
    {
        profileLetter: "D",
        personName: "Dal8800 دال للعقارات",
        comment: "شكرا مغادرعلى اتقانكم  بالعمل وعلى خدمتكم الجميله بارك الله فيكم وفي جهودكم الى الاعلى بإذن",
        stars: 5
    },
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-3.png",
        personName: "ناصر الهزاع",
        comment: "اشكر طاقم شركة السيف على تعاملهم معي يستاهلو كل خير ♥️♥️",
        stars: 5
    },
    {
        profileLetter: "F",
        personName: "Fahad Fahad",
        comment: "خدمه خمس نجوم فعلياً من الاستقبال الى التوديع شكراً لاتفي حقكم ❤️",
        stars: 5
    },
    {
        profileLetter: "ح",
        personName: "حامد العنزي",
        comment: "من أرقى الشركات تعامل وصدق ودقة ويهمهم راحت السائح بأدق التفاصيل وعلى تواصل مباشر مع السائح يوميا حتى العودة",
        stars: 5
    },
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-2.png",
        personName: "FAISAL ALHAMED",
        comment: "من افضل وكالات السفر التي تتميز بتقديم خدمات فريدة من نوعها لا يمكن ان تجدها في غيرها من الوكالات",
        stars: 5
    },
    {
        profileLetter: "ن",
        personName: "ناصر الموسى",
        comment: "نشكر وكاله مغادر على جهوده وتمنى له دائم التوفيق و والــــنــــجـــــاح",
        stars: 5
    },
    {
        profileLetter: "H",
        personName: "Hala Abdullah",
        comment: "من افضل واحسن الي تعاملت معهم للامانة ولا غلطة والاسعار حلوه جدا ومعقولة مرا شككككرا  شركة مغادر للسياحة 💛🙏🏻",
        stars: 5
    },
    {
        profileLetter: "س",
        personName: "سامي الموسى",
        comment: "صراحه مجهود يشكر عليه من وكالة مغادر للسفر والسياحة ومن افضل الشركات الي حريصه علئ ادق التفاصيل شركه تلبي جميع احتيجاتك وعن تجربه اتكلم صراحه تعاملهم جدا راقي بجميع الاماكن والاوقات ❤️❤️",
        stars: 5
    },
];

// Array of vibrant colors
let mughader_profileColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#33FFF2"];

function mughader_generateComments(comments) {
    let commentsSection = document.getElementById("mughader_customers_comments_section_id");

    comments.forEach(({ profileLetter, profileImage, personName, comment, stars }, index) => {
        // Create the main comment card
        let commentCard = document.createElement("div");
        commentCard.className = "mughader_comment_card";

        // Create the profile picture element
        let profilePicture = document.createElement("div");
        profilePicture.className = "mughader_profile_picture";

        if (profileImage) {
            // Use an image if profileImage is provided
            let img = document.createElement("img");
            img.src = profileImage;
            img.alt = `مكتب سياحي - شركة مغادر`;
            img.title = `مكتب سياحي - شركة مغادر`;
            profilePicture.appendChild(img);
        } else if (profileLetter) {
            // Use the profile letter if no image is provided
            profilePicture.textContent = profileLetter;

            // Assign a vibrant color to the profile picture
            let colorIndex = index % mughader_profileColors.length; // Cycle through the colors
            profilePicture.style.backgroundColor = mughader_profileColors[colorIndex];
        }

        // Create the person's name
        let personNameElement = document.createElement("div");
        personNameElement.className = "mughader_person_name";
        personNameElement.textContent = personName;

        // Create the comment text
        let commentText = document.createElement("div");
        commentText.className = "mughader_comment_text";
        commentText.textContent = comment;

        // Create the stars
        let starsElement = document.createElement("div");
        starsElement.className = "mughader_stars";
        starsElement.textContent = "★".repeat(stars);

        // Append all elements to the comment card
        commentCard.appendChild(profilePicture);
        commentCard.appendChild(personNameElement);
        commentCard.appendChild(commentText);
        commentCard.appendChild(starsElement);

        // Append the comment card to the section
        commentsSection.appendChild(commentCard);
    });
}

// Call the function to populate comments
mughader_generateComments(mughader_commentsArray);



























const commentsArray = [
    {
        profileLetter: "ن",
        personName: "Alice Smith",
        comment: "Amazing service, highly recommend!",
        stars: 5
    },
    {
        profileLetter: "J",
        personName: "John Doe",
        comment: "Loved the experience, will come back again.",
        stars: 4
    },
    {
        profileLetter: "M",
        personName: "Mary Johnson",
        comment: "Good quality but room for improvement.",
        stars: 3
    },
    {
        profileLetter: "R",
        personName: "Robert Brown",
        comment: "Exceptional customer service, truly satisfied!",
        stars: 5
    }
];

// Array of vibrant colors
const profileColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#33FFF2"];

function generateComments(comments) {
    const commentsSection = document.getElementById("customers_comments_section_id");

    comments.forEach(({ profileLetter, personName, comment, stars }, index) => {
        // Create the main comment card
        const commentCard = document.createElement("div");
        commentCard.className = "comment-card";

        // Create the profile picture
        const profilePicture = document.createElement("div");
        profilePicture.className = "profile-picture";
        profilePicture.textContent = profileLetter;

        // Assign a vibrant color to the profile picture
        const colorIndex = index % profileColors.length; // Cycle through the colors
        profilePicture.style.backgroundColor = profileColors[colorIndex];

        // Create the person's name
        const personNameElement = document.createElement("div");
        personNameElement.className = "person-name";
        personNameElement.textContent = personName;

        // Create the comment text
        const commentText = document.createElement("div");
        commentText.className = "comment-text";
        commentText.textContent = comment;

        // Create the stars
        const starsElement = document.createElement("div");
        starsElement.className = "stars";
        starsElement.textContent = "★".repeat(stars);

        // Append all elements to the comment card
        commentCard.appendChild(profilePicture);
        commentCard.appendChild(personNameElement);
        commentCard.appendChild(commentText);
        commentCard.appendChild(starsElement);

        // Append the comment card to the section
        commentsSection.appendChild(commentCard);
    });
}

// Call the function to populate comments
generateComments(commentsArray);























/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('alseef');

    const whatsappNumber = "+97337111535";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}



