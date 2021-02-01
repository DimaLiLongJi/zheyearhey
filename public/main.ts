import './styles/reset.less';
import './styles/global.less';

import { InDiv } from '@indiv/core';
import { PlatformBrowser } from '@indiv/platform-browser';
import RootModule from './modules';

InDiv.bootstrapFactory(RootModule, {
  plugins: [
    PlatformBrowser
  ],
});
