import * as React from 'react';
import styled, { createGlobalStyle, css, AnyStyledComponent } from 'styled-components';
import Title from './title/Title';
import { useCharacter } from './hooks/useCharacter';
import { characterContext } from './context/CharacterContext';
import Stats from './stats/Stats';
import Saves from './saves/Saves';
import Skills from './skills/Skills';
import HealthBar from './health/Health';
import Inventory from './inventory/Inventory';
import Actions from './actions/Actions';
import { Cybernetics } from './cybernetics/Cybernetics';

export default () => {
	const character = useCharacter();

	const GlobalStyle = createGlobalStyle`


	html {
		height: 100%;
	}

	body {
		font-family: 'Source Code Pro', monospace;
		height: 100%;
		margin: 0;
	}

	body, input {
		background-color: #2e2e2e;
		color: #f7127d;
	}

	#app {
		height: 100%;
	}
	`;

	return (
		<>
			<GlobalStyle />
			<characterContext.Provider value={character}>
				<div
					style={{
						height: 'calc(100% - 2px)',
						display: 'grid',
						border: '1px solid blue',
						gridColumnStart: 1,
						gridTemplateColumns: 'minmax(508px, 535px) auto 25%',
						gridTemplateRows: '60px calc(50% - 60px) 60px calc(50% - 60px)'
					}}
				>
					<NeonBox style={{ gridArea: '1 / 1 / span 1 / span 3' }}>
						<Title />
					</NeonBox>

					<StatsWrapper>
						<div style={{ height: '100%', position: 'relative' }}>
							<Stats />
							<Saves />
						</div>
					</StatsWrapper>

					<NeonBox style={{ gridArea: '2 / 2 / span 1 / span 1' }}>
						<Actions />
					</NeonBox>
					<NeonBox style={{ gridArea: '3 / 1 / span 1 / span 2' }}>
						<HealthBar />
					</NeonBox>
					<InventoryWrapper component={Inventory} />
					<CyberneticWrapper component={Cybernetics} />
					<SkillsWrapper component={Skills} />
				</div>
			</characterContext.Provider>
		</>
	);
};

const NeonBoxStyle = css`
	padding: 4px;
	border: 1px solid #9fd2ff;
	box-shadow: 0 0 1px #9fd2ff, inset 0 0 1px #9fd2ff, 0 0 5px #08f, inset 0 0 5px #08f, 0 0 8px #08f, inset 0 0 8px #08f;
`;

const NeonChild = styled.div`
	&::before {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0 0 1px #9fd2ff, inset 0 0 1px #9fd2ff, 0 0 5px #08f, inset 0 0 5px #08f, 0 0 8px #08f,
			inset 0 0 8px #08f;
	}
`;

const NeonBox = styled.div`
	${NeonBoxStyle};
`;

const t = (
	<div>
		{styled.div`
			${NeonBoxStyle};
		`}
	</div>
);

interface WrapperProps {
	className?: string;
	component: () => JSX.Element;
}

const GenericWrapper = ({ className, component: Component }: WrapperProps) => (
	<div className={className}>
		<Component />
	</div>
);

const StatsWrapper = styled(NeonBox)`
	overflow: scroll;
	gridarea: 2 / 1 / span 1 / span 1;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const CyberneticWrapper = styled(GenericWrapper)`
	${NeonBoxStyle};
	overflow-y: scroll;
	grid-area: 4 / 2 / span 1 / span 1;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const SkillsWrapper = styled(GenericWrapper)`
	${NeonBoxStyle};
	grid-area: 2 / 3 / span 3 / span 1;
	overflow-y: scroll;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const InventoryWrapper = styled(GenericWrapper)`
	${NeonBoxStyle};
	grid-area: 4 / 1 / span 1 / span 1;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;
