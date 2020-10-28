/**
 * @author caoyx
 * @desc 路由（react-router4）
 */
import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../layout/header/Header';
import Index from '../components/index/Index';
import Login from '../components/login/Login';
import Adjoin from '../components/demos/Adjoin';
import Debounce from '../components/demos/Debounce';
import ParticleMoving from '../components/demos/ParticleMoving';
import SvgPathMoving from '../components/demos/SvgPathMoving';

export default class Root extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/adjoin" component={Adjoin} />
            <Route exact path="/debounce" component={Debounce} />
            <Route exact path="/particle-moving" component={ParticleMoving} />
            <Route exact path="/svg-path-moving" component={SvgPathMoving} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
