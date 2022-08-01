/* 
function 
input = file
output = object where key = domain, value = firstname_lastname || firstname_initial_lastname

{
    "google.com": "firstname_lastname",
    "babbel.com": "firstname_initial_lastname"

}

*/
import {readFileSync} from 'fs';

export enum EmailFormatType {
    FIRST_NAME_LAST_NAME = "FIRST_NAME_LAST_NAME",
    FIRST_NAME_INITIAL_LAST_NAME = "FIRST_NAME_INITIAL_LAST_NAME",
  }

export type DomainToEmailFormatMapping = Record<string, EmailFormatType>;


const determineEmailFormatType = (fullName: string, emailName: string) : EmailFormatType => {
    const user = fullName.toLowerCase();
    const firstname_lastname = user.replace(/ /g, '');
    const is_first_name_last_name = (emailName === firstname_lastname);
    return is_first_name_last_name ? EmailFormatType.FIRST_NAME_LAST_NAME : EmailFormatType.FIRST_NAME_INITIAL_LAST_NAME;
}

const getDomainToEmailFormatMappingFromDataSet = (): DomainToEmailFormatMapping => {
    let mapping_info: DomainToEmailFormatMapping = {};
    const input_records = readFileSync('public/emailDataSet.json', 'utf8');
    const data = JSON.parse(input_records);
    for (const fullName in data){
        const [emailName, domain] = data[fullName].split("@"); 
        if(mapping_info.hasOwnProperty(domain) === false){
            mapping_info[domain] = determineEmailFormatType(fullName, emailName);
        }
    }
    console.log(mapping_info);
    return mapping_info;
}



const getEmailAddress = (fullName: string, domain: string, domainToEmailFormatMapping: DomainToEmailFormatMapping): string => {

    const emailFormatType: EmailFormatType = domainToEmailFormatMapping[domain] ?? EmailFormatType.FIRST_NAME_LAST_NAME;
    
    let emailName = ''
    switch(emailFormatType){
        case EmailFormatType.FIRST_NAME_LAST_NAME:
            emailName = fullName.toLowerCase().replace(/ /g, '');
            break;
        case EmailFormatType.FIRST_NAME_INITIAL_LAST_NAME:
            const lastname = fullName.split(' ')[1];
            emailName = fullName[0].toLowerCase() + lastname.toLowerCase();
            break;
    }
    return emailName + "@" + domain;
}


export {determineEmailFormatType, getDomainToEmailFormatMappingFromDataSet, getEmailAddress};