/**
 * Interactive Get screen — search for an icon by name/slug and copy its SVG.
 */
import {getIconsData, getIconSvg, type Icon} from '../utils/data.js'
import SelectInput from './select-input.js'
import {useState, useEffect} from 'react'
import TextInput from 'ink-text-input'
import clipboardy from 'clipboardy'
import {Box, Text} from 'ink'

export interface GetProps {
	onBack: () => void
}

type Step = 'loading' | 'search' | 'confirm' | 'done' | 'error'

export default function Get({onBack}: GetProps) {
	const [data, setData] = useState<Icon[]>([])
	const [query, setQuery] = useState('')
	const [step, setStep] = useState<Step>('loading')
	const [match, setMatch] = useState<Icon | null>(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		getIconsData().then(d => {
			setData(d)
			setStep('search')
		})
	}, [])

	const handleSubmit = () => {
		const q = query.toLowerCase().trim()
		const found =
			data.find(i => i.slug === q) ||
			data.find(i => i.title.toLowerCase() === q) ||
			data.find(i => i.title.toLowerCase().includes(q) || i.slug.includes(q))
		if (found) {
			setMatch(found)
			setStep('confirm')
		} else {
			setMessage(`No icon found for "${query}"`)
			setStep('error')
		}
	}

	if (step === 'loading') {
		return (
			<Box paddingX={2}>
				<Text color="yellow">Loading icons...</Text>
			</Box>
		)
	}

	if (step === 'search') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					Get Icon SVG
				</Text>
				<Box>
					<Text>Icon name or slug: </Text>
					<TextInput
						value={query}
						onChange={setQuery}
						onSubmit={handleSubmit}
					/>
				</Box>
				<Text dimColor>Press Enter to search</Text>
			</Box>
		)
	}

	if (step === 'error') {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="red">
					✗ {message}
				</Text>
				<Box marginY={1}>
					<SelectInput<'retry' | 'back'>
						items={[
							{label: 'Search again', value: 'retry'},
							{label: 'Return to main menu', value: 'back'},
						]}
						onSelect={item => {
							if (item.value === 'retry') {
								setQuery('')
								setStep('search')
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

	if (step === 'confirm' && match) {
		return (
			<Box flexDirection="column" paddingX={2}>
				<Text bold color="cyan">
					{match.title}
				</Text>
				<Text>Slug: {match.slug}</Text>
				<Text>Hex: #{match.hex}</Text>
				<Box marginY={1}>
					<SelectInput<'copy' | 'copy_hex' | 'back'>
						items={[
							{label: 'Copy SVG to clipboard', value: 'copy'},
							{label: 'Copy hex color to clipboard', value: 'copy_hex'},
							{label: 'Search again', value: 'back'},
						]}
						onSelect={item => {
							if (item.value === 'copy') {
								const svg = getIconSvg(match.slug)
								if (svg) {
									clipboardy.writeSync(svg)
									setMessage(`✓ SVG for ${match.title} copied!`)
								} else {
									setMessage(`✗ Could not read SVG for ${match.title}`)
								}
								setStep('done')
							} else if (item.value === 'copy_hex') {
								clipboardy.writeSync(`#${match.hex}`)
								setMessage(`✓ Hex #${match.hex} copied!`)
								setStep('done')
							} else {
								setQuery('')
								setStep('search')
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
					<SelectInput<'again' | 'back'>
						items={[
							{label: 'Search again', value: 'again'},
							{label: 'Return to main menu', value: 'back'},
						]}
						onSelect={item => {
							if (item.value === 'again') {
								setQuery('')
								setStep('search')
							} else {
								onBack()
							}
						}}
						initialIndex={1}
					/>
				</Box>
			</Box>
		)
	}

	return null
}
