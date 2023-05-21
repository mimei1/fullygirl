import { FC } from 'react'
import { css } from '@emotion/css'

/**
 * 用于模拟子窗口的分割线
 * @todo 目前只是上下分割线，可能会有左右分割线的需求，到时候也在这个组件实现
 */
const Divider: FC = () => (
  <div className={style}>
    <div style={{ height: 1, backgroundColor: '#c4c6cb' }} />
    <div style={{ height: 1, backgroundColor: '#ffffff' }} />
    <div className='middle'>
      <div className='float-line' />
    </div>
    <div style={{ height: 1, backgroundColor: '#c4c6cb' }}></div>
    <div style={{ height: 1, backgroundColor: '#000000' }}></div>
  </div>
)

const style = css({
  display: 'block',
  width: '100%',
  'div': {
    display: 'block',
    width: '100%'
  },
  '.middle': {
    height: 2,
    position: 'relative',
    '.float-line': {
      height: 2,
      backgroundColor: '#c4c6cb',
      position: 'absolute',
      zIndex: 999
    }
  }
})

export default Divider