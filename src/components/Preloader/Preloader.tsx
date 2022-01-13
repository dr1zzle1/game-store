import { FC } from 'react'
const spinner = require('../../assets/spinner.gif');
let Preloader: FC = () => {
	return <img style={{
		position: 'fixed', height: '100px',
		left: "50%",
		top: "50%",
		transform: "translate(-50%,-50%)",
	}} src={spinner} alt="" />
};

export default Preloader;
