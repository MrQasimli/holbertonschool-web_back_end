#!/usr/bin/env python3
"""
This is about asic redis file
"""
import redis
import uuid
from functools import wraps
from typing import Union, Callable, Optional, Any


def count_calls(method: Callable) -> Callable:
    """
    Uses functional wrapper to count calls
    """
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """
        Wraps the function
        """
        key = method.__qualname__
        self._redis.incr(key)
        return method(self, *args, **kwargs)
    return wrapper


def call_history(method: Callable) -> Callable:
    """
    Uses functional wrapper to call history
    """
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """
        Wraps the function
        """
        inputs_key = f"{method.__qualname__}:inputs"
        outputs_key = f"{method.__qualname__}:outputs"
        self._redis.rpush(inputs_key, str(args))
        result = method(self, *args, **kwargs)
        self._redis.rpush(outputs_key, str(result))
        return result
    return wrapper


def replay(method: Callable) -> None:
    """
    Replays the method and returns count of calls and history of calls
    """
    r = method.__self__._redis
    name = method.__qualname__
    count = r.get(name).decode('utf-8') if r.get(name) else '0'

    inputs = r.lrange(f"{name}:inputs", 0, -1)
    outputs = r.lrange(f"{name}:outputs", 0, -1)

    print(f"{name} was called {count} times:")

    for inp, out in zip(inputs, outputs):
        print(f"{name}(*{inp.decode('utf-8')})")


class Cache:
    """This class we use for creating cache system"""

    def __init__(self) -> None:
        """
        this method initialize the Cache system
        in the project where it were called
        """

        self._redis = redis.Redis(host='localhost', port=6379)
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> Union[str, int]:
        """
        This method store key-value pair in memory Redis
        """
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(
            self,
            key: str,
            fn: Optional[Callable[[bytes], Any]] = None
    ) -> Any:
        """
        This method returns the Value of the Key,
        and implement function if it was given
        """
        value = self._redis.get(key)
        if value is None:
            return None
        if fn is not None:
            return fn(value)
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
