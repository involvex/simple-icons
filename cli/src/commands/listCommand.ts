import {getIconsData} from '../utils/data.js'
import process from 'node:process'

export default async function listCommand() {
	const data = await getIconsData()
	for (const icon of data) {
		console.log(`${icon.title} (${icon.slug}) - Hex: #${icon.hex}`)
	}
	process.exit(0)
}
