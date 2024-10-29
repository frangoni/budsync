import React from 'react';
import Bud from '../_shared/assets/webp/bud.webp';
import { StyledBud } from './styles';
import { CenteredWrapper } from '../_shared/components/Layout/styles';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<CenteredWrapper>
			<h1>404</h1>
			<StyledBud src={Bud} alt='Bud smoking joint' />
			<p>The page you are looking is not available</p>
			<div className='spacer-24'></div>
			<Button onClick={() => navigate(-1)}>Go back</Button>
		</CenteredWrapper>
	);
}
