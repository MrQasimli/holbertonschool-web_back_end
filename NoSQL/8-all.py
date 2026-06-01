#!/usr/bin/env python3
"""
function that show  all documents as a collection
"""

def list_all(mongo_collection):
    """
    this is documentation, idk why we need it there
    so, this functions gets a collection, and returns all documents, values which we have there
    """
    return list(mongo_collection.find())

