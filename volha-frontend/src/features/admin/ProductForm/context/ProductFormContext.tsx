import { createContext} from 'react'
import type { ProductFormContextType } from './context'

export const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined)


