import React, { useEffect, useReducer } from "react"
import CryptoJS from "crypto-js"

const GAME_ID = "space2048!!!"
const ran = "space2048!!"

const useStateReducer = (prevState, newState) => {
	return typeof newState === "function" ? newState(prevState) : newState
}

const getInitialValue = (key: string, defaultValue: any) => {
	try {
		const gameState = getGameState()
		const value = gameState?.[key]
		return value ?? defaultValue
	} catch (error) {
		console.log(error)
		return defaultValue
	}
}

const getGameState = () => {
	const encrypted = window.localStorage.getItem(GAME_ID)
	let state = {}
	try {
		if (encrypted) {
			state = JSON.parse(
				CryptoJS.AES.decrypt(encrypted, ran).toString(CryptoJS.enc.Utf8)
			)
		}
	} catch (error) {
		console.log({ error })
	}
	return state
}

function useGameLocalStorage<T>(
	key: string,
	defaultValue: T,
	reducer = useStateReducer
): [T, React.Dispatch<any>] {
	const [value, dispatch] = useReducer(
		reducer,
		getInitialValue(key, defaultValue)
	)

	useEffect(() => {
		let state = getGameState()
		state[key] = value
		window.localStorage.setItem(
			GAME_ID,
			CryptoJS.AES.encrypt(JSON.stringify(state), ran).toString()
		)
	}, [value, key])

	return [value, dispatch]
}

export default useGameLocalStorage
