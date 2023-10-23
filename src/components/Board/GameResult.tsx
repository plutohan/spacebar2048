// @ts-nocheck

import React, { useEffect, useState } from "react"
import Button from "../Button"
import { useGameContext } from "../Game"
import { GameStatus, Tile } from "../interfaces"
import { useGameScores } from "../ScoresContainer/ScoresContainer"
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi"
import { scoreAbi, scoreContractAddress } from "../../constants/constants"

const DATA = {
	WIN: {
		message: "Congratulations! You Win!",
		buttonText: "Play again",
		containerClass: "gameResultWin",
	},
	GAME_OVER: {
		message: "Game Over!",
		buttonText: "Try again",
		containerClass: "gameResultLose",
	},
}

const Result = (props: {
	isWin: boolean
	onContinue: () => void
	onRestart: () => void
	playAfterWin: boolean
	status: GameStatus
	score: number
}) => {
	const { address } = useAccount()
	const { isWin, onContinue, onRestart, playAfterWin, score } = props

	const { message, buttonText, containerClass } =
		isWin || playAfterWin ? DATA.WIN : DATA.GAME_OVER

	const { data, isLoading, isSuccess, write } = useContractWrite({
		address: scoreContractAddress,
		abi: scoreAbi,
		functionName: "submitScore",
	})

	const [name, setName] = useState("")
	const recordScore = () => {
		if (!isLoading) {
			write({
				args: [name, score],
			})
		}
	}

	useEffect(() => {
		if (data?.hash) {
			onRestart()
		}
	}, [data])

	if (!score) return <></>
	return (
		<div className={`gameResult ${containerClass}`}>
			<p>{message}</p>
			<div>
				{/* {isWin && (
					<Button
						className="continueButton"
						onClick={() => onContinue()}
					>
						Continue
					</Button>
				)} */}
				<Button onClick={() => onRestart()}>{buttonText}</Button>
				{address ? (
					<div className="sendScore">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="enter your name"
							type="text"
						/>
						<Button disabled={!name} onClick={recordScore}>
							Record score!
						</Button>
					</div>
				) : (
					<div className="sendScore">
						Connect wallet to record score
					</div>
				)}
			</div>
		</div>
	)
}

const GameResultContainer = (props: { tiles: Tile[] }) => {
	const { gameState, dispatch } = useGameContext()

	const { status } = gameState

	const [scores] = useGameScores()

	const handleContinue = () => {
		dispatch({ type: "continue" })
	}

	const handleRestart = () => {
		dispatch({ type: "restart" })
	}

	const playAfterWin = props.tiles.some((x) => x.value === 2048)
	return (
		<>
			{status !== "IN_PROGRESS" && status !== "PLAY_AFTER_WIN" && (
				<Result
					score={scores.score}
					isWin={status === "WIN"}
					playAfterWin={playAfterWin}
					onRestart={handleRestart}
					onContinue={handleContinue}
					status={status}
				/>
			)}
		</>
	)
}

export default GameResultContainer
