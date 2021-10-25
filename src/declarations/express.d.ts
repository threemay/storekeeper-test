declare namespace Express {
  export interface Response {
    formatResponse: <T = any>(payload: T, pagination?: Pagination) => void;
  }
}
