import { useCallback, useState } from 'react'
import { Box, Stack, TextArea, Text, Card } from '@sanity/ui'
import { insert, PatchEvent } from 'sanity'

export function CsvTagInput(props: any) {
    const { onChange } = props
    const [inputValue, setInputValue] = useState('')

    const handlePaste = useCallback(
        (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
            const clipboardData = event.clipboardData
            const pastedData = clipboardData.getData('Text')

            if (pastedData.includes(',')) {
                event.preventDefault()
                const tags = pastedData
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== '')

                if (tags.length > 0) {
                    onChange(PatchEvent.from(tags.map((tag) => insert([tag], 'after', [-1]))))
                    setInputValue('') // Clear if we handled the paste
                }
            }
        },
        [onChange]
    )

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const val = event.currentTarget.value
            setInputValue(val)

            // Optional: Verify if user typed a comma manually? 
            // Let's stick to simple Paste or Enter logic to be safe, 
            // but for "CSV string" people often paste.
        },
        []
    )

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                // Parse current value as CSV
                const tags = inputValue
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== '')

                if (tags.length > 0) {
                    onChange(PatchEvent.from(tags.map((tag) => insert([tag], 'after', [-1]))))
                    setInputValue('')
                }
            }
        },
        [inputValue, onChange]
    )

    return (
        <Stack space={3}>
            {props.renderDefault(props)}

            <Card padding={3} radius={2} tone="transparent" style={{ border: '1px dashed #e0e0e0' }}>
                <Stack space={2}>
                    <Text size={1} weight="semibold">Bulk Add Tags</Text>
                    <TextArea
                        fontSize={1}
                        padding={2}
                        placeholder="Paste CSV string here (e.g. &quot;Ants, Termites, Rodents&quot;) and press Enter"
                        rows={2}
                        value={inputValue}
                        onPaste={handlePaste}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Text size={0} muted>
                        Paste comma-separated values or type them and press Enter to add multiple tags at once.
                    </Text>
                </Stack>
            </Card>
        </Stack>
    )
}
