export class TestUtil {
    static getPrivatePropertyValue<T>(object: any, propertyName: string): T {
        return object[propertyName] as T;
    }
}