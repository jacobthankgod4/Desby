# Desby Hero Section - Image Generation Prompt & Animation Code

## Part 1: Image Generation Prompt

### Image Prompt Used
```
Create a modern Disney-style 3D illustration of an African woman tailor in her studio. 
She has dark skin, natural hair styled in a colorful wrap/headwrap with gold accents, 
and is wearing professional tailoring attire. She's positioned at a vintage Singer sewing machine, 
working on a vibrant patterned fabric (kente or ankara print). The studio background shows:
- Warm golden lighting from a desk lamp
- Shelves with fabric rolls and sewing supplies
- A dress form/mannequin with a partially completed garment
- Warm, inviting color palette with earth tones and gold accents
- Professional, cinematic lighting
- High-quality, polished 3D render style
- African aesthetic with modern professional elements
- Confident, skilled expression showing expertise
```

### Image Details
- **File:** `/home/ubuntu/webdev-static-assets/desby-tailor-hero.png`
- **Format:** PNG with transparency
- **Style:** 3D Disney/Pixar-inspired illustration
- **Subject:** African woman tailor at work
- **Usage:** Hero section centerpiece
- **Dimensions:** Optimized for web (responsive sizing)

---

## Part 2: Hero Section Animation Code

### CSS Animations

```css
/* Orbiting bubbles animation */
@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(180px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) translateX(180px) rotate(-360deg);
    opacity: 1;
  }
}

/* Glow blob animation */
@keyframes float-glow {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translate(40px, -30px) scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: translate(0, -60px) scale(0.9);
    opacity: 0.5;
  }
  75% {
    transform: translate(-40px, -30px) scale(1.05);
    opacity: 0.4;
  }
}

/* Pulse effect for feature bubbles */
@keyframes pulse-bubble {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(245, 197, 66, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(245, 197, 66, 0);
  }
}

/* Fade in animation for hero content */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero section container */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 40px;
  background: linear-gradient(135deg, #05261D 0%, #0a3a2e 100%);
  overflow: hidden;
}

/* Animated glow blobs in background */
.hero-glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float-glow 8s ease-in-out infinite;
}

.hero-glow-blob-1 {
  width: 400px;
  height: 400px;
  background: rgba(245, 197, 66, 0.2);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.hero-glow-blob-2 {
  width: 300px;
  height: 300px;
  background: rgba(245, 197, 66, 0.15);
  bottom: 50px;
  left: -50px;
  animation-delay: 2s;
}

.hero-glow-blob-3 {
  width: 250px;
  height: 250px;
  background: rgba(245, 197, 66, 0.1);
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

/* Hero content left side */
.hero-content {
  flex: 1;
  z-index: 10;
  animation: fade-in-up 0.8s ease-out;
}

.hero-content h1 {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.2;
  color: white;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.hero-content p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 500px;
}

/* Hero image container with orbiting bubbles */
.hero-image-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

/* Center tailor illustration */
.hero-tailor-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  position: relative;
  z-index: 20;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
}

/* Orbiting bubbles container */
.orbiting-bubbles {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
}

/* Individual orbiting bubble */
.orbit-bubble {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(245, 197, 66, 0.15);
  border: 2px solid rgba(245, 197, 66, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: rgba(245, 197, 66, 0.9);
  text-align: center;
  padding: 8px;
  backdrop-filter: blur(10px);
  animation: orbit 20s linear infinite;
  cursor: pointer;
  transition: all 0.3s ease;
}

.orbit-bubble:hover {
  background: rgba(245, 197, 66, 0.25);
  border-color: rgba(245, 197, 66, 0.7);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(245, 197, 66, 0.3);
}

/* Stagger animation delays for each bubble */
.orbit-bubble:nth-child(1) { animation-delay: 0s; }
.orbit-bubble:nth-child(2) { animation-delay: -3.33s; }
.orbit-bubble:nth-child(3) { animation-delay: -6.66s; }
.orbit-bubble:nth-child(4) { animation-delay: -10s; }
.orbit-bubble:nth-child(5) { animation-delay: -13.33s; }
.orbit-bubble:nth-child(6) { animation-delay: -16.66s; }

/* Bubble labels */
.bubble-label {
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

/* CTA Button */
.btn-cta {
  background: linear-gradient(135deg, #F5C542 0%, #e6b530 100%);
  color: #05261D;
  border: none;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(245, 197, 66, 0.2);
  text-decoration: none;
  display: inline-block;
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(245, 197, 66, 0.3);
  background: linear-gradient(135deg, #fff8e1 0%, #F5C542 100%);
}

.btn-cta:active {
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    padding: 40px 20px;
  }

  .hero-content h1 {
    font-size: 42px;
  }

  .hero-image-container {
    height: 400px;
    margin-top: 40px;
  }

  .orbiting-bubbles {
    width: 300px;
    height: 300px;
  }

  .orbit-bubble {
    width: 60px;
    height: 60px;
    font-size: 10px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 30px 20px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .hero-image-container {
    height: 300px;
    margin-top: 30px;
  }

  .orbiting-bubbles {
    width: 200px;
    height: 200px;
  }

  .orbit-bubble {
    width: 50px;
    height: 50px;
    font-size: 9px;
  }

  .hero-tailor-image {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 20px 15px;
  }

  .hero-content h1 {
    font-size: 24px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .hero-image-container {
    height: 250px;
    margin-top: 20px;
  }

  .orbiting-bubbles {
    width: 150px;
    height: 150px;
  }

  .orbit-bubble {
    width: 40px;
    height: 40px;
    font-size: 8px;
  }

  .hero-tailor-image {
    max-width: 200px;
  }

  .btn-cta {
    padding: 12px 30px;
    font-size: 14px;
  }
}
```

