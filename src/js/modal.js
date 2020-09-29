const modals = () => {
    function bindModal(triggerSelector, modalSecector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSecector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(window => {
                    window.style.display = 'none';
                });

                modal.style.display = `block`;
                document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', (e) => {
            if (e.target) {
                windows.forEach(window => {
                    window.style.display = 'none';
                });

                e.preventDefault();
            }

            modal.style.display = `none`;
            document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay === true) {
                windows.forEach(window => {
                    window.style.display = 'none';
                });

                modal.style.display = `none`;
                document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(el => {
                if (getComputedStyle(el).display !== 'none') {
                    display = 'block';
                }
            });

            // if cosed all modals
            if (!display) {
                document.querySelector(selector).style.display = `block`;
                document.body.classList.add('modal-open');
            }
        }, time);
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;