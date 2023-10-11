import './Hero.scss';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import LogoIcon from '../../assets/images/logo.svg?react';
import LogoLeft from '../../assets/images/hero-logo-left.svg?react';
import LogoRight from '../../assets/images/hero-logo-right.svg?react';

interface HeroProps {
  media: {
    type: string;
    src: string;
  };
}

export const Hero = ({ media }: HeroProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoLeftRef = useRef<HTMLSpanElement>(null);
  const logoRightRef = useRef<HTMLSpanElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);

  const padding = 32;

  useEffect(() => {
    const overlay = overlayRef.current;
    const logoLeft = logoLeftRef.current;
    const logoRight = logoRightRef.current;
    const heroText = heroTextRef.current;

    if (!overlay || !logoLeft || !logoRight || !heroText) return;

    const tl = gsap.timeline({ paused: true });

    const config = {
      ease: 'power3.out',
      duration: 2,
      delay: 0.3,
    };

    // slide in logo
    tl.fromTo(
      [logoLeft, logoRight],
      {
        y: 100,
        ...config,
      },
      {
        y: 0,
      },
    );

    // split logos
    tl.to(logoLeft, {
      x: -logoLeft.offsetLeft + padding,
      ...config,
    }).to(
      logoRight,
      {
        x:
          window.innerWidth -
          logoRight.offsetLeft -
          logoRight.offsetWidth -
          padding,
        ...config,
      },
      '<-0.3',
    );

    // fade out overlay
    tl.to(
      overlay,
      {
        opacity: 0.2,
        '--bleu': '#2e3a40',
        ...config,
      },
      '<-.3',
    );

    // fade in text
    tl.to(
      heroText,
      {
        opacity: 1,
        ease: 'power2.in',
        duration: 1,
      },
      '<-.3',
    );

    tl.play();

    window.addEventListener('resize', onResize);

    return () => {
      tl.kill();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = () => {
    const logoLeft = logoLeftRef.current;
    const logoRight = logoRightRef.current;

    if (!logoLeft || !logoRight) return;

    gsap.set(logoLeft, {
      x: -logoLeft.offsetLeft + padding,
    });

    gsap.set(logoRight, {
      x:
        window.innerWidth -
        logoRight.offsetLeft -
        logoRight.offsetWidth -
        padding,
    });
  };

  const renderMedia = () => {
    if (media.type === 'image') {
      return <img className="home-hero--image" src={media.src} alt="" />;
    }

    return (
      <video
        className="home-hero--video"
        autoPlay
        muted
        loop
        playsInline
        src={media.src}
      />
    );
  };

  return (
    <section className="home-hero">
      {renderMedia()}

      <p className="home-hero--name" ref={heroTextRef}>
        Nous racontons des histoires merveilleuses avec la lumière.
      </p>

      <LogoIcon />
      <div className="home-hero--overlay" ref={overlayRef}></div>
      <div className="home-hero--logos">
        <span ref={logoLeftRef}>
          <LogoLeft />
        </span>
        <span ref={logoRightRef}>
          <LogoRight />
        </span>
      </div>
    </section>
  );
};
