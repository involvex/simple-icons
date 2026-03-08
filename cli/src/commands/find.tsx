import {getIconsData, getIconSvg, type Icon} from '../utils/data.js'
import {useState, useEffect, useMemo} from 'react'
import SelectInputLib from 'ink-select-input'
import TextInput from 'ink-text-input'
import {Text, Box, useApp} from 'ink'
import clipboardy from 'clipboardy'

interface ActionItem {
	label: string
	value: string
}

interface SelectItem {
	label: string
	value: string
	icon: Icon
}

// Workaround for ink-select-input default export interop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectInput = (SelectInputLib as any).default || SelectInputLib

export default function Find({query}: {query?: string}) {
	const {exit} = useApp()
	const [data, setData] = useState<Icon[]>([])
	const [searchQuery, setSearchQuery] = useState(query || '')
	const [step, setStep] = useState<
		'loading' | 'search' | 'list' | 'action' | 'details' | 'done'
	>('loading')
	const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		getIconsData().then(d => {
			setData(d)
			if (query) {
				setStep('list')
			} else {
				setStep('search')
			}
		})
	}, [query])

	const filteredData = useMemo(() => {
		if (!searchQuery) return data
		const q = searchQuery.toLowerCase()
		return data.filter(
			i => i.title.toLowerCase().includes(q) || (i.slug && i.slug.includes(q)),
		)
	}, [data, searchQuery])

	if (step === 'loading') {
		return <Text>Loading icons...</Text>
	}

	if (step === 'done') {
		return <Text color="green">{message}</Text>
	}

	if (step === 'search') {
		return (
			<Box flexDirection="column" paddingX={2} paddingY={1}>
				<Box>
					<Text bold color="cyan">
						Search for an icon:{' '}
					</Text>
					<TextInput
						value={searchQuery}
						onChange={setSearchQuery}
						onSubmit={() => setStep('list')}
					/>
				</Box>
			</Box>
		)
	}

	if (step === 'list') {
		const items = filteredData
			.map(i => ({
				label: `${i.title} (${i.slug})`,
				value: i.slug,
				icon: i,
			}))
			.slice(0, 20) // limit results for terminal performance

		if (items.length === 0) {
			return (
				<Box flexDirection="column" paddingX={2} paddingY={1}>
					<Text color="red">No icons found for "{searchQuery}".</Text>
				</Box>
			)
		}

		return (
			<Box flexDirection="column" paddingX={2} paddingY={1}>
				<Text bold color="cyan">
					Select an icon (Found {filteredData.length} matches):
				</Text>
				<SelectInput
					items={items}
					onSelect={(item: SelectItem) => {
						setSelectedIcon(item.icon)
						setStep('action')
					}}
				/>
			</Box>
		)
	}

	if (step === 'details' && selectedIcon) {
		return (
			<Box flexDirection="column" paddingX={2} paddingY={1}>
				<Text bold color="cyan">
					{selectedIcon.title}
				</Text>
				<Text>Slug: {selectedIcon.slug}</Text>
				<Text>Hex: #{selectedIcon.hex}</Text>
				<Text>Source: {selectedIcon.source}</Text>
				<Box marginTop={1}>
					<SelectInput
						items={[
							{label: 'Go Back', value: 'back'},
							{label: 'Exit', value: 'exit'},
						]}
						onSelect={(item: ActionItem) => {
							if (item.value === 'back') setStep('action')
							if (item.value === 'exit') exit()
						}}
					/>
				</Box>
			</Box>
		)
	}

	if (step === 'action' && selectedIcon) {
		const actionItems = [
			{label: 'View Details', value: 'details'},
			{label: 'Copy SVG to Clipboard', value: 'copy_svg'},
			{label: 'Copy Hex to Clipboard', value: 'copy_hex'},
			{label: 'Exit', value: 'exit'},
		]

		return (
			<Box flexDirection="column" paddingX={2} paddingY={1}>
				<Text bold color="cyan">
					Actions for {selectedIcon.title}:
				</Text>
				<SelectInput
					items={actionItems}
					onSelect={(item: ActionItem) => {
						if (item.value === 'details') {
							setStep('details')
						} else if (item.value === 'copy_svg') {
							const svg = getIconSvg(selectedIcon.slug)
							if (svg) {
								clipboardy.writeSync(svg)
								setMessage(`SVG for ${selectedIcon.title} copied to clipboard!`)
							} else {
								setMessage(`Error copying SVG for ${selectedIcon.title}.`)
							}
							setStep('done')
							setTimeout(() => exit(), 500)
						} else if (item.value === 'copy_hex') {
							clipboardy.writeSync(`#${selectedIcon.hex}`)
							setMessage(`Hex #${selectedIcon.hex} copied to clipboard!`)
							setStep('done')
							setTimeout(() => exit(), 500)
						} else if (item.value === 'exit') {
							exit()
						}
					}}
				/>
			</Box>
		)
	}

	return null
}
