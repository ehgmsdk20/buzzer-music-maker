import constants from 'constants/Const';
const MusicUtil = {
    convertNote: (note) => {
        if (note.length === 2) {
            return note[1] + note[0];
        }
        if (note[0] === 'A') {
            return note[2] + 'G#';
        }
        return note[2] + String.fromCharCode(note[0].charCodeAt(0) - 1) + '#';
    },
    getFrequency: (note) => {
        if (
            constants.FREQUENCY[note.slice(1)] &&
            constants.FREQUENCY[note.slice(1)][note[0] - 1]
        ) {
            return constants.FREQUENCY[note.slice(1)][note[0] - 1];
        } else {
            alert(`Wrong note: ${note}`);
            return 0;
        }
    },
};

export default MusicUtil;
