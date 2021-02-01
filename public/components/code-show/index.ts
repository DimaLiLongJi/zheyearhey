import 'highlight.js/styles/atom-one-dark.css';

import { Component, OnInit, AfterMount, Input, ChangeDetectionStrategy, ElementRef, ViewChild } from '@indiv/core';
import hljs from 'highlight.js';

@Component({
    selector: 'code-shower',
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeShower implements OnInit, AfterMount {
    @Input() public codes: string;
    @Input() public type: string;
    @ViewChild('pre code') private codeElement: ElementRef;

    public nvOnInit() {
        this.type = this.type || 'typescript';
        if (!this.type) this.type = 'typescript';
    }

    public show() {
        console.log(this.codes);
    }

    public nvAfterMount() {
        hljs.highlightBlock(this.codeElement.nativeElement);
    }
}
