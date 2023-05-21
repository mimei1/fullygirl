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
            {
                name: '_N_ew',
                children: [
                    { name: '_F_older', disabled: true },
                    { name: '_S_hortcut', disabled: true },
                    { name: '---------------------------' },
                    { name: 'Text Document', disabled: true },
                    { name: 'WordPad Document', disabled: true },
                    { name: 'Bitmap Image', disabled: true },
                    { name: 'Wave Sound', disabled: true },
                    { name: 'Microsoft Data Link', disabled: true }
                ]
            },
            { name: '------------------' },
            { name: 'Create _S_hortcut', disabled: true },
            { name: '_D_elete' },
            { name: 'Rena_m_e' },
            { name: 'Properties', disabled: true },
            { name: '----------------------------' },
            { name: '_W_ork Offline' },
            { name: '_C_lose' }
        ]
    },
    {
        name: '_E_dit',
        children: [
            { name: '_U_ndo', disabled: true },
            { name: '-----------------' },
            { name: 'Cu_t_', disabled: true, shortcut: 'Ctrl+X' },
            { name: '_C_opy', disabled: true, shortcut: 'Ctrl+C' },
            { name: '_P_aste', disabled: true, shortcut: 'Ctrl+V' },
            { name: 'Paste _S_hortcut' },
            { name: '-----------------' },
            { name: 'Select _A_ll', shortcut: 'Ctrl+A' },
            { name: '_I_nvert Selection' }
        ]
    },
    {
        name: '_V_iew',
        children: [
            {
                name: '_T_oolbars',
                children: [
                    { name: '_S_tandard Bottons', checked: true },
                    { name: '_A_ddress Bar', checked: true },
                    { name: '_L_inks', disabled: true },
                    { name: '_R_adio', disabled: true },
                    { name: '-------------------------' },
                    { name: '_T_ext Labels', checked: true }
                ]
            },
            { name: 'Status _B_ar', checked: true },
            {
                name: '_E_xplorer Bar',
                children: [
                    { name: '_S_earch', disabled: true, shortcut: 'Ctrl+E' },
                    { name: '_F_avorites', disabled: true, shortcut: 'Ctrl+I' },
                    { name: '_H_istory', disabled: true },
                    { name: 'F_o_lders', disabled: true },
                    { name: '-------------------------' },
                    { name: '_T_ip of the Day', disabled: true }
                ]
            },
            { name: '-----------------------------' },
            { name: 'as _W_eb Page', checked: true },
            { name: '----------------------------' },
            { name: 'Large _I_cons', checked: true },
            { name: 'S_m_all Icons' },
            { name: '_L_ist' },
            { name: '_D_etails', disabled: true },
            { name: '---------------------------' },
            {
                name: 'Arrange _I_cons',
                children: [
                    { name: 'by _N_ame', checked: true },
                    { name: 'by _T_ype' },
                    { name: 'by _S_ize' },
                    { name: 'by _D_ate' },
                    { name: '------------' },
                    { name: '_A_uto Arrange', disabled: true }
                ]
            },
            { name: 'Line _U_p Icons' },
            { name: '----------------' },
            { name: '_R_efresh', shortcut: 'F5' },
            { name: 'Folder _O_ptions...' }
        ]
    },
    {
        name: '_G_o',
        children: [
            { name: '_B_ack', shortcut: 'Alt+Left Arrow', disabled: true },
            { name: '_F_orward', shortcut: 'Alt+Right Arrow' },
            { name: '_U_p One Level', disabled: true },
            { name: '-------------------------------' },
            { name: '_H_ome Page', shortcut: 'Alt+Home' },
            { name: 'Channel _G_uide' },
            { name: '_S_earch the Web' },
            { name: '-------------------------------' },
            { name: 'My _C_omputer' },
            { name: '_I_nternet Call' }
        ]
    },
    {
        name: 'F_a_vorites',
        children: [
            { name: '_A_dd to Favorites...', disabled: true },
            { name: '_O_rganize Favorites...', disabled: true },
            { name: '------------------------'},
            { name: '(Empty)', disabled: true }
        ]
    },
    {
        name: '_T_ools',
        children: [
            {
                name: '_F_ind',
                children: [
                    { name: '_F_iles or Folders...', disabled: true },
                    { name: '_C_omputer...', disabled: true },
                    { name: 'On the _I_nternet...', disabled: true }
                ]
            },
            { name: 'Map _N_etwork Drive...', disabled: true },
            { name: '_D_isconnect Network Drive...', disabled: true },
            { name: '_S_ynchronize...', disabled: true }
        ]
    },
    {
        name: '_H_elp',
        children: [
            { name: '_H_elp Topics', disabled: true },
            { name: '------------------------------' },
            { name: 'About' }
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
