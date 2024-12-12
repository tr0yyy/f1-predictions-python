from dataclasses import dataclass


@dataclass
class Driver:
    def __init__(self, broadcast_name, country_code, driver_number, first_name, full_name,
                 headshot_url, last_name, meeting_key, name_acronym, session_key, team_colour, team_name):
        self.broadcast_name = broadcast_name
        self.country_code = country_code
        self.driver_number = driver_number
        self.first_name = first_name
        self.full_name = full_name
        self.headshot_url = headshot_url
        self.last_name = last_name
        self.meeting_key = meeting_key
        self.name_acronym = name_acronym
        self.session_key = session_key
        self.team_colour = team_colour
        self.team_name = team_name

