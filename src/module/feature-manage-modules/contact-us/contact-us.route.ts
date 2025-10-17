import express from 'express';
import * as contactUsControllers from './contact-us.controllers';

const app = express();

app.post('/contact-us', contactUsControllers.addContactUs);

app.get('/get-all-contact-us', contactUsControllers.getAllContactUs);

app.get('/get-contact-us/:contactUsId', contactUsControllers.getContactUsById);

app.delete(
  '/delete-contact-us/:contactUsId',
  contactUsControllers.deleteContactUs,
);

export default app;
