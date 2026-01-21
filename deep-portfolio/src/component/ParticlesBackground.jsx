import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    const colors = [
      "rgba(255, 255, 255, 1)",
      "rgba(250, 204, 21, 1)", // yellow
      "rgba(156, 163, 175, 1)", // gray
    ];

 
    function drawStar(x, y, radius, points, inset, color, opacity) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.moveTo(0, 0 - radius);

      for (let i = 0; i < points; i++) {
        ctx.rotate(Math.PI / points);
        ctx.lineTo(0, 0 - radius * inset);
        ctx.rotate(Math.PI / points);
        ctx.lineTo(0, 0 - radius);
      }

      ctx.closePath();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1.5;
        this.points = 5;
        this.inset = 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;

        this.opacity = Math.random();
        this.blinkSpeed = Math.random() * 0.02 + 0.005;
        this.blinkDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

     
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

    
        this.opacity += this.blinkSpeed * this.blinkDirection;
        if (this.opacity >= 1 || this.opacity <= 0.2) {
          this.blinkDirection *= -1;
        }

        drawStar(
          this.x,
          this.y,
          this.radius,
          this.points,
          this.inset,
          this.color,
          this.opacity,
        );
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
