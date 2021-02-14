import { NvModule } from '@indiv/core';

import { RootComponent } from '../components/root-component';
import RouterModule from '../routes';

import TestService from '../service/test.service';
import { testToken } from '../service/inject-token';

@NvModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    RootComponent,
  ],
  providers: [
    {
      provide: TestService
    },
    {
      provide: testToken,
      useValue: '111',
    },
    {
      provide: 'testToken',
      useValue: '222',
    },
  ],
  bootstrap: RootComponent,
})
export default class RootModule { }
