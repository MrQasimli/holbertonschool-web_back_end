#!/usr/bin/env python3
"""
function that update data in the collection
"""

def update_topics(mongo_collection, name, topics):
    """
    this is documentation, idk why we need it there
    so, this functions gets a colllection, updated the new data to the already existing document
    """
    return mongo_collection.update_many(
        {"name": name},
            {"$set": {"topics": topics}
        }
    )
