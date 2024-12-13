
from youtube_transcript_api import YouTubeTranscriptApi



class VideoExtractor:
    def extract_text_from_video(video_id):
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ""
        for line in transcript:
            text += line['text'] + " "
        return text
    


