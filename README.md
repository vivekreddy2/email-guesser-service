# Email Guesser Service


## Project Description :

This is an express application service that exposes a single API end point using express i.e `GET \users\emailAddress` that requires query params `fullName` and `domain`.
This API determines and responds with the email address from fullName and domain by referring to email data-set that has full name to email address mapping

## Usage :
* Install node, recommended version - v18.4.0
* run `npm install` inside the project to install all the dependencies
* run `npm run dev` to start development server
* run `npx tsc && npm start` to start production server
* run `npm test` to run unit tests

## Example :
* GET http://localhost:8080/users/email-address?fullName=Nina%20Simons&domain=babbel.com responds with `
{
  "emailAddress": "nsimons@babbel.com"
}
`

* GET http://localhost:8080/users/email-address?fullName=Priya%20Kuber&domain=linkedin.com responds with `{
  "emailAddress": "priyakuber@linkedin.com"
}`



---

© 2022 MIT