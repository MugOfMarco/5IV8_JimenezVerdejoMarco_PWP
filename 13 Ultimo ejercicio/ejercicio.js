function memoize(fn) {
    const cache = new Map();
    const RES = Symbol('res');

    return function(...args) {
        let nodo = cache;

        for (const arg of args) {
            if (!nodo.has(arg)) {
                nodo.set(arg, new Map());
            }
            nodo = nodo.get(arg);
        }

        if (nodo.has(RES)) {
            return nodo.get(RES);
        }

        const res = fn(...args);
        nodo.set(RES, res);
        return res;
    }
}
