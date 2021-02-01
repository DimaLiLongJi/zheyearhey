import './style.less';

import { Component, ChangeDetectionStrategy, MarkForCheck, TMarkForCheck, ElementRef, ViewChild, AfterMount } from '@indiv/core';
import TestService from '../../service/test.service';
import Swiper from 'swiper';

@Component({
    selector: 'root-component',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
        provide: TestService,
        // useClass: TestService,
        },
    ],
})
export class RootComponent implements AfterMount {
    @MarkForCheck() public marker: TMarkForCheck;
    @ViewChild('#swiper-ref') private testComponent: ElementRef;
    private activeIndex: number = 0;
    private swiper: Swiper;
    public password: string = "";
    public hasChecked: boolean = false;
    public tipText = "输入浏览密码~~";

    constructor() {
    }

    public nvAfterMount(): void {
        console.log(4444, this.testComponent);
        this.swiper = new Swiper(this.testComponent.nativeElement, {
            speed:1000,
            loop: false,
            autoplay: false,
            direction: "vertical",
            effect: "slide",
            slidesPerView: 1,
            spaceBetween: 0,
        });
        const that = this;
        this.swiper.on("slideChangeTransitionEnd", function(){
            if (this.activeIndex === 1) that.swiper.allowSlideNext = false;
            else that.swiper.allowSlideNext = true;
            that.activeIndex = this.activeIndex;
        });
    }

    public goNext() {
        console.log(2313, this.activeIndex);
        this.swiper.slideNext();
    }

    public checkPassword() {
        console.log(22222, this.password);
        if (this.password === "我爱宝宝") {
            this.hasChecked = true;
        } else {
            this.hasChecked = false;
            this.tipText = "输入错误哦~~";
        }
        this.marker();
    }
}
