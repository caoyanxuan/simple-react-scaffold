import './index.scss';
import React, { PureComponent } from 'react';
import LOGO from '../../images/caoyx.png';
import { testHttp } from '../../services/test';

export default class Test extends PureComponent {
    handleClick = () => {
        const params1 = {
            username: 'admin',
            password: '111111'
        };
        testHttp(params1)
            .then(res => {
                /* eslint-disable */
                console.log('res', res);
                /* eslint-enable */
            })
            .catch(err => {
                /* eslint-disable */
                console.log('err', err);
                /* eslint-enable */
            });
    };

    render() {
        return (
            <div className="hello">
                <img src={LOGO} alt="LOGO" />
                <div>hello world!</div>
                {/* <div onClick={this.handleClick}>点一下</div> */}
            </div>
        );
    }
}
