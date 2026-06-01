#!/usr/bin/env python3
"""
function that add data tp the collection
"""

def insert_school(mongo_collection, **kwargs):
    """
    this is documentation, idk why we need it there
    so, this functions gets a collection, add the new data top the already existing collection, and returns the id
    """
    data = mongo_collection.insert_one(kwargs)
    return data.inserted_id

