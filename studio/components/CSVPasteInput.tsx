import React from 'react';
import { ArrayOfObjectsInputProps, set, unset } from 'sanity';

export function CSVPasteInput(props: ArrayOfObjectsInputProps) {
    const { onChange, value = [] } = props;

    const handlePaste = (event: React.ClipboardEvent) => {
        const pastedText = event.clipboardData.getData('text');

        // Check if the pasted text contains commas (CSV format)
        if (pastedText.includes(',')) {
            event.preventDefault();

            // Split by comma and clean up each value
            const newAreas = pastedText
                .split(',')
                .map((area: string) => area.trim())
                .filter((area: string) => area.length > 0);

            // Merge with existing values and remove duplicates
            const updatedAreas = [...new Set([...value, ...newAreas])];

            // Update the field value using Sanity's patch system
            onChange(updatedAreas.length > 0 ? set(updatedAreas) : unset());
        }
    };

    return (
        <div onPaste={handlePaste}>
            {props.renderDefault(props)}
        </div>
    );
}
