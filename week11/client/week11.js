import { makeRequest } from "./authHelpers.js";

import Auth from "./auth.js";

const auth = new Auth();
auth.login();

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
    });
