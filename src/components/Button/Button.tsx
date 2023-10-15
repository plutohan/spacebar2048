import React from "react"

import "./Button.scss"

interface ButtonProps {
	id?: string
	children: React.ReactNode
	className?: string
	disabled?: boolean
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: ButtonProps) => {
	const { id, children, className, onClick, disabled } = props

	return (
		<button
			id={id}
			className={`appButton ${className || ""}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
