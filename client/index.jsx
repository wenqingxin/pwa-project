import * as React from 'react';
import ReactDOM from 'react-dom';
import Page from './page/index.jsx';
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
		.then(() => console.log('serverWorker注册成功'))
		.catch(err => console.error(err, 'serverWorker注册失败'))
}
ReactDOM.render(<Page />, document.getElementById('app'));