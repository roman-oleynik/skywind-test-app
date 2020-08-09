export const throttling = (func: () => void, calls: number): (() => void) => {
    let count = 0;

    return () => {
        count++;
        if (count % calls === 0) {
            func();
        }
    };
};
