import React from 'react'
import styles from './Layout.module.css'

const LayoutContent = ({children}: {children:React.ReactNode}) => {
  return (
    <div className={styles.layout__content}>
        {children}
    </div>
  )
}

export default LayoutContent