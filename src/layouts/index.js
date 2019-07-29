import React from 'react';
import { LocaleProvider } from 'antd';
import { connect } from 'dva';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
         {this.props.children}
      </LocaleProvider>
    );
  }
}


export default connect((state) => {
  return {
    pathname: state.routing.location.pathname,
    loading: state.login.loading
  }
})(BasicLayout)
