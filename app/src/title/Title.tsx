import * as React from 'react';
import { characterContext } from '../context/CharacterContext';
import styled from 'styled-components';
import Character from '../models/Character';
import { exportCharacter, importCharacter as getCharacter } from '../services/characterIOService';

const Title = () => {
	const characterCtx = React.useContext(characterContext);

	const onCloseButtonClick = () => {
		if (confirm('This will remove your loaded data, are you sure you want to continue?')) {
			characterCtx.setCharacter({} as Character);
		}
	};

	const onEditButtonClick = () => characterCtx.toggleEditable(characterCtx.editable);

	const onHeadingValueChange = (e: any, key: string) =>
		characterCtx.setCharacter({ ...characterCtx.character, [key]: e.target.value });

	const onExportClick = () => exportCharacter(characterCtx.character);

	const onImportChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		const json = await file.text();
		const character = getCharacter(json);
		characterCtx.setCharacter(character);
	};

	const fields = (
		<>
			<Heading>HANDLE: </Heading>
			<BoldHeading>{characterCtx.character?.name}</BoldHeading>
			<Heading>ROLE: </Heading>
			<BoldHeading>{characterCtx.character?.role}</BoldHeading>
		</>
	);

	const editableFields = (
		<>
			<Heading>HANDLE: </Heading>
			<Input value={characterCtx.character?.name} onChange={(e) => onHeadingValueChange(e, 'name')} />
			<Heading>ROLE: </Heading>
			<Input value={characterCtx.character?.role} onChange={(e) => onHeadingValueChange(e, 'role')} />
		</>
	);

	const titleBar = (
		<TitleBar>
			<Heading> CCCP </Heading>
			{characterCtx.editable ? editableFields : fields}
			<Button onClick={onCloseButtonClick}>Close</Button>
			<Button onClick={onExportClick}>Export</Button>
			<FileLabel>
				<FileInput type="file" accept=".json" onChange={onImportChange} />
				Import
			</FileLabel>
			<Button onClick={onEditButtonClick}>{characterCtx.editable ? 'Finish' : 'Edit'}</Button>
		</TitleBar>
	);

	return titleBar;
};

export default Title;

const TitleBar = styled.div`
	color: #fff;
	text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #ff0080, 0 0 8px #ff0080, 0 0 16px #ff0080, 0 0 32px #ff0080;
	width: 100%;
	height: 60px;
`;

const Button = styled.button`
	float: right;
	cursor: pointer;
`;

const Heading = styled.h1`
	float: left;
	margin-left: 40px;
	padding-right: 5px;
	height: 100%;
	vertical-align: middle;
	font-size: 24px;
	font-weight: normal;
	white-space: nowrap;
	overflow: visible;
	text-overflow: ellipsis;
`;

const BoldHeading = styled(Heading)`
	font-weight: bold;
	margin-left: 0;
`;

const Input = styled.input`
	float: left;
	width: auto;
	max-width: 25%;
	font-size: 42px;
	background-color: #2e2e2e;
	border-color: #00ffff;
	margin: auto;
	color: #00ccff;
`;

const FileInput = styled.input`
	display: none;
`;

const FileLabel = styled.label`
	float: right;
	cursor: pointer;
	-webkit-appearance: button;
	-webkit-writing-mode: horizontal-tb !important;
	writing-mode: horizontal-tb !important;
	text-rendering: auto;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	letter-spacing: normal;
	word-spacing: normal;
	text-transform: none;
	text-indent: 0px;
	text-shadow: none;
	text-align: center;
	align-items: flex-start;
	cursor: default;
	background-color: rgb(239, 239, 239);
	box-sizing: border-box;
	margin: 0em;
	font: 400 13.3333px Arial;
	padding: 1px 6px;
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
`;
