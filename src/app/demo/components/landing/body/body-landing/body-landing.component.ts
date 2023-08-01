import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../../api/product';
import { ProductService } from '../../../../service/product.service';

@Component({
    selector: 'app-body-landing',
    templateUrl: './body-landing.component.html',
    styleUrls: ['./body-landing.component.scss'],
})

export class BodyLandingComponent {
    constructor(
        private productService: ProductService,
        private viewportScroller: ViewportScroller,
    ) {}

    onHead() {
        this.viewportScroller.scrollToPosition([0, 0]);
    }

    products: Product[] | undefined;

    ngOnInit(): void {
        this.jumpNumber();
        this.getProductList();
    }

    jumpNumber() {
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
    getProductList() {
        this.productService
            .getProducts()
            .then((data: Product[]) => {
                this.products = data;
            })
            .catch((e) => {
                console.error('Đã xảy ra lỗi khi lấy dữ liệu:', e);
            });
    }
}
