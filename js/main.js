// картинки тренеров
const cards = document.querySelectorAll(".trainer-card");
const isHoverDevice = window.matchMedia("(hover: hover)").matches;

if (!isHoverDevice) {
  cards.forEach((card) => {
    card.addEventListener("touchstart", function () {
      const isActive = this.classList.contains("active");
      cards.forEach((c) => c.classList.remove("active"));
      if (!isActive) {
        this.classList.add("active");
      }
    });
  });
}

// бургер кнопка
const burger = document.getElementById("burger");
const menu = document.getElementById("full-menu");
const body = document.body;
burger.addEventListener("click", () => {
  // Переключаем активный класс у кнопки и у меню
  burger.classList.toggle("is-active");
  menu.classList.toggle("is-active");

  // Запрещаем скролл страницы, когда меню открыто
  body.classList.toggle("no-scroll");
});

const links = document.querySelectorAll(".full-menu__list a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("is-active");
    menu.classList.remove("is-active");
    body.classList.remove("no-scroll");
  });
});

const classes = [
  {
    id: 1,
    date: new Date(2026, 2, 23), // год, месяц (0-11), день
    day: "пн",
    title: "Хатха-йога",
    time: "8:00",
    trainer: "Александр Жуков",
    level: "Средний",
    direction: "hatha-yoga",
    spots: 7,
  },
  {
    id: 2,
    date: new Date(2026, 2, 23),
    day: "пн",
    title: "Виньяса-йога",
    time: "10:00",
    trainer: "Мария Иванова",
    level: "Начинающий",
    direction: "vinyasa-yoga",
    spots: 3,
  },
  {
    id: 3,
    date: new Date(2026, 2, 24),
    day: "вт",
    title: "Силовая йога",
    time: "9:00",
    trainer: "Иван Петров",
    level: "Продвинутый",
    direction: "strong-yoga",
    spots: 5,
  },
  {
    id: 4,
    date: new Date(2026, 2, 25),
    day: "ср",
    title: "Хатха-йога",
    time: "11:00",
    trainer: "Александр Жуков",
    level: "Начинающий",
    direction: "hatha-yoga",
    spots: 10,
  },
  {
    id: 5,
    date: new Date(2026, 2, 26),
    day: "чт",
    title: "Йога для детей",
    time: "15:00",
    trainer: "Анна Смирнова",
    level: "Начинающий",
    direction: "children-yoga",
    spots: 8,
  },
];

function createCard(cls) {
  const dateStr = `${String(cls.date.getDate()).padStart(2, "0")}.${String(cls.date.getMonth() + 1).padStart(2, "0")}, ${cls.day}`;
  const bookings = getBookings();
  const isBooked = bookings.some(item => item.id === cls.id);
  return `
    <div class="class-card">
      <p class="class-card__header">${dateStr}</p>
      <div class="class-card__body">
        <div class="class-card__text">
          <p class="class-card__title">${cls.title}. <span class="class-card__time">${cls.time}</span></p>
          <p class="class-card__trainer">${cls.trainer}</p>
        </div>
        <button class="btn btn_red js-book-btn" data-id="${cls.id}">
          ${isBooked ? 'Отменить' : 'Записаться'}
        </button>
      </div>
    </div>
  `;
}
//Календарь

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const GREENS = [0, 1, 2, 3, 4]; //пн вт ср чт пт
const REDS = [5, 6]; // сб вс

let current = { year: new Date().getFullYear(), month: new Date().getMonth() };
let rangeStart = null,
  rangeEnd = null;

