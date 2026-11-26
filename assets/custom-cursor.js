(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

  function initCursor() {
    if (document.getElementById("custom-cursor")) return;

    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.className = "custom-cursor-text";
    text.textContent = "VIEW";
    cursor.appendChild(text);

    document.body.appendChild(cursor);

    let mouseX = -100, mouseY = -100;
    let currX = -100, currY = -100;
    let isVisible = false;
    let isView = false;
    let isLimeBg = false;
    let currentSize = 10;

    function checkCard(hoverEl, x, y) {
      if (hoverEl && hoverEl.closest && hoverEl.closest(".experience-card, .experience-card--desktop")) {
        return true;
      }
      if (typeof x === "number" && typeof y === "number") {
        const directEl = document.elementFromPoint(x, y);
        if (directEl && directEl.closest && directEl.closest(".experience-card, .experience-card--desktop")) {
          return true;
        }
      }
      return false;
    }

    function checkIsDarkOrBlue(x, y) {
      const currentBg = (document.documentElement.style.getPropertyValue("--current-bg") || "").toLowerCase().trim();
      if (
        currentBg.includes("291bdb") ||
        currentBg.includes("141416") ||
        currentBg.includes("#000") ||
        currentBg.includes("rgb(41, 27, 219)") ||
        currentBg.includes("rgb(20, 20, 22)")
      ) {
        return true;
      }

      if (typeof x === "number" && typeof y === "number") {
        const el = document.elementFromPoint(x, y);
        if (el) {
          if (el.closest(".experience-reachout-card, .desktop-footer, [data-card-id='reach-out'], footer")) {
            return true;
          }
          let node = el;
          while (node && node !== document.body) {
            const bg = getComputedStyle(node).backgroundColor;
            if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
              const m = bg.match(/\d+/g);
              if (m && m.length >= 3) {
                const r = Number(m[0]), g = Number(m[1]), b = Number(m[2]);
                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                if (lum < 110 || (b > 160 && r < 80)) {
                  return true;
                }
                return false;
              }
            }
            node = node.parentElement;
          }
        }
      }
      return false;
    }

    function updateCursorClasses() {
      if (isView) {
        cursor.classList.add("custom-cursor--view");
        cursor.classList.remove("custom-cursor--lime");
        currentSize = 82;
      } else {
        cursor.classList.remove("custom-cursor--view");
        currentSize = 10;
        if (isLimeBg) {
          cursor.classList.add("custom-cursor--lime");
        } else {
          cursor.classList.remove("custom-cursor--lime");
        }
      }
    }

    function updatePosition(x, y) {
      cursor.style.transform = "translate3d(" + (x - currentSize / 2) + "px, " + (y - currentSize / 2) + "px, 0)";
    }

    window.addEventListener("pointermove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }
      isView = checkCard(window.__activeHoverElement, mouseX, mouseY);
      isLimeBg = checkIsDarkOrBlue(mouseX, mouseY);
      updateCursorClasses();

      // Instant positioning when in dot mode: zero latency, pixel-perfect click accuracy
      if (!isView) {
        currX = mouseX;
        currY = mouseY;
        updatePosition(mouseX, mouseY);
      }
    }, { passive: true });

    window.addEventListener("canvashoverchange", (e) => {
      isView = checkCard(e.detail, mouseX, mouseY);
      isLimeBg = checkIsDarkOrBlue(mouseX, mouseY);
      updateCursorClasses();
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      isVisible = false;
      cursor.style.opacity = "0";
    });

    // Animation loop for smooth transition when in view mode (expanding to 82px)
    function loop() {
      if (isVisible && isView) {
        currX += (mouseX - currX) * 0.25;
        currY += (mouseY - currY) * 0.25;
        updatePosition(currX, currY);
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCursor);
  } else {
    initCursor();
  }
})();
