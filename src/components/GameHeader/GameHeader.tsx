import React from "react"
import Button from "../Button"
import { useGameContext } from "../Game"
import ScoresContainer from "../ScoresContainer"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import "./GameHeader.scss"

const GameTitle = () => <span className="gameTitle">SPACE 2048</span>

const GameDescription = () => {
	return (
		<div>
			<span>
				Play 2048 with <b>Spaceships</b>! <br />
				Connect wallet to mint score
			</span>
			<br />
			<ConnectButton label="connect!" />
		</div>
	)
}

export const GameHeader = () => {
	const { dispatch } = useGameContext()

	return (
		<div className="header">
			<div className="gameIntro">
				<GameTitle />
				<GameDescription />
			</div>
			<div className="actions">
				<ScoresContainer />
				<Button
					id="restartGameBtn"
					onClick={(_) => dispatch({ type: "restart" })}
				>
					New Game
				</Button>
			</div>
		</div>
	)
}
