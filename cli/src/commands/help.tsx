import {Box, Text} from 'ink'

export default function Help() {
	return (
		<Box flexDirection="column" padding={1}>
			<Text bold color="cyan">
				Simple Icons CLI — Help
			</Text>
			<Text> </Text>
			<Text bold>Interactive Mode</Text>
			<Text> Run without flags to open the interactive menu.</Text>
			<Text> </Text>
			<Text bold>Flags</Text>
			<Text> --find [query] Search for an icon by name or slug</Text>
			<Text> --get [query] Get SVG output for a specific icon</Text>
			<Text> --list List all available icons</Text>
			<Text> --about Show information about this CLI</Text>
			<Text> --version Show the CLI version</Text>
			<Text> --help Show this help</Text>
			<Text> </Text>
			<Text bold>Examples</Text>
			<Text> $ simple-icons --find=react</Text>
			<Text> $ simple-icons --get=typescript</Text>
			<Text> $ simple-icons --list</Text>
		</Box>
	)
}
