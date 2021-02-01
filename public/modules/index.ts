import { NvModule } from '@indiv/core';

import { RootComponent } from '../components/root-component';
import { SideBar } from '../components/side-bars';
import RouterModule from '../routes';

import TestService from '../service/test.service';
import { testToken } from '../service/inject-token';

import ShareModule from './share.module';

@NvModule({
  imports: [
    ShareModule,
    RouterModule,
  ],
  declarations: [
    SideBar,
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
