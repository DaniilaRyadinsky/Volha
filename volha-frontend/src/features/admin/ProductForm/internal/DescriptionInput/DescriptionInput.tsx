import '@mdxeditor/editor/style.css'
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
import { useEffect, useRef, useMemo, useState } from 'react'

import styles from './DescriptionInput.module.css'

interface DescriptionFormProps {
    defaultValue: string
    onChange: (value: string) => void
}
const DescriptionInput = ({ defaultValue, onChange }: DescriptionFormProps) => {
    const editorRef = useRef<MDXEditorMethods | null>(null)
    const [initialMarkdown] = useState(defaultValue)
    const lastExternalValueRef = useRef(defaultValue)

    useEffect(() => {
        if (editorRef.current && defaultValue !== lastExternalValueRef.current) {
            const currentMarkdown = editorRef.current.getMarkdown()
            if (currentMarkdown !== defaultValue) {
                editorRef.current.setMarkdown(defaultValue)
                lastExternalValueRef.current = defaultValue
            }
        }
    }, [defaultValue])

    const plugins = useMemo(
        () => [
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
        ],
        []
    )

    const handleChange = (value: string) => {
        lastExternalValueRef.current = value
        onChange(value)
    }

    return (
        <div className={styles.md_redactor_wrapper}>
            <MDXEditor
                ref={editorRef}
                markdown={initialMarkdown}
                onChange={handleChange}
                plugins={plugins}
            />
        </div>
    )
}

export default DescriptionInput
