from rich.console import Console
from datetime import datetime
import xmltodict
import html

def convert_xml_to_json(xml):
    return xmltodict.parse(xml)

def format_number(number):
    """
    Format a number to a string with commas and removes decimals
    """
    return f"{int(number):,}"

def decode_html_entities(text):
    """
    Decode HTML entities in text (e.g., &#39; to ')
    """
    return html.unescape(text)

def format_date(date):
    """
    Format a date to a string with the month and day
    """
    return datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ").strftime("%b %d, %Y")

console = Console()
