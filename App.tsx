import React from 'react';
import {SafeAreaView, ScrollView, Button, Text} from 'react-native';
import Qualtrics from 'react-native-qualtrics';
import {isFormAvailable} from './utils';

function App(): JSX.Element {
  const brandId = undefined;
  const productId = undefined;
  const formId = undefined;

  if (!brandId || !productId || !formId) {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>
            please set the values for the `brandId`, `productId` and `formId` in
            the `./App.tsx`
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  Qualtrics.initializeProject(brandId, productId, i => {
    console.info(`interceptIdCallback: ${JSON.stringify(i)}`);
  });

  const openQualtricsPopup = async () => {
    const formAvailable = await isFormAvailable(formId);
    if (!formAvailable) {
      return;
    }

    Qualtrics.displayIntercept(formId)
      .then(e => console.error(`displayIntercept then: ${JSON.stringify(e)}`))
      .catch(e =>
        console.error(`displayIntercept catch: ${JSON.stringify(e)}`),
      );
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Click me" onPress={openQualtricsPopup} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
