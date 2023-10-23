import React, { useState, useEffect } from "react"

const Timer = () => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const calculateTimeLeft = () => {
		const now = new Date()
		// Convert current time to UTC +9
		const localTime = now.getTime()
		const localOffset = now.getTimezoneOffset() * 60000
		const utc = localTime + localOffset
		const offset = 9 // UTC +9
		const korea = utc + 3600000 * offset
		const nowInKorea = new Date(korea)

		let target = new Date(nowInKorea)
		target.setHours(11, 0, 0, 0)

		// If it's already past 11 AM on Monday, target the next Monday
		if (nowInKorea.getDay() === 1 && nowInKorea.getHours() >= 11) {
			target.setDate(target.getDate() + 7)
		} else {
			// Otherwise, just target the next Monday
			target.setDate(target.getDate() + ((1 + 7 - target.getDay()) % 7))
		}

		const diff = target.getTime() - nowInKorea.getTime()

		const days = Math.floor(diff / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((diff % (1000 * 60)) / 1000)

		return { days, hours, minutes, seconds }
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div>
			(Resets in {timeLeft.days} Days {timeLeft.hours} hours{" "}
			{timeLeft.minutes} min {timeLeft.seconds} sec)
		</div>
	)
}

export default Timer
