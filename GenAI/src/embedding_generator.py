from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document

class EmbeddingGenerator:
    def __init__(self, model_name='sentence-transformers/all-MiniLM-L6-v2'):
        self.encoder = SentenceTransformer(model_name)

    def generate_embeddings(self, text_list):
        embeddings = self.encoder.encode(text_list)
        return embeddings


class RecursiveTextSplitter:
    def split_text(text, max_length=512, overlap=50):
        splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", "."],
        chunk_size = max_length,
        chunk_overlap = overlap
        )
        chunks = splitter.split_documents([Document(text)])
        return chunks