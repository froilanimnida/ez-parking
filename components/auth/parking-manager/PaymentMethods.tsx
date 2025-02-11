import { StyleSheet, View } from "react-native";
import React from "react";
import CardComponent from "@/components/CardComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import TextInputComponent from "@/components/TextInputComponent";

interface PaymentMethodStateProps {
    accepts_cash: boolean;
    accepts_mobile: boolean;
    accepts_other: boolean;
    other_methods: string;
    handlePaymentDataChange: (key: string, value: any) => void;
}

const PaymentMethods = ({
    accepts_cash,
    accepts_mobile,
    accepts_other,
    other_methods,
    handlePaymentDataChange,
}: PaymentMethodStateProps) => {
    return (
        <CardComponent
            header="Accepted Payment Methods"
            subHeader="Select available payment options"
            customStyles={{ width: "95%" }}
        >
            <View style={styles.form}>
                <View style={styles.checkboxGroup}>
                    <CheckboxComponent
                        placeholder="Cash"
                        value={accepts_cash}
                        onValueChange={(value) => handlePaymentDataChange("accepts_cash", value)}
                    />

                    <CheckboxComponent
                        placeholder="Mobile Payment"
                        value={accepts_mobile}
                        onValueChange={(value) => handlePaymentDataChange("accepts_mobile", value)}
                    />

                    <View style={styles.otherPaymentContainer}>
                        <CheckboxComponent
                            placeholder="Other"
                            value={accepts_other}
                            onValueChange={(value) => handlePaymentDataChange("accepts_other", value)}
                        />
                        <TextInputComponent
                            placeholder="Specify other payment method"
                            value={other_methods}
                            onChangeText={(value) => handlePaymentDataChange("other_methods", value)}
                            editable={accepts_other}
                            customStyles={[styles.otherInput, !other_methods && styles.disabledInput]}
                        />
                    </View>
                </View>
            </View>
        </CardComponent>
    );
};

export default PaymentMethods;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    checkboxGroup: {
        gap: 16,
    },
    otherPaymentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    otherInput: {
        flex: 1,
    },
    disabledInput: {
        backgroundColor: "#F3F4F6",
    },
});
