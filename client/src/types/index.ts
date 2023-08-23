export interface LaunchesResponse {
  results: Result[]
  totalDocs: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface Result {
  id: string
  success: boolean
  date_utc: string
  date_unix: number
  date_local: string
  date_precision: string
  upcoming: boolean
  details: string
  flight_number: number
  name: string
  rocket: string
  links: Links
  rocket_data: RocketData
  cores: Core[]
}

export interface Links {
  id: string
  webcast: string
  patch: Patch
}

export interface Patch {
  id: string
  small: string
  large: string
}

export interface RocketData {
  name: string
}

export interface Core {
  id: string
  reused: boolean
}

export interface YearlyLaunchesDetails {
  year: number
  infos: {
    failures: number
    successes: number
    rocketLaunchSummary: RocketLaunchSummary[]
  }
}

export interface LaunchesOverallDetails {
  successes: number
  failures: number
  rocketLaunchSummary: RocketLaunchSummary[]
}

export interface RocketLaunchSummary {
  rocketName: string
  count: number
}
