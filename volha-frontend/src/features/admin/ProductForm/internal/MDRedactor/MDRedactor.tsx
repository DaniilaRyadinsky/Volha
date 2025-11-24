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
import { useEffect, useRef, useMemo } from 'react'

import styles from './MDRedactor.module.css'

const MDRedactor = () => {
    const { description, setDescription } = useProductForm()
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const editorRef = useRef<MDXEditorMethods >(null)

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
        if (editorRef.current && typeof description === 'string') {
            editorRef.current.setMarkdown(description)
        }
    }, [description])

    return (
        <div className={styles.md_redactor_wrapper}>
            <MDXEditor
                ref={editorRef}
                markdown={description}
                onChange={setDescription}
                plugins={plugins}
            />
        </div>
    )
}

export default MDRedactor
