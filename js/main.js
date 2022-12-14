document.addEventListener("DOMContentLoaded", function () {

    //Поиск по сайту
    const search = document.getElementById('search');
    const showButton = search.querySelector('button');
    const searchInput = search.querySelector('input');

    showButton.addEventListener('click', () => {
        searchInput.classList.toggle('search-form__input-active');
    })

    document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(search);
        if (!withinBoundaries) {
            searchInput.classList.remove('search-form__input-active');
        }
    })

    //Бургер меню
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('menuContainer');
    const menuClose = document.getElementById('menuClose');
    const menuContent = document.querySelector('.header__mobile__container');
    const topMenu = document.getElementById('topMenu');
    const bottomMenu = document.querySelector('.header__bottom__nav');
    menuContent.innerHTML = topMenu.innerHTML;

    btn.addEventListener('click', showMenu);
    menuClose.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.toggle('menu-show');
    }

    if (window.screen.width <= 700) {
        menuContainer.innerHTML = menuContainer.innerHTML + bottomMenu.innerHTML;
        const menuCloseBtn = document.getElementById('menuClose');
        menuCloseBtn.addEventListener('click', showMenu);
    }

    //Кнопка что в эфире
    const openOnair = document.getElementById('openOnair');
    const onairMenu = document.querySelector('.header__bottom__onair__container');
    const onairBtn = document.getElementById('onairBtn');
    onairMenu.innerHTML = onairBtn.innerHTML;
    openOnair.addEventListener('click', () => {
        onairMenu.classList.toggle('is-opened');
        openOnair.parentNode.classList.toggle('is-opened');
    })


    // Popups
    class Popup {
        constructor(popupElement) {
            this._popupElement = popupElement;
            this._closeButton = this._popupElement.querySelector('.popup__close');
            this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
            this._handleEscClose = this._handleEscClose.bind(this)
            this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
            this.setEventListeners()
        }

        open(el) {
            if (this._img) this._img.src = el.src
            document.body.style.overflow = "hidden";
            this._popupElement.classList.add('popup_opened')
            document.addEventListener('keydown', this._handleEscClose);
        }

        close() {
            if (this._img) this._img.src = ""
            this._popupElement.classList.remove('popup_opened');
            document.body.style.overflow = "visible";
            document.removeEventListener('keydown', this._handleEscClose);
        }

        _handleEscClose(evt) {
            if (evt.keyCode === 27) {
                this.close();
            }
        }

        _handleOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        }

        setEventListeners() {
            this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
            this._closeButton.addEventListener('click', () => this.close());
            this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
        }
    }

    const popups = document.querySelectorAll('.popup')
    let popupsObj = {}
    if (popups.length > 0) popups.forEach(item => { popupsObj[item.id] = new Popup(item) })

    //Кнопки play stop
    const playBtn = document.querySelectorAll('.play');
    const stops = document.querySelectorAll('.pause');
    const starts = document.querySelectorAll('.start');

    playBtn.forEach(el => {
        el.addEventListener('click', () => {
            let stop = el.querySelector('.pause');
            let start = el.querySelector('.start');
            if (stop.classList.contains('onair-btn-active')) {
                stop.classList.remove('onair-btn-active');
                start.classList.remove('start-active');
            } else {
                stops.forEach(stoped => {
                    stoped.classList.remove('onair-btn-active');
                })
                starts.forEach(started => {
                    started.classList.remove('start-active');
                })
                stop.classList.add('onair-btn-active');
                start.classList.add('start-active');
            }
        });
    });



    //Показать больше карточек из подкаста
    const cards = document.querySelectorAll('.invisible-cards');
    let showCardsBtn = document.getElementById('showMore');

    showCardsBtn.addEventListener('click', () => {
        cards.forEach(el => {
            el.classList.toggle('visible-cards');
        })
        console.log(showCardsBtn.textContent);
        if (showCardsBtn.textContent.trim() === 'Ещё подкасты') {
            showCardsBtn.textContent = 'Скрыть';
        } else {
            showCardsBtn.textContent = 'Ещё подкасты';
        }
    })

    //Валидация форм
    let validInputs = document.querySelectorAll('input[data-rule]');
    for (let validInput of validInputs) {
        validInput.addEventListener('blur', function () {
            let rule = this.dataset.rule;
            let check;
            switch (rule) {
                case 'text':
                    check = this.value.length >= 1;
                    break;
                case 'email':
                    check = (this.value.length > 4 && /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([0-9A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/.test(this.value));
                    break;
                case 'tel':
                    check = (!this.value.includes('_') && this.value.includes(' '));
                    break;
                case 'password':
                    check = this.value.length > 4;
                    break;
                default:
                    check;
                    break;
            }
            if (!check) {
                this.classList.add('invalid');
                this.previousElementSibling.style.display = 'block';
            } else {
                this.classList.remove('invalid');
                this.previousElementSibling.style.display = 'none';
            }
        })
    }

    //Select
    const element = document.getElementById('selectCustom');
    const choices = new Choices(element, {
        searchEnabled: false,
        itemSelectText: '',
        allowHTML: true,
        position: String,
    });


    //Аккордеон
    const accordeon = document.getElementById('accordeon');
    let accordeonBtns = accordeon.querySelectorAll('.guests__accordeon__btn');

    accordeonBtns.forEach(element => {
        element.addEventListener('click', () => {
            element.parentElement.classList.toggle('active');
        })
    });

    //Табы в аккордеоне
    let tabBtns = accordeon.querySelectorAll('.guests__accordeon__tab');
    let biographys = document.querySelectorAll('.guests__detail');
    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            //Удаляем у всех кнопок класс актив
            tabBtns.forEach(tab => {
                tab.classList.remove('guests__accordeon__tab--active');
            });
            //Добавляем нажатой кнопке класс актив и меняем автора
            tab.classList.add('guests__accordeon__tab--active');
            biographys.forEach(biography => {
                biography.classList.remove('guests__detail--active');
                let newAutor = document.getElementById(`${tab.dataset.name}`);
                newAutor.classList.add('guests__detail--active');
            })

        })
    });

    //swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,

        breakpoints: {
            320: {
                slidesPerView: 2.3,
                spaceBetween: 20
            },
            380: {
                slidesPerView: 2.6,
                spaceBetween: 20
            },
            425: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            501: {
                slidesPerView: 1.7,
                spaceBetween: 30
            },
            590: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            700: {
                slidesPerView: 1.9,
                spaceBetween: 30
            },
            855: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            968: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1230: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
