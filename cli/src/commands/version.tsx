import {createRequire} from 'node:module'
import {Text, Box} from 'ink'

const require = createRequire(import.meta.url)

const pkg = require('../../package.json') as {
	name: string
	description: string
	version: string
}

export default function DisplayVersion() {
	return (
		<Box flexDirection="column" padding={1}>
			<Text bold>{pkg.description}</Text>
			<Text>
				{pkg.name} v{pkg.version}
			</Text>
		</Box>
	)
}
