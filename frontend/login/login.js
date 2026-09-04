let selectedUser = "customer";

function selectUser(type) {

    selectedUser = type;

    const customerBtn =
        document.getElementById("customerBtn");

    const ownerBtn =
        document.getElementById("ownerBtn");

    if (type === "customer") {

        customerBtn.classList.add("active");
        ownerBtn.classList.remove("active");

    } else {

        ownerBtn.classList.add("active");
        customerBtn.classList.remove("active");

    }
}

function togglePassword() {

    const passwordInput =
        document.getElementById("password");

    const passwordButton =
        document.querySelector(".show-password");

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordButton.textContent = "🙈";

        passwordButton.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        passwordButton.textContent = "👁";

        passwordButton.setAttribute(
            "aria-label",
            "Show password"
        );
    }
}

function forgotPassword(event) {

    event.preventDefault();

    alert(
        "Password recovery will be connected to the backend later."
    );
}

function handleLogin(event) {

    event.preventDefault();

    const mobileInput =
        document.getElementById("mobile");

    const passwordInput =
        document.getElementById("password");

    const loginButton =
        document.getElementById("loginButton");

    const mobile =
        mobileInput.value.trim();

    const password =
        passwordInput.value;

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        mobileInput.focus();

        return;
    }

    if (password.length < 4) {

        alert(
            "Please enter a valid password."
        );

        passwordInput.focus();

        return;
    }

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    localStorage.setItem(
        "userType",
        selectedUser
    );

    localStorage.setItem(
        "mobile",
        mobile
    );

    const remember =
        document.getElementById("remember").checked;

    localStorage.setItem(
        "rememberMe",
        remember
    );

    loginButton.classList.add("loading");

    loginButton.querySelector("span:first-child")
        .textContent = "Signing in...";

    setTimeout(() => {

        if (selectedUser === "customer") {

            window.location.href =
                "../customer/dashboard.html";

        } else {

            window.location.href =
                "../owner/dashboard.html";

        }

    }, 600);
}