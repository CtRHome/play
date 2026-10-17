const broadcast = new BroadcastChannel("sw-update-channel");

broadcast.onmessage = (event) => {
    const { type, payload } = event.data;

    if (type === "progress") {
        if (!window.currentProgressToast) {
            window.currentProgressToast = notyf.open({
                type: "info",
                message: payload,
                duration: 0,
                ripple: false,
                dismissible: false,
            });

            // Store the message element reference after creating the toast
            // Small delay to ensure the element is in the DOM
            setTimeout(() => {
                window.currentProgressToastMessage = document.querySelector(".notyf__message");
            }, 50);
        } else if (window.currentProgressToastMessage) {
            // Directly update the message element's text content
            window.currentProgressToastMessage.textContent = payload;
        }
    } else if (type === "success") {
        if (window.currentProgressToast) {
            notyf.dismiss(window.currentProgressToast);
            window.currentProgressToast = null;
            window.currentProgressToastMessage = null;
        }
        notyf.success(payload);
    } else if (type === "error") {
        if (window.currentProgressToast) {
            notyf.dismiss(window.currentProgressToast);
            window.currentProgressToast = null;
            window.currentProgressToastMessage = null;
        }
        notyf.error(payload);
    }
};

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").then((registration) => {
            console.log("Service Worker registered:", registration);
        });
    });
}
