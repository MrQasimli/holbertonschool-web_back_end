#!/usr/bin/env python3
"""
This is about asic redis file
"""
import redis
import uuid
from typing import Union, Callable, Optional, Any


class Cache:
    """This class we use for creating cache system"""

    def __init__(self) -> None:
        """
        this method initialize the Cache system in the project where it were called
        """
        if redis is None:
            self._redis = None
        else:
            self._redis = redis.Redis(host = 'localhost', port=6379)
            self._redis.flushdb()


    def store(self, data: Union[str, bytes, int, float]) -> str:
        """
        This method store key-value pair in memory Redis
        """
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key


    def get(self, key: str, fn: Optional[Callable[[bytes], Any]] = None) -> Any:
        """
        This method returns the Value of the Key, and implement function if it was given
        """
        value = self._redis.get(key)
        return value


    def get_str(self, key: str) -> Optional[str]:
        """
        This method use previous method for change the type
        """
        return self.get(key=key, fn=lambda v: v.decode('utf-8'))

    def get_int(self, key: str) -> Optional[int]:
        """
        This method use previous method for change the type
        """
        return self.get(key=key, fn=int)