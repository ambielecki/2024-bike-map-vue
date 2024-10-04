export function useHasErrors(errors) {
    let return_value = false;

    for (const field in errors.value) {
        if (errors.value[field].length > 0) {
            return_value = true;
            break;
        }
    }

    return return_value;
}