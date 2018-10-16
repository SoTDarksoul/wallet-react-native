import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import { View, Image, Text, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
  uploadProfilePhoto,
} from './../../redux/actions';

// import CountryPicker from 'react-native-country-picker-modal';
import Colors from './../../config/colors';
import Header from './../../components/header';
import {
  Input,
  Output,
  Card,
  CardContainer,
  EmptyListMessage,
} from './../../components/common';
import HeaderProfile from './../../components/HeaderProfile';

class PersonalDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Personal details',
  };

  state = {
    modalVisible: false,
  };

  componentDidMount() {
    this.props.fetchData('profile');
  }

  toggleEdit = () => {
    const data = {
      // username: this.props.profile.username,
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      id_number: this.props.profile.id_number,
      nationality: this.props.profile.nationality,
      // profile: this.props.profile.profile,
    };
    this.props.editItem('profile', data);
  };

  render() {
    const {
      loading_profile,
      fetchData,
      tempItem,
      profile,
      updateItem,
      updateInputField,
      updateError,
      showDetail,
      uploadProfilePhoto,
    } = this.props;
    const { first_name, last_name, id_number } = profile;
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          back
          title="Personal details"
          headerRightIcon={showDetail ? 'done' : 'edit'}
          headerRightOnPress={() =>
            showDetail ? updateItem('profile', tempItem) : this.toggleEdit()
          }
          noShadow
        />
        <HeaderProfile
          photoLink={profile.profile}
          name={
            profile.first_name
              ? profile.first_name + ' ' + profile.last_name
              : ''
          }
          username={profile.username}
          uploadProfilePhoto={uploadProfilePhoto}
        />
        <CardContainer>
          <Card
            textActionOne={showDetail ? 'SAVE' : ''}
            onPressActionOne={() => updateItem('profile', tempItem)}
            textActionTwo={showDetail ? 'CANCEL' : ''}
            onPressActionTwo={() => fetchData('profile')}
            loading={loading_profile}
            errorText={updateError}
            onPressContent={() => (!showDetail ? this.toggleEdit() : null)}>
            <View>
              {showDetail ? (
                <View>
                  {/* <Input
                    label="Username"
                    placeholder="eg. john_smitch"
                    autoCapitalize="none"
                    value={tempItem.username}
                    onChangeText={input =>
                      updateInputField('profile', 'username', input)
                    }
                  /> */}
                  <Input
                    label="First name"
                    placeholder="eg. John"
                    autoCapitalize="none"
                    value={tempItem.first_name}
                    onChangeText={input =>
                      updateInputField('profile', 'first_name', input)
                    }
                  />

                  <Input
                    label="Last name"
                    placeholder="eg. Smith"
                    autoCapitalize="none"
                    value={tempItem.last_name}
                    onChangeText={input =>
                      updateInputField('profile', 'last_name', input)
                    }
                  />

                  <Input
                    label="ID number"
                    placeholder="eg. 0123456789012"
                    autoCapitalize="none"
                    value={tempItem.id_number}
                    onChangeText={input =>
                      updateInputField('profile', 'id_number', input)
                    }
                  />
                </View>
              ) : first_name || last_name || id_number ? (
                <View style={{ padding: 8 }}>
                  {first_name ? (
                    <Output label="First name" value={first_name} />
                  ) : null}
                  {last_name ? (
                    <Output label="Last name" value={last_name} />
                  ) : null}
                  {id_number ? (
                    <Output label="ID number" value={id_number} />
                  ) : null}
                </View>
              ) : (
                <EmptyListMessage text="No profile info saved" />
              )}

              {/* <View style={[styles.pickerContainer, { paddingVertical: 20 }]}>
            <Text style={[styles.input, { flex: 4 }]}>Country</Text>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <CountryPicker
                onChange={value => {
                  this.setState({ nationality: value.cca2 });
                }}
                closeable
                filterable
                cca2={nationality}
                translation="eng"
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </View> */}
              {/* </InputContainer> */}
            </View>
          </Card>
        </CardContainer>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
};

const mapStateToProps = ({ user }) => {
  const { profile, loading_profile, tempItem, showDetail, updateError } = user;
  return {
    profile,
    loading_profile,
    tempItem,
    showDetail,
    updateError,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  editItem,
  updateItem,
  updateInputField,
  uploadProfilePhoto,
})(PersonalDetailsScreen);
