export default function validateSize(input) {
    const fileSize = input.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
        alert('Ukuran file anda melebihi 500kb!');
        return false
    } else {
        return true
    }
}