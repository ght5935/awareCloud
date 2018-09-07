import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('F:/WorkNew/awareCloudWeb/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('F:/WorkNew/awareCloudWeb/src/models/login.js').default) });
app.model({ namespace: 'car', ...(require('F:/WorkNew/awareCloudWeb/src/pages/car/models/car.js').default) });
app.model({ namespace: 'house', ...(require('F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js').default) });
app.model({ namespace: 'people', ...(require('F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
