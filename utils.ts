import Qualtrics from 'react-native-qualtrics';

export const isFormAvailable = (formId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    Qualtrics.evaluateIntercept(formId, result => {
        console.log(result);
        
      if (result.surveyUrl === 'Evaluation already in progress') {
        reject(new Error(result.surveyUrl));
      }
      resolve(result.passed);
    });
  });
};

 