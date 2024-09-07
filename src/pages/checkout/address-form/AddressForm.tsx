import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { OrderUpdateOptions } from '../../../services/checkoutService';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

interface AddressFormProps {
    formData: OrderUpdateOptions,
    onFormChange: (name: string, value: string | boolean) => void;
}

const AddressForm = ({ formData, onFormChange }: AddressFormProps) => {
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const fieldName = `bill_address_attributes.${name}`;
        onFormChange(fieldName, fieldValue);
    };

    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="firstname" required>
                    {t('cart.address-form.first-name')}
                </FormLabel>
                <OutlinedInput
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder={t('cart.address-form.first-name-placeholder')}
                    autoComplete="first name"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.firstname}
                    onChange={handleChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="lastname" required>
                    {t('cart.address-form.last-name')}
                </FormLabel>
                <OutlinedInput
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder={t('cart.address-form.last-name-placeholder')}
                    autoComplete="last name"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.lastname}
                    onChange={handleChange}
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address1" required>
                    {t('cart.address-form.address1')}
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="text"
                    placeholder={t('cart.address-form.address1-placeholder')}
                    autoComplete="shipping address-line1"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.address1}
                    onChange={handleChange}
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address2">{t('cart.address-form.address2')}</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="text"
                    placeholder={t('cart.address-form.address2-placeholder')}
                    autoComplete="shipping address-line2"
                    size="small"
                    value={formData.bill_address_attributes?.address2}
                    onChange={handleChange}
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="zipcode" required>
                    {t('cart.address-form.zip')}
                </FormLabel>
                <OutlinedInput
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    placeholder={t('cart.address-form.zip-placeholder')}
                    autoComplete="shipping postal-code"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.zipcode}
                    onChange={handleChange}
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                    {t('cart.address-form.city')}
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="text"
                    placeholder={t('cart.address-form.city-placeholder')}
                    autoComplete="city"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.city}
                    onChange={handleChange}
                />
            </FormGrid>
            {/* <FormGrid item xs={6}>
                <FormLabel htmlFor="state_name" required>
                    {t('cart.address-form.state')}
                </FormLabel>
                <OutlinedInput
                    id="state_name"
                    name="state_name"
                    type="text"
                    placeholder={t('cart.address-form.state-placeholder')}
                    autoComplete="state"
                    required
                    size="small"
                    value={formData.bill_address_attributes?.state_name}
                    onChange={handleChange}
                />
            </FormGrid> */}

            {/* <FormGrid item xs={6}>
                <FormLabel htmlFor="country_iso" required>
                    {t('cart.address-form.country')}
                </FormLabel>
                <OutlinedInput
                    id="country_iso"
                    name="country_iso"
                    type="text"
                    placeholder={t('cart.address-form.country-placeholder')}
                    autoComplete="shipping country"
                    required
                    readOnly={true}
                    size="small"
                    value={t('cart.address-form.country-placeholder')}
                    onChange={handleChange}
                />
            </FormGrid> */}
            <FormGrid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="saveAddress"
                            value="yes"
                        />
                    }
                    label={t('cart.address-form.save-address')}
                />
            </FormGrid>
        </Grid>
    );
};

export default AddressForm;