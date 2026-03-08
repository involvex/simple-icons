import {fileURLToPath} from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename)

// Walk up until we find the 'cli' directory
while (__dirname !== '/' && path.basename(__dirname) !== 'cli') {
	__dirname = path.resolve(__dirname, '..')
}

export const REPO_ROOT = path.resolve(__dirname, '..')
export const DATA_PATH = path.join(REPO_ROOT, 'data/simple-icons.json')
export const ICONS_DIR = path.join(REPO_ROOT, 'icons')

export interface Icon {
	title: string
	slug: string
	hex: string
	source: string
}

interface RawIcon {
	title: string
	hex: string
	source: string
	[key: string]: unknown
}

export async function getIconsData(): Promise<Icon[]> {
	try {
		const raw = fs.readFileSync(DATA_PATH, 'utf8')
		const parsed = JSON.parse(raw) as RawIcon[]

		const sdkUrl = new URL(
			`file://${path.join(REPO_ROOT, 'sdk.mjs').replace(/\\/g, '/')}`,
		)
		const sdk = (await import(sdkUrl.href)) as {
			getIconSlug: (icon: Record<string, unknown>) => string
		}

		return parsed.map(i => ({
			title: i.title,
			hex: i.hex,
			source: i.source,
			slug: sdk.getIconSlug(i as unknown as Record<string, unknown>),
		}))
	} catch (error) {
		console.error(
			'Could not read icons data. Ensure this CLI is run inside the simple-icons repository or data/simple-icons.json exists.',
			error,
		)
		return []
	}
}

export function getIconSvg(slug: string) {
	const p = path.join(ICONS_DIR, `${slug}.svg`)
	try {
		return fs.readFileSync(p, 'utf8')
	} catch (error) {
		console.error('Error reading SVG:', p, error)
		return null
	}
}
