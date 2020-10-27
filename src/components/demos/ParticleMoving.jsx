import React, { useEffect, useRef } from 'react';
import { times } from "lodash";

var opt = {
    particleAmount: 30,     //粒子个数
    defaultRadius: 2,           //粒子半径
    defaultSpeed: .5,        //粒子运动速度
    minDistance: 100,            //粒子之间连线的最小距离
    color: "rgb(245,245,245)",       //粒子的颜色
};

class Particle {
  constructor(w, h, ctx) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opt.defaultSpeed * (1 + Math.random());
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opt.color ;
    this.radius = opt.defaultRadius * (1 + Math.random());
    this.vector = {
        x: this.speed * Math.cos(this.directionAngle),       //粒子在x轴的速度
        y: this.speed * Math.sin(this.directionAngle)        //粒子在y轴的速度
    }

    this.update = this.update.bind(this);
    this.border = this.border.bind(this);
    this.draw = this.draw.bind(this);
  }
  
  update() {                   //粒子的更新函数
    this.border();                          //判断粒子是否到了边界
    this.x += this.vector.x;                //粒子下一时刻在x轴的坐标
    this.y += this.vector.y;                //粒子下一时刻在y轴的坐标
  }

  border() {               //判断粒子是都到达边界
    if(this.x >= this.w || this.x<= 0){      //如果到达左右边界，就让x轴的速度变为原来的负数
        this.vector.x *= -1;
    }
    if(this.y >= this.h || this.y <= 0){     //如果到达上下边界，就让y轴的速度变为原来的负数
        this.vector.y *= -1;
    }
    if(this.x > this.w){                     //下面是改变浏览器窗口大小时的操作，改变窗口大小后有的粒子会被隐藏，让它显示出来即可
        this.x = this.w;
    }
    if(this.y > this.h){
        this.y = this.h;
    }
    if(this.x < 0){
        this.x = 0;
    }
    if(this.y < 0){
        this.y = 0;
    }
  }

  draw() {                 //绘制粒子的函数
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius ,0 ,Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

export default () => {
  let w = 500;
  let h = 500;
  const line = opt.color.match(/\d+/g);

  console.log('line', line)

  const cvsRef = useRef(null);

  useEffect(() => {
    const crt = cvsRef.current;

    if (crt) {
      const ctx = crt.getContext("2d");
      const particles = times(opt.particleAmount, () => new Particle(w, h, ctx));

      function drawLine(point, hub){
        for(let i = 0; i < hub.length; i++){
            let distance = getDistance(point,hub[i]);
            let opacity = 1 - distance / opt.minDistance;

            if(opacity > 0){
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = "rgba("+line[0]+","+line[1]+","+line[2]+","+opacity+")";
                ctx.beginPath();
                ctx.moveTo(point.x,point.y);
                ctx.lineTo(hub[i].x,hub[i].y);
                ctx.closePath();
                ctx.stroke();
            }
        }
      }

      function getDistance(point1, point2){
        return Math.sqrt(Math.pow(point1.x - point2.x,2) + Math.pow(point1.y - point2.y ,2));
      }
    
      function loop(){
        ctx.clearRect(0, 0, w, h);

        for(let i = 0; i < particles.length; i++){
          particles[i].update();
          particles[i].draw();
        }

        for(let i = 0; i < particles.length; i++){
          drawLine(particles[i], particles)
        }
        
        window.requestAnimationFrame(loop);
      }

      // function getSize(){
      //   w = crt.width;
      //   h = crt.height;
      // }

      // getSize();
      loop();

      // window.addEventListener("resize",function(){
      //   winResize()
      // }, false);

      // let tid;
  
      // function winResize(){
      //     clearTimeout(tid);
      //     tid = setTimeout(function(){
      //       getSize();
      //     }, 200);
      // }
    }
  }, []);

  return (
    <canvas id="particle" ref={cvsRef} width={w} height={h}/>
  );
};