import React, {
  createRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {string, arrayOf, shape, func} from 'prop-types';
import {Text, Button} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import Input, {inputProp} from './input';

const styles = StyleSheet.create({
  main: {paddingVertical: 32, paddingHorizontal: 16},
  marginBottom: {marginBottom: 32},
  marginTop: {marginTop: 8},
  link: {textDecorationLine: 'underline'},
  buttonText: {color: 'black'},
});

function reducer(state, action) {
  const {field, value} = action;
  return {
    ...state,
    [field]: value,
  };
}

function Form(props) {
  // destructure if used in dep array
  const {schema, submit} = props;

  const [refs, setRefs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setRefs(prev => {
      return Array(schema.length)
        .fill()
        .map((_, i) => prev[i] || createRef());
    });
  }, [setRefs, schema]);

  const [values, dispatch] = useReducer(
    reducer,
    schema.reduce((acc, {name}) => ({...acc, [name]: ''}), {}),
  );

  const handleSubmit = useCallback(() => {
    if (errors.length) {
      return;
    }
    // check form values
    const nextErrors = [];
    for (const {name} in schema) {
      if (!values[name]) {
        errors.push(name);
      }
    }
    setErrors(prev => prev.concat(nextErrors));
    if (nextErrors.length) {
      return;
    }

    console.log('here', nextErrors);
    submit(values);
  }, [values, errors, schema, submit]);

  const handleBlur = useCallback(
    input => {
      const {validate = () => true} = schema.find(
        ({name}) => name === input.name,
      );
      setErrors(prev => {
        return !validate(values[input.name]) ? prev.concat(input.name) : prev;
      });
    },
    [values, setErrors, schema],
  );

  const handleFocus = useCallback(
    input => {
      setErrors(prev => prev.filter(err => err !== input.name));
    },
    [setErrors],
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <ScrollView>
        <Text category="h1" style={styles.marginBottom}>
          {props.title}
        </Text>

        {schema.map((input, i) => {
          const isLast = i === schema.length - 1;
          return (
            <Input
              key={input.name}
              ref={refs[i]}
              input={input}
              value={values[input.name]}
              handleSubmitEditing={() => {
                if (isLast) {
                  handleSubmit();
                } else {
                  refs[i + 1].current.focus();
                }
              }}
              handleChange={val => dispatch({field: input.name, value: val})}
              handleFocus={() => handleFocus(input)}
              handleBlur={() => handleBlur(input)}
              autoFocus={i === 0}
              returnKeyType={isLast ? 'done' : 'next'}
              hasError={errors.includes(input.name)}
              style={isLast ? styles.marginBottom : {}}
            />
          );
        })}

        <Button style={styles.marginBottom} onPress={handleSubmit}>
          {({style, ...p}) => (
            <Text {...p} style={[style, styles.buttonText]}>
              {props.submitButtonText}
            </Text>
          )}
        </Button>

        <Text>
          {props.link.text}{' '}
          <TouchableWithoutFeedback
            accessibilityLabel={props.link.cta}
            onPress={props.link.onPress}>
            <Text status="info" style={styles.link}>
              {props.link.cta}
            </Text>
          </TouchableWithoutFeedback>
        </Text>

        <Text style={styles.marginTop}>
          Take me{' '}
          <TouchableWithoutFeedback
            accessibilityLabel="Go home"
            onPress={() => props.navigate('Landing')}>
            <Text status="info" style={styles.link}>
              home
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

Form.propTypes = {
  submit: func.isRequired,
  title: string.isRequired,
  submitButtonText: string.isRequired,
  schema: arrayOf(inputProp).isRequired,
  navigate: func.isRequired,
  link: shape({
    text: string.isRequired,
    cta: string.isRequired,
    onPress: func.isRequired,
  }).isRequired,
};

export default Form;
