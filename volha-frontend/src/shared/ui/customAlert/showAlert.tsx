import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import { CustomAlert, CustomErr } from './CustomAlert'
import type React from 'react'



export const showAlert = (message: string): Promise<void> => {
    return show(<CustomAlert message={message} />)
}

export const showErr =  (message: string): Promise<void> => {
    return show(<CustomErr message={message} />)
}


const show = (children: React.ReactNode): Promise<void> => {
    return new Promise((resolve) => {
        const fragment = document.createDocumentFragment()
        const root = createRoot(fragment)
        const target = document.getElementById('root') || document.body

        const handleClose = () => {
            root.unmount()
            resolve()
        }

        root.render(
            ReactDOM.createPortal(
                children,
                target
            )
        )

        setTimeout(() => {
            handleClose()
        }, 3000)
    })
}


