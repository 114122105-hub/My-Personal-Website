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

const HINGE_CONFIG = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 }
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const renderWhitespace = (value, key) =>
  value.split(/(\n)/).map((part, index) => {
    if (part === '\n') return React.createElement('br', { key: `${key}-br-${index}` });
    if (!part) return null;

    return React.createElement(
      'span',
      { className: 'fold-text-whitespace', key: `${key}-space-${index}` },
      part.replace(/ /g, '\u00A0')
    );
  });

function FoldText({
  text = 'Design unfolds',
  splitBy = 'char',
  hinge = 'top',
  duration = 0.65,
  stagger = 0.045,
  ease = 'power3.out',
  perspective = 700,
  creaseShading = 0.55,
  trigger = 'mount',
  fontSize = 80,
  fontWeight = 800,
  color = '#f7f2e8',
  className = '',
  style = {}
}) {
  const rootRef = React.useRef(null);
  const timelineRef = React.useRef(null);
  const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top;
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  const segments = React.useMemo(() => {
    let segmentIndex = 0;

    const renderSegment = (content, key, split = splitBy) => {
      segmentIndex += 1;
      return React.createElement(
        'span',
        {
          className: 'fold-text-segment',
          'data-fold-split': split,
          key,
          style: { '--fold-perspective': `${safePerspective}px` }
        },
        React.createElement(
          'span',
          {
            className: 'fold-text-piece',
            'data-fold-hinge': hinge,
            style: { transformOrigin: hingeConfig.origin, '--fold-crease': 0 }
          },
          content || '\u00A0'
        )
      );
    };

    if (splitBy === 'line') {
      return text.split('\n').map((line, index) => (
        React.createElement(
          'span',
          { className: 'fold-text-line', key: `line-${index}` },
          renderSegment(line || '\u00A0', `segment-line-${index}`, 'line')
        )
      ));
    }

    if (splitBy === 'word') {
      return text.split(/(\s+)/).flatMap((part, index) => {
        if (!part) return [];
        if (/^\s+$/.test(part)) return renderWhitespace(part, `ws-${index}`);
        return renderSegment(part, `segment-word-${segmentIndex}`);
      });
    }

    return Array.from(text).map((char, index) => {
      if (char === '\n') return React.createElement('br', { key: `br-${index}` });
      return renderSegment(char === ' ' ? '\u00A0' : char, `segment-char-${index}`);
    });
  }, [text, splitBy, hinge, hingeConfig.origin, safePerspective]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const pieces = Array.from(root.querySelectorAll('.fold-text-piece'));
    if (!pieces.length) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const activeDuration = reduceMotion ? Math.min(duration, 0.22) : duration;
    const activeStagger = reduceMotion ? Math.min(stagger, 0.02) : stagger;
    const fromVars = {
      opacity: 0,
      rotateX: reduceMotion ? 0 : hingeConfig.rotateX,
      rotateY: reduceMotion ? 0 : hingeConfig.rotateY,
      '--fold-crease': reduceMotion ? 0 : safeCrease,
      transformOrigin: hingeConfig.origin,
      force3D: true
    };
    const toVars = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      '--fold-crease': 0,
      duration: activeDuration,
      ease: reduceMotion ? 'power1.out' : ease,
      stagger: activeStagger,
      clearProps: 'willChange'
    };

    const killTimeline = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      gsap.killTweensOf(pieces);
    };

    const play = (repeat) => {
      killTimeline();
      timelineRef.current = gsap.timeline({ repeat: repeat ? -1 : 0, repeatDelay: repeat ? 0.75 : 0 });
      timelineRef.current.fromTo(pieces, fromVars, toVars);
      return timelineRef.current;
    };

    let scrollTrigger;
    let hoverHandler;

    if (trigger === 'hover') {
      gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0, transformOrigin: hingeConfig.origin });
      hoverHandler = () => play(false);
      root.addEventListener('mouseenter', hoverHandler);
    } else if (trigger === 'scroll') {
      gsap.set(pieces, fromVars);
      scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: 'top 82%',
        once: true,
        onEnter: () => play(false)
      });
    } else if (trigger === 'loop') {
      play(true);
    } else {
      play(false);
    }

    return () => {
      if (hoverHandler) root.removeEventListener('mouseenter', hoverHandler);
      scrollTrigger?.kill();
      killTimeline();
    };
  }, [
    text,
    splitBy,
    hinge,
    duration,
    stagger,
    ease,
    perspective,
    safeCrease,
    trigger,
    hingeConfig.origin,
    hingeConfig.rotateX,
    hingeConfig.rotateY
  ]);

  const rootStyle = {
    '--fold-text-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    '--fold-text-font-weight': fontWeight,
    '--fold-text-color': color,
    ...style
  };

  return React.createElement(
    'span',
    { ref: rootRef, className: `fold-text ${className}`.trim(), style: rootStyle },
    React.createElement('span', { className: 'fold-text-sr-only' }, text),
    React.createElement('span', { className: 'fold-text-visual', 'aria-hidden': 'true' }, segments)
  );
}

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function setMenuState(isOpen) {
    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = isOpen
      ? '<span class="material-symbols-outlined text-3xl">close</span>'
      : '<span class="material-symbols-outlined text-3xl">menu</span>';
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = !mobileMenu.classList.contains('is-open');
      setMenuState(isOpen);
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    document.addEventListener('click', function (event) {
      if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        setMenuState(false);
      }
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll("a[href^='#']");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const isActive = href === '#' + id;
      link.classList.toggle('active', isActive && link.classList.contains('mobile-nav-link'));
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(function (section) {
    observer.observe(section);
  });

  const heroRoot = document.getElementById('hero-fold-text');
  if (heroRoot) {
    const root = ReactDOM.createRoot(heroRoot);
    root.render(
      React.createElement(FoldText, {
        text: 'Architect of Intelligence',
        splitBy: 'char',
        hinge: 'top',
        trigger: 'scroll',
        duration: 0.65,
        stagger: 0.045,
        ease: 'power3.out',
        perspective: 700,
        creaseShading: 0.55,
        fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
        fontWeight: 800,
        color: '#adc6ff',
        className: 'font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-0'
      })
    );
  }

  const circularTextWrap = document.getElementById('circular-text-wrap');
  if (circularTextWrap && window.Motion) {
    const text = 'AI*SYSTEMS*ARCHITECT*';
    const letters = Array.from(text);

    const circular = document.createElement('div');
    circular.className = 'circular-text text-[10px] tracking-[0.4em] uppercase text-primary';

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      const rotationDeg = (360 / letters.length) * index;
      const factor = Math.PI / letters.length;
      const x = factor * index;
      const y = factor * index;
      const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
      span.textContent = letter;
      span.style.transform = transform;
      span.style.WebkitTransform = transform;
      circular.appendChild(span);
    });

    circularTextWrap.appendChild(circular);

    const animateSpin = (duration) => {
      window.Motion.animate(circular, { rotate: 360 }, {
        duration,
        ease: 'linear',
        repeat: Infinity
      });
    };

    animateSpin(20);

    circular.addEventListener('mouseenter', function () {
      window.Motion.animate(circular, { rotate: 360, scale: 1.05 }, {
        duration: 5,
        ease: 'linear',
        repeat: Infinity
      });
    });

    circular.addEventListener('mouseleave', function () {
      window.Motion.animate(circular, { rotate: 360, scale: 1 }, {
        duration: 20,
        ease: 'linear',
        repeat: Infinity
      });
    });
  }
});
