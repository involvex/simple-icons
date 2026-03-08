#!/usr/bin/env node
// @ts-check
/**
 * @file
 * Minify data/simple-icons.json file.
 */
import {formatIconData, writeIconsData} from '../utils.js'
import {getIconSlug, getIconsData} from '../../sdk.mjs'

const plainIcons = await getIconsData()
const iconsWithSlugs = plainIcons.map(icon =>
	icon.slug ? icon : {...icon, slug: getIconSlug(icon)},
)
await writeIconsData(formatIconData(iconsWithSlugs), true)
