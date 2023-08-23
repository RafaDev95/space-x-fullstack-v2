import { Router } from 'express'

export interface Controller {
  path: string
  router: Router
}

export interface YearlyLaunchesResponse {
  successes: number
  failures: number
  rocketLaunchSummary: {
    [rocketName: string]: number
  }
}

export interface RocketLaunchSummary {
  [key: string]: number
}

export interface YearlySummaries extends YearlyLaunchesResponse {
  year: number
}

export interface LaunchesResponse {
  results: Result[]
  totalDocs: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface LaunchesDetails {
  success: boolean | null
  rocket_data: RocketData | null
  cores: Core[]
}

export interface Result {
  id: string
  success: boolean
  date_utc: string
  date_unix: number
  date_local: string
  date_precision: string
  upcoming: boolean
  details?: string
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
  launchId: string
  patch: Patch
}

export interface Patch {
  id: string
  small: string
  large: string
  linkId: string
}

export interface RocketData {
  name: string
}

export interface Core {
  id: string
  reused: boolean | null
  launchId: string
}