function isSame(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function render() {
  const { year, month } = current;
  document.getElementById("calendar__month-title").textContent =
    MONTHS[month] + " " + year;
  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  DAYS.forEach((d, i) => {
    const el = document.createElement("div");
    el.className =
      "day-label" +
      (GREENS.includes(i) ? " green" : REDS.includes(i) ? " red" : "");
    el.textContent = d;
    grid.appendChild(el);
  });

  let startDow = new Date(year, month, 1).getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();
  const total = Math.ceil((startDow + lastDay) / 7) * 7;

  for (let i = 0; i < total; i++) {
    let d,
      dateObj,
      isOther = false;
    if (i < startDow) {
      d = prevLast - startDow + 1 + i;
      dateObj = new Date(year, month - 1, d);
      isOther = true;
    } else if (i >= startDow + lastDay) {
      d = i - startDow - lastDay + 1;
      dateObj = new Date(year, month + 1, d);
      isOther = true;
    } else {
      d = i - startDow + 1;
      dateObj = new Date(year, month, d);
    }

    const dow = i % 7;
    const isStart = isSame(dateObj, rangeStart);
    const isEnd = isSame(dateObj, rangeEnd);
    const inRange =
      rangeStart && rangeEnd && dateObj > rangeStart && dateObj < rangeEnd;

    const cell = document.createElement("div");
    cell.className =
      "cell" +
      (isOther ? " other-month" : "") +
      (REDS.includes(dow) && !isOther ? " weekend" : "") +
      (isStart ? " range-start" : "") +
      (isEnd ? " range-end" : "");

    if ((inRange || isStart || isEnd) && !isOther) {
      const bg = document.createElement("div");
      bg.className = "cell-bg";
      if (isStart) {
        bg.style.left = "50%";
        bg.style.right = "0";
      } else if (isEnd) {
        bg.style.left = "0";
        bg.style.right = "50%";
      } else {
        bg.style.left = "0";
        bg.style.right = "0";
      }
      cell.appendChild(bg);
    }

    const inner = document.createElement("div");
    inner.className = "cell-inner";
    inner.textContent = d;
    cell.appendChild(inner);

    if (!isOther) {
      cell.addEventListener("click", () => {
        // Если кликнули на уже выбранный start — сброс
        if (rangeStart && !rangeEnd && isSame(dateObj, rangeStart)) {
          rangeStart = null;
          render();
          return;
        }
        // Если кликнули на уже выбранный end — сброс до start
        if (rangeStart && rangeEnd && isSame(dateObj, rangeEnd)) {
          rangeEnd = null;
          render();
          return;
        }
        // Если кликнули на start при наличии range — полный сброс и новый выбор
        if (rangeStart && rangeEnd && isSame(dateObj, rangeStart)) {
          rangeStart = null;
          rangeEnd = null;
          render();
          return;
        }
        // Обычная логика
        if (!rangeStart || (rangeStart && rangeEnd)) {
          rangeStart = dateObj;
          rangeEnd = null;
        } else {
          if (dateObj < rangeStart) {
            rangeEnd = rangeStart;
            rangeStart = dateObj;
          } else rangeEnd = dateObj;
        }
        render();
      });
    }
    grid.appendChild(cell);
  }
  renderCards();
}

function renderCards() {
  const direction = document.getElementById("directions-select").value;
  const level = document.getElementById("level-select").value;
  const container = document.getElementById("cards-container");

  container.innerHTML = ""; // очищаем только контейнер

  const filtered = classes.filter((cls) => {
    if (direction && cls.direction !== direction) return false;
    if (level && cls.level !== level) return false;

    if (rangeStart && rangeEnd) {
      if (cls.date < rangeStart || cls.date > rangeEnd) return false;
    } else if (rangeStart) {
      if (!isSame(cls.date, rangeStart)) return false;
    }

    return true;
  });

  container.innerHTML = filtered.length
    ? filtered.map(createCard).join("")
    : '<p class="no-results">Занятий по выбранным фильтрам не найдено.</p>';
}

document
  .getElementById("directions-select")
  .addEventListener("change", renderCards);
document.getElementById("level-select").addEventListener("change", renderCards);

document.getElementById("prev").onclick = () => {
  current.month--;
  if (current.month < 0) {
    current.month = 11;
    current.year--;
  }
  render();
};
document.getElementById("next").onclick = () => {
  current.month++;
  if (current.month > 11) {
    current.month = 0;
    current.year++;
  }
  render();
};

render();


function getBookings() {
  return JSON.parse(localStorage.getItem('bookings')) || [];
}
function saveBookings(data) {
  localStorage.setItem('bookings', JSON.stringify(data));
}

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('js-book-btn')) return;

  const id = Number(e.target.dataset.id);
  let bookings = getBookings();

  const exists = bookings.find(item => item.id === id);

  if (exists) {
    // удалить
    bookings = bookings.filter(item => item.id !== id);
    e.target.textContent = 'Записаться';
  } else {
    // добавить
    const cls = classes.find(c => c.id === id);
    bookings.push(cls);
    e.target.textContent = 'Отменить';
  }

  saveBookings(bookings);
});


