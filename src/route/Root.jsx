/**
 * @author caoyx
 * @desc 路由（react-router4）
 */
import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../layout/header/Header';
import Index from '../components/index/Index';
import Login from '../components/login/Login';

export default class Root extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
