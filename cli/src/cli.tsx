#!/usr/bin/env node
import listCommand from './commands/listCommand.js'
import getCommand from './commands/getCommand.js'
import About from './commands/about.js'
import Find from './commands/find.js'
import App from './app.js'
import {render} from 'ink'
// import React from 'react'
import meow from 'meow'

const cli = meow(
	`
	Usage
	  $ simple-icons

	Options
		--find  Find an icon
		--get   Get an icon
		--list  List all icons
		--version  Show version
		--about    Show about
		--help     Show help

	Examples
	  $ simple-icons --find=react
	  $ simple-icons --get=react
	  $ simple-icons --list
	  $ simple-icons --version
	  $ simple-icons --about
`,
	{
		importMeta: import.meta,
		flags: {
			find: {
				type: 'string',
			},
			get: {
				type: 'string',
			},
			list: {
				type: 'boolean',
			},
			version: {
				type: 'boolean',
			},
			about: {
				type: 'boolean',
			},
			help: {
				type: 'boolean',
			},
		},
	},
)

if (cli.flags.help || cli.input[0] === 'help') {
	cli.showHelp()
} else if (cli.flags.version || cli.input[0] === 'version') {
	cli.showVersion()
} else if (cli.flags.about || cli.input[0] === 'about') {
	render(<About />)
} else if (cli.flags.find !== undefined || cli.input[0] === 'find') {
	const query =
		typeof cli.flags.find === 'string' ? cli.flags.find : cli.input[1]
	render(<Find query={query} />)
} else if (cli.flags.get !== undefined || cli.input[0] === 'get') {
	const query = typeof cli.flags.get === 'string' ? cli.flags.get : cli.input[1]
	getCommand(query)
} else if (cli.flags.list || cli.input[0] === 'list') {
	listCommand()
} else {
	render(<App />)
}
