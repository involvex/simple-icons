#!/usr/bin/env node
import Version from './commands/version.js'
import About from './commands/about.js'
import List from './commands/list.js'
import Help from './commands/help.js'
import Find from './commands/find.js'
import Get from './commands/get.js'
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

if (cli.input[0] === 'help') {
	render(<Help />)
} else if (cli.input[0] === 'version') {
	render(<Version />)
} else if (cli.input[0] === 'about') {
	render(<About />)
} else if (cli.input[0] === 'find') {
	render(<Find />)
} else if (cli.input[0] === 'get') {
	render(<Get />)
} else if (cli.input[0] === 'list') {
	render(<List />)
} else {
	render(<App />)
}
