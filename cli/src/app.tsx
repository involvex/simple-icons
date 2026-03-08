import SelectInput, {type SelectItem} from './components/select-input.js'
import List from './components/list.js'
import Find from './components/find.js'
import Get from './components/get.js'
import {useState} from 'react'
import {Text, Box} from 'ink'

type AppState = 'menu' | 'help' | 'about' | 'version' | 'find' | 'get' | 'list'

export default function App() {
	const [state, setState] = useState<AppState>('menu')
	const menuItems = [
		{label: 'Help', value: 'help'},
		{label: 'About', value: 'about'},
		{label: 'Version', value: 'version'},
		{label: 'Find', value: 'find'},
		{label: 'Get', value: 'get'},
		{label: 'List', value: 'list'},
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
						Simple Icons
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
		return <Find onBack={() => setState('find')} />
	}
	if (state === 'get') {
		return <Get onBack={() => setState('get')} />
	}
	if (state === 'list') {
		return <List onBack={() => setState('list')} />
	}

	if (state === 'help') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					Help
				</Text>
				<Text></Text>
			</Box>
		)
	}

	return (
		<Text>
			Find, <Text color="green">{state}</Text>
		</Text>
	)
}
