import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Text,
  ScrollView,
  ListView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from './../../redux/actions';

import Swiper from 'react-native-swiper';
import UserInfoService from './../../services/userInfoService';
import AccountService from './../../services/accountService';
import Transactions from './../../components/transactions';
import Auth from './../../util/auth';
import NetInfo from './../../util/checkNetConnection';
import Colors from './../../config/colors';
import Header from './../../components/header';
import HomeCard from './../../components/homeCard';
import HomeHeader from './../../components/homeHeader';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import TransactionPopUp from './../../components/wallet/TransactionPopUp';

let inputLength = 0;

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }} />
    </View>
  );
};

class HomeScreen extends Component {
  static navigationOptions = {
    label: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      showTransaction: true,
      symbol: '',
      dataToShow: {
        currency: {},
      },
      reference: '',
      selectedCurrency: -1,
      company: {
        name: '',
      },
      code: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
      transactionView: false,
      noAccounts: false,
      logout: false,
    };
  }

  async componentDidMount() {
    console.log('mounted home');
    console.log(this.props);
    //NetInfo.check(this.props.navigation)
    this.getBalanceInfo();
    this.getUserInfo();
  }

  setBalance = (balance, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      balance = balance / 10;
    }
    let balanceString = balance.toString();
    inputLength = balanceString.length;
    return balance;
  };

  getUserInfo = async () => {
    console.log('test1');
    let responseJson = await UserInfoService.getUserDetails();
    if (responseJson.status === 'success') {
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(responseJson.data));
      // let settings = responseJson.data.settings;
      // if (settings.allow_transactions === false) {
      //   this.setState({
      //     creditSwitch: false,
      //     debitSwitch: false,
      //   });
      // }
      // if (settings.allow_debit_transactions === false) {
      //   this.setState({
      //     debitSwitch: false,
      //   });
      // }
      // if (settings.allow_credit_transactions === false) {
      //   this.setState({
      //     creditSwitch: false,
      //   });
      // }
      let responseJson2 = await UserInfoService.getCompany();
      if (responseJson2.status === 'success') {
        this.setState({
          company: responseJson2.data,
        });
      }
    } else {
      this.logout();
    }
    // console.log('company', this.state.company);
  };

  getBalanceInfo = async () => {
    // let responseJson = await UserInfoService.getActiveAccount();
    // if (responseJson.status === 'success') {
    const { accounts, tempCurrency } = this.props;
    console.log('tempCurrency', tempCurrency);
    if (accounts.results[0]) {
      const account = accounts.results[0].currencies[0];
      // AsyncStorage.setItem(
      //   'account_reference',
      //   JSON.stringify(accounts.results[0].reference),
      // );
      // AsyncStorage.setItem('currency', JSON.stringify(account.currency));
      console.log('account', account);
      this.setState({
        // account: accounts.resul[0].name,
        // default: account,
        // code: account.currency.code,
        // symbol: account.currency.symbol,
        // reference: accounts.results[0].reference,
        balance: this.setBalance(
          tempCurrency.available_balance,
          tempCurrency.currency.divisibility,
        ),
      });
      console.log('state', this.state);
      let responseJson2 = await AccountService.getAllAccountCurrencies(
        this.state.reference,
      );
      if (responseJson2.status === 'success') {
        const currencies = responseJson2.data.results;
        this.setState({
          currencies,
          dataSource: this.state.dataSource.cloneWithRows(currencies),
          selectedCurrency: -1,
        });
      }
      await AsyncStorage.setItem('balance', this.state.balance + '');
    } else {
      this.setState({
        noAccounts: true,
      });
    }
    // } else {
    //   this.logout();
    // }
    console.log('balance', this.state.balance);
    console.log('account', this.state.account);
    console.log('default', this.state.default);
  };

  logout = () => {
    // this.props.navigation.navigate('Logout');
    console.log('logout1');
    // this.props.logoutUser();
    // if (this.state.logout) return;
    // console.log('logout2');
    // this.setState({
    //   logout: true,
    // });
    // Auth.logout(this.props.navigation);
  };

  showDialog = item => {
    this.setState({ dataToShow: item });
    this.popupDialog.show();
  };

  getAmount = (amount = 0, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10;
    }

    return amount.toFixed(8).replace(/\.?0+$/, '');
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          noAccounts={this.state.noAccounts}
        />
        <HomeHeader />
        <View style={styles.transaction}>
          {this.state.showTransaction && (
            <Swiper renderPagination={renderPagination} loop={false}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.lightgray,
                  paddingHorizontal: 20,
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <HomeCard
                    key={0}
                    title="Welcome to Rehive"
                    image={require('./../../../assets/icons/new_logo.png')}
                    text="Put your logo and brand here."
                    buttonText="Cool"
                  />
                  {/* <HomeCard
                    key={1}
                    title="Get started"
                    image={require('./../../../assets/icons/demo1.png')}
                    text="Tell your customers what your app is about."
                    buttonText="Let's go"
                  />
                  <HomeCard
                    key={2}
                    title="This is a demo app"
                    image={require('./../../../assets/icons/demo2.png')}
                    text="Note that you have to verify your email or mobile number to claim funds that has been sent to you."
                    buttonText="Cool"
                  />
                  <HomeCard
                    key={3}
                    title="Get verified"
                    image={require('./../../../assets/icons/demo3.png')}
                    text="Go to get verified page"
                    buttonText="Verify"
                    navigation={this.props.navigation}
                  /> */}
                  <View key={4} style={styles.falseView} />
                </ScrollView>
              </View>
              <Transactions
                updateBalance={this.getBalanceInfo}
                currency={this.state.code}
                showDialog={this.showDialog}
                logout={this.logout}
              />
            </Swiper>
          )}
          {!this.state.showTransaction && (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={rowData => {
                return (
                  <View
                    style={{
                      height: 60,
                      padding: 10,
                      paddingHorizontal: 20,
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.lightgray,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                          style={{ color: Colors.darkestgray, fontSize: 14 }}>
                          {rowData.currency.code}
                        </Text>
                        <Text style={{ color: Colors.black, fontSize: 18 }}>
                          {rowData.currency.symbol}
                          {rowData.balance.toFixed(4).replace(/0{0,2}$/, '')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
        {/* <View style={styles.buttonbar}>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.props.navigation.navigate('Receive')}>
            <Text style={{ color: 'white', fontSize: 20 }}>Receive</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.submit, { marginLeft: 25 }]}
            onPress={() =>
              this.props.navigation.navigate('SendTo', {
                reference: '',
                balance: this.state.balance,
              })
            }>
            <Text style={{ color: 'white', fontSize: 20 }}>Send</Text>
          </TouchableHighlight> */}
        {/* </View> */}
        <TransactionPopUp
          popupDialog={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          transactionDetails={this.state.dataToShow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  transaction: {
    flex: 5,
    backgroundColor: Colors.lightgray,
  },
  buttonbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 200,
    left: 40,
    backgroundColor: 'green',
  },
  submit: {
    backgroundColor: Colors.lightblue,
    height: 50,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  falseView: {
    height: 70,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: 'white',
    fontSize: 20,
  },
});

const mapStateToProps = ({ auth, rehive }) => {
  const { token } = auth;
  const { user, accounts, tempCurrency, loadingAccounts } = rehive;
  return { token, user, accounts, tempCurrency, loadingAccounts };
};

export default connect(mapStateToProps, { logoutUser })(HomeScreen);
