export interface DomainData {
  authenticate: AuthenticateState
}

export interface AuthenticateState {
  id: string
  email: string
  name: string
  isAdmin: boolean
  signUpJobDone: boolean
  loginStatus: boolean
  user: object
}
