import React, { PureComponent } from 'react';
import { message } from '../common/Message';

export default class Login extends PureComponent {

  render() {
    return (
      <div>
        <button
          onClick={() => {
            message('danger', '222222', () => {
              // console.log(1312312312);
            });
          }}
        >click</button>
        <p>登录页</p>
        <p>登录页</p>
        <p>登录页</p>
        <p>登录页</p>
        <p>登录页</p>
      </div>
    );
  }
}
