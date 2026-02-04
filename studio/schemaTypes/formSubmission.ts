// studio/schemaTypes/formSubmission.ts
export const formSubmission = {
    name: 'formSubmission',
    title: 'Form Submissions',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: any) => Rule.email(),
        },
        {
            name: 'serviceInterest',
            title: 'Service Interested In',
            type: 'string',
        },
        {
            name: 'message',
            title: 'Message',
            type: 'text',
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Converted', value: 'converted' },
                    { title: 'Not Interested', value: 'not_interested' },
                ],
            },
            initialValue: 'new',
        },
        {
            name: 'source',
            title: 'Source',
            type: 'string',
            description: 'Where the lead came from',
            options: {
                list: [
                    { title: 'Homepage', value: 'homepage' },
                    { title: 'Service Page', value: 'service_page' },
                    { title: 'Contact Page', value: 'contact_page' },
                ],
            },
        },
        {
            name: 'notes',
            title: 'Internal Notes',
            type: 'text',
            description: 'Notes for follow-up',
        },
    ],
    preview: {
        select: {
            name: 'name',
            phone: 'phone',
            status: 'status',
            date: 'submittedAt',
        },
        prepare({ name, phone, status, date }: any) {
            return {
                title: name,
                subtitle: `${phone} | ${status} | ${new Date(date).toLocaleDateString()}`,
            };
        },
    },
    orderings: [
        {
            title: 'Newest First',
            name: 'newestFirst',
            by: [{ field: 'submittedAt', direction: 'desc' }],
        },
        {
            title: 'Status',
            name: 'statusOrder',
            by: [
                { field: 'status', direction: 'asc' },
                { field: 'submittedAt', direction: 'desc' },
            ],
        },
    ],
};