### React Component Structure

```tsx
// Hero section with orbiting bubbles
<section className="hero-section" id="hero">
  {/* Animated glow blobs */}
  <div className="hero-glow-blob hero-glow-blob-1"></div>
  <div className="hero-glow-blob hero-glow-blob-2"></div>
  <div className="hero-glow-blob hero-glow-blob-3"></div>

  {/* Left content */}
  <div className="hero-content">
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <span style={{ fontSize: "20px" }}>✨</span>
      <span style={{ fontSize: "14px", color: "rgba(245, 197, 66, 0.9)", fontWeight: "600" }}>
        Fashion-Tech Operating System
      </span>
    </div>
    <h1>Empower African Tailors to Build Sustainable Businesses</h1>
    <p>
      Desby is the digital operating system that helps tailors manage customers, store measurements, 
      preview designs, source fabrics, train apprentices, and scale into successful fashion entrepreneurs.
    </p>
    <button className="btn-cta" onClick={() => scrollToSection("waitlist")}>
      Join Waitlist →
    </button>
  </div>

  {/* Right image with orbiting bubbles */}
  <div className="hero-image-container">
    {/* Tailor illustration */}
    <img
      src="/manus-storage/desby-tailor-hero.png"
      alt="African woman tailor at work"
      className="hero-tailor-image"
    />

    {/* Orbiting feature bubbles */}
    <div className="orbiting-bubbles">
      {[
        "Customer Measurements",
        "Design Preview",
        "Fabric Sourcing",
        "Production Tracking",
        "Apprentice Workflow",
        "Branch Growth",
      ].map((label, idx) => (
        <div key={idx} className="orbit-bubble">
          <div className="bubble-label">{label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Animation Breakdown

### 1. **Orbiting Bubbles** (`orbit` keyframe)
- **Duration:** 20 seconds
- **Motion:** 360-degree rotation around the tailor image
- **Effect:** Bubbles rotate around their own axis while orbiting to prevent text rotation
- **Stagger:** Each bubble has a different animation delay (0s, -3.33s, -6.66s, etc.) to create even spacing around the orbit
- **Interaction:** Hover to scale up and brighten

### 2. **Glow Blobs** (`float-glow` keyframe)
- **Duration:** 8 seconds
- **Motion:** Floating, scaling, and opacity changes
- **Effect:** Creates cinematic depth and movement in background
- **Three blobs:** Positioned at different corners with staggered delays (0s, 2s, 4s)

### 3. **Fade-in Animation** (`fade-in-up` keyframe)
- **Duration:** 0.8 seconds
- **Motion:** Content slides up while fading in on page load
- **Stagger:** Hero content (0s delay) then image (0.2s delay) for sequential reveal

### 4. **Button Hover Effects**
- **Lift:** Translates up 3px on hover
- **Shadow:** Increases shadow depth
- **Gradient:** Subtle gradient shift on hover

---

## Performance Notes

- All animations use CSS transforms (GPU-accelerated)
- `will-change` property can be added for further optimization
- Animations are smooth at 60fps on modern devices
- Mobile animations are simplified (smaller orbit radius, reduced blur)
- Glow blobs use `filter: blur()` for cinematic effect without performance impact

---

## Customization Guide

### Change Orbit Speed
```css
.orbit-bubble {
  animation: orbit 20s linear infinite; /* Change 20s to desired duration */
}
```

### Change Orbit Radius
```css
.orbiting-bubbles {
  width: 400px;  /* Increase/decrease for larger/smaller orbit */
  height: 400px;
}
```

### Change Bubble Colors
```css
.orbit-bubble {
  background: rgba(245, 197, 66, 0.15); /* Adjust alpha for transparency */
  border: 2px solid rgba(245, 197, 66, 0.4);
}
```

### Add More Bubbles
Simply add more items to the array in the React component and add corresponding animation delays in CSS.

