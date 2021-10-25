export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    count: number;
}
export interface GenericResponse {
    data?: any;
    pagination?: Pagination;
    error?: string;
}
export declare enum Gender {
    male = "male",
    female = "female"
}
export declare enum Role {
    manager = "manager",
    receptionist = "receptionist",
    therapist = "therapist"
}
