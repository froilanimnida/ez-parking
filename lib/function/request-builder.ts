export default function buildRequestPayload(formData: FormData) {
    const filesFormData = new FormData();
    const is24_7 = String(formData.get('is247')).toLowerCase() === 'true';
    const OWNER_TYPE = (formData.get('ownerType') as string).toLowerCase();
    const documents = [
        { key: 'govId', name: 'gov_id' },
        { key: 'parkingPhotos', name: 'parking_photos', multiple: true },
        { key: 'proofOfOwnership', name: 'proof_of_ownership' },
        { key: 'birCert', name: 'bir_cert' },
        { key: 'liabilityInsurance', name: 'liability_insurance' },
        { key: 'businessCert', name: 'business_cert' }
    ];

    documents.forEach(({ key, name, multiple }) => {
        if (multiple) {
            const files = formData.getAll(key);
            files.forEach((file, index) => {
                if (file instanceof File) {
                    filesFormData.append(`${name}[${index}]`, file);
                }
            });
        } else {
            const file = formData.get(key);
            if (file instanceof File) {
                filesFormData.append(name, file);
            }
        }
    });

    const signUpData = {
        user: {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            middle_name: formData.get('middleName') as string,
            suffix: formData.get('suffix') as string,
            email: formData.get('email') as string,
            phone_number: formData.get('contactNumber') as string
        },
        company_profile: {
            owner_type: OWNER_TYPE,
            company_name: formData.get('companyName') as string,
            company_reg_number: formData.get('companyRegistrationNumber') as string,
            tin: formData.get('tin') as string
        },
        address: {
            street: formData.get('streetAddress') as string,
            barangay: formData.get('barangay') as string,
            city: formData.get('city') as string,
            province: (formData.get('province') as string) ?? '',
            postal_code: formData.get('postalCode') as string
        },
        parking_establishment: {
            space_type: formData.get('spaceType') as string,
            space_layout: formData.get('spaceLayout') as string,
            custom_layout: (formData.get('customLayout') as string) ?? '',
            dimensions: formData.get('spaceDimensions') as string,
            is24_7: is24_7,
            access_info: formData.get('accessInformation') as string,
            custom_access: (formData.get('customAccessInformation') as string) ?? '',
            name: formData.get('name') as string,
            lighting: formData.get('lightingAndSecurity') as string,
            accessibility: formData.get('accessibility') as string,
            facilities: formData.get('nearbyFacilities') as string,
            longitude: formData.get('longitude') as string,
            latitude: formData.get('latitude') as string,
            nearby_landmarks: formData.get('landmarks') as string
        },

        operating_hour: is24_7
            ? {
                  monday: { enabled: true, open: '00:00', close: '23:59' },
                  tuesday: { enabled: true, open: '00:00', close: '23:59' },
                  wednesday: { enabled: true, open: '00:00', close: '23:59' },
                  thursday: { enabled: true, open: '00:00', close: '23:59' },
                  friday: { enabled: true, open: '00:00', close: '23:59' },
                  saturday: { enabled: true, open: '00:00', close: '23:59' },
                  sunday: { enabled: true, open: '00:00', close: '23:59' }
              }
            : {
                  monday: {
                      enabled: String(formData.get('mondayEnabled')).toLowerCase() === 'true',
                      open: formData.get('mondayOpen') as string,
                      close: formData.get('mondayClose') as string
                  },
                  tuesday: {
                      enabled: String(formData.get('tuesdayEnabled')).toLowerCase() === 'true',
                      open: formData.get('tuesdayOpen') as string,
                      close: formData.get('tuesdayClose') as string
                  },
                  wednesday: {
                      enabled: String(formData.get('wednesdayEnabled')).toLowerCase() === 'true',
                      open: formData.get('wednesdayOpen') as string,
                      close: formData.get('wednesdayClose') as string
                  },
                  thursday: {
                      enabled: String(formData.get('thursdayEnabled')).toLowerCase() === 'true',
                      open: formData.get('thursdayOpen') as string,
                      close: formData.get('thursdayClose') as string
                  },
                  friday: {
                      enabled: String(formData.get('fridayEnabled')).toLowerCase() === 'true',
                      open: formData.get('fridayOpen') as string,
                      close: formData.get('fridayClose') as string
                  },
                  saturday: {
                      enabled: String(formData.get('saturdayEnabled')).toLowerCase() === 'true',
                      open: formData.get('saturdayOpen') as string,
                      close: formData.get('saturdayClose') as string
                  },
                  sunday: {
                      enabled: String(formData.get('sundayEnabled')).toLowerCase() === 'true',
                      open: formData.get('sundayOpen') as string,
                      close: formData.get('sundayClose') as string
                  }
              },

        payment_method: {
            accepts_cash: formData.get('cash') === 'true',
            accepts_mobile: formData.get('mobile') === 'true',
            accepts_other: formData.get('acceptOther') === 'true',
            other_methods: (formData.get('otherPayment') as string) ?? ''
        },

        pricing_plan: {
            hourly: {
                rate_type: 'hourly',
                is_enabled: formData.get('hourly_enabled') === 'on',
                rate: parseFloat(formData.get('hourly_rate') as string) || 0
            },
            daily: {
                rate_type: 'daily',
                is_enabled: formData.get('daily_enabled') === 'on',
                rate: parseFloat(formData.get('daily_rate') as string) || 0
            },
            monthly: {
                rate_type: 'monthly',
                is_enabled: formData.get('monthly_enabled') === 'on',
                rate: parseFloat(formData.get('monthly_rate') as string) || 0
            }
        }
    };
    return { signUpData, files: filesFormData };
}
