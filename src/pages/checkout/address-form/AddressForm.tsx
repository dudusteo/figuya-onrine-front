import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

interface AddressFormProps {
    orderToken: string;
}

const AddressForm = ({ orderToken }: AddressFormProps) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <FormGrid
                item
                xs={12}
                md={6}
            >
                <FormLabel htmlFor="first-name" required>
                    {t('cart.address-form.first-name')}
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder={t('cart.address-form.first-name-placeholder')}
                    autoComplete="first name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={12}
                md={6}
            >
                <FormLabel htmlFor="last-name" required>
                    {t('cart.address-form.last-name')}
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    placeholder={t('cart.address-form.last-name-placeholder')}
                    autoComplete="last name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={12}
            >
                <FormLabel htmlFor="address1" required>
                    {t('cart.address-form.address1')}
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="address1"
                    placeholder={t('cart.address-form.address1-placeholder')}
                    autoComplete="shipping address-line1"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={12}
            >
                <FormLabel htmlFor="address2">{t("cart.address-form.address2")}</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="address2"
                    placeholder={t('cart.address-form.address2-placeholder')}
                    autoComplete="shipping address-line2"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={6}
            >
                <FormLabel htmlFor="city" required>
                    {t('cart.address-form.city')}
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder={t('cart.address-form.city-placeholder')}
                    autoComplete="City"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={6}
            >
                <FormLabel htmlFor="state" required>
                    {t('cart.address-form.state')}
                </FormLabel>
                <OutlinedInput
                    id="state"
                    name="state"
                    type="state"
                    placeholder={t('cart.address-form.state-placeholder')}
                    autoComplete="State"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={6}
            >
                <FormLabel htmlFor="zip" required>
                    {t('cart.address-form.zip')}
                </FormLabel>
                <OutlinedInput
                    id="zip"
                    name="zip"
                    type="zip"
                    placeholder={t('cart.address-form.zip-placeholder')}
                    autoComplete="shipping postal-code"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={6}
            >
                <FormLabel htmlFor="country" required>
                    {t('cart.address-form.country')}
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="country"
                    type="country"
                    placeholder={t('cart.address-form.country-placeholder')}
                    autoComplete="shipping country"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid
                item
                xs={12}
            >
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label={t('cart.address-form.save-address')}
                />
            </FormGrid>
        </Grid>
    );
}

export default AddressForm;