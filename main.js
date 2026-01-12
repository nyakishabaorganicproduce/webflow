
(function(){
  const yearEl = document.querySelector("[data-year]");
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if(toggle && nav){
    toggle.addEventListener("click", ()=>{
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true":"false");
    });
    // Close on link click (mobile)
    nav.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=>{
        if(nav.classList.contains("open")){
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded","false");
        }
      });
    });
  }

  // Mini quote form -> WhatsApp with populated fields
  const mini = document.querySelector("[data-quote-form]");
  if(mini){
    mini.addEventListener("submit",(e)=>{
      e.preventDefault();
      const data = new FormData(mini);
      const grade = encodeURIComponent(data.get("grade")||"");
      const qty = encodeURIComponent(data.get("qty")||"");
      const dest = encodeURIComponent(data.get("dest")||"");
      const msg = `Hello Nyakishaba Team, I would like a quote.%0AGrade: ${grade}%0AQuantity: ${qty}%0ADestination: ${dest}`;
      window.open(`https://wa.me/256757757757?text=${msg}`,"_blank","noopener");
    });
  }

  // Long quote form -> mailto
  const long = document.querySelector("[data-long-quote]");
  if(long){
    long.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d = new FormData(long);
      const subject = encodeURIComponent("Coffee Quote Request - Nyakishaba Organic Produce");
      const lines = [
        `Name: ${d.get("name")||""}`,
        `Company: ${d.get("company")||""}`,
        `Email: ${d.get("email")||""}`,
        `Phone/WhatsApp: ${d.get("phone")||""}`,
        `Grade: ${d.get("grade")||""}`,
        `Quantity (MT): ${d.get("qty")||""}`,
        `Destination: ${d.get("dest")||""}`,
        `Incoterms: ${d.get("incoterms")||""}`,
        "",
        "Buyer Specification Notes:",
        `${d.get("notes")||""}`
      ];
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:info@nyakishabaorganicproduce.com?subject=${subject}&body=${body}`;
    });
  }

  // Investor form -> mailto
  const invest = document.querySelector("[data-invest-form]");
  if(invest){
    invest.addEventListener("submit",(e)=>{
      e.preventDefault();
      const d = new FormData(invest);
      const subject = encodeURIComponent("Investment / Partnership Inquiry - Nyakishaba Organic Produce");
      const body = encodeURIComponent(
        `Name: ${d.get("name")||""}\nEmail: ${d.get("email")||""}\nInterest: ${d.get("interest")||""}\n\nMessage:\n${d.get("message")||""}`
      );
      window.location.href = `mailto:info@nyakishabaorganicproduce.com?subject=${subject}&body=${body}`;
    });
  }

  // Dropdown button support for touch devices
// Dropdown support: click-to-open + close on outside click + Esc
const dropdownButtons = document.querySelectorAll("[data-dropdown]");

dropdownButtons.forEach((btn) => {
  const wrap = btn.closest(".nav-dropdown");
  if (!wrap) return;

  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // close other dropdowns
    document.querySelectorAll(".nav-dropdown.open").forEach(d => {
      if (d !== wrap) d.classList.remove("open");
    });

    const open = wrap.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

// Close dropdown if clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
  document.querySelectorAll("[data-dropdown][aria-expanded='true']").forEach(b => b.setAttribute("aria-expanded","false"));
});

// Close dropdown on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
  document.querySelectorAll("[data-dropdown][aria-expanded='true']").forEach(b => b.setAttribute("aria-expanded","false"));
});
// Subtle scroll-reveal animations
const reveal = (el) => el.classList.add("reveal-in");

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      reveal(entry.target);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".card, .media, .qc-block, .section-head").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});


})();
