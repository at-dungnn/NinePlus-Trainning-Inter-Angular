import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ViewportScroller } from '@angular/common';
import { Product } from '../../api/product';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
    ngOnInit(): void {
        this.jumpNumber();
    }
    scrollView() {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    jumpNumber() {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.elementor-counter-number');

        elements.forEach(function (element: HTMLElement) {
            const duration: number = parseInt(element.getAttribute('data-duration') || '0', 10);
            const toValue: number = parseInt(element.getAttribute('data-to-value') || '0', 10);
            const fromValue: number = parseInt(element.getAttribute('data-from-value') || '0', 10);
            const delimiter: string | null = element.getAttribute('data-delimiter');

            let currentValue: number = fromValue;
            const increment: number = Math.ceil((toValue - fromValue) / (duration / 10)); //  value increment one step

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
