export type Message = {
    sender: 'local' | 'remote';
    content: string;
};