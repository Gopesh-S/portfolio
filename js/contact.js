/* ==========================================================================
   CONTACT FORM VALIDATION, EMAILJS & TOAST NOTIFICATION - GOPESH S PORTFOLIO
   ========================================================================== */


/* ==========================================================================
   EMAILJS CONFIGURATION
   ========================================================================== */

const EMAILJS_PUBLIC_KEY = "dzG2DSccHMMYSnrJO";
const EMAILJS_SERVICE_ID = "service_zoj3s9i";
const EMAILJS_TEMPLATE_ID = "template_bvpp4c6";


/* ==========================================================================
   INITIALIZE CONTACT FORM
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    initContactFormValidation();
});


/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */

window.showToastNotification = function (message, isSuccess = true) {

    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');


    if (!toast || !toastMsg || !toastIcon) return;


    toastMsg.textContent = message;


    if (isSuccess) {

        toastIcon.className =
            'fa-solid fa-circle-check toast-icon';

        toastIcon.style.color =
            'var(--color-success)';

        toast.style.borderColor =
            'var(--color-success)';

    } else {

        toastIcon.className =
            'fa-solid fa-triangle-exclamation toast-icon';

        toastIcon.style.color =
            'var(--color-danger)';

        toast.style.borderColor =
            'var(--color-danger)';

    }


    toast.classList.add('show');


  

setTimeout(() => {

        toast.classList.remove('show');

    }, 4000);

};

/* ==========================================================================
   CONTACT FORM VALIDATION
   ========================================================================== */

function initContactFormValidation() {

    const form =
        document.getElementById('portfolio-contact-form');

    if (!form) return;


    const nameInput =
        document.getElementById('contact-name');

    const emailInput =
        document.getElementById('contact-email');

    const subjectInput =
        document.getElementById('contact-subject');

    const messageInput =
        document.getElementById('contact-message');


    const nameError =
        document.getElementById('name-error');

    const emailError =
        document.getElementById('email-error');

    const subjectError =
        document.getElementById('subject-error');

    const messageError =
        document.getElementById('message-error');


    /* ==========================================================================
       INPUT VALIDATION RULES
       ========================================================================== */


    function validateName() {

        if (
            !nameInput.value.trim() ||
            nameInput.value.trim().length < 2
        ) {

            showError(
                nameInput,
                nameError,
                'Please enter your full name (min 2 chars)'
            );

            return false;
        }


        clearError(
            nameInput,
            nameError
        );

        return true;

    }


    function validateEmail() {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailInput.value.trim() ||
            !emailRegex.test(emailInput.value.trim())
        ) {

            showError(
                emailInput,
                emailError,
                'Please enter a valid email address'
            );

            return false;
        }


        clearError(
            emailInput,
            emailError
        );

        return true;

    }


    function validateSubject() {

        if (
            !subjectInput.value.trim() ||
            subjectInput.value.trim().length < 3
        ) {

            showError(
                subjectInput,
                subjectError,
                'Please enter a message subject (min 3 chars)'
            );

            return false;
        }


        clearError(
            subjectInput,
            subjectError
        );

        return true;

    }


    function validateMessage() {

        if (
            !messageInput.value.trim() ||
            messageInput.value.trim().length < 10
        ) {

            showError(
                messageInput,
                messageError,
                'Message must be at least 10 characters long'
            );

            return false;
        }


        clearError(
            messageInput,
            messageError
        );

        return true;

    }


    /* ==========================================================================
       SHOW ERROR
       ========================================================================== */

    function showError(
        input,
        errorEl,
        message
    ) {

        input.classList.add('error');


        if (errorEl) {

            errorEl.textContent = message;

            errorEl.classList.add('visible');

        }

    }


    /* ==========================================================================
       CLEAR ERROR
       ========================================================================== */

    function clearError(
        input,
        errorEl
    ) {

        input.classList.remove('error');


        if (errorEl) {

            errorEl.classList.remove('visible');

        }

    }


    /* ==========================================================================
       REAL-TIME INPUT VALIDATION LISTENERS
       ========================================================================== */

    nameInput?.addEventListener(
        'blur',
        validateName
    );

    emailInput?.addEventListener(
        'blur',
        validateEmail
    );

    subjectInput?.addEventListener(
        'blur',
        validateSubject
    );

    messageInput?.addEventListener(
        'blur',
        validateMessage
    );


    nameInput?.addEventListener(
        'input',
        () => clearError(
            nameInput,
            nameError
        )
    );

    emailInput?.addEventListener(
        'input',
        () => clearError(
            emailInput,
            emailError
        )
    );

    subjectInput?.addEventListener(
        'input',
        () => clearError(
            subjectInput,
            subjectError
        )
    );

    messageInput?.addEventListener(
        'input',
        () => clearError(
            messageInput,
            messageError
        )
    );


    /* ==========================================================================
       FORM SUBMIT HANDLER
       ========================================================================== */

    form.addEventListener(
        'submit',
        (e) => {

            e.preventDefault();


            /* Validate all fields */

            const isNameValid =
                validateName();

            const isEmailValid =
                validateEmail();

            const isSubjectValid =
                validateSubject();

            const isMessageValid =
                validateMessage();


            /* ==========================================================================
               IF ALL VALID
               ========================================================================== */

            if (
                isNameValid &&
                isEmailValid &&
                isSubjectValid &&
                isMessageValid
            ) {


                const submitBtn =
                    document.getElementById(
                        'submit-contact-btn'
                    );


                /* Disable button */

                if (submitBtn) {

                    submitBtn.disabled = true;

                    submitBtn.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                }


                /* ==========================================================================
                   SEND EMAIL USING EMAILJS
                   ========================================================================== */

                emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    form
)

.then(() => {

    window.showToastNotification(
        'Message sent successfully! Gopesh will respond shortly.'
    );

    form.reset();

    if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Message';

    }

})

.catch((error) => {

    console.error(
        'EmailJS Error:',
        error
    );

    window.showToastNotification(
        'Unable to send your message. Please try again later.',
        false
    );

    if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Message';

    }

});


            }


            /* ==========================================================================
               VALIDATION FAILED
               ========================================================================== */

            else {

                window.showToastNotification(
                    'Please correct the highlighted form errors.',
                    false
                );

            }

        }
    );

}