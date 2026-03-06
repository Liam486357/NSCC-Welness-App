export const msalConfig = {
    auth: {
        clientId: "your-client-id-here",
        authority: "https://login.microsfotonline.com/your-tenant-id-here",
        redirecftUri: "http://localhost:5173", //This MUST match the URI in Azure
    },
    cache: {
        cacheLocation: "sessionStorage", //or localStorage
        storeAuthStateInCookie: false,
    },
};

export const msalRequest ={
    scopes: []
};