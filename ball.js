class Ball {
  constructor(x, y, radius, color, trackX = null, isTracking = false) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color || 'magenta';
      this.vx = 0;
      this.vy = 0;

      // Tracking properties for simulation
      this.trackX = trackX;
      this.isTracking = isTracking;
   }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    update(obstacles, sinks) {
      this.vy = this.vy + gravity;
      this.x += this.vx;
      this.y += this.vy;
  
      // Collisions
      obstacles.forEach(obstacle => {
        const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
        if (dist < pad(this.radius + obstacle.radius)) {
          const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
          const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
          this.vx = Math.cos(angle) * speed * horizontalFriction;
          this.vy = Math.sin(angle) * speed * verticalFriction;
  
          const overlap = this.radius + obstacle.radius - unpad(dist);
          this.x += pad(Math.cos(angle) * overlap);
          this.y += pad(Math.sin(angle) * overlap);
        }
      });
     for (let i = 0; i < sinks.length; i++) {
        const sink = sinks[i];
        if (
          unpad(this.x) > sink.x - sink.width / 2 &&
          unpad(this.x) < sink.x + sink.width / 2 &&
          unpad(this.y) + this.radius > sink.y - sink.height / 2
        ) {
          this.vx = 0;
          this.vy = 0;
          this.toRemove = true;
          if (this.isTracking && typeof this.trackX === 'number') {
            xHitsPerSink[i].push(this.trackX);  // Log x for sink i
          }          
          break;
        }
      }
    }
  }
  