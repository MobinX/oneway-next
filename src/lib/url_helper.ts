import { YoutubeTranscript } from 'youtube-transcript';


export const transcriptionFromYoutubeUrl = async (url: string) => {
    const transcriptsArray = await YoutubeTranscript.fetchTranscript(url);
    let transcripts = ""
    for(const transcript of transcriptsArray) {
        transcripts = transcripts + " " + transcript.text
    }
    return {
        text:transcripts , lang: transcriptsArray[0].lang
    }
}

