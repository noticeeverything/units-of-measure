import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'uom-not-found',
    template: `
        <div id="not-found" class="clear-nav" style="margin-top: 100px">
            <div class="container">
                <div class="text-center">
                    <h1>OH, SNAP!</h1>
                    <p>The page you asked for doesn&#39;t exist...the sadness.</p>
                    <a routerLink="/">take me back to known territory</a>
                </div>
            </div>
        </div>
    `,
})
export class NotFoundComponent implements OnInit {
    constructor(private title: Title) {}

    ngOnInit(): void {
        this.title.setTitle('Page Not Found');
    }
}
