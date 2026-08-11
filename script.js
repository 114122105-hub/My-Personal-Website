tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#00a572",
        "tertiary-container": "#a078ff",
        "tertiary-fixed-dim": "#d0bcff",
        "on-primary-fixed-variant": "#004395",
        "error": "#ffb4ab",
        "surface-tint": "#adc6ff",
        "on-secondary-fixed": "#002113",
        "surface": "#0b1326",
        "tertiary-fixed": "#e9ddff",
        "primary-fixed-dim": "#adc6ff",
        "on-primary-fixed": "#001a42",
        "on-secondary-fixed-variant": "#005236",
        "surface-container-highest": "#2d3449",
        "inverse-surface": "#dae2fd",
        "on-background": "#dae2fd",
        "surface-container-high": "#222a3d",
        "on-surface": "#dae2fd",
        "inverse-on-surface": "#283044",
        "surface-dim": "#0b1326",
        "on-error-container": "#ffdad6",
        "on-secondary-container": "#00311f",
        "on-tertiary-container": "#340080",
        "surface-container": "#171f33",
        "primary-container": "#4d8eff",
        "inverse-primary": "#005ac2",
        "surface-variant": "#2d3449",
        "secondary-fixed-dim": "#4edea3",
        "on-error": "#690005",
        "background": "#0b1326",
        "primary-fixed": "#d8e2ff",
        "surface-container-low": "#131b2e",
        "secondary-fixed": "#6ffbbe",
        "secondary": "#4edea3",
        "outline-variant": "#424754",
        "surface-bright": "#31394d",
        "on-secondary": "#003824",
        "primary": "#adc6ff",
        "outline": "#8c909f",
        "on-primary": "#002e6a",
        "tertiary": "#d0bcff",
        "surface-container-lowest": "#060e20",
        "on-surface-variant": "#c2c6d6",
        "on-tertiary-fixed-variant": "#5516be",
        "on-tertiary": "#3c0091",
        "on-tertiary-fixed": "#23005c",
        "on-primary-container": "#00285d",
        "error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        unit: "4px",
        "max-width": "1280px",
        "margin-desktop": "64px",
        gutter: "24px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        "display-lg-mobile": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "display-lg": ["Hanken Grotesk"],
        "code-sm": ["Geist"],
        "label-caps": ["Geist"],
        "body-md": ["Hanken Grotesk"]
      },
      fontSize: {
        "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "800" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "code-sm": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector("[data-menu-button]");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      alert("Mobile menu is not enabled in this demo.");
    });
  }
});
