const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSecector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSecector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    el.remove();
                }

                windows.forEach(window => {
                    window.style.display = 'none';
                    window.classList.add('animated', 'fadeIn');
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
            if (e.target === modal) {
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

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
           if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
               document.querySelector(selector).click();
           }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    openByScroll('.fixed-gift');

    showModalByTime('.popup-consultation', 60000);
};

export default modals;