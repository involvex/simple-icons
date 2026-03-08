import SelectInput from './select-input.js'
import TextInput from 'ink-text-input'
import {useState} from 'react'
import {Box, Text} from 'ink'

export interface FindProps {
	onBack: () => void
}
type State = 'input' | 'error'
type ErrorAction = 'retry' | 'main-menu'

export default function Get({onBack}: FindProps) {
	const [value, setValue] = useState('')
	const [state, setState] = useState<State>('input')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | undefined>(undefined)
	if (state === 'input') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					Find
				</Text>
				<TextInput value={value} onChange={setValue} />
			</Box>
		)
	}

	const handleErrorActionSelect = (action: ErrorAction) => {
		if (action === 'main-menu') {
			setState('input')
			setError(undefined)
			setLoading(true)
			onBack()
		}
	}

	if (loading) {
		return (
			<Box paddingX={2}>
				<Text color="yellow">Loading configuration...</Text>
			</Box>
		)
	}

	if (state === 'error') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="red">
					✗ Error:
				</Text>
				<Text color="red">{error}</Text>
				<Text />
				<Box marginY={1}>
					<SelectInput<ErrorAction>
						items={[
							{label: 'Retry enhancement', value: 'retry'},
							{label: 'Return to main menu', value: 'main-menu'},
						]}
						onSelect={item => handleErrorActionSelect(item.value)}
						initialIndex={0}
					/>
				</Box>
			</Box>
		)
	}
	return null
}
