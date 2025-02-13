import axiosInstance from "../axiosInstance";

const root = "/user" as const;

export const fetchUsers = async () => {
    const result = await axiosInstance.get(`/admin/users`);
    return result;
};

export const createAccount = async (
    email: string,
    middleName: string,
    firstName: string,
    lastName: string,
    phone: string,
    nickname: string,
    plateNumber: string,
    suffix: string
) => {
    const result = await axiosInstance.post(`${root}/create-new-account`, {
        user: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            phone_number: phone as string,
            plate_number: plateNumber,
            nickname: nickname,
            suffix: suffix,
        },
    });
    return result;
};
