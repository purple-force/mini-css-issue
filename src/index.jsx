import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Loadable from 'react-loadable'; 

const Page1 = Loadable({
  loader: () => import('./page1.jsx'),
  loading: () => <div>loading</div>,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  }
});

const Page2 = Loadable({
  loader: () => import('./page2.jsx'),
  loading: () => <div>loading</div>,
  render(loaded, props) {
    const Component = loaded.default;
    return <Component {...props} />;
  }
});

ReactDOM.render(
  <Router>
    <Page1 path="/page1" />
    <Page2 path="/page2" />
  </Router>,
  document.getElementById('container')
);