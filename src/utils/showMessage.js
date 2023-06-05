export const showMessage = (delay, setState) => {
    setState(true)

    setTimeout(() => setState(false), delay)
}