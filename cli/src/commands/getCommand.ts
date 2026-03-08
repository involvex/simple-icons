import {getIconsData, getIconSvg} from '../utils/data.js'
import process from 'node:process'

export default async function getCommand(query?: string) {
	if (!query) {
		console.error(
			'Please specify an icon name or slug. Example: simple-icons --get react',
		)
		process.exit(1)
	}

	const data = await getIconsData()
	const q = query.toLowerCase()

	// Exact match by slug first
	let match = data.find(i => i.slug === q)

	// Then exact match by title
	if (!match) {
		match = data.find(i => i.title.toLowerCase() === q)
	}

	if (!match) {
		console.error(`Error: Icon "${query}" not found.`)
		process.exit(1)
	}

	const svg = getIconSvg(match.slug)
	if (!svg) {
		console.error(`Error: SVG file for "${match.title}" could not be read.`)
		process.exit(1)
	}

	console.log(svg)
}
