#!/usr/bin/env python3
"""
This is about asic redis file
"""
try:
    import redis
except ImportError:
    redis = None
import uuid
from typing import Union


class Cache:
    """This class we use for creating cache system"""

    def __init__(self) -> None:
        """
        this method initialize the Cache system in the project where it were called
        """
        if redis is None:
            self._redis = None
        else:
            self._redis = redis.Redis(host = 'localhost', port=6379, decode_responses=True)
            self._redis.flushdb()


    def store(self, data: Union[str, bytes, int, float]) -> str:
        if redis is not None:
            key = str(uuid.uuid4())
            self._redis.set(key, data)
            return key
        return 1

