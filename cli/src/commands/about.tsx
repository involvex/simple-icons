import {createRequire} from 'node:module'
import {Text, Box} from 'ink'

const require = createRequire(import.meta.url)

const pkg = require('../../package.json') as {
	description: string
	version: string
	author: string
	license: string
	repository: {url: string}
}

export default function About() {
	return (
		<Box flexDirection="column" padding={1}>
			<Text bold>{pkg.description}</Text>
			<Text>Version: {pkg.version}</Text>
			<Text>Author: {pkg.author}</Text>
			<Text>License: {pkg.license}</Text>
			<Text>Repository: {pkg.repository.url}</Text>
		</Box>
	)
}
