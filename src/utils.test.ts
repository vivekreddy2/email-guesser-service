import { determineEmailFormatType, getDomainToEmailFormatMappingFromDataSet, getEmailAddress, DomainToEmailFormatMapping, EmailFormatType } from './utils';

describe('Test methods in utils', () => {
    const sampleDomainToEmailFormatMapping: DomainToEmailFormatMapping = {
        'babbel.com': EmailFormatType.FIRST_NAME_INITIAL_LAST_NAME,
        'linkedin.com': EmailFormatType.FIRST_NAME_LAST_NAME,
        'google.com': EmailFormatType.FIRST_NAME_LAST_NAME
    }

    test('test getDomainToEmailFormatMappingFromDataSet method returns expected mapping data ', async () => {
        const domainToEmailFormatMapping: DomainToEmailFormatMapping = getDomainToEmailFormatMappingFromDataSet();
        expect(domainToEmailFormatMapping).toEqual(sampleDomainToEmailFormatMapping);
    });

    test('test determineEmailFormatType method returns expected emailFormatType', async () => {
        const  emailFormatTypeFirstNameInitalLastName: EmailFormatType = determineEmailFormatType('Jane Doe', 'jdoe');
        expect(emailFormatTypeFirstNameInitalLastName).toEqual(EmailFormatType.FIRST_NAME_INITIAL_LAST_NAME);      

        const emailFormatTypeFirstNameLastName: EmailFormatType = determineEmailFormatType('Jay Arun', 'jayarun');
        expect(emailFormatTypeFirstNameLastName).toEqual(EmailFormatType.FIRST_NAME_LAST_NAME);
    });

    test('test getEmailAddress method returns expected emailAddress when ', async () => {
        const  emailAddress1: string = getEmailAddress('Jane Doe', 'babbel.com', sampleDomainToEmailFormatMapping);
        expect(emailAddress1).toEqual('jdoe@babbel.com');      

        const emailAddress2: string = getEmailAddress('Jay Arun', 'linkedin.com', sampleDomainToEmailFormatMapping);
        expect(emailAddress2).toEqual('jayarun@linkedin.com');

        const emailAddress3: string = getEmailAddress('Robert Miller', 'slideshare.net', sampleDomainToEmailFormatMapping);
        expect(emailAddress3).toEqual('robertmiller@slideshare.net');
    });

});