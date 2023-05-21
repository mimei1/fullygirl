export type MenuItem = {
    name: string;
    value?: string;
    children?: MenuItem[];
    disabled?: boolean;
    checked?: boolean;
    shortcut?: string;
}

const MENU_TREE: MenuItem[] = [
    {
        name: '_F_ile',
        children: [
            { name: '_N_ew', disabled: true, shortcut: 'Ctrl+N' },
            { name: '_O_pen', disabled: true, shortcut: 'Ctrl+O' },
            { name: '_S_ave', disabled: true, shortcut: 'Ctrl+S' },
            { name: 'Save _A_s...', disabled: true, shortcut: 'Ctrl+Shift+S' },
            { name: '----------------------------' },
            { name: 'Page Se_t_up...', disabled: true },
            { name: '_P_rint', disabled: true, shortcut: 'Ctrl+P' },
            { name: '----------------------------' },
            { name: 'Exit', disabled: true },
        ]
    },
    {
        name: '_E_dit',
        children: [
            { name: '_U_ndo', disabled: true, shortcut: 'Ctrl+Z' },
            { name: 'Repeat', disabled: true, shortcut: 'Ctrl+Shift+Z' },
            { name: '-----------------' },
            { name: 'Cu_t_', disabled: true, shortcut: 'Ctrl+X' },
            { name: '_C_opy', disabled: true, shortcut: 'Ctrl+C' },
            { name: '_P_aste', disabled: true, shortcut: 'Ctrl+V' },
            { name: 'Delete', disabled: true, shortcut: 'Del' },
            { name: '-----------------' },
            { name: 'Select _A_ll', disabled: true, shortcut: 'Ctrl+A' },
            { name: 'Time/_D_ate', disabled: true, shortcut: 'F5' },
            { name: '-----------------' },
            { name: '_W_ord Wrap', disabled: true },
            { name: 'Set _F_ont', disabled: true }
        ]
    },
    {
        name: '_S_earch',
        children: [
            { name: '_F_ind...', disabled: true, shortcut: 'Ctrl+F' },
            { name: 'Find _N_ext', disabled: true, shortcut: 'F3' },
        ]
    },
    {
        name: '_H_elp',
        children: [
            { name: '_H_elp Topics', disabled: true },
            { name: '_A_bout Notepad', disabled: true },
        ]
    }
]

export function renderName(source: string): string {
    const result = []
    let i = 0
    for (; i < source.length; i++) {
        const current = source[i]
        if (current !== '_') {
            result.push(current)
        } else {
            i += 1
            const underlineLetters = []
            for (; i < source.length; i++) {
                const currentUL = source[i]
                if (currentUL !== '_') {
                    underlineLetters.push(currentUL)
                } else {
                    break
                }
            }
            result.push(`<span style="text-decoration: underline">${underlineLetters.join('')}</span>`)
        }
    }
    return result.join('')
}

export function isDivider(source: string) {
    const kinds = Array.from(new Set(source))
    return kinds.length === 1 && kinds.shift() === '-' && source.length > 10
}

export default MENU_TREE
