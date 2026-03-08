import SelectInput, {type SelectItem} from './components/select-input.js'
import DisplayVersion from './commands/version.js'
import List from './components/list.js'
import Find from './components/find.js'
import About from './commands/about.js'
import {Text, Box, useInput} from 'ink'
import Get from './components/get.js'
import Help from './commands/help.js'
import {useState} from 'react'

type AppState = 'menu' | 'help' | 'about' | 'version' | 'find' | 'get' | 'list'

function BackableScreen({
	children,
	onBack,
}: {
	children: React.ReactNode
	onBack: () => void
}) {
	useInput((_input, key) => {
		if (key.escape) onBack()
	})
	return (
		<Box flexDirection="column">
			<Box paddingX={2} paddingY={0}>
				<Text dimColor>{'← Esc to return to menu'}</Text>
			</Box>
			{children}
		</Box>
	)
}

export default function App() {
	const [state, setState] = useState<AppState>('menu')
	const goMenu = () => setState('menu')

	const menuItems = [
		{label: 'Find icon', value: 'find'},
		{label: 'Get icon SVG', value: 'get'},
		{label: 'List all icons', value: 'list'},
		{label: 'Help', value: 'help'},
		{label: 'About', value: 'about'},
		{label: 'Version', value: 'version'},
		{label: 'Exit', value: 'exit'},
	]

	const handleMenuSelect = (item: SelectItem<string>) => {
		if (item.value === 'exit') {
			process.exit(0)
		}
		setState(item.value as AppState)
	}

	if (state === 'menu') {
		return (
			<Box flexDirection="column">
				<Box marginY={1} paddingX={2}>
					<Text bold color="green">
						Simple Icons CLI
					</Text>
				</Box>
				<SelectInput
					items={menuItems}
					onSelect={handleMenuSelect}
					initialIndex={0}
				/>
			</Box>
		)
	}

	if (state === 'find') {
		return (
			<BackableScreen onBack={goMenu}>
				<Find onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (state === 'get') {
		return (
			<BackableScreen onBack={goMenu}>
				<Get onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (state === 'list') {
		return (
			<BackableScreen onBack={goMenu}>
				<List onBack={goMenu} />
			</BackableScreen>
		)
	}

	if (state === 'help') {
		return (
			<BackableScreen onBack={goMenu}>
				<Help />
			</BackableScreen>
		)
	}

	if (state === 'about') {
		return (
			<BackableScreen onBack={goMenu}>
				<About />
			</BackableScreen>
		)
	}

	if (state === 'version') {
		return (
			<BackableScreen onBack={goMenu}>
				<DisplayVersion />
			</BackableScreen>
		)
	}

	return null
}
