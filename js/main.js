
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
  document.querySelectorAll("[data-dropdown]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const menu = btn.parentElement.querySelector(".nav-dropmenu");
      if(!menu) return;
      const show = menu.style.display === "block";
      menu.style.display = show ? "none" : "block";
    });
  });
})();
