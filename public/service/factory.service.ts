import TestService from './test.service';

export class ProvideFactoryService {
  public data: number;
}


export function factoryService(testS: TestService) {
  return {
    data: testS.data
  };
}
