/* =========================
   Portfolio JavaScript
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       Elements
    ========================= */

    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    const messageCount = document.getElementById("messageCount");
    const formStatus = document.getElementById("formStatus");
    const submitButton = document.getElementById("submitButton");
    const submitText = document.getElementById("submitText");

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    /* =========================
       Dark / Light Mode
    ========================= */

    function updateThemeButton() {
        if (!themeToggle) return;

        const isDark = document.body.classList.contains("dark-mode");

        themeToggle.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }

    // Restore saved theme safely.
    try {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    } catch (error) {
        // localStorage may be unavailable in some browser/privacy modes.
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const isDark = document.body.classList.toggle("dark-mode");

            try {
                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );
            } catch (error) {
                // Theme still works for the current page.
            }

            updateThemeButton();
        });
    }

    /* =========================
       Mobile Hamburger Menu
    ========================= */

    function closeMobileMenu() {
        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.style.overflow = "";
    }

    function openOrCloseMobileMenu() {
        if (!navLinks || !menuToggle) return;

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        // Prevent background scrolling only while the mobile menu is open.
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isOpen ? "hidden" : "";
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            openOrCloseMobileMenu();
        });

        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                closeMobileMenu();
            });
        });

        document.addEventListener("click", function (event) {
            if (
                window.innerWidth <= 768 &&
                navLinks.classList.contains("active") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    /* =========================
       Active Navigation Link
    ========================= */

    const sections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();

    /* =========================
       Contact Form
    ========================= */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearFormErrors() {
        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (subjectError) subjectError.textContent = "";
        if (messageError) messageError.textContent = "";

        if (nameInput) nameInput.classList.remove("input-error");
        if (emailInput) emailInput.classList.remove("input-error");
        if (subjectInput) subjectInput.classList.remove("input-error");
        if (messageInput) messageInput.classList.remove("input-error");

        if (formStatus) {
            formStatus.textContent = "";
            formStatus.className = "form-status";
        }
    }

    function showError(input, errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
        }

        if (input) {
            input.classList.add("input-error");
        }
    }

    if (messageInput && messageCount) {
        messageCount.textContent = messageInput.value.length;

        messageInput.addEventListener("input", function () {
            messageCount.textContent = messageInput.value.length;
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            clearFormErrors();

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const subject = subjectInput ? subjectInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            let isValid = true;

            if (name === "") {
                showError(
                    nameInput,
                    nameError,
                    "Please enter your name."
                );
                isValid = false;
            }

            if (email === "") {
                showError(
                    emailInput,
                    emailError,
                    "Please enter your email."
                );
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(
                    emailInput,
                    emailError,
                    "Please enter a valid email address."
                );
                isValid = false;
            }

            if (subject === "") {
                showError(
                    subjectInput,
                    subjectError,
                    "Please enter a subject."
                );
                isValid = false;
            } else if (subject.length < 3) {
                showError(
                    subjectInput,
                    subjectError,
                    "Subject should contain at least 3 characters."
                );
                isValid = false;
            }

            if (message === "") {
                showError(
                    messageInput,
                    messageError,
                    "Please enter your message."
                );
                isValid = false;
            } else if (message.length < 10) {
                showError(
                    messageInput,
                    messageError,
                    "Message should contain at least 10 characters."
                );
                isValid = false;
            }

            if (!isValid) {
                if (formStatus) {
                    formStatus.textContent =
                        "Please correct the highlighted fields.";
                    formStatus.className = "form-status error";
                }

                const firstError =
                    document.querySelector(".input-error");

                if (firstError) {
                    firstError.focus();
                }

                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
            }

            if (submitText) {
                submitText.textContent = "Sending...";
            }

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Form submission failed.");
                    }

                    return response.json();
                })
                .then(function () {
                    if (formStatus) {
                        formStatus.textContent =
                            "Message sent successfully! Thank you for contacting me.";
                        formStatus.className =
                            "form-status success";
                    }

                    contactForm.reset();

                    if (messageCount) {
                        messageCount.textContent = "0";
                    }
                })
                .catch(function () {
                    if (formStatus) {
                        formStatus.textContent =
                            "Something went wrong. Please try again later.";
                        formStatus.className =
                            "form-status error";
                    }
                })
                .finally(function () {
                    if (submitButton) {
                        submitButton.disabled = false;
                    }

                    if (submitText) {
                        submitText.textContent = "Send Message";
                    }
                });
        });
    }
});
