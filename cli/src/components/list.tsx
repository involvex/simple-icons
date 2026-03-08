/**
 * Interactive List screen — shows all icons with search filter.
 */
import {getIconsData, type Icon} from '../utils/data.js'
import {useState, useEffect, useMemo} from 'react'
import SelectInput from './select-input.js'
import TextInput from 'ink-text-input'
import clipboardy from 'clipboardy'
import {Box, Text} from 'ink'

export interface ListProps {
	onBack: () => void
}

type Step = 'loading' | 'browse' | 'action' | 'done'

export default function List({onBack}: ListProps) {
	const [data, setData] = useState<Icon[]>([])
	const [filter, setFilter] = useState('')
	const [step, setStep] = useState<Step>('loading')
	const [selected, setSelected] = useState<Icon | null>(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		getIconsData().then(d => {
			setData(d)
			setStep('browse')
		})
	}, [])

	const filtered = useMemo(() => {
		if (!filter) return data
		const q = filter.toLowerCase()
		return data.filter(
			i => i.title.toLowerCase().includes(q) || i.slug.includes(q),
		)
	}, [data, filter])

	if (step === 'loading') {
		return (
			<Box paddingX={2}>
				<Text color="yellow">Loading icons...</Text>
			</Box>
		)
	}

	if (step === 'browse') {
		const displayItems = filtered.slice(0, 20).map(i => ({
			label: `${i.title}  #${i.hex}`,
			value: i.slug,
		}))

		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					List Icons{' '}
					<Text dimColor>
						({filtered.length} of {data.length})
					</Text>
				</Text>
				<Box>
					<Text>Filter: </Text>
					<TextInput value={filter} onChange={setFilter} />
				</Box>
				{displayItems.length === 0 ? (
					<Text color="red">No icons match "{filter}"</Text>
				) : (
					<SelectInput
						items={displayItems}
						onSelect={item => {
							const icon = data.find(i => i.slug === item.value)
							if (icon) {
								setSelected(icon)
								setStep('action')
							}
						}}
						initialIndex={0}
					/>
				)}
				<Text dimColor>↑↓ Navigate Enter Select Esc Back</Text>
			</Box>
		)
	}

	if (step === 'action' && selected) {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					{selected.title}
				</Text>
				<Text>Slug: {selected.slug}</Text>
				<Text>Hex: #{selected.hex}</Text>
				<Text>Source: {selected.source}</Text>
				<Box marginY={1}>
					<SelectInput<'copy_hex' | 'copy_slug' | 'list' | 'back'>
						items={[
							{label: 'Copy hex to clipboard', value: 'copy_hex'},
							{label: 'Copy slug to clipboard', value: 'copy_slug'},
							{label: 'Back to list', value: 'list'},
							{label: 'Return to main menu', value: 'back'},
						]}
						onSelect={item => {
							if (item.value === 'copy_hex') {
								clipboardy.writeSync(`#${selected.hex}`)
								setMessage(`✓ Hex #${selected.hex} copied!`)
								setStep('done')
							} else if (item.value === 'copy_slug') {
								clipboardy.writeSync(selected.slug)
								setMessage(`✓ Slug "${selected.slug}" copied!`)
								setStep('done')
							} else if (item.value === 'list') {
								setStep('browse')
							} else {
								onBack()
							}
						}}
						initialIndex={0}
					/>
				</Box>
			</Box>
		)
	}

	if (step === 'done') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text color="green">{message}</Text>
				<Box marginY={1}>
					<SelectInput<'list' | 'back'>
						items={[
							{label: 'Back to list', value: 'list'},
							{label: 'Return to main menu', value: 'back'},
						]}
						onSelect={item => {
							if (item.value === 'list') {
								setStep('browse')
							} else {
								onBack()
							}
						}}
						initialIndex={0}
					/>
				</Box>
			</Box>
		)
	}

	return null
}
