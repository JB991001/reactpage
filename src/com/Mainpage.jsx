import React, { useState, useEffect, useRef } from 'react';
import Menu from './Menu'
import '../style/Mainpage.scss';


const slides = [
  require('../img/img1.png'),
  require('../img/img2.png'),
  require('../img/img3.png'),
  require('../img/img4.png'),
  require('../img/img5.png')
];

const MainPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const disableScroll = (e) => e.preventDefault();
    window.addEventListener("wheel", disableScroll, { passive: false });

    return () => window.removeEventListener("wheel", disableScroll);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;

    const flowerImage = new Image();
    flowerImage.src = require('../img/petal.png');  

    let flowers = [];
    
    class Flower {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 15 + 10; 
        this.speed = Math.random() * 1 + 1;
        this.angle = Math.random() * 2 * Math.PI;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += Math.cos(this.angle) * 2;
        this.y += this.speed;

        if (this.y > canvasHeight) {
          this.y = -this.size;
          this.x = Math.random() * canvasWidth;
        }
      }

      draw() {
        ctx.drawImage(flowerImage, this.x, this.y, this.size, this.size);  
      }
    }

    const createFlowers = () => {
      for (let i = 0; i < 100; i++) {
        flowers.push(new Flower());
      }
    };

    const animateFlowers = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      flowers.forEach(flower => {
        flower.update();
        flower.draw();
      });
      requestAnimationFrame(animateFlowers);
    };

    createFlowers();
    animateFlowers();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let time = 0;
    const progressInterval = setInterval(() => {
      time += 100;
      setProgress((time / 5000) * 100);
    }, 100);

    const slideTimer = setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setProgress(0);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [slideIndex, isPaused]);

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    setProgress(0);
  };

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="main-page">
        <Menu />
      <canvas ref={canvasRef} className="falling-flowers-canvas" />
      
      <div 
        className="logo-box" 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? "Jae-beom Park" : "JB"}
      </div>
      <div className="kream-logo">
        <img src={require('../img/kream.png')} alt="Kream Logo" />
      </div>
      <div className="slide-show">
        <img 
          src={slides[slideIndex]} 
          alt={`슬라이드 ${slideIndex + 1}`} 
          key={slideIndex}
          className="fade-slide"
        />
      </div>

      {/* 삼성 슬라이드일 경우 추가 정보 박스 */}
      {slideIndex === 0 && (
        <div className="info-box">
          <p>평화는 유토피아적인 세계와 결핍된 현실 세계를 잇는 이상과 현실의 교차점</p>
          <a href="https://kream.co.kr/brands/peaceminusone" target="_blank" rel="noopener noreferrer">피마원 바로가기</a>
        </div>
      )}
            {slideIndex === 1 && (
        <div className="info-box">
          <p>Just Do It</p>
          <a href="https://kream.co.kr/brands/jordan" target="_blank" rel="noopener noreferrer">에어 조던 바로가기</a>
        </div>
      )}

      {slideIndex === 2 && (
        <div className="info-box">
          <p>스트릿 브랜드의 끝판왕</p>
          <a href="https://kream.co.kr/brands/supreme" target="_blank" rel="noopener noreferrer">슈프림 바로가기</a>
        </div>
      )}

      {slideIndex === 3 && (
        <div className="info-box">
          <p>Built Tough Worldwide Since 1980</p>
          <a href="https://kream.co.kr/brands/stussy" target="_blank" rel="noopener noreferrer">슈프림 바로가기</a>
        </div>
      )}

      {slideIndex === 4 && (
        <div className="info-box">
          <p>클럽 그 이상의 가치</p>
          <a href="https://kream.co.kr/brand-stores/FC%20BARCELONA" target="_blank" rel="noopener noreferrer">FC 바르셀로나 바로가기</a>
        </div>
      )}

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="controls">
        <button onClick={prevSlide}>〈</button>
        <button onClick={togglePause}>{isPaused ? '▶️' : '⏸️'}</button>
        <button onClick={nextSlide}>〉</button>
      </div>
    </div>
  );
};

export default MainPage;
