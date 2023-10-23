import React from "react"
import { isMobile } from "../../utils/utils"
import { SectionProps } from "./Interfaces"
import { useContractRead } from "wagmi"
import { scoreAbi, scoreContractAddress } from "../../constants/constants"

import "./GameFooter.scss"
import Timer from "../Timer/Timer"

const Section = (props: SectionProps) => {
	return (
		<div id={props.id}>
			<h3>{props.title}</h3>
			{props.children}
			{props.bottomSeparator ? <hr /> : null}
		</div>
	)
}

const GameRules = () => {
	const text = isMobile(navigator.userAgent || navigator.vendor)
		? "Swipe with your fingers to move the numbers."
		: "Use your arrow keys to move the numbers."

	return (
		<Section id="howToPlaySection" title="HOW TO PLAY" bottomSeparator>
			<p>
				{text} The same numbers will merge into one when they touch.
				After each move, a new number (either <strong>2</strong> or{" "}
				<strong>4</strong>) is generated at a random empty position.
				Merge the numbers and build a 2048 tile to <strong>WIN</strong>{" "}
				the game!
			</p>
			<p>
				If you want to record your score, connect your wallet and send a
				transaction. You will need <strong>Goerli</strong> (Ethereum
				testnet) ETH. You can get free Goerli ETH from{" "}
				<a
					href="https://goerlifaucet.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					goerlifaucet.com
				</a>{" "}
				or from{" "}
				<a
					href="https://goerli-faucet.pk910.de/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Goerli PoW Faucet
				</a>
				. It may take some time for your score to reflect on the
				leaderboard.
			</p>
		</Section>
	)
}

function maskAddress(address: string): string {
	if (address.length < 8) {
		// Handle edge case where address is too short
		return address
	}

	const start = address.substr(0, 4)
	const end = address.substr(-4)

	return `${start}...${end}`
}

const TopTen = () => {
	const { data, isError, isLoading } = useContractRead({
		address: scoreContractAddress,
		abi: scoreAbi,
		functionName: "getTop10Scores",
	})

	return (
		<Section title="Top 10 Scores" bottomSeparator>
			{data && (
				<table className="top">
					<thead>
						<tr>
							<th>Rank</th>
							<th>Player Name</th>
							<th>Address</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{(
							data as Array<{
								playerAddress: string
								playerName: string
								playerScore: bigint
							}>
						).map((entry, index) => {
							if (entry.playerName)
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{entry.playerName}</td>
										<td>
											{maskAddress(entry.playerAddress)}
										</td>
										<td>{entry.playerScore.toString()}</td>{" "}
										{/* Convert BigInt to string */}
									</tr>
								)
						})}
					</tbody>
				</table>
			)}
		</Section>
	)
}

const WorstTen = () => {
	const { data, isError, isLoading } = useContractRead({
		address: scoreContractAddress,
		abi: scoreAbi,
		functionName: "getWorst10Scores",
	})

	return (
		<Section title="Worst 10 Scores" bottomSeparator>
			{data && (
				<table className="top">
					<thead>
						<tr>
							<th>Rank</th>
							<th>Player Name</th>
							<th>Address</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{(
							data as Array<{
								playerAddress: string
								playerName: string
								playerScore: bigint
							}>
						).map((entry, index) => {
							if (entry.playerName)
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{entry.playerName}</td>
										<td>
											{maskAddress(entry.playerAddress)}
										</td>
										<td>{entry.playerScore.toString()}</td>{" "}
										{/* Convert BigInt to string */}
									</tr>
								)
						})}
					</tbody>
				</table>
			)}
		</Section>
	)
}

const RecentTen = () => {
	const { data, isError, isLoading } = useContractRead({
		address: scoreContractAddress,
		abi: scoreAbi,
		functionName: "getRecent10Scores",
	})

	return (
		<Section title="Recent Scores">
			{data && (
				<table className="recent">
					<thead>
						<tr>
							<th>Player Name</th>
							<th>Address</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{(
							data as Array<{
								playerAddress: string
								playerName: string
								playerScore: bigint
							}>
						).map((entry, index) => {
							if (entry.playerName)
								return (
									<tr key={index}>
										<td>{entry.playerName}</td>
										<td>
											{maskAddress(entry.playerAddress)}
										</td>
										<td>{entry.playerScore.toString()}</td>{" "}
										{/* Convert BigInt to string */}
									</tr>
								)
						})}
					</tbody>
				</table>
			)}
		</Section>
	)
}

export const GameFooter = () => {
	return (
		<div>
			<GameRules />
			<Timer />
			<TopTen />
			<WorstTen />
			<RecentTen />
		</div>
	)
}
