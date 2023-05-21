import { FC, useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { useSetAtom } from 'jotai'
import dayjs from 'dayjs'
import { hasLoggedAtom } from '../../state'
import Button from '../os/Button'
import keyIcon from '../../assets/icons/key_icon.png'

const USERNAME = process.env.REACT_APP_LOGIN_USERNAME || throwError(`missing environment variable 'REACT_APP_LOGIN_USERNAME'`)
const PASSWORD = process.env.REACT_APP_LOGIN_PASSWORD || throwError(`missing environment variable 'REACT_APP_LOGIN_PASSWORD'`)

const LoginWindow: FC = () => {
    return (
        <div className={windowStyle}>
            <div className='inner-box'>
                <TopBar />
                <MainContent />
            </div>
        </div>
    )
}

const windowStyle = css({
    margin: 'auto',
    marginTop: '20vh',
    width: 540,
    height: 200,
    backgroundColor: 'rgb(195, 198, 202)',
    borderColor: 'rgb(195, 198, 202) rgb(0, 0, 0) rgb(0, 0, 0) rgb(195, 198, 202)',
    border: '1px solid',
    '.inner-box': {
        border: '1px solid',
        borderColor: 'rgb(255, 255, 255) rgb(134, 137, 141) rgb(134, 137, 141) rgb(255, 255, 255)',
        padding: 2,
        width: '100%',
        flexDirection: 'column'
    }
})

const TopBar: FC = () => (
    <div className={topBarStyle}>
        <div className='title'>Welcom to Web Win98</div>
        <div className='window-controller'>
            <Button icon="close" onClick={noop} />
        </div>
    </div>
)

const topBarStyle = css({
    backgroundColor: 'rgb(0, 0, 163)',
    height: 20,
    width: '100%',
    '.title': {
        fontFamily: '"Fixedsys Excelsior", "FixedSys", monospace',
        color: 'white',
        fontSize: 15,
        margin: 'auto 2px'
    },
    '.window-controller': {
        marginLeft: 'auto',
        marginRight: 2,
        display: 'flex',
        alignItems: 'center'
    }
})

const MainContent: FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const setHasLogged = useSetAtom(hasLoggedAtom)

    useEffect(() => {
        if (incorrect) {
            setIncorrect(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password])

    const login = () => {
        if (username !== USERNAME || password !== PASSWORD) {
            setIncorrect(true)
        } else {
            setHasLogged({
                value: true,
                exp: dayjs().add(24, 'hour').toDate().getTime()
            })
        }
    }

    return (
        <div className={mainContentStyle}>
            <div className='left'>
                <img src={keyIcon} alt="" />
            </div>
            <div className='middel'>
                <div className='form'>
                    <div className='tip'>Click OK to log on to FullyGirl</div>
                    <div className='tip'>Buy Pass：25c3cc.myshopify.com</div>
                    <label className='form-item'>
                        <span className='item-name'>Username</span>
                        <input type="text" value={username} onInput={e => setUsername(e.currentTarget.value)} />
                    </label>
                    <label className='form-item'>
                        <span className='item-name'>Password</span>
                        <input type="password" value={password} onInput={e => setPassword(e.currentTarget.value)} />
                    </label>
                    {incorrect && <p className='warnning'>the username or password is incorrect</p>}
                </div>
            </div>
            <div className='right'>
                <div className='btn-wrap'>
                    <Button text='&nbsp;&nbsp;&nbsp;OK&nbsp;&nbsp;&nbsp;' onClick={login} />
                </div>
            </div>
        </div>
    )
}

const mainContentStyle = css({
    fontFamily: '"Fixedsys Excelsior", "FixedSys", monospace',
    '.left': {
        width: 100,
        'img': {
            margin: '0 auto',
            marginTop: 20,
            width: 56,
            height: 62
        }
    },
    '.right': {
        padding: '10px 10px',
        marginLeft: 'auto',
        '.btn-wrap': {
            display: 'block',
            marginTop: 20,
            marginRight: 10
        }
    },
    '.middel': {
        '.form': {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 20,
            fontSize: 18,
            '.form-item': {
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                '.item-name': {
                    marginRight: 4
                }
            }
        },
        '.warnning': {
            color: '#d44c21'
        }
    }
})

function noop(){}
function throwError(msg: string) { throw new Error(msg) }

export default LoginWindow
