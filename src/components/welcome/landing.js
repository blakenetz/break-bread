import React from 'react';
import {ImageBackground, StyleSheet, StatusBar} from 'react-native';
import {Button, Text, Icon, Layout, useTheme} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  view: {flex: 1},
  imageBackground: {
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 16,
    fontFamily: 'Traveling _Typewriter',
  },
  margin: {marginVertical: 12, marginHorizontal: 16},
  buttonText: {color: 'black'},
  error: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
  },
  icon: {width: 15, height: 15, marginHorizontal: 4},
});

const buttons = [
  {label: 'Log in!', route: 'Login'},
  {label: 'Sign up!', route: 'Signup'},
];

export default function WelcomeView(props) {
  const theme = useTheme();
  const {error} = props.route.params || {};

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <ImageBackground
        source={require('../../assets/images/blue-pineapple.png')}
        style={styles.imageBackground}>
        {error && (
          <Layout
            style={[
              styles.margin,
              styles.error,
              {backgroundColor: theme['color-danger-transparent-600']},
            ]}>
            <Icon
              name="alert-circle-outline"
              style={styles.icon}
              fill={theme['text-basic-color']}
            />
            <Text style={styles.error}>
              Sorry an error occurred. Maybe try again?
            </Text>
          </Layout>
        )}

        <Text style={styles.title} category="h1">
          Break Bread.
        </Text>

        {buttons.map(btn => (
          <Button
            key={btn.route}
            onPress={() => props.navigation.navigate(btn.route)}
            style={styles.margin}>
            {({style, ...p}) => (
              <Text {...p} style={[style, styles.buttonText]}>
                {btn.label}
              </Text>
            )}
          </Button>
        ))}
      </ImageBackground>
    </SafeAreaView>
  );
}
