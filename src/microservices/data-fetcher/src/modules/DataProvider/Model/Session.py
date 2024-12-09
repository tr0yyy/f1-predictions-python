class Session:
    def __init__(self, circuit_key, circuit_short_name, country_code, country_key, country_name, date_end,
                 date_start, gmt_offset, location, meeting_key, session_key, session_name, session_type, year):
        self.circuit_key = circuit_key
        self.circuit_short_name = circuit_short_name
        self.country_code = country_code
        self.country_key = country_key
        self.country_name = country_name
        self.date_end = date_end
        self.date_start = date_start
        self.gmt_offset = gmt_offset
        self.location = location
        self.meeting_key = meeting_key
        self.session_key = session_key
        self.session_name = session_name
        self.session_type = session_type
        self.year = year
