/**
 * @author caoyx
 * @desc 框架头部
 */
import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        };
    }

    handleRender = e => {
        // 只是为了re-render一下。 ps：没有写到route里，所以不会触发卸载-重新渲染（回流），这里手动触发re-render（重绘），消耗更小
        this.setState({
            current: e.target.getAttribute('href')
        });
    };

    render() {
        return (
            <nav onClick={this.handleRender} data-active={this.state.current}>
                <NavLink to="/" exact activeClassName="nav-active">
                    首页
                </NavLink>
                <NavLink to="/login" activeClassName="nav-active">
                    登录
                </NavLink>
            </nav>
        );
    }
}
