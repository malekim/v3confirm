import { defineComponent } from 'vue';
declare const renderConfirm: (resolve: (value: boolean | PromiseLike<boolean>) => void) => ReturnType<typeof defineComponent>;
export { renderConfirm };
