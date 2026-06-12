
document.querySelector(".overlay h2").addEventListener("click", function () {
  document.querySelector(".overlay").style.display = "none";
  const music = document.getElementById("background-music");
  music.volume = 0.2;
  music.play().catch(() => {}); 
});

function updateClock() {
  const now = new Date();
  const options = { timeZone: "Asia/Ho_Chi_Minh" };

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("vi-VN", { ...options, hour12: false });

  document.getElementById("date").textContent =
    now.toLocaleDateString("vi-VN", {
      ...options,
      weekday: "long", day: "2-digit", month: "2-digit", year: "numeric"
    });
}

const birthDate = new Date("2009-09-19T00:00:00+07:00");

function updateAge() {
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = String(23 - ((now.getHours() + 24 - 0) % 24 === 0 ? 23 : -1) || now.getHours()).padStart(2, "0");

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("age-counter").textContent =
    `${years} năm ${months} tháng ${days} ngày ${h}:${m}:${s}`;
}

setInterval(() => {
  updateClock();
  updateAge();
}, 1000);

updateClock();
updateAge();
<!-- credit : Hồng Sơn -->
