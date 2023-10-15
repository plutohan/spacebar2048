import { Direction, TransformFactor } from "../components/interfaces"

/*
Size XS screen: Up to 420 pixels
Size S screen: Between 421 pixels and 520 pixels
*/
export const ScreenSizeBreakpoint = {
	XS: 420,
	S: 520,
}

/*
Tiles XS Translation Factor: translates with factor 72.6
Tiles S Translation Factor: translates with factor 96.8
Tiles M Translation Factor: translates with factor 121
*/
export const TilesScreenTransformFactor: { [key: string]: TransformFactor } = {
	XS: 73,
	S: 97,
	M: 121,
}

export const KEYBOARD_ARROW_TO_DIRECTION_MAP: { [key: string]: Direction } = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowRight: "right",
	ArrowLeft: "left",
	w: "up",
	s: "down",
	d: "right",
	a: "left",
}

export const scoreContractAddress = "0x43b58F2093Aa3d3e1B943f8A5701279fC86417f9"

export const scoreAbi = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "score",
				type: "uint256",
			},
		],
		name: "submitScore",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getRecent10Scores",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "playerAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "playerName",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "playerScore",
						type: "uint256",
					},
				],
				internalType: "struct Scoreboard.ScoreEntry[10]",
				name: "",
				type: "tuple[10]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getTop10Scores",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "playerAddress",
						type: "address",
					},
					{
						internalType: "string",
						name: "playerName",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "playerScore",
						type: "uint256",
					},
				],
				internalType: "struct Scoreboard.ScoreEntry[10]",
				name: "",
				type: "tuple[10]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "scores",
		outputs: [
			{
				internalType: "address",
				name: "playerAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "playerName",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "playerScore",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "topScores",
		outputs: [
			{
				internalType: "address",
				name: "playerAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "playerName",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "playerScore",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
]
