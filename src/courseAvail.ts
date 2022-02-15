import axios from 'axios'

export enum Quarters {
    'Summer' = 60,
    'Spring' = 40,
    'Winter' = 20,
    'Fall'   = 0,
}

export interface CourseSearchResult {
    value:   string;
    label:   string;
    subject: string;
    s:       string;
    d:       string;
}

export interface Department {
    value:  string;
    label:  string;
    school: string;
}

export interface Pathway {
    value: string;
    label: string;
}

export const BASE_URL = 'https://www.scu.edu/apps/ws/courseavail/search'

export class Client {
    constructor() { }

    // Convert quarter string to code
    resolveQuarter(quarter: String) {
        if(!quarter) quarter = 'Spring 2022'

        let parts = quarter.split(' ')

        let season = Quarters[parts[0]] 
        let year = (parseInt(parts[1]) - 1979) * 100

        if(season === Quarters['Fall']) year += 100
        return season + year
    }

    search(query: string, quarter: string, underGrad: Boolean = true, maxResults: number = 300) {
        return new Promise(async (resolve, reject) => {
            const body = `q=${query.split(' ').join('+')}&maxRes=${maxResults}`
            
            let quarterUrlComponent = this.resolveQuarter(quarter)
            let gradUrlComponent    = underGrad ? 'ugrad' : 'grad'
            
            let response = await axios.post(`${BASE_URL}/${quarterUrlComponent}/${gradUrlComponent}`, {
                body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).catch(reject)

            if(response) {
                let json = response.data
                
                if(json.results) {
                    json.results = json.results.map((course: Object) => new Course(course))
                    resolve(json.results)
                } else {
                    reject(response)
                }
            }
        })
    }
}

class Course {
    term:                      string;
    strm_descr:                string;
    subject:                   string;
    subject_descr:             string;
    catalog_nbr:               string;
    class_nbr:                 string;
    class_descr:               string;
    mtg_days_1:                string;
    mtg_time_beg_hr_1:         string;
    mtg_time_beg_1:            string;
    mtg_time_end_1:            string;
    ctype:                     string;
    mtg_facility_1:            string;
    instr_1:                   string;
    instr_2:                   string;
    instr_3:                   string;
    mtg_days_2:                string;
    mtg_time_beg_2:            string;
    mtg_time_end_2:            string;
    mtg_facility_2:            string;
    private seats_remaining:   string;
    topic:                     string;
    units_minimum:             string;
    units_maximum:             string;
    session:                   string;
    loc_id:                    string;
    lat:                       string;
    long:                      string;
    l_cname:                   string;
    l_img:                     string;
    l_name:                    string;
    l_flr:                     string;
    l_flcid:                   string;
    strm_abbr:                 string;
    instr_1_sh:                string;
    instr_2_sh:                string;
    time1_fr:                  string;
    c_hrstart:                 string;
    c_mnstart:                 string;
    c_duration:                number;
    c_hrstart2:                string;
    c_mnstart2:                string;
    c_duration2:               string;
    time2_fr:                  string;
    seats_text:                string;
    has_seats:                 number;

    constructor(courseInfo: Object) {
        Object.assign(this, courseInfo)
    }

    get instructor() {
        return this.instr_1
    }

    get seats() {
        return parseInt(this.seats_remaining)
    }

    get isFull () {
        return this.has_seats > 0
    }
}