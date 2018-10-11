import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import { standardizeString } from './../../util/general';

import Header from './../../components/header';
import { Output, Input, InputContainer } from './../../components/common';
import CardList from './../../components/CardList';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const {
      bank_name,
      bank_code,
      branch_code,
      type,
      number,
      swift,
      iban,
      bic,
    } = item;
    return (
      <View style={viewStyleContent}>
        {bank_name ? <Output label="Bank name" value={bank_name} /> : null}
        {bank_code ? <Output label="Bank code" value={bank_code} /> : null}
        {branch_code ? (
          <Output label="Branch name" value={branch_code} />
        ) : null}
        {type ? <Output label="Type" value={type} /> : null}
        {number ? <Output label="Number" value={number} /> : null}
        {swift ? <Output label="Swift" value={swift} /> : null}
        {iban ? <Output label="IBAN" value={iban} /> : null}
        {bic ? <Output label="BIC" value={bic} /> : null}
        {!(
          bank_name &&
          bank_name &&
          branch_code &&
          type &&
          number &&
          swift &&
          iban &&
          bic
        ) ? (
          <Output label="Incomplete" />
        ) : null}
      </View>
    );
  };

  renderDetail = () => {
    const { tempItem, updateError, updateInputField, updateItem } = this.props;
    const {
      name,
      number,
      type,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
    } = tempItem;

    return (
      <View>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={name}
          inputError={updateError}
          onChangeText={input =>
            updateInputField('bank_account', 'name', input)
          }
          reference={r => (this.name = r)}
          onSubmitEditing={() => this.number.focus()}
          returnKeyType="next"
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={number}
          onChangeText={input =>
            updateInputField('bank_account', 'number', input)
          }
          reference={r => (this.number = r)}
          onSubmitEditing={() => this.type.focus()}
          returnKeyType="next"
          keyboardType={'numeric'}
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={type}
          onChangeText={input =>
            updateInputField('bank_account', 'type', input)
          }
          reference={r => (this.type = r)}
          onSubmitEditing={() => this.bank_name.focus()}
          returnKeyType="next"
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_name', input)
          }
          reference={r => (this.bank_name = r)}
          onSubmitEditing={() => this.bank_code.focus()}
          returnKeyType="next"
        />
        <Input
          label="Bank code"
          placeholder="e.g. 12324"
          autoCapitalize="none"
          value={bank_code}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_code', input)
          }
          reference={r => (this.bank_code = r)}
          onSubmitEditing={() => this.branch_code.focus()}
          returnKeyType="next"
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={branch_code}
          onChangeText={input =>
            updateInputField('bank_account', 'branch_code', input)
          }
          reference={r => (this.branch_code = r)}
          onSubmitEditing={() => this.swift.focus()}
          returnKeyType="next"
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={swift}
          onChangeText={input =>
            updateInputField('bank_account', 'swift', input)
          }
          reference={r => (this.swift = r)}
          onSubmitEditing={() => this.iban.focus()}
          returnKeyType="next"
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={iban}
          onChangeText={input =>
            updateInputField('bank_account', 'iban', input)
          }
          reference={r => (this.iban = r)}
          onSubmitEditing={() => this.bic.focus()}
          returnKeyType="next"
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={bic}
          onChangeText={input => updateInputField('bank_account', 'bic', input)}
          onSubmitEditing={() => updateItem('bank_account', tempItem)}
          reference={r => (this.bic = r)}
        />
      </View>
    );
  };

  render() {
    const {
      bank_account,
      loading_bank_account,
      tempItem,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Bank accounts"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('bank_account', tempItem)
              : () => newItem('bank_account')
          }
        />
        <CardList
          type="bank_account"
          data={bank_account}
          tempItem={tempItem}
          loadingData={loading_bank_account}
          identifier="bank_name"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No bank accounts added yet"
          canDelete
          canEdit
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = ({ user }) => {
  const { bank_account, loading_bank_account, tempItem, showDetail } = user;
  return {
    bank_account,
    loading_bank_account,
    tempItem,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(BankAccountsScreen);
