import './style.less';

import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestory, Input, ContentChild, ContentChildren, AfterMount, ChangeDetectionStrategy, MarkForCheck, TMarkForCheck, Attribute } from '@indiv/core';
import { Optional, SkipSelf, Host, Self, Inject } from '@indiv/di';
import { RouteChange, NvLocation } from '@indiv/router';

import { navs } from '../../constants/nav';

import TestService from '../../service/test.service';
import { testToken } from '../../service/inject-token';

type nav = {
    name: string;
    to: string;
    active?: string;
    child?: nav[];
};

@Component({
    selector: 'side-bar',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
        provide: TestService,
        useClass: TestService,
        },
    ],
})
export class SideBar implements OnInit, AfterMount, RouteChange, OnDestory {
    public navs: nav[] = navs();
    public num: number = 1;
    public subscribeToken: Subscription;
    @Input() handleSideBar: () => void;
    @ContentChild('a') htmltemplateA: HTMLElement;
    @ContentChildren('a') htmltemplateAs: HTMLElement[];
    @MarkForCheck() marker: TMarkForCheck;

    @Optional()
    @Self()
    @Inject(testToken)
    private testToken0: string;

    @Optional()
    @Attribute('test-attribute')
    private testAttribute2: string;

    constructor(
        @Host() private testS: TestService,
        private location: NvLocation,
        @SkipSelf() @Inject('testToken') private testToken1: string,
        @Optional() @Self() @Inject(testToken) private testToken2: string,
        @Attribute('test-attribute') private testAttribute: string,
    ) {
        console.log(7777777, this.testS, this.testToken1, this.testToken2, this.testAttribute);
        // this.subscribeToken = this.testS.subscribe(this.subscribe);
    }

    public subscribe = (value: any) => {
        console.log('RXJS value from SideBar', value.next);
    }

    public nvOnInit() {
        this.showColor();
        console.log('SideBar onInit', this.navs, this.testToken0, this.testAttribute2);
    }

    public nvAfterMount() {
        console.log('SideBar afterMount', this.htmltemplateA, this.htmltemplateAs);
    }

    public nvRouteChange(lastRoute?: string, newRoute?: string): void {
        this.showColor();
    }

    public nvOnDestory() {
        console.log('SideBar nvOnDestory');
        this.subscribeToken.unsubscribe();
    }

    public showColor() {
        const location = this.location.get();
        this.navs.forEach(nav => {
            nav.active = null;
            if (nav.to === location.path) nav.active = 'active';
            if (nav.child) {
                nav.child.forEach(n => {
                    n.active = null;
                    if (n.to === location.path) {
                        nav.active = 'active';
                        n.active = 'active';
                    }
                });
            }
        });
        this.marker().then(() => {
            console.log('渲染完成');
        });
    }

    public changeShowSideBar() {
        this.handleSideBar();
    }
}
