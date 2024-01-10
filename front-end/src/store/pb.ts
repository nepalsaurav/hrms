import PocketBase from 'pocketbase'
class SingletonPb {
    private static instance: SingletonPb
    private constructor() { }
    public static getInstance(): SingletonPb {
        if (!SingletonPb.instance) {
            SingletonPb.instance = new SingletonPb()
        }
        return SingletonPb.instance
    }
    public getPocketbaseInstance(url: string) {
        return new PocketBase(url)
    }
}

const singletonpb = SingletonPb.getInstance()
export const pb = singletonpb.getPocketbaseInstance("http://127.0.0.1:8090")