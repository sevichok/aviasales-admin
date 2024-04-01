import { AppBar, Button, FormControl, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { sessionSelector } from "src/app/auth/store/auth.selector";
import { RoutesConstant } from "src/constants/RoutesConstants.enum";
import { useAppDispatch, useAppSelector } from "src/storeTypes";
import { signout } from "src/utils/signout";

import { useTranslation } from 'react-i18next';
import { getCurrentLanguage, changeLanguage } from "src/i18n/i18n";

const HeaderComp: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const session = useAppSelector(sessionSelector)
  const { t } = useTranslation();

  const currentLanguage = getCurrentLanguage();
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    changeLanguage(newLanguage);
  };

  const handleClickSignOut = () => {
    signout(dispatch)
  }
  const navToFlights = () => navigate(RoutesConstant.flights)
  const navToUsers = () => navigate(RoutesConstant.users)
  const navToTickets = () => navigate(RoutesConstant.tickets)
  const navToChat = () => navigate(RoutesConstant.chat)

  return (
    <AppBar position="static" className="header-bar">
      <Toolbar disableGutters>
        <MenuItem onClick={navToFlights}>
          <Typography variant="h4" className="navlink">{t('header.flights')}</Typography>
        </MenuItem>
        <MenuItem onClick={navToChat}>
          <Typography variant="h4" className="navlink">{t('header.chat')}</Typography>
        </MenuItem>
        {
          session?.role_type === 'Admin' ?
            <MenuItem onClick={navToUsers}>
              <Typography variant="h4" className="navlink">{t('header.users')}</Typography>
            </MenuItem>
            :
            null
        }
        <MenuItem onClick={navToTickets}>
          <Typography variant="h4" className="navlink">{t('header.tickets')}</Typography>
        </MenuItem>
        <FormControl className="lang">
          <Select
            labelId="language-select-label"
            id="language-select"
            className="language-select"
            value={currentLanguage}
            onChange={handleChangeLanguage}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleClickSignOut} variant="contained" color="error">{t('header.signout')}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComp;