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

    public showPage0 = true;
    public showPage1 = false;
    public showPage2 = false;
    public showPage3 = false;
    public showPage4 = false;
    public showPage5 = false;
    public showPage6 = false;
    public showPage7 = false;
    public showPage8 = false;
    public showPage9 = false;
    public showPage10 = false;
    public showPage11 = false;
    public showPage12 = false;
    public showPage13 = false;

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
            if (this.activeIndex === 0) that.swiper.allowSlidePrev = false;
            else that.swiper.allowSlidePrev = true;
            that.activeIndex = this.activeIndex;

            that.resetPageShow();
            (that as any)["showPage" + this.activeIndex] = true;
            console.log(11123231323, (that as any)["showPage" + this.activeIndex]);
            that.marker();
        });
    }

    public goNext() {
        this.swiper.slideNext();
    }

    public checkPassword() {
        if (this.password === "我爱宝宝") {
            this.hasChecked = true;
        } else {
            this.hasChecked = false;
            this.tipText = "输入错误哦~~";
        }
        this.marker();
    }

    private resetPageShow() {
        this.showPage0 = false;
        this.showPage1 = false;
        this.showPage2 = false;
        this.showPage3 = false;
        this.showPage4 = false;
        this.showPage5 = false;
        this.showPage6 = false;
        this.showPage7 = false;
        this.showPage8 = false;
        this.showPage9 = false;
        this.showPage10 = false;
        this.showPage11 = false;
        this.showPage12 = false;
        this.showPage13 = false;
    }
}
