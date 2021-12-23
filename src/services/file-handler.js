export const FileHandler = {
    fromDropEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer?.files?.[0];

        if (!file) {
            return Promise.reject();
        }

        return window.api.read(file.path);
    }
}
