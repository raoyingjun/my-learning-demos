function $(id) {
    return document.getElementById(id)
}

function random(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

function randomList(length, min, max) {
    return Array
        .apply(null, {length})
        .map(() => random(min, max))
}