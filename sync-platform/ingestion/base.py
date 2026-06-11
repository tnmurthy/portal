from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseConnector(ABC):
    """
    Abstract Base Class for all Ingestion Connectors.
    Acting as Ingestion-Engineer.
    """

    @abstractmethod
    def fetch_all(self) -> List[Dict[str, Any]]:
        """
        Fetch all available data from the source.
        Returns a list of dictionaries, each representing a document.
        Required keys: 'content', 'external_id', 'title', 'source_url'
        """
        pass

    @abstractmethod
    def verify_auth(self) -> bool:
        """
        Verify that the connector can authenticate with the source.
        """
        pass
