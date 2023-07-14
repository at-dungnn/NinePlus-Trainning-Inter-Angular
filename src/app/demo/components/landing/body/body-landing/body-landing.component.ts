import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-body-landing',
    templateUrl: './body-landing.component.html',
    styleUrls: ['./body-landing.component.scss'],
})
export class BodyLandingComponent {
    
    constructor(private viewportScroller: ViewportScroller) {}

    onHead() {
        this.viewportScroller.scrollToPosition([0, 0]);
    }

    ngOnInit(): void {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.elementor-counter-number'
        );

      
        elements.forEach(function (element: HTMLElement) {
            const duration: number = parseInt(
                element.getAttribute('data-duration') || '0',
                10
            );
            const toValue: number = parseInt(
                element.getAttribute('data-to-value') || '0',
                10
            );
            const fromValue: number = parseInt(
                element.getAttribute('data-from-value') || '0',
                10
            );
            const delimiter: string | null =
                element.getAttribute('data-delimiter');

            let currentValue: number = fromValue;
            const increment: number = Math.ceil(
                (toValue - fromValue) / (duration / 10)
            ); //  value increment one step

            const interval = setInterval(function () {
                currentValue += increment;
                if (currentValue >= toValue) {
                    currentValue = toValue;
                    clearInterval(interval);
                }

                // Định dạng giá trị tăng dần và đặt vào phần tử HTML
                element.textContent = currentValue.toLocaleString();
            }, 10); //
        });

       
    
       
    }
}