import '@mdxeditor/editor/style.css'
import './MDRedactor.module.css'
import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    headingsPlugin,
    listsPlugin,
    ListsToggle,
    Separator,
    tablePlugin,
    InsertTable,
    codeBlockPlugin,
    BlockTypeSelect,
    type MDXEditorMethods
} from '@mdxeditor/editor'
import { useProductForm } from '../../context/useProductForm'
import { useEffect, useRef, useCallback, useMemo } from 'react'

const MDRedactor = () => {
    const { newProduct, setNewProduct } = useProductForm()
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const editorRef = useRef<MDXEditorMethods >(null)

    // Дебаунсим обновления описания с задержкой 500мс
    const handleDescriptionChange = useCallback((value: string) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            setNewProduct(prev => ({ ...prev, description: value }))
        }, 500)
    }, [setNewProduct])

    // Мемоизируем конфигурацию плагинов
    const plugins = useMemo(() => [
        toolbarPlugin({
            toolbarContents: () => (
                <>
                    <UndoRedo />
                    <Separator />
                    <BlockTypeSelect />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <ListsToggle />
                    <Separator />
                    <InsertTable />
                </>
            )
        }),
        headingsPlugin(),
        listsPlugin(),
        codeBlockPlugin(),
        tablePlugin()
    ], [])

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (editorRef.current && typeof newProduct.description === 'string') {
            editorRef.current.setMarkdown(newProduct.description)
        }
    }, [newProduct.description])

    return (
        <div className="md-redactor-wrapper">
            <MDXEditor
                ref={editorRef}
                markdown={newProduct.description}
                onChange={handleDescriptionChange}
                plugins={plugins}
            />
        </div>
    )
}

export default MDRedactor
