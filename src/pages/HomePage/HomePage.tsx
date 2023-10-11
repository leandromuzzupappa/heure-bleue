import './HomePage.scss';

import { useEffect, useState } from 'react';

import { Hero } from '../../components/Hero/Hero';

import homeHeroVideo from '../../assets/videos/home-hero-video.mp4';
import homeHeroImage from '../../assets/images/hero-background.jpg';

export const HomePage = () => {
  const [media, setMedia] = useState({
    type: 'video',
    src: homeHeroVideo,
  });

  useEffect(() => {
    if (Math.random() < 0.7) {
      setMedia({
        type: 'image',
        src: homeHeroImage,
      });
    }
  }, [media]);

  return (
    <>
      <Hero media={media} />
      <h2>Surtidas</h2>
    </>
  );
};
