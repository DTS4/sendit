import React, { createContext, useContext, useState, useEffect } from 'react';


// Create the AuthContext
const AuthContext = createContext({
 user: null,
 login: () => {},
 logout: () => {},
});


