import {render} from 'ink-testing-library'
import App from './src/app.js'
// import React from 'react'
// import chalk from 'chalk'
import test from 'ava'

test('show menu', t => {
	const {lastFrame} = render(<App />)

	t.is(lastFrame(), `Simple Icons`)
})

test('show help', t => {
	const {lastFrame} = render(<App />)

	t.is(lastFrame(), `Help`)
})
