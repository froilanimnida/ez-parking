import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import TextInputComponent from "@/components/TextInputComponent";

interface ParkingOwnerInfoCardStateProps {
    owner_type: string;
    company_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    email: string;
    phone_number: string;
    name: string;
    company_reg_number: string;
    tin: string;
    handleParkingOwnerInfo: (key: string, value: any) => void;
    handleParkingEstablishmentDataChange: (key: string, value: any) => void;
    handleCompanyInfoChange: (key: string, value: any) => void;
}

const ParkingOwnerInfoCard = ({
    owner_type,
    company_name,
    first_name,
    middle_name,
    company_reg_number,
    last_name,
    suffix,
    email,
    phone_number,
    tin,
    name,
    handleParkingOwnerInfo,
    handleParkingEstablishmentDataChange,
    handleCompanyInfoChange,
}: ParkingOwnerInfoCardStateProps) => {
    return (
        <CardComponent
            header="Owner Information"
            subHeader="Enter your information below"
            customStyles={{ width: "95%" }}
        >
            <View style={styles.form}>
                <SelectComponent
                    items={[
                        { label: "Individual", value: "individual" },
                        { label: "Company", value: "company" },
                    ]}
                    selectedValue={owner_type}
                    onValueChange={(value) => handleCompanyInfoChange("owner_type", value)}
                />

                {owner_type === "company" ? (
                    <View style={styles.formGroup}>
                        <TextInputComponent
                            placeholder="Company Name"
                            value={company_name}
                            onChangeText={(value) => handleCompanyInfoChange("company_name", value)}
                        />
                        <TextInputComponent
                            placeholder="Company Registration Number"
                            value={company_reg_number}
                            onChangeText={(value) => handleCompanyInfoChange("company_reg_number", value)}
                        />
                    </View>
                ) : (
                    <View style={styles.formGroup}>
                        <TextInputComponent
                            placeholder="First Name"
                            value={first_name}
                            onChangeText={(value) => handleParkingOwnerInfo("first_name", value)}
                        />
                        <TextInputComponent
                            placeholder="Middle Name (optional)"
                            value={middle_name}
                            onChangeText={(value) => handleParkingOwnerInfo("last_name", value)}
                        />
                        <TextInputComponent
                            placeholder="Last Name"
                            value={last_name}
                            onChangeText={(value) => handleParkingOwnerInfo("last_name", value)}
                        />
                        <TextInputComponent
                            placeholder="Suffix (optional)"
                            value={suffix}
                            onChangeText={(value) => handleParkingOwnerInfo("suffix", value)}
                        />
                    </View>
                )}

                <View style={styles.formGroup}>
                    <TextInputComponent
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => handleParkingOwnerInfo("email", value)}
                        keyboardType="email-address"
                    />
                    <TextInputComponent
                        placeholder="Phone Number"
                        value={phone_number}
                        onChangeText={(value) => handleParkingOwnerInfo("phone_number", value)}
                        keyboardType="phone-pad"
                    />
                </View>

                <TextInputComponent
                    placeholder="TIN (Tax Identification Number)"
                    value={tin}
                    onChangeText={(value) => handleCompanyInfoChange("tin", value)}
                />

                <TextInputComponent
                    placeholder="Parking Establishment Name"
                    value={name}
                    onChangeText={(value) => handleParkingEstablishmentDataChange("name", value)}
                />
            </View>
        </CardComponent>
    );
};

export default ParkingOwnerInfoCard;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    formGroup: {
        gap: 16,
    },
});
