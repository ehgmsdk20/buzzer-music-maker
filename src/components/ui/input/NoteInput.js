import styled from "styled-components"
import MusicUtil from "utils/MusicUtil";
import Button from "../button/Button";

const AddressInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Input = styled.textarea`
    unset: all;
    padding-left: 16px;
    width: 600px;
    min-height: 48px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: Montserrat;
    font-weight: normal;
    font-size: 14px;
    line-height: 32px;
    &:focus, &:hover {
        border: 1px solid #000000;
    }
`;

const ButtonContent = styled.div`
    font-family: Montserrat;
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 32px;
`;

const NoteInput = (props) => {
    const { notes, setNotes, sound, bpm, rhythm } = props;

    const interval = 60 / (bpm * (rhythm / 4));

    const playMusic = (notes) => {
        const score = notes.split(/(?=[1-7])/);
        let music = new Array();
        for (let i=0; i<score.length; i++){
            if (score[i].length === 2) {
                music.push(score[i]);
            } else if (score[i].length > 2) {
                let duration = 0;
                let term = 0;
                let index = 0;
                switch (score[i][2]) {
                    case '#':
                        index = 3;
                        music.push(score[i].slice(0,3));
                        break;
                    default:
                        index = 2;
                        music.push(score[i].slice(0,2));
                        break;

                }
                for (index; index < score[i].length; index ++) {
                    if (score[i][index] === '-') duration++;
                    if (score[i][index] === '.') term++;
                }
                if (duration > 0) {
                    music[music.length - 1] = music[music.length - 1]+duration;
                    music = music.concat(new Array(duration));
                }
                if (term > 0) {
                    music = music.concat(new Array(term));
                }
            }
        }
        let index = 0;
        const musicPlayer = setInterval(() => {
            if (index >= music.length) return clearInterval(musicPlayer);
            if (music[index]) {
                let duration = interval;
                let note = music[index];
                if (music[index][2] >= '0' && music[index][2]<='9'){
                    duration += (parseInt(music[index][2]) * interval);
                    note = music[index].slice(0, -1);
                }
                sound.play(MusicUtil.getFrequency(note), duration);
            }
            index ++;

        }, interval * 1000)

    }

    return (
        <AddressInputWrapper>
            <Input
                placeholder={'Your music'}
                onChange={(event) => {
                    setNotes(event.target.value);
                }}
                value={notes}
            />
            <Button onClick={() => playMusic(notes)}>
                <ButtonContent>
                    Play
                </ButtonContent>
            </Button>
        </AddressInputWrapper>

    )
}

export default NoteInput;