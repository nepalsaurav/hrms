export function snakeCaseToHuman(text: string) {
    return text.replace(/_/g, ' ')
        .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}