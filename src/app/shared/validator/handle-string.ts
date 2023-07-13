export class HandleString {
    static trim(string: string): string {
        if (string && string.length > 0 && string.includes(' ')) {
            string = string
                .split(' ')
                .filter((item) => {
                    return item !== '';
                })
                .join(' ');
        }
        return string;
    }
}
