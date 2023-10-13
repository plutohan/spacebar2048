import React from "react"
import Game from "../Game"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient } = configureChains([goerli], [publicProvider()])

const { connectors } = getDefaultWallets({
	appName: "Spacebar2048",
	projectId: "74c9cabfd8a1918ba0c14d7cc75de102",
	chains,
})

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

function App() {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
				<div>
					<main>
						<Game />
					</main>
				</div>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default App
