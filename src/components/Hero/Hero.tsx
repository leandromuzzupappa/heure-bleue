import './Hero.scss';

import LogoIcon from '../../assets/images/logo.svg?react';
import LogoLeft from '../../assets/images/hero-logo-left.svg?react';
import LogoRight from '../../assets/images/hero-logo-right.svg?react';
import homeHeroVideo from '../../assets/videos/home-hero-video.mp4';

export const Hero = () => {
  return (
    <section className="home-hero">
      <video
        className="home-hero--video"
        autoPlay
        muted
        loop
        playsInline
        src={homeHeroVideo}
      />
      <LogoIcon />
      <div className="home-hero--logos">
        <LogoLeft />
        <LogoRight />
      </div>
      <div className="home-hero--overlay"></div>
    </section>
  );
};
