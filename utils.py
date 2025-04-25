import xmltodict

def convert_xml_to_json(xml):
    return xmltodict.parse(xml)

