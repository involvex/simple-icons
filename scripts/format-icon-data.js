#!/usr/bin/env node
// @ts-check
/**
 * @file
 * Format data/simple-icons.json.
 */
import {formatIconData, writeIconsData} from './utils.js'
import {getIconsData} from '../sdk.mjs'

const icons = await getIconsData()
writeIconsData(formatIconData(icons))
