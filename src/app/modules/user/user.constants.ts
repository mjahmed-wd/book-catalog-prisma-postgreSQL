export const userFilterableFields: string[] = [
    'role',
    'email',
    'contactNo'
];

export const userSearchableFields: string[] = [
    'name',
    'email',
    'contactNo',
    'id'
];

export const userRelationalFields: string[] = [
    'reviewAndRatings',
    'orders'
];
export const userRelationalFieldsMapper: { [key: string]: string } = {
    academicFacultyId: 'academicFaculty',
    academicDepartmentId: 'academicDepartment',
    academicSemesterId: 'academicSemester'
};
