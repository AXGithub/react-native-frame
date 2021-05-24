import React, { createContext } from 'react'

export const AuthContext = createContext(null)

export enum RouteType {
    DEFAULT = 'default',
    Main = 'Main',
    LOGIN = 'Login'
}
