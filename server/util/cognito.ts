import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-north-1_wlpZ3dcAp',
  ClientId: '7jl1i72fa2u2cm2najhias70ab'
};

export const userPool = new CognitoUserPool(poolData);
