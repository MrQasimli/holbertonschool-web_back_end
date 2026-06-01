#!/usr/bin/env python3
"""
function that finds especial data with the queru
"""

def schools_by_topic(mongo_collection, topic):
    """
    this is documentation, idk why we need it there
    so, this functions gets a collection, go through it and trying to find the suitabile data
    """
    return list(mongo_collection.find({"topics": topic}))
