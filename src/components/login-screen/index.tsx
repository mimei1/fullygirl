import { FC } from 'react'
import { css } from '@emotion/css'
import LoginWindow from './LoginWindow'

const LoginScreen: FC = () => {
    return (
        <div className={pageLayoutStyle}>
            <LoginWindow />
        </div>
    )
}

const pageLayoutStyle = css({
    width: '100vw',
    height: '100vh',
    backgroundColor: 'teal',
    display: 'flex',
    '&::after': {
        position: 'fixed',
        content: '""',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'linear-gradient(transparent 50%,#fff 50%),linear-gradient(90deg,red,red 33%,#0f0 33%,#0f0 66%,#00f 66%)',
        backgroundSize: '100% 3px,3px 3px',
        pointerEvents: 'none',
        opacity: '.06',
        zIndex: 99999
    }
})

export default LoginScreen
