import { characterContext } from '../context/CharacterContext';
import * as React from 'react';
import styled from 'styled-components';
import Character from '../models/Character';
import ArmorGrid from './ArmorGrid';

const Saves = () => {
	const characterCtx = React.useContext(characterContext);
	const [save, setSave] = React.useState(null as number);
	const [btm, setBtm] = React.useState(null as number);

	const char = new Character();
	char.stats = characterCtx.character?.stats;
	char.wounds = characterCtx.character.wounds ?? 0;

	const Save = (
		<SaveWrapper>
			<SaveTitle>SAVE</SaveTitle>
			<SaveText>{char.stats?.body && char.getSave()}</SaveText>
		</SaveWrapper>
	);

	const Btm = (
		<BtmWrapper>
			<SaveTitle>BTM</SaveTitle>
			<SaveText>{char.stats?.body && char.getBTM()}</SaveText>
		</BtmWrapper>
	);

	return (
		<BottomBarWrapper>
			{Save}
			{Btm}
			<ArmorGrid />
		</BottomBarWrapper>
	);
};

export default Saves;

const BottomBarWrapper = styled.div`
	height: 170px;
	width: 100%;
	min-width: 500x;
	padding-top: 15px;
	bottom: 0;
	position: absolute;
	box-sizing: border-box;
`;

const SaveWrapper = styled.div`
	min-width: 100px;
	width: 20%;
	height: 170px;
	border: 1px solid #00ccff;
	bottom: 0;
	float: left;
	box-sizing: border-box;
`;

const SaveTitle = styled.div`
	border-bottom: 1px solid #00ccff;
	width: 100%;
	text-align: center;
`;

const SaveText = styled.div`
	font-size: 50px;
	width: 100%;
	text-align: center;
	margin-top: 40%;
`;
const BtmWrapper = styled(SaveWrapper)``;
