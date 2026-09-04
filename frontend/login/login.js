/* =====================================================
   SMARTTROLLEY LOGIN
===================================================== */


/* =====================================================
   CURRENT USER TYPE
===================================================== */

let selectedUser = "customer";


/* =====================================================
   SELECT CUSTOMER / OWNER
===================================================== */

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


/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

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


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function forgotPassword(event) {

    event.preventDefault();


    alert(
        "Password recovery will be connected to the backend later."
    );

}


/* =====================================================
   LOGIN
===================================================== */

function handleLogin(event) {

    event.preventDefault();


    /* ---------------------------------------------
       Get values
    --------------------------------------------- */

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


    /* ---------------------------------------------
       Validate mobile number
    --------------------------------------------- */

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        mobileInput.focus();

        return;
    }


    /* ---------------------------------------------
       Validate password
    --------------------------------------------- */

    if (password.length < 4) {

        alert(
            "Please enter a valid password."
        );

        passwordInput.focus();

        return;
    }


    /* ---------------------------------------------
       Save login information
       
       TEMPORARY PROTOTYPE ONLY
       
       Later this will be handled by:
       
       Frontend
           ↓
       Backend API
           ↓
       Database
           ↓
       Authentication
    --------------------------------------------- */

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


    /* ---------------------------------------------
       Remember me
    --------------------------------------------- */

    const remember =
        document.getElementById("remember").checked;


    localStorage.setItem(
        "rememberMe",
        remember
    );


    /* ---------------------------------------------
       Button animation
    --------------------------------------------- */

    loginButton.classList.add("loading");

    loginButton.querySelector("span:first-child")
        .textContent = "Signing in...";


    /* ---------------------------------------------
       Temporary redirect
    --------------------------------------------- */

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