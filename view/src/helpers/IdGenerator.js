export default function* idGenerator(prepend = '', start = 0, append = '') {
    let index = start;
    while (true) {
        yield `${prepend ? prepend + '-' : ''}${index++}${append ? '-' + append : ''}`;
    }
}
