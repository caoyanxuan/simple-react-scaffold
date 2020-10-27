import React, { useState } from 'react';

const debounce = (callback, delay = 2000, immidiate = false) => {
  let t = null;

  return function () {
    const self = this;
    const args = arguments;

    t && clearTimeout(t);

    if (immidiate) {
      console.log('t', t);
      var doNow = !t;
      t = setTimeout(function(){
        t = null;
        console.log(12321)
      }, delay);

      if(doNow){
        callback.apply(self, args);
      }
      // !t && callback.apply(self, args);

      // t = setTimeout(() => {
      //   t = null;
      // }, delay);
    } else {
      t = setTimeout(() => {
        callback.apply(self, args);
      }, delay);
    }

  };
};

const throttle = (callback, delay = 2000) => {
  let t;
  let startTime = null;

  console.log('startTime', startTime);

  return function () {
    const self = this;
    const args = arguments;
    const now = +new Date;

    if (!startTime || now > startTime + delay) {
      console.log(1, startTime, now);
      startTime = now;
      callback.apply(self, args);
    } else {
      console.log(2);
      clearTimeout(t);
  
      t = setTimeout(() => {
        callback.apply(self, args);
      }, delay);
    }
  };
};

export default () => {
  const [num, setNum] = useState(0);
  const [step, setStep] = useState(0);

  return (
    <div>
      <div>
        num: {num} &nbsp;
        <button
          onClick={debounce(() => {
            setNum(i => ++i);
          }, 3000, true)}
        >debounce</button>
      </div>
      <div>
        step: {step} &nbsp;
        <button
          onClick={throttle(() => {
            setStep(i => ++i);
          })}
        >throttle</button>
      </div>
    </div>
  );
};