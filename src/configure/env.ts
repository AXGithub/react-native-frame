export enum envType {
    dev,
    staging,
    production
}

export const apiAddress = new Map([
    [envType.dev, 'http://106.75.11.161:9082'],
    [envType.staging, 'http://106.75.11.161:9082'],
    [envType.production, 'http://106.75.72.72:8083']
])

export const socketAddress = new Map([
    [envType.dev, 'http://117.50.93.100:3001'],
    [envType.staging, 'http://117.50.93.100:3002'],
    [envType.production, 'http://117.50.93.100:3003']
])

export function getEnvDesp(runtimeEnv: envType) {
    switch (runtimeEnv) {
        case envType.dev:
            return '内测'
        case envType.staging:
            return '外测'
        case envType.production:
            return '线上'
    }
}
