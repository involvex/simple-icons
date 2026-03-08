/**
 * Interactive Find screen (used in the TUI menu mode).
 * Wraps the full commands/find implementation and adds an "Back to Menu" action.
 */
import FindCommand from '../commands/find.js'

export interface FindProps {
	onBack: () => void
}

export default function Find({onBack: _onBack}: FindProps) {
	// The full Find command handles its own state machine.
	// The BackableScreen in app.tsx provides Esc-to-back.
	return <FindCommand />
}
