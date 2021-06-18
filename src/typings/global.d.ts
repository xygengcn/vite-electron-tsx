import store from '../render/store';
declare global {
    interface Window {
        $store: typeof store,
        hello: () => void
    }
}

export default global