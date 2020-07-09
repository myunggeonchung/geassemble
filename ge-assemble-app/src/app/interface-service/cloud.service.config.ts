
namespace Config {
    export namespace Field {
        export const AccountApplicationId = '6c454f4c53673173385179514c4348616e452b63'
        export const AccountClienctId = '55527330624d73306a63565a554f612b337a3842';
        export const AccountClientSecret = '714c6574425736715763426e35554778625351684b4f654f3847654d7343733d';

        export const SonosIntegrationId = 'b77844c8778c7d77263eb10f9552c7060c4bde59';

        export const HostNameAccout = 'https://accounts-fld.brillion.geappliances.com';
        export const HostNameCloudApi = 'https://api-fld.brillion.geappliances.com';
        export const HostNameOauth = 'https://oauth2-fld.brillion.geappliances.com';

        export const ApplicationBundleName = 'com.ge.kitchen.wca.ent2.ios';

        export const MobileDeviceToken = {
            kind: 'mdt#mdt',
            userId: 'rosd6o6zzidnw0z',
            mdt: 'ue1d6xcK42x1OKPkcYR2OiVgAB723D6mQ4qt'
        };
    }

    export namespace Market {
        export const AccountApplicationId = '4e617a766474657344444e562b5935566e51324a'
        export const AccountClienctId = '564c31616c4f7474434b307435412b4d2f6e7672';
        export const AccountClientSecret = '6476512b5246446d452f697154444941387052645938466e5671746e5847593d';
        export const SonosIntegrationId = 'ee21425ff9263d7505434d2fda2e577ecf5a40f8';

        export const HostNameAccout = 'https://accounts.brillion.geappliances.com';
        export const HostNameCloudApi = 'https://api.brillion.geappliances.com';
        export const HostNameOauth = 'https://oauth2.brillion.geappliances.com';

        export const ApplicationBundleName = 'com.ge.kitchen.wca.prd.ios';

        // Have to change
        export const MobileDeviceToken = {
            kind: 'mdt#mdt',
            userId: 'rosd6o6zzidnw0z',
            mdt: 'ue1dTgZq3IoCs5SNHvHWQUttYe2djeJXfmsH'
        };
    }
}

export namespace Configure {

    const isField = false;

    export const CloudApiUriGeToken = '/oauth2/token';

    export namespace WebSocket {
        export const UserId = '3n75bk1r5w2enfa';
        export const EndPoint = 'wss://ws-fld-us-east-1.brillion.geappliances.com?access_token=ue1cfth3t8p7f18zquetcqqc0f59x38i';
        // export const WsEndPoint = 'ws://localhost:3000';
        export const ReconnectInterval = 5000;

        export namespace MessageType {
            export const Connect        = 'websocket#connect';
            export const Subscribe      = 'websocket#subscribe';
            export const Subscription   = 'websocket#subscription';
            export const Presence       = 'websocket#presence';
            export const Api            = 'websocket#api';
            export const Ping           = 'websocket#ping';
            export const Pong           = 'websocket#pong';
            export const Error          = 'websocket#error';
        }

        export namespace ApiType {
            export const ApplianceList  = 'list-appliances';
        }

        export namespace ApplianceId {
            export const Oven           = 'D828C933F73C';
            export const AirCon         = 'D828C93913CD';
            export const Washer         = '';
        }

        export function getApiHost(): string {
            return (isField) ? 'api-fld.brillion.geappliances.com' : 'api.brillion.geappliances.com';
        }
    }

    export function getAccountApplicationId(): string {
        return (isField) ? Config.Field.AccountApplicationId : Config.Market.AccountApplicationId;
    }

    export function getAccountClienctId(): string {
        return (isField) ? Config.Field.AccountClienctId : Config.Market.AccountClienctId;
    }

    export function getAccountClientSecret(): string {
        return (isField) ? Config.Field.AccountClientSecret : Config.Market.AccountClientSecret;
    }

    export function getSonosIntegrationId(): string {
        return (isField) ? Config.Field.SonosIntegrationId : Config.Market.SonosIntegrationId;
    }

    export function getHostNameAccout(): string {
        return (isField) ? Config.Field.HostNameAccout : Config.Market.HostNameAccout;
    }

    export function getHostNameCloudApi(): string {
        return (isField) ? Config.Field.HostNameCloudApi : Config.Market.HostNameCloudApi;
    }

    export function getHostNameOauth(): string {
        return (isField) ? Config.Field.HostNameOauth : Config.Market.HostNameOauth;
    }

    export function getApplicationBundleName(): string {
        return (isField) ? Config.Field.ApplicationBundleName : Config.Market.ApplicationBundleName;
    }

    export function getMobileDeviceToken(): string {
        return (isField) ? Config.Field.MobileDeviceToken.mdt : Config.Market.MobileDeviceToken.mdt;
    }

    export function getUserId(): string {
        return (isField) ? Config.Field.MobileDeviceToken.userId : Config.Market.MobileDeviceToken.userId;
    }
}