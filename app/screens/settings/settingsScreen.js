import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {} from './../../redux/actions';
import Header from './../../components/header';
import AppConfig from './../../../app.json';
// import HeaderVerified from './../../../components/HeaderVerified';

import {
  SettingsContainer,
  SettingsOption,
  InputContainer,
} from './../../components/common';

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
    const { email_address } = this.props;

    let value = 'Not yet provided';

    if (email_address) {
      for (let i = 0; i < email_address.length; i++) {
        if (email_address[i].verified === true) {
          value = email_address[i].email;
        }
        if (email_address[i].primary === true) {
          value = email_address[i].email;
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
    const { mobile_number } = this.props;

    let value = 'Not yet provided';

    if (mobile_number) {
      for (let i = 0; i < mobile_number.length; i++) {
        if (mobile_number[i].verified) {
          value = mobile_number[i].number;
        }
        if (mobile_number[i].primary) {
          value = mobile_number[i].number;
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
    if (address) {
      if (address.line_1) {
        value = value + address.line_1 + ', ';
      }
      if (address.line_2) {
        value = value + address.line_2 + ', ';
      }
      if (address.city) {
        value = value + address.city + ', ';
      }
      if (address.state_province) {
        value = value + address.state_province + ', ';
      }
      if (address.country) {
        value = value + address.country + ', ';
      }
      if (address.postal_code) {
        value = value + address.postal_code;
      }
    }

    return (
      <SettingsOption
        label="Address"
        value={value}
        gotoAddress="SettingsAddress"
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
          label="Reset password"
          gotoAddress="ChangePassword"
          onPress={this.goTo}
        />
        {/* <SettingsOption
          label="Two factor"
          gotoAddress="TwoFactor"
          onPress={this.goTo}
        /> */}
        {/* <SettingsOption label="Pin" gotoAddress="Pin" goTo={this.goTo} /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Settings" />
        {/* <HeaderVerified
          photoLink={profile.profile}
          username={profile.username}
          firstName={profile.first_name}
          lastName={profile.last_name}
        /> */}
        <InputContainer>
          <SettingsContainer label="Personal details">
            {this.renderBasicInfo()}
            {this.renderEmailAddresses()}
            {this.renderMobileNumbers()}
            {this.renderAddresses()}
          </SettingsContainer>
          {/* <SettingsContainer label="Identity">
            {this.renderDocuments()}
          </SettingsContainer> */}
          <SettingsContainer label="External accounts">
            {this.renderBankAccounts()}
            {/* {this.renderCards()} */}
            {this.renderCryptoAccounts()}
          </SettingsContainer>
          <SettingsContainer label="Security">
            {this.renderSecurity()}
          </SettingsContainer>
          {/* <Text style={{ position: 'absolute', bottom: 4 }}>
            Version: {AppConfig.version}
          </Text> */}
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
  // mainContainer: {
  //   flex: 1,
  // },
};

const mapStateToProps = ({ user }) => {
  const { profile, address, mobile_number, email_address } = user;
  return {
    profile,
    address,
    mobile_number,
    email_address,
  };
};

export default connect(mapStateToProps, {})(SettingsScreen);