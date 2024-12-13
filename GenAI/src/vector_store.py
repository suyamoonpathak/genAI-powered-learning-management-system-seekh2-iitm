import faiss
import numpy as np

class VectorStore:
    def __init__(self, dimension):
        self.index = faiss.IndexFlatL2(dimension)

    def add_embeddings(self, embeddings):
        if isinstance(embeddings, list):
            embeddings = np.vstack(embeddings)
        self.index.add(embeddings)

    def search(self, query_embedding, k=5):
        D, I = self.index.search(query_embedding, k)
        return D, I

    def save_index(self, file_path):
        faiss.write_index(self.index, file_path)

    def load_index(self, file_path):
        self.index = faiss.read_index(file_path)
