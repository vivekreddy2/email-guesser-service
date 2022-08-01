import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from "express";
import {check, query} from 'express-validator';
import {Server} from 'http';
import createHttpError from 'http-errors';
import cors from 'cors';

import { getDomainToEmailFormatMappingFromDataSet, getEmailAddress, DomainToEmailFormatMapping } from "./utils";


type GetEmailAddressQueryParams = {
    fullName: string;
    domain: string;
};


// pre-processing to fetch domain to email format type mapping by analysing the email data set present in static json file (/public/emailDataSet.json)
const domainToEmailFormatMapping: DomainToEmailFormatMapping = getDomainToEmailFormatMappingFromDataSet();


const app: Application = express();
// enable cors for local development
app.use(cors());


// get request for fetching emailAddress 
app.get('/users/email-address', (request: Request, response: Response, next: NextFunction) => {
    const {fullName, domain}: GetEmailAddressQueryParams = request.query as GetEmailAddressQueryParams;
    const emailAddress = getEmailAddress(fullName, domain, domainToEmailFormatMapping);
    response.json({emailAddress});
});


// Respond 404 not found error if request path is invalid
app.use((request: Request, response: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
};
app.use(errorHandler);


// run server on port 8080
const PORT: Number = 8080;
const server: Server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

