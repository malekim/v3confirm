import { Plugin } from 'vue';
interface ConfirmOptions {
    root?: string;
    yesText?: string;
    noText?: string;
}
declare const VueConfirmPlugin: Plugin;
declare const useConfirm: (customKey?: string) => unknown;
export default VueConfirmPlugin;
export { useConfirm, ConfirmOptions };
