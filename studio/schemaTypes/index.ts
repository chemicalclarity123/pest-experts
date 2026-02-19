// studio/schemaTypes/index.ts
import { companySettings } from './companySettings';
import { service } from './service';
import { serviceArea } from './serviceArea';
import { homepage } from './homepage';
import { formSubmission } from './formSubmission';
import { contactPage } from './contactPage';
import { googleReview } from './googleReview';
import { blogPost } from './blogPost';

export const schemaTypes = [companySettings, googleReview, service, serviceArea, homepage, formSubmission, contactPage, blogPost];

