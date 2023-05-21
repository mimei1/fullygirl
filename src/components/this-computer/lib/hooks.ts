import { useResetAtom } from 'jotai/utils'
import {
    historyStackAtom,
    historyStackIndexAtom,
    currentObjectAtom,
    focusedObjectAtom,
    selectedObjectAtom
} from './state'

export function useResetSelected() {
    const resetFocusedObject = useResetAtom(focusedObjectAtom)
    const resetSelectedObject = useResetAtom(selectedObjectAtom)
    return () => {
        resetFocusedObject()
        resetSelectedObject()
    }
}

export function useResetThisApp() {
    const resetHistoryStack = useResetAtom(historyStackAtom)
    const resetHistoryStackIndex = useResetAtom(historyStackIndexAtom)
    const resetCurrentObject = useResetAtom(currentObjectAtom)
    const resetSelected = useResetSelected()
    return () => {
        resetHistoryStack()
        resetHistoryStackIndex()
        resetCurrentObject()
        resetSelected()
    }
}
