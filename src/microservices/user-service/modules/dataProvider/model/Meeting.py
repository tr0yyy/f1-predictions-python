from dataclasses import dataclass


@dataclass
class Meeting:
    def __init__(self, circuit_key, circuit_short_name, country_code, country_key, country_name, date_start,
                 gmt_offset, location, meeting_key, meeting_name, meeting_official_name, year):
        self.circuit_key = circuit_key
        self.circuit_short_name = circuit_short_name
        self.country_code = country_code
        self.country_key = country_key
        self.country_name = country_name
        self.date_start = date_start
        self.gmt_offset = gmt_offset
        self.location = location
        self.meeting_key = meeting_key
        self.meeting_name = meeting_name
        self.meeting_official_name = meeting_official_name
        self.year = year
