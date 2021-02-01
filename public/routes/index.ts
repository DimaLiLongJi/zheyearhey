import { NvModule } from '@indiv/core';
import { TRouter, RouteModule } from '@indiv/router';

const routes: TRouter[] = [
    {
        path: '/',
        component: 'root-component',
    },
];

@NvModule({
    imports: [
        RouteModule.forRoot({
            rootPath: '/zheyearhey',
            routes,
            routeChange: (old: string, next: string) => {
                console.log('$routeChange', old, next);
            },
        }),
    ],
    exports: [
        RouteModule,
    ],
})
export default class RouterModule { }
