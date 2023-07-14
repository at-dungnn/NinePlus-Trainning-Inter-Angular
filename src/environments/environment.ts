// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'api',
    defaultApiBasePath: 'http://a1lplatform.com:7521/api',
    session_expiry: 1000,
    originPath: 'http://localhost:4200',
    apiVersion: '',
    application_key: '',
    application_id: '',
    supporterEmail: '',
};