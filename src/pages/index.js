import Button from 'components/ui/button/Button';
import Input from 'components/ui/input/Input';
import NoteInput from 'components/ui/input/NoteInput';
import constants from 'constants/Const';
import { useState } from 'react';
import { Piano, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import styled from 'styled-components';
import Sound from 'utils/BrowserBeep';
import MusicUtil from 'utils/MusicUtil';

const IndexPageContainer = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    padding: 16px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const InputContainer = styled.div`
    display: flex;
    gap: 64px;
    justify-content: center;
    align-items: center;
`;

const InputWrapper = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
`;
const PianoContainer = styled.div`
    width: 1600px;
`;

const ButtonContent = styled.div`
    font-family: Montserrat;
    font-weight: bold;
    font-size: 14px;
    color: #ffffff;
    line-height: 32px;
`;

export default function Home() {
    const [notes, setNotes] = useState('');
    const [bpm, setBPM] = useState(120);
    const [rhythm, setRhythm] = useState(4);
    const NOTES = constants.OCTAVE_NUMBERS.reduce((notes, octaveNumber) => {
        const notesInOctave = constants.TONES.map(
            (tone) => `${tone}${octaveNumber}`
        );
        return [...notes, ...notesInOctave];
    }, []);

    const firstNote = MidiNumbers.fromNote('c1');
    const lastNote = MidiNumbers.fromNote('b7');
    const keyboardShortcuts = NOTES.map((note) => {
        return {
            midiNumber: MidiNumbers.fromNote(note),
            key: constants.SYLLABLE_NAME[constants.TONES.indexOf(note[0])],
        };
    });

    const sound = new Sound();

    return (
        <IndexPageContainer>
            <InputContainer>
                <InputWrapper>
                    <div>BPM:</div>
                    <Input value={bpm} setValue={setBPM} />
                </InputWrapper>
                <InputWrapper>
                    <div>Rhythm:</div>
                    <Input value={rhythm} setValue={setRhythm} />
                </InputWrapper>
            </InputContainer>
            <NoteInput
                notes={notes}
                setNotes={setNotes}
                bpm={bpm}
                rhythm={rhythm}
                sound={sound}
            />
            <Button
                onClick={() => {
                    setNotes(
                        '5A.5A.5A#5A5G5A5A.5G.5F.5G.5F.5F.5G5F5E5F5D-......'
                    );
                    setBPM(150);
                    setRhythm(16);
                }}
            >
                <ButtonContent>Sample</ButtonContent>
            </Button>
            <PianoContainer>
                <Piano
                    noteRange={{ first: firstNote, last: lastNote }}
                    playNote={(midiNumber) => {
                        const note = MusicUtil.convertNote(
                            MidiNumbers.getAttributes(midiNumber).note
                        );
                        setNotes(notes + note);
                        sound.play(MusicUtil.getFrequency(note), 0.4);
                        // Play a given note - see notes below
                    }}
                    stopNote={(midiNumber) => {
                        // Stop playing a given note - see notes below
                    }}
                    width={1600}
                    keyboardShortcuts={keyboardShortcuts}
                />
            </PianoContainer>
        </IndexPageContainer>
    );
}
