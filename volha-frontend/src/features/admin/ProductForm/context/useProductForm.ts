import { useContext } from 'react'
import { ProductFormContext } from './context'

export const useProductForm = () => {
    const context = useContext(ProductFormContext)
    if (context === undefined) {
        throw new Error('useProductForm must be used within a ProductFormProvider')
    }
    return context
}

