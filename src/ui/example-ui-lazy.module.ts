import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { SharedModule } from '@vendure/admin-ui/core';

// import { ProductReviewsResolver } from './providers/routing/product-reviews-resolver';
// import { ReviewDetailResolver } from './providers/routing/review-detail-resolver';
// import { ReviewsSharedModule } from './reviews-shared.module';

@NgModule({
    imports: [
        SharedModule,
        // ReviewsSharedModule,
        RouterModule.forChild([
            // {
            //     path: 'product/:id',
            //     component: ProductReviewsListComponent,
            //     resolve: { data: ProductReviewsResolver },
            //     data: { breadcrumb: productReviewsBreadcrumb },
            // },
            {
                path: '',
                pathMatch: 'full',
                component: ExampleListComponent,
                // data: {
                //     breadcrumb: [
                //         {
                //             label: 'Product reviews',
                //             link: ['/extensions', 'product-reviews'],
                //         },
                //     ],
                // },
            },
            // {
            //     path: ':id',
            //     component: ProductReviewDetailComponent,
            //     resolve: { entity: ReviewDetailResolver },
            //     data: { breadcrumb: reviewDetailBreadcrumb },
            // },
        ]),
    ],
    declarations: [
        ExampleListComponent,
        // ExampleDetailComponent,
        // AllExamplesListComponent
    ],
    // providers: [ProductReviewsResolver, ReviewDetailResolver],
})
export class ExampleUiLazyModule {}

// export function productReviewsBreadcrumb(resolved: { data: GetProductName.Product }, params: any) {
//     return [
//         {
//             label: 'breadcrumb.products',
//             link: ['/catalog', 'products'],
//         },
//         {
//             label: `${resolved.data.name}`,
//             link: ['/catalog', 'products', params.id],
//         },
//         {
//             label: 'Reviews',
//             link: [''],
//         },
//     ];
// }

// export function reviewDetailBreadcrumb(resolved: { entity: Observable<GetReview.ProductReview> }) {
//     return resolved.entity.pipe(
//         map((entity) => [
//             {
//                 label: 'Product reviews',
//                 link: ['/extensions', 'product-reviews'],
//             },
//             {
//                 label: `${entity.id}`,
//                 link: [],
//             },
//         ]),
//     );
// }
