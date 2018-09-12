
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import styles from './login.css';

import title from '../../assets/common/title.png';
import title01 from '../../assets/common/title01.png';
import userLogin from '../../assets/login/USER-LOGIN.png';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.inputRef.input.focus();
    console.log(this.props, '登录')
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'login/success',
      payload: {
        loading: false
      }
    })
    console.log('%clogin卸载','color:red')
  }
  inputRef = undefined;
  componentDidUpdate() {
    setTimeout(() => this.loginSuccess(), 2000);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLoading(values);
      }
    });
  };
  onLoading = values => {
    this.setState({
      onLoading: true
    });
    this.props.dispatch({
      type: 'login/onLogin',
      payload: values
    });
  };
  onUserNameChange = e => {
    let username = e.target.value;
    username = username.trim();
    this.setState({
      username
    });
  };
  onPasswordChange = e => {
    let password = e.target.value;
    password = password.trim();
    this.setState({
      password
    });
    this.props.form.setFieldsValue({
      password
    });
  };

  loginSuccess() {
    if (this.props.isLogin && !this.props.hasError) {
      this.props.dispatch({
        type: 'login/success',
        payload: {
          loading: false
        }
      })
      router.push('/')
    } else if (this.props.hasError) {
      message.destroy();
      message.warning(this.props.errorMsg);
      this.props.dispatch({
        type: 'login/clearMsg'
      });
    }
    console.log('%clogin成功','color:red')
  }
  clearPassword = () => {
    this.setState({
      password: ''
    });
    this.props.form.setFieldsValue({
      password: ''
    });
  };
  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
        <div className={styles.title}>
          <div className={styles.line} />
          <div style={{ width: '68%', height: '30%', marginTop: '4.5%' }}>
            <img src={title} style={{ width: '100%' }} alt="" />
            <img src={title01} style={{ width: '60%' }} alt="" />
          </div>
          <div className={styles.line} />
        </div>
        <div className={styles.titleText}>
          {/* <img src={sologan_l} alt="" />
          <img src={sologan_r} alt="" /> */}
        </div>
        <div className={styles.content}>
          <img src={userLogin} className={styles.userImg} alt="" />
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem className={styles.loginlabel}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <div className={styles.loginPut}>
                  <Icon type="user" className={styles.icon} />
                  <Input placeholder=""
                    ref={c => (this.inputRef = c)}
                    suffix={this.state.username ? <Icon
                      type="check"
                      className={styles.userNameIcon}
                    /> : null}
                    onChange={this.onUserNameChange}
                  />
                </div>
              )}
            </FormItem>
            <FormItem className={styles.loginlabel} >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入正确的密码' }],
              })(
                <div className={styles.loginPut}>
                  <Icon type="lock" className={styles.icon} />
                  <Input
                    type="password"
                    value={this.state.password}
                    suffix={this.state.password ? <Icon
                      type="close-circle"
                      className={styles.closeIcon}
                      onClick={this.clearPassword}
                    /> : null}
                    onChange={this.onPasswordChange}
                  />
                </div>
              )}
            </FormItem>
            <FormItem style={{ width: '70%', margin: '0 auto' }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox className={styles.remeber}>记住密码</Checkbox>
              )}
            </FormItem>
            <Button loading={this.props.loading} type="primary" htmlType="submit" className={styles.loginButton}>
              登  录
              </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { ...login };
}

const mapPropsLogin = Form.create()(Login);

export default connect(mapStateToProps)(mapPropsLogin);
