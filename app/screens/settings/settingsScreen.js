import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { changeTheme } from './../../redux/actions';
import Header from './../../components/header';
import App from './../../../app.json';
import Picker from 'react-native-picker-select';

import {
  SettingsContainer,
  SettingsOption,
  InputContainer,
  Text,
} from './../../components/common';
import { themeStateSelector } from '../../redux/sagas/selectors';
import { concatAddress } from '../../util/general';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  goTo = (path, name) => {
    this.props.navigation.navigate(path, { name });
  };

  renderBasicInfo() {
    const { profile } = this.props;

    let value =
      (profile.first_name ? profile.first_name : '') +
      (profile.last_name ? ' ' + profile.last_name : '');

    return (
      <SettingsOption
        label="Basic info"
        value={value}
        gotoAddress="SettingsPersonalDetails"
        onPress={this.goTo}
      />
    );
  }

  renderEmailAddresses() {
    const { email } = this.props;

    let value = 'Not yet provided';

    if (email) {
      for (let i = 0; i < email.length; i++) {
        if (email[i].verified === true) {
          value = email[i].email;
        }
        if (email[i].primary === true) {
          value = email[i].email;
          break;
        }
      }
    }

    return (
      <SettingsOption
        label="Email address"
        value={value}
        gotoAddress="SettingsEmailAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderMobileNumbers() {
    const { mobile } = this.props;

    let value = 'Not yet provided';

    if (mobile) {
      for (let i = 0; i < mobile.length; i++) {
        if (mobile[i].verified) {
          value = mobile[i].number;
        }
        if (mobile[i].primary) {
          value = mobile[i].number;
          break;
        }
      }
    }

    return (
      <SettingsOption
        label="Mobile number"
        value={value}
        gotoAddress="SettingsMobileNumbers"
        onPress={this.goTo}
      />
    );
  }

  renderAddresses() {
    const { address } = this.props;
    let value = '';
    if (address.length > 0) {
      const tempAddress = address[0];
      value = concatAddress(tempAddress);
    }
    if (!value) {
      value = 'Not yet provided';
    }

    return (
      <SettingsOption
        label="Addresses"
        value={value}
        gotoAddress="SettingsAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderDocuments() {
    return (
      <View>
        <SettingsOption
          label="Proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Advanced proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Proof of address"
          gotoAddress="Document"
          onPress={this.goTo}
        />
      </View>
    );
  }

  renderBankAccounts() {
    return (
      <SettingsOption
        label="Bank accounts"
        gotoAddress="SettingsBankAccounts"
        onPress={this.goTo}
      />
    );
  }

  renderCards() {
    return (
      <SettingsOption
        label="Cards"
        gotoAddress="SettingsCards"
        onPress={this.goTo}
      />
    );
  }

  renderCryptoAccounts() {
    return (
      <SettingsOption
        label="Crypto accounts"
        gotoAddress="SettingsCryptoAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderSecurity() {
    return (
      <View>
        <SettingsOption
          label="Change password"
          gotoAddress="ChangePassword"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Two-factor authentication"
          gotoAddress="TwoFactor"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Pin/fingerprint authentication"
          gotoAddress="Pin"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Log out"
          gotoAddress="Logout"
          onPress={this.goTo}
        />
      </View>
    );
  }

  renderAppearance() {
    let themes = [
      { label: 'Theme: Default', value: 'default' },
      { label: 'Theme: Light', value: 'light' },
    ];
    return (
      <Picker
        value={this.props.theme}
        placeholder={{}}
        items={themes}
        onValueChange={value => {
          this.props.changeTheme(value);
        }}
        style={{
          inputIOS: {
            fontSize: 16,
            padding: 8,
            backgroundColor: 'white',
            color: '#707070',
          },
          inputAndroid: {
            fontSize: 16,
            padding: 8,
            backgroundColor: 'white',
            color: '#707070',
          },
          underline: { borderTopWidth: 0 },
        }}
        hideIcon
        // underline={{
        //   borderTopWidth: 0,
        //   height: 0,
        // }}
        // ref={el => {
        //   this.inputRefs.picker = el;
        // }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Settings" />
        <InputContainer>
          <SettingsContainer label="Personal details">
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
          </SettingsContainer>
          <SettingsContainer label="External accounts">
            {this.renderBankAccounts()}
            {/* {this.renderCards()} */}
            {/* {this.renderCryptoAccounts()} */}
          </SettingsContainer>
          <SettingsContainer label="Appearance">
            {this.renderAppearance()}
          </SettingsContainer>
          <SettingsContainer label="Security">
            {this.renderSecurity()}
          </SettingsContainer>
          <Text>
            {'Version: ' +
              App.expo.version +
              (App.expo.slug === 'rehive-wallet-staging' ? ' (staging)' : '')}
          </Text>
        </InputContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => {
  const { profile, address, mobile, email } = state.user;
  return {
    profile,
    address,
    mobile,
    email,
    theme: themeStateSelector(state),
  };
};

export default connect(mapStateToProps, { changeTheme })(SettingsScreen);
